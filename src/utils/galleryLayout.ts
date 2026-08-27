import { Rect } from "./canvasCamera";

/**
 * Scatters the gallery's photos into one compact cluster.
 *
 * Pure and DOM-free, like the camera maths, because the layout is the part most
 * likely to be tuned by eye and it's far easier to reason about — and assert on
 * — as a function from data to rectangles.
 *
 * Everything sits on a single plane: no depth, no parallax, no per-photo
 * motion. The photos move as one field, and exploring means zooming in and out
 * of a bounded area rather than travelling across a large one.
 */

export interface PhotoBox extends Rect {
  num: number;
  location: string;
}

export interface ScatterLayout {
  photos: PhotoBox[];
  /** Bounding box of the cluster, for fit-all and camera clamping. */
  bounds: Rect;
}

export interface ScatterOptions {
  areaWidth?: number;
  areaHeight?: number;
  minHeight?: number;
  maxHeight?: number;
  /** Clear space to leave between any two photos, in canvas units. */
  spacing?: number;
  /** Fixed seed, so the scatter is the same on every load. */
  seed?: number;
}

/**
 * Roughly a 3:2 area, so fitting the whole cluster to a landscape viewport
 * leaves little dead space. Sized to sit near 35% coverage: dense enough to
 * read as a cluster, sparse enough that rejection sampling can still place
 * every photo without overlaps.
 */
const DEFAULTS: Required<ScatterOptions> = {
  areaWidth: 6600,
  areaHeight: 4400,
  minHeight: 380,
  maxHeight: 620,
  spacing: 45,
  seed: 20260828,
};

/**
 * mulberry32 — small, fast, and crucially *seeded*. Math.random would reshuffle
 * the gallery on every render, which would fight React and make the layout
 * impossible to assert on.
 */
function makeRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const overlaps = (a: Rect, b: Rect, pad: number): boolean =>
  a.x < b.x + b.w + pad &&
  a.x + a.w + pad > b.x &&
  a.y < b.y + b.h + pad &&
  a.y + a.h + pad > b.y;

export function scatterGallery(
  images: number[],
  aspectRatios: Record<number, number>,
  locations: Record<number, string>,
  options: ScatterOptions = {}
): ScatterLayout {
  const { areaWidth, areaHeight, minHeight, maxHeight, spacing, seed } = {
    ...DEFAULTS,
    ...options,
  };

  const random = makeRandom(seed);
  const placed: PhotoBox[] = [];

  // Largest first. Rejection sampling struggles to find room for a big photo
  // once the small ones have peppered the area, so the hard placements go in
  // while there's still space for them.
  const ordered = [...images].sort(
    (a, b) => (aspectRatios[b] || 1.5) - (aspectRatios[a] || 1.5)
  );

  for (const num of ordered) {
    const aspect = aspectRatios[num] || 1.5;
    const h = minHeight + random() * (maxHeight - minHeight);
    const w = aspect * h;
    const base = { num, location: locations[num] || "", w, h };

    // Try for a clear spot, relaxing the required gap as attempts run out so a
    // photo is never dropped from the gallery entirely.
    let box: PhotoBox | null = null;
    for (let attempt = 0; attempt < 1200; attempt++) {
      const pad = spacing * (1 - attempt / 1200);
      const candidate: PhotoBox = {
        ...base,
        x: random() * Math.max(1, areaWidth - w),
        y: random() * Math.max(1, areaHeight - h),
      };

      if (!placed.some((p) => overlaps(candidate, p, pad))) {
        box = candidate;
        break;
      }
    }

    placed.push(
      box ?? {
        ...base,
        x: random() * Math.max(1, areaWidth - w),
        y: random() * Math.max(1, areaHeight - h),
      }
    );
  }

  // Restore the original order, so the DOM order matches the data rather than
  // the placement order.
  placed.sort((a, b) => images.indexOf(a.num) - images.indexOf(b.num));

  const minX = Math.min(...placed.map((p) => p.x));
  const maxX = Math.max(...placed.map((p) => p.x + p.w));
  const minY = Math.min(...placed.map((p) => p.y));
  const maxY = Math.max(...placed.map((p) => p.y + p.h));

  return {
    photos: placed,
    bounds: { x: minX, y: minY, w: maxX - minX, h: maxY - minY },
  };
}
