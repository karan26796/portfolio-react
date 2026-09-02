#!/usr/bin/env bash
#
# Regenerates the Open Graph thumbnails from real screenshots of the running
# site, so a shared link previews the page as it actually looks.
#
#   npm run dev          # must be up on :5555
#   ./scripts/og-thumbnails.sh
#
# Needs Google Chrome and Python's Pillow; no npm dependencies. Chrome's CLI
# screenshot mode is used rather than a headless-browser package — it is
# already installed, and this runs by hand every few months.
#
# The capture goes through a harness page written into public/ for the duration
# of the run and deleted afterwards, so nothing extra is ever deployed. The
# harness exists because a raw screenshot of a route is not quite a portrait of
# it: it frames the page at exactly 1200x630, hides the chat launcher and its
# starter pills (session chrome, not content), settles ScrollReveal so no
# section is caught mid-fade, and warms the markdown fetch a case study makes
# after mount — that request kept losing the race with the capture and six of
# nine case studies came back reading "Case study coming soon".
set -euo pipefail

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BASE="http://localhost:5555"
OUT="public"
HARNESS="$OUT/_ogshot.html"
TMP="$(mktemp -d)"

# Case studies whose thumbnail is worth generating: everything the reader can
# actually navigate to. Mirrors EXCLUDED_PROJECT_IDS in ProjectDetails.tsx.
PROJECTS=(9 8 6 2 7 1 3 5 4)

# A capture that caught a page before its content arrived encodes to almost
# nothing, the frame being nearly flat colour. Anything under this is treated
# as a failed shot and retried rather than shipped.
MIN_BYTES=25000

cleanup() { rm -rf "$TMP" "$HARNESS"; }
trap cleanup EXIT

[ -x "$CHROME" ] || { echo "Chrome not found at $CHROME" >&2; exit 1; }
curl -sf -o /dev/null "$BASE/home" || { echo "Dev server not answering on $BASE" >&2; exit 1; }

cat > "$HARNESS" <<'HARNESS_HTML'
<!doctype html>
<meta charset="utf-8">
<title>og capture</title>
<style>
  html, body { margin: 0; padding: 0; overflow: hidden; background: #F5F5F2; }
  iframe { width: 1200px; height: 630px; border: 0; display: block; }
</style>
<iframe id="f"></iframe>
<script>
  const route = new URLSearchParams(location.search).get('r') || '/home';
  const f = document.getElementById('f');

  // Warm the markdown a case study fetches after mount, so the app's own
  // request is served from cache and resolves in the tick it is made.
  const project = route.match(/^\/project\/([^/?#]+)/);
  const warm = project
    ? fetch('/projects/Project' + project[1] + '.md').catch(function () {})
    : Promise.resolve();

  const settle = function () {
    const d = f.contentDocument;
    if (!d || !d.head) return;
    if (!d.getElementById('og-shot-style')) {
      const s = d.createElement('style');
      s.id = 'og-shot-style';
      s.textContent =
        '.ai-fab-group,.ai-fab-pills{display:none!important}' +
        '*{scroll-behavior:auto!important}';
      d.head.appendChild(s);
    }
    // Repeated rather than once on load: React mounts the route after the
    // iframe fires load, and lazy sections arrive later still.
    d.querySelectorAll('.scroll-reveal').forEach(function (e) {
      e.classList.add('is-visible');
    });
  };

  warm.then(function () { f.src = route; });
  setInterval(settle, 120);
  f.addEventListener('load', settle);
</script>
HARNESS_HTML

encode() {          # encode <png> <webp>
  python3 - "$1" "$2" <<'PY'
import sys
from PIL import Image
im = Image.open(sys.argv[1]).convert("RGB")
# The harness frames the route at exactly 1200x630, so a 2x capture is already
# the right shape; this only guards against Chrome handing back a stray row.
if im.size != (2400, 1260):
    im = im.crop((0, 0, min(2400, im.width), min(1260, im.height)))
im.save(sys.argv[2], "WEBP", quality=88, method=6)
PY
}

shoot() {           # shoot <route> <output-basename>
  local route="$1" name="$2" budget=12000 attempt=1 bytes=0
  while :; do
    "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
      --force-device-scale-factor=2 --window-size=1200,630 \
      --virtual-time-budget="$budget" \
      --screenshot="$TMP/$name.png" \
      "$BASE/_ogshot.html?r=$route" 2>/dev/null || true

    bytes=$(python3 -c "import os,sys;print(os.path.getsize(sys.argv[1]))" "$TMP/$name.png" 2>/dev/null || echo 0)
    if [ "$bytes" -ge "$MIN_BYTES" ] || [ "$attempt" -ge 3 ]; then break; fi
    attempt=$((attempt + 1))
    budget=$((budget + 12000))
    echo "  $route  retrying (attempt $attempt)"
  done

  if [ "$bytes" -lt "$MIN_BYTES" ]; then
    echo "  $route  FAILED - capture looks empty (${bytes}b), leaving $name.webp alone" >&2
    return
  fi
  encode "$TMP/$name.png" "$OUT/$name.webp"
  printf "  %-22s %s\n" "$route" "$name.webp"
}

echo "Capturing thumbnails from $BASE"
shoot "/home"           "site-thumbnail"
shoot "/figma-training" "figma-training-thumbnail"
shoot "/gallery"        "travel-thumbnail"
for id in "${PROJECTS[@]}"; do
  shoot "/project/$id" "project-$id-thumbnail"
done
echo "Done."
