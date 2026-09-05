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

/** A layout that repeats, so panning never reaches an edge. */
export interface TiledLayout {
  photos: PhotoBox[];
  /**
   * The repeating unit. Every photo sits inside [0,w) × [0,h); the canvas
   * draws the same set again at every multiple of this in both directions.
   */
  tile: Rect;
}

export interface MasonryOptions {
  /** Every photo is this wide; height follows from its aspect ratio. */
  columnWidth?: number;
  columns?: number;
  /** Minimum clear space between photos, in canvas units. */
  gap?: number;
}

/**
 * Seven columns, not five.
 *
 * The field's proportions decide how much of it a fitted view can use. Forty
 * photographs in five columns make a tall narrow field, which fits a landscape
 * screen by its height and wastes most of the width; seven brings the shape
 * close to a screen's own, so pulling right back fills it. Photo sizes here
 * are canvas units, not pixels — how large a photograph looks is the opening
 * zoom's business, in GalleryCanvas.
 */
const MASONRY_DEFAULTS: Required<MasonryOptions> = {
  columnWidth: 520,
  columns: 7,
  gap: 64,
};

/**
 * Photos on a masonry lattice.
 *
 * Columns share one width and sit on a regular pitch; heights come from each
 * photo's own aspect ratio, so the rows fall out of the pictures rather than
 * being ruled in advance. That is what separates this from a grid.
 *
 * Every column is made *exactly* the same height, which is what gives the
 * field a straight bottom edge instead of a ragged one — worth having now that
 * the canvas has edges you can pan to. Columns are filled shortest-first so
 * their natural heights land close together, then each column's gaps are
 * stretched by the few pixels needed to meet the common height. Distributing
 * the difference across every gap in a column keeps it invisible; putting it
 * all in one gap would read as a hole.
 */
export function masonryGallery(
  images: number[],
  aspectRatios: Record<number, number>,
  locations: Record<number, string>,
  options: MasonryOptions = {}
): TiledLayout {
  const { columnWidth, columns, gap } = { ...MASONRY_DEFAULTS, ...options };

  const pitch = columnWidth + gap;
  const buckets: { num: number; h: number }[][] = Array.from(
    { length: columns },
    () => []
  );
  const heights = new Array(columns).fill(0);

  // Shortest column first, so no column ends up carrying every tall photo and
  // needing its gaps stretched much further than its neighbours.
  for (const num of images) {
    const aspect = aspectRatios[num] || 1.5;
    const h = columnWidth / aspect;
    let shortest = 0;
    for (let i = 1; i < columns; i++) {
      if (heights[i] < heights[shortest]) shortest = i;
    }
    buckets[shortest].push({ num, h });
    heights[shortest] += h + gap;
  }

  // The tile is as tall as the tallest column needs, so no column has to be
  // squeezed — only stretched.
  const tileHeight = Math.ceil(Math.max(...heights));

  const photos: PhotoBox[] = [];

  buckets.forEach((bucket, column) => {
    if (bucket.length === 0) return;

    const content = bucket.reduce((sum, item) => sum + item.h, 0);
    // Shared out over the gaps *including* the one that wraps past the bottom
    // edge onto the next copy, which is why it is divided by the count rather
    // than by the count minus one.
    const columnGap = (tileHeight - content) / bucket.length;

    let y = 0;
    bucket.forEach((item) => {
      photos.push({
        num: item.num,
        location: locations[item.num] || "",
        x: column * pitch,
        y,
        w: columnWidth,
        h: item.h,
      });
      y += item.h + columnGap;
    });
  });

  return {
    photos,
    tile: { x: 0, y: 0, w: columns * pitch, h: tileHeight },
  };
}
