/**
 * Camera maths for the Figma-style canvas.
 *
 * Kept free of React and the DOM on purpose: every interaction (wheel, drag,
 * pinch, click-to-zoom, fly-to) reduces to one of these pure functions, so the
 * behaviour can be reasoned about and tested without a browser.
 *
 * Coordinate model
 * ----------------
 * The camera describes which canvas point sits at the viewport's top-left
 * corner, plus a scale. A canvas point `p` lands on screen at
 * `(p - camera) * zoom`, which the stage reproduces with
 * `transform: translate(-x*z, -y*z) scale(z)` and `transform-origin: 0 0`.
 */

export interface Camera {
  /** Canvas x at the viewport's left edge. */
  x: number;
  /** Canvas y at the viewport's top edge. */
  y: number;
  zoom: number;
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Viewport {
  w: number;
  h: number;
}

export interface Point {
  x: number;
  y: number;
}

// Below the minimum the frames stop being readable as anything; above the
// maximum a 1x design starts showing its pixels.
export const MIN_ZOOM = 0.08;
export const MAX_ZOOM = 2.5;

export const clampZoom = (
  zoom: number,
  min: number = MIN_ZOOM,
  max: number = MAX_ZOOM
): number => Math.min(max, Math.max(min, zoom));

/** Where a canvas point currently sits on screen. */
export const toScreen = (p: Point, c: Camera): Point => ({
  x: (p.x - c.x) * c.zoom,
  y: (p.y - c.y) * c.zoom,
});

/** Which canvas point currently sits under a screen position. */
export const toCanvas = (s: Point, c: Camera): Point => ({
  x: c.x + s.x / c.zoom,
  y: c.y + s.y / c.zoom,
});

/**
 * Pan by a screen-space delta. Divided by zoom so a given mouse movement
 * always covers the same distance on screen, whatever the zoom level.
 */
export const panBy = (c: Camera, dx: number, dy: number): Camera => ({
  ...c,
  x: c.x - dx / c.zoom,
  y: c.y - dy / c.zoom,
});

/**
 * Scale by `factor` while keeping whatever canvas point is under `anchor`
 * (a screen position, usually the cursor) pinned in place — the thing that
 * makes wheel-zoom feel attached to the pointer rather than to the corner.
 */
export const zoomAt = (
  c: Camera,
  factor: number,
  anchor: Point,
  min: number = MIN_ZOOM,
  max: number = MAX_ZOOM
): Camera => {
  const zoom = clampZoom(c.zoom * factor, min, max);
  // Nothing to re-anchor once a limit is reached.
  if (zoom === c.zoom) return c;

  const p = toCanvas(anchor, c);
  return {
    x: p.x - anchor.x / zoom,
    y: p.y - anchor.y / zoom,
    zoom,
  };
};

/** The canvas point at the centre of the viewport. */
export const cameraCenter = (c: Camera, viewport: Viewport): Point => ({
  x: c.x + viewport.w / (2 * c.zoom),
  y: c.y + viewport.h / (2 * c.zoom),
});

/** Inverse of `cameraCenter` — build a camera that centres on a point. */
export const cameraFromCenter = (
  center: Point,
  zoom: number,
  viewport: Viewport
): Camera => ({
  x: center.x - viewport.w / (2 * zoom),
  y: center.y - viewport.h / (2 * zoom),
  zoom,
});

/** Camera that fits `rect` inside the viewport with `padding` screen px spare. */
export const fitTo = (
  rect: Rect,
  viewport: Viewport,
  padding = 64,
  minZoom: number = MIN_ZOOM,
  maxZoom: number = MAX_ZOOM
): Camera => {
  // Guard against a padding larger than the viewport itself, which would
  // otherwise ask for a negative scale.
  const availableW = Math.max(1, viewport.w - padding * 2);
  const availableH = Math.max(1, viewport.h - padding * 2);
  const zoom = clampZoom(
    Math.min(availableW / rect.w, availableH / rect.h),
    minZoom,
    maxZoom
  );

  return cameraFromCenter(
    { x: rect.x + rect.w / 2, y: rect.y + rect.h / 2 },
    zoom,
    viewport
  );
};

/** Smallest rect containing all of `rects`. */
export const unionRect = (rects: Rect[]): Rect => {
  if (rects.length === 0) return { x: 0, y: 0, w: 1, h: 1 };

  const minX = Math.min(...rects.map((r) => r.x));
  const minY = Math.min(...rects.map((r) => r.y));
  const maxX = Math.max(...rects.map((r) => r.x + r.w));
  const maxY = Math.max(...rects.map((r) => r.y + r.h));

  return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
};

/** Does `rect` intersect the camera's visible region, grown by `margin` px? */
export const isVisible = (
  rect: Rect,
  c: Camera,
  viewport: Viewport,
  margin = 0
): boolean => {
  const view = {
    x: c.x - margin / c.zoom,
    y: c.y - margin / c.zoom,
    w: (viewport.w + margin * 2) / c.zoom,
    h: (viewport.h + margin * 2) / c.zoom,
  };

  return (
    rect.x < view.x + view.w &&
    rect.x + rect.w > view.x &&
    rect.y < view.y + view.h &&
    rect.y + rect.h > view.y
  );
};

/**
 * Keep the viewport over the content.
 *
 * Contain-style, per axis:
 *  - When the content is larger than the viewport on that axis, the viewport is
 *    kept inside the content, so panning can never reveal empty space beyond
 *    the edge.
 *  - When the content is smaller (zoomed out far enough to see all of it), the
 *    content is centred, so whatever space is left over is even rather than
 *    piled up on one side.
 *
 * This replaced an overlap-based rule that only required a quarter of the
 * viewport to intersect the content — which let three quarters of the screen be
 * empty at the extremes, and read as a lot of dead space while panning.
 *
 * `edgePadding` is screen px of overshoot allowed past the content edge; 0 hugs
 * the content exactly.
 */
export const clampCamera = (
  c: Camera,
  content: Rect,
  viewport: Viewport,
  edgePadding = 0
): Camera => {
  const axis = (
    cameraMin: number,
    contentMin: number,
    contentSize: number,
    viewSize: number,
    pad: number
  ): number => {
    if (viewSize >= contentSize) {
      return contentMin + contentSize / 2 - viewSize / 2;
    }
    return Math.min(
      Math.max(cameraMin, contentMin - pad),
      contentMin + contentSize - viewSize + pad
    );
  };

  const pad = edgePadding / c.zoom;

  return {
    zoom: c.zoom,
    x: axis(c.x, content.x, content.w, viewport.w / c.zoom, pad),
    y: axis(c.y, content.y, content.h, viewport.h / c.zoom, pad),
  };
};

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

/**
 * Interpolate between two cameras.
 *
 * The centre point moves linearly but zoom moves in log space, because zoom is
 * perceived multiplicatively: a linear ramp from 0.1 to 2 spends most of its
 * time visually parked at the wide end and then lurches. Interpolating the
 * *centre* rather than the top-left corner matters too — the corner drifts as
 * the scale changes, which reads as the canvas sliding sideways mid-flight.
 */
export const lerpCamera = (
  a: Camera,
  b: Camera,
  t: number,
  viewport: Viewport
): Camera => {
  const ca = cameraCenter(a, viewport);
  const cb = cameraCenter(b, viewport);
  const zoom = Math.exp(lerp(Math.log(a.zoom), Math.log(b.zoom), t));

  return cameraFromCenter(
    { x: lerp(ca.x, cb.x, t), y: lerp(ca.y, cb.y, t) },
    zoom,
    viewport
  );
};

export const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** The CSS transform for a camera. */
export const cameraTransform = (c: Camera): string =>
  `translate3d(${-c.x * c.zoom}px, ${-c.y * c.zoom}px, 0) scale(${c.zoom})`;
