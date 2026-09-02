import React, { useEffect, useRef } from "react";
import "../styles/PixelGrass.scss";

/**
 * A band of pixel-art grass along the bottom of the footer, drifting in the
 * wind.
 *
 * Drawn on a deliberately tiny canvas — one canvas pixel per art pixel — and
 * scaled up by CSS with `image-rendering: pixelated`. That is what makes the
 * pixels real: rendering at full resolution and trying to look blocky needs
 * either a filter or a great many fillRect calls, and neither gives clean,
 * evenly sized pixels at every device ratio.
 *
 * The shape follows the reference: not individual blades but a solid mass whose
 * top edge is eroded into scattered blocks, with pale patches mottling the
 * inside. Three fields of value noise do all of it — one rolls the edge, one
 * decides which pixels above it survive, one mottles the fill — and the wind is
 * nothing more than those fields being sampled at a slowly drifting offset.
 */

/** Size of one art pixel, in css px. */
const PIXEL = 4;
/** Height of the strip, in art pixels — so the band is ROWS * PIXEL css px. */
const ROWS = 10;
/** Rows of unbroken mass at the bottom, before the edge starts to break up. */
const SOLID = 5;
/** How far above the edge the erosion reaches. */
const DITHER = 6;
/** How much the mass's top edge rolls across the strip, in art pixels. */
const EDGE_VARY = 1.3;

/**
 * Wind. Every term is a drift applied to a noise field's sample position, so
 * nothing here is an animation as such — the pattern simply slides through
 * itself. Deliberately slow: the brief was subtle, and at any real speed a
 * field of pixels this dense reads as static rather than as movement.
 */
const WIND = {
  edgeDrift: 0.000045,
  edgeScale: 0.085,
  edgeDetail: 0.31,
  ditherDrift: 0.000028,
  ditherScale: 0.34,
  mottleDrift: 0.000019,
  mottleScale: 0.115,
  /** A whole-strip rise and fall, so the edge breathes as well as rolls. */
  swayPeriod: 9000,
  swayAmp: 0.45,
};

/** Darkest to palest. The index into this is what `toneOf` returns. */
const PALETTE_TOKENS = [
  "--grass-shade",
  "--grass-deep",
  "--grass-mid",
  "--grass-warm",
  "--grass-light",
  "--grass-tip",
];

const readPalette = (el: HTMLElement): string[] => {
  const cs = getComputedStyle(el);
  const colors = PALETTE_TOKENS.map((t) => cs.getPropertyValue(t).trim()).filter(
    Boolean
  );
  return colors.length === PALETTE_TOKENS.length
    ? colors
    : ["#2f7a3a", "#4e9c2e", "#78c142", "#a3cf3e", "#9bd75f", "#cdebac"];
};

/**
 * 32-bit integer hash, 0–1.
 *
 * The finaliser shifts unsigned on purpose. With a signed `>>` the sign bit is
 * always cleared — `h ^ (h >> 16)` can never be negative — so this returned
 * 0–0.5 and every threshold above the midpoint below was silently dead.
 */
const hash = (x: number, y: number): number => {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
};

const smoothstep = (t: number) => t * t * (3 - 2 * t);

/** Value noise: the hash on a unit grid, smoothly interpolated between. */
const noise = (x: number, y: number): number => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  const u = smoothstep(xf);
  const v = smoothstep(yf);
  return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
};

/**
 * The field that decides a pixel's tone, 0–1.
 *
 * Two octaves and a stretch about the midpoint: one octave of value noise sits
 * bunched around 0.5, so patches at either end came out far too rare, and the
 * pale flecks that give the mass its texture never appeared at all.
 */
const mottle = (x: number, row: number, t: number): number => {
  const a = noise(x * WIND.mottleScale + t * WIND.mottleDrift, row * 0.3 + 3.7);
  const b = noise(
    x * WIND.mottleScale * 2.7 + t * WIND.mottleDrift * 1.6,
    row * 0.62 + 17.2
  );
  const v = a * 0.8 + b * 0.2;
  return Math.min(1, Math.max(0, (v - 0.5) * 1.45 + 0.5));
};

/** Where each band of the mottle field starts. Six tones, five boundaries. */
const BANDS = [0.22, 0.38, 0.56, 0.7, 0.84];

/**
 * Which of the six greens a pixel takes.
 *
 * The band comes from the mottle field, then a second, much finer field nudges
 * it one step either way. That nudge is the point: a single ramp off a single
 * field banded into stripes of flat colour, where scattering neighbouring
 * tones inside each patch is what actually reads as varied.
 *
 * `bias` lifts the eroded pixels above the edge a step lighter, so the airy
 * tail reads as catching the light.
 */
const toneOf = (
  m: number,
  x: number,
  row: number,
  t: number,
  bias: number
): number => {
  let i = 0;
  while (i < BANDS.length && m > BANDS[i]) i += 1;
  const h = noise(x * 0.62 + t * 0.000031, row * 1.31 + 53.7);
  if (h > 0.68) i += 1;
  else if (h < 0.32) i -= 1;
  return Math.min(PALETTE_TOKENS.length - 1, Math.max(0, i + bias));
};

const PixelGrass: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let palette = readPalette(canvas);
    let cols = 0;
    let frame = 0;
    let running = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const layout = () => {
      const widthCss =
        canvas.parentElement?.clientWidth || window.innerWidth || 0;
      // Guarded: the footer can be measured before it has been laid out, and a
      // zero-wide canvas throws on getImageData and never recovers on its own.
      // The ResizeObserver below calls this again the moment it has a width.
      cols = Math.max(1, Math.ceil(widthCss / PIXEL));
      canvas.width = cols;
      canvas.height = ROWS;
      // The CSS box is the art size multiplied up; the backing store stays
      // tiny, so this costs the same at any screen width.
      canvas.style.width = `${cols * PIXEL}px`;
      canvas.style.height = `${ROWS * PIXEL}px`;
      ctx.imageSmoothingEnabled = false;
      palette = readPalette(canvas);
    };

    /** One art pixel. Row 0 is the bottom of the strip. */
    const put = (x: number, row: number, tone: number) => {
      if (row < 0 || row >= ROWS) return;
      ctx.fillStyle = palette[tone];
      ctx.fillRect(x, ROWS - 1 - row, 1, 1);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, cols, ROWS);
      const sway = Math.sin((t / WIND.swayPeriod) * Math.PI * 2) * WIND.swayAmp;

      for (let x = 0; x < cols; x += 1) {
        // Two scales of roll: a broad one for the shape of the edge and a
        // finer one on top, so it does not read as a single smooth wave.
        const roll =
          (noise(x * WIND.edgeScale + t * WIND.edgeDrift, 0.5) - 0.5) *
            2 *
            EDGE_VARY +
          (noise(
            x * WIND.edgeScale * 3.1 + t * WIND.edgeDrift * 2.2,
            7.5
          ) -
            0.5) *
            EDGE_VARY *
            WIND.edgeDetail;
        const top = SOLID + roll + sway;

        for (let row = 0; row < ROWS; row += 1) {
          const m = mottle(x, row, t);

          if (row < top) {
            put(x, row, toneOf(m, x, row, t, 0));
            continue;
          }

          // Above the edge: erosion, thinning with height, and then a sparse
          // scatter well beyond it. The reference's edge has a long airy tail
          // of isolated blocks rather than a tight fringe, and the second pass
          // is what supplies it.
          const above = row - top;
          const fall = 1 - above / DITHER;
          if (fall > 0) {
            const d = noise(
              x * WIND.ditherScale + t * WIND.ditherDrift,
              row * 0.55 + 11.3
            );
            if (d < Math.pow(fall, 1.4) * 0.92) {
              put(x, row, toneOf(m, x, row, t, 1));
              continue;
            }
          }
          if (above < DITHER * 1.7) {
            const sp = noise(
              x * WIND.ditherScale * 1.9 + t * WIND.ditherDrift * 1.5,
              row * 0.9 + 29.1
            );
            if (sp > 0.9) put(x, row, toneOf(m, x, row, t, 1));
          }
        }
      }
    };

    const loop = (t: number) => {
      if (!running) return;
      draw(t);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced.matches) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    layout();
    // One frame regardless, so the grass is there — still — before it is ever
    // on screen, and under prefers-reduced-motion it simply stays that way.
    draw(0);

    // The footer is at the bottom of every page, so without this the wind
    // would be running the entire time anyone is reading anything above it.
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "120px" }
    );
    observer.observe(canvas);

    const relayout = () => {
      layout();
      draw(performance.now());
    };

    // On the parent, not on window: the footer's width changes for reasons a
    // resize event never fires for — the page finishing layout, a lazy section
    // landing above it, a scrollbar appearing. A window listener alone left
    // the canvas at whatever width it happened to have at mount.
    const sizeObserver = new ResizeObserver(relayout);
    if (canvas.parentElement) sizeObserver.observe(canvas.parentElement);
    window.addEventListener("resize", relayout);

    return () => {
      stop();
      observer.disconnect();
      sizeObserver.disconnect();
      window.removeEventListener("resize", relayout);
    };
  }, []);

  return (
    <div className="pixel-grass" aria-hidden="true">
      <canvas ref={canvasRef} className="pixel-grass__canvas" />
    </div>
  );
};

export default PixelGrass;
