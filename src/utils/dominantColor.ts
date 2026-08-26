const FALLBACK_COLOR = "transparent";
const VIDEO_EXTENSIONS = /\.(mp4|webm|mov|m4v)$/i;

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
      case g: h = ((b - r) / d + 2) * 60; break;
      default: h = ((r - g) / d + 4) * 60;
    }
  }

  return { h, s, l };
};

const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let [r, g, b] = [0, 0, 0];

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
};

// Keeps the source's hue but forces a minimum saturation and a fixed,
// light pastel lightness — a plain "mix toward white" leaves near-gray
// source averages (common in screenshot-heavy thumbnails whose UI is
// mostly white) still looking like near-white, with no visible hue at all.
const toPastel = (r: number, g: number, b: number): string => {
  const { h, s } = rgbToHsl(r, g, b);
  const pastelSaturation = Math.max(0.35, Math.min(0.55, s));
  const [pr, pg, pb] = hslToRgb(h, pastelSaturation, 0.88);
  return `rgb(${pr}, ${pg}, ${pb})`;
};

const averageColorFromCanvas = (
  draw: (ctx: CanvasRenderingContext2D, size: number) => void
): string => {
  try {
    const size = 32;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return FALLBACK_COLOR;

    draw(ctx, size);
    const { data } = ctx.getImageData(0, 0, size, size);

    let r = 0;
    let g = 0;
    let b = 0;
    let count = 0;

    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 200) continue; // skip near-transparent pixels
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      count++;
    }

    if (!count) return FALLBACK_COLOR;
    return toPastel(r / count, g / count, b / count);
  } catch {
    // Canvas reads throw on a tainted (cross-origin, non-CORS) source.
    return FALLBACK_COLOR;
  }
};

const getDominantPastelColorFromImage = (src: string): Promise<string> =>
  new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(averageColorFromCanvas((ctx, size) => ctx.drawImage(img, 0, 0, size, size)));
    img.onerror = () => resolve(FALLBACK_COLOR);
    img.src = src;
  });

// Some project thumbnails are short video clips rather than stills — grab a
// frame a moment in (the very first frame is often a blank/loading state)
// and sample that the same way as a still image.
const getDominantPastelColorFromVideo = (src: string): Promise<string> =>
  new Promise((resolve) => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.preload = "auto";

    const settle = (color: string) => {
      video.remove();
      resolve(color);
    };

    video.onloadeddata = () => {
      video.currentTime = Math.min(0.3, (video.duration || 1) / 4);
    };
    video.onseeked = () => {
      settle(averageColorFromCanvas((ctx, size) => ctx.drawImage(video, 0, 0, size, size)));
    };
    video.onerror = () => settle(FALLBACK_COLOR);

    video.src = src;
  });

/**
 * Estimates a thumbnail's dominant color (via a downsampled average, which
 * is cheap and good enough for a background tint) and returns a pastel
 * version of it. Resolves to a transparent fallback on load/CORS failure
 * rather than rejecting, so callers never need a catch branch.
 */
export const getDominantPastelColor = (src: string): Promise<string> =>
  VIDEO_EXTENSIONS.test(src) ? getDominantPastelColorFromVideo(src) : getDominantPastelColorFromImage(src);
