/**
 * A one-shot confetti burst, drawn on a canvas that only exists while it runs.
 *
 * No library: the whole effect is a few dozen rectangles under gravity, and a
 * dependency for that would cost more to ship than the code does. The canvas is
 * created on demand and removed once the last piece has fallen, so nothing sits
 * over the page between bursts.
 */

const COUNT = 70;
const GRAVITY = 0.32;
/** Per-frame velocity retained — air, roughly. Keeps the spray from carrying. */
const DRAG = 0.985;
/** Frames the burst is allowed to run before the canvas is torn down. */
const MAX_FRAMES = 190;
/** Where in that life the pieces start fading, as a fraction of it. */
const FADE_FROM = 0.6;

const PALETTE_TOKENS = [
  "--accent-purple",
  "--accent-cyan",
  "--accent-green",
  "--accent-red",
  "--ai-accent-light",
  "--ai-accent-ring",
];

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  color: string;
  /** Radians. */
  spin: number;
  spinRate: number;
};

/** The palette comes from the theme, so a burst matches the site it lands on. */
const readPalette = (): string[] => {
  const root = getComputedStyle(document.documentElement);
  const colors = PALETTE_TOKENS.map((token) =>
    root.getPropertyValue(token).trim()
  ).filter(Boolean);
  return colors.length ? colors : ["#7000ff", "#00d2ff", "#30a46c"];
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);

export const burstConfetti = (originX: number, originY: number): void => {
  // Celebration is decoration. Anyone who has asked for less motion gets the
  // copy without it — the tooltip already confirms what happened.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.cssText = `position:fixed;inset:0;width:${width}px;height:${height}px;pointer-events:none;z-index:10001`;
  canvas.setAttribute("aria-hidden", "true");

  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(dpr, dpr);
  document.body.appendChild(canvas);

  const palette = readPalette();
  const pieces: Piece[] = Array.from({ length: COUNT }, () => {
    // Biased upward: pieces thrown into a cone above the origin read as a pop,
    // where an even circle just looks like an explosion.
    const angle = rand(-Math.PI * 0.92, -Math.PI * 0.08);
    const speed = rand(5, 13);
    return {
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      w: rand(5, 9),
      h: rand(7, 13),
      color: palette[Math.floor(Math.random() * palette.length)],
      spin: rand(0, Math.PI * 2),
      spinRate: rand(-0.22, 0.22),
    };
  });

  let frame = 0;

  const step = () => {
    frame += 1;
    ctx.clearRect(0, 0, width, height);

    const life = frame / MAX_FRAMES;
    const alpha =
      life < FADE_FROM ? 1 : 1 - (life - FADE_FROM) / (1 - FADE_FROM);

    for (const piece of pieces) {
      piece.vx *= DRAG;
      piece.vy = piece.vy * DRAG + GRAVITY;
      piece.x += piece.vx;
      piece.y += piece.vy;
      piece.spin += piece.spinRate;

      ctx.save();
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.translate(piece.x, piece.y);
      ctx.rotate(piece.spin);
      // Squashing the width by the spin fakes a flat ribbon turning edge-on,
      // which is what sells these as paper rather than as dots.
      ctx.fillStyle = piece.color;
      ctx.fillRect(
        -piece.w / 2,
        -piece.h / 2,
        piece.w * Math.abs(Math.cos(piece.spin)),
        piece.h
      );
      ctx.restore();
    }

    if (frame < MAX_FRAMES) {
      requestAnimationFrame(step);
    } else {
      canvas.remove();
    }
  };

  requestAnimationFrame(step);
};

export default burstConfetti;
