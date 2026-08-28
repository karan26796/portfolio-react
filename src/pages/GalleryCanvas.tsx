import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { MapPin } from "@phosphor-icons/react";
import "../styles/GalleryCanvas.scss";
import { LOCATIONS, ASPECT_RATIOS, REGIONS } from "./Gallery";
import { scatterGallery } from "../utils/galleryLayout";
import {
  Camera,
  Rect,
  Viewport,
  panBy,
  zoomAt,
  fitTo,
  clampCamera,
  clampZoom,
  isVisible,
  lerpCamera,
  easeInOutCubic,
  cameraTransform,
} from "../utils/canvasCamera";

/**
 * The photo gallery as one zoomable cluster of photos.
 *
 * Lives alongside the existing /gallery rather than replacing it, so the two
 * can be compared before either wins.
 *
 * Every photo sits on a single plane and the whole field moves together, so
 * exploring means zooming in and out of a bounded area rather than travelling
 * across a large one. The one piece of physics kept is the camera's own
 * momentum: a flung drag coasts to a halt instead of stopping dead.
 */

// The floor is not a constant: it's whatever zoom fits the whole cluster in the
// current viewport, computed per render below. That makes the opening view also
// the furthest you can pull back — there is never empty space around the
// cluster to get lost in. The ceiling stops at 3.5 because the source files
// (~1800-2000px wide) start upscaling much past 2.5.
// 3.5 let you push far past any photo's own fit (which lands around 1.4-1.6),
// so the top of the range was mostly upscaled pixels. 2.0 still allows going a
// little closer than a fitted photo for detail, without the cliff.
const GALLERY_MAX_ZOOM = 2.0;
// Used only before the viewport has been measured.
const FALLBACK_MIN_ZOOM = 0.05;
// Breathing room around the cluster in the fit-all view.
const FIT_ALL_PADDING = 50;

// How much zoom each wheel notch or pinch delivers, as an exponent — so every
// notch is a constant *ratio* rather than a constant step. At 0.0038 a single
// 100-unit notch multiplied the zoom by ~1.46, which overshot whatever you
// were aiming at; 0.0016 makes it ~1.17 and gives the gesture some travel.
const ZOOM_RATE = 0.0016;

const FIT_PADDING = 70;
// Small, so a clicked photo nearly fills the screen and the zoom-in lands hard.
const PHOTO_FIT_PADDING = 48;
const FLIGHT_MS = 650;
const CULL_MARGIN_PX = 600;

// Camera momentum after a fling.
const MOMENTUM_CUTOFF = 0.35;
const FRICTION = 0.945;
// A pointer that ends within this distance of where it started counts as a
// click, not a drag.
//
// Two things were wrong with the previous 4px: it compared *accumulated path
// length* (the sum of every pointermove), which badly over-counts hand jitter
// on a trackpad, and 4px is inside the jitter of an ordinary click anyway. The
// result was clicks being silently swallowed as drags — the photo simply
// wouldn't open. Net displacement at 10px is what a click actually looks like.
const CLICK_SLOP_PX = 10;

const ALL_IMAGES = REGIONS.flatMap((r) => r.images);

// Below this width the cluster is rebuilt as a tall column instead of a wide
// field: a phone viewport is portrait, so spreading horizontally puts most of
// the gallery off to the sides where it reads as a wall to scrub past rather
// than something to explore.
const MOBILE_BREAKPOINT = 750;

// The desktop field, flipped to portrait: same photo sizes, but taller than it
// is wide. At the opening zoom this leaves images off to the left and right as
// well as above and below — about 1.3 screens of horizontal travel and 1.0 of
// vertical — rather than the single column it used to be.
//
// 7500 tall was measured against the alternatives: it holds 44% coverage with
// zero overlaps, where 6000 reaches 60% but starts overlapping and 9000 drops
// to 38% and reads as empty.
const MOBILE_SCATTER = {
  areaWidth: 3900,
  areaHeight: 7600,
  minHeight: 380,
  maxHeight: 620,
  // Tighter than the previous 60/4400x7500, which sat at 44% coverage and read
  // as a lot of empty space while panning. This is 50% — a shade fuller than
  // the desktop field — while still leaving 1.18 x 1.03 screens of travel, so
  // the opening view can pan in both directions. Going denser still (52% at
  // 4000x7000) cost the vertical travel entirely.
  spacing: 34,
};

// How many photos should span the screen at the opening zoom. The zoom is
// derived from this and the layout's own median photo width, so the column
// count holds whatever the photo sizes are later tuned to.
const MOBILE_TARGET_COLUMNS = 4.5;

const GalleryCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [viewport, setViewport] = useState<Viewport>({ w: 1, h: 1 });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, zoom: 0.4 });
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  // "Click" reads wrong on a phone. Resolved once on mount rather than per
  // render — the pointer type doesn't change mid-visit.
  const [tapWord] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(hover: none)").matches
      ? "Tap"
      : "Click"
  );

  const isMobile = viewport.w > 1 && viewport.w < MOBILE_BREAKPOINT;

  const layout = useMemo(
    () =>
      scatterGallery(
        ALL_IMAGES,
        ASPECT_RATIOS,
        LOCATIONS,
        isMobile ? MOBILE_SCATTER : undefined
      ),
    [isMobile]
  );

  // Listeners attach once with `{ passive: false }`, so they read state through
  // refs rather than closing over stale values.
  /**
   * The zoom that fits the whole cluster. Doubles as the minimum, so zooming
   * out stops exactly at the view the page opens on. Wide bounds are passed to
   * fitTo so its own clamp can't interfere with computing the limit.
   */
  const minZoom = useMemo(() => {
    if (viewport.w <= 1) return FALLBACK_MIN_ZOOM;
    return fitTo(layout.bounds, viewport, FIT_ALL_PADDING, 0.0001, 1000).zoom;
  }, [viewport, layout.bounds]);

  const cameraRef = useRef(camera);
  cameraRef.current = camera;
  const viewportRef = useRef(viewport);
  viewportRef.current = viewport;
  const minZoomRef = useRef(minZoom);
  minZoomRef.current = minZoom;

  const flightRef = useRef<number | null>(null);
  const glideRef = useRef<number | null>(null);

  const stopMotion = useCallback(() => {
    if (flightRef.current !== null) cancelAnimationFrame(flightRef.current);
    if (glideRef.current !== null) cancelAnimationFrame(glideRef.current);
    flightRef.current = null;
    glideRef.current = null;
  }, []);

  /**
   * Every camera write goes through here, so the clamp can't be bypassed.
   *
   * Takes an updater rather than a value on purpose. Trackpads fire many wheel
   * events per frame, and reading `cameraRef.current` in each one meant they
   * all built on the same pre-commit camera — 24 rapid notches produced a
   * single notch of zoom. Composing through setState makes every event land.
   */
  const applyCamera = useCallback(
    (update: (current: Camera) => Camera) =>
      setCamera((current) =>
        clampCamera(update(current), layout.bounds, viewportRef.current)
      ),
    [layout.bounds]
  );

  const flyTo = useCallback(
    (target: Camera) => {
      stopMotion();
      const from = cameraRef.current;
      const vp = viewportRef.current;
      const start = performance.now();

      const step = (now: number) => {
        const t = Math.min(1, (now - start) / FLIGHT_MS);
        applyCamera(() => lerpCamera(from, target, easeInOutCubic(t), vp));
        if (t < 1) flightRef.current = requestAnimationFrame(step);
        else flightRef.current = null;
      };

      flightRef.current = requestAnimationFrame(step);
    },
    [stopMotion, applyCamera]
  );

  const flyToRect = useCallback(
    (rect: Rect, padding = FIT_PADDING) =>
      // The page's zoom band is passed in rather than re-clamped afterwards:
      // clamping after the fact can only lower a zoom the global cap already
      // capped, never restore it.
      flyTo(fitTo(rect, viewportRef.current, padding, minZoomRef.current, GALLERY_MAX_ZOOM)),
    [flyTo]
  );

  const fitAll = useCallback(() => {
    setActivePhoto(null);
    flyToRect(layout.bounds, FIT_ALL_PADDING);
  }, [flyToRect, layout.bounds]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      setViewport({ w: width, h: height });
    };

    measure();
    // The element stops short of the dock via --dock-clearance, so when the
    // dock publishes or changes that value this fires and re-measures.
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Opening view, re-applied whenever the layout flips between the wide field
  // and the tall column — the two want different starting cameras.
  const openedForRef = useRef<boolean | null>(null);
  useEffect(() => {
    if (viewport.w <= 1 || openedForRef.current === isMobile) return;
    openedForRef.current = isMobile;

    const b = layout.bounds;

    if (isMobile) {
      // Median rather than mean or widest: it's the width that actually
      // characterises a column, and one outlier landscape shot shouldn't
      // decide the zoom for all forty.
      const widths = layout.photos.map((p) => p.w).sort((a, b) => a - b);
      const median = widths[Math.floor(widths.length / 2)] || 1;
      const zoom = clampZoom(
        viewport.w / (MOBILE_TARGET_COLUMNS * median),
        minZoom,
        GALLERY_MAX_ZOOM
      );

      // Centred both ways, so there are photos in every direction to pan to.
      setCamera(
        clampCamera(
          {
            x: b.x + b.w / 2 - viewport.w / (2 * zoom),
            y: b.y + b.h / 2 - viewport.h / (2 * zoom),
            zoom,
          },
          b,
          viewport
        )
      );
    } else {
      // The wide field is roughly the viewport's aspect, so the whole cluster
      // is a legible starting view rather than a wall of thumbnails.
      setCamera(fitTo(b, viewport, FIT_ALL_PADDING, minZoom, GALLERY_MAX_ZOOM));
    }
  }, [viewport, isMobile, layout.bounds, minZoom]);

  // The page itself must not scroll while the canvas owns the viewport.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => stopMotion, [stopMotion]);

  // Wheel pans; ctrl/meta (or a trackpad pinch, which browsers report as
  // ctrl+wheel) zooms about the cursor.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      stopMotion();

      if (e.ctrlKey || e.metaKey) {
        const rect = el.getBoundingClientRect();
        const anchor = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        applyCamera((c) =>
          zoomAt(
            c,
            Math.exp(-e.deltaY * ZOOM_RATE),
            anchor,
            minZoomRef.current,
            GALLERY_MAX_ZOOM
          )
        );
      } else {
        applyCamera((c) => panBy(c, -e.deltaX, -e.deltaY));
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [stopMotion, applyCamera]);

  /**
   * Every pointer currently down, so a second finger can be detected.
   *
   * Touchscreens have no wheel events, so the ctrl+wheel path that a trackpad
   * pinch arrives on never fires there — and `touch-action: none` stops the
   * browser zooming too. Without this, pinch did nothing at all on a phone.
   */
  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchRef = useRef<{ dist: number; mid: { x: number; y: number } } | null>(null);

  /** Pointer position relative to the canvas, which is what zoomAt expects. */
  const toLocal = useCallback((clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    return { x: clientX - (rect?.left ?? 0), y: clientY - (rect?.top ?? 0) };
  }, []);

  /** Distance and midpoint of the two active pointers, in canvas-local px. */
  const pinchGeometry = useCallback(() => {
    const two = [...pointersRef.current.values()].slice(0, 2);
    if (two.length < 2) return null;
    const mid = toLocal((two[0].x + two[1].x) / 2, (two[0].y + two[1].y) / 2);
    return { dist: Math.hypot(two[0].x - two[1].x, two[0].y - two[1].y), mid };
  }, [toLocal]);

  /**
   * iOS Safari pinch.
   *
   * Safari does not deliver usable multi-touch pointer events for a pinch: it
   * fires its own non-standard gesture events instead, and because the page's
   * viewport meta permits user scaling it would zoom the whole page rather than
   * the canvas. Handling them here keeps the pinch local, without setting
   * `user-scalable=no` globally — which would stop people zooming text
   * anywhere on the site.
   *
   * `scale` is cumulative from the gesture's start, so it is applied against
   * the zoom recorded at gesturestart rather than compounded per event.
   */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let startZoom = cameraRef.current.zoom;
    let anchorPoint = { x: 0, y: 0 };

    const onGestureStart = (e: Event) => {
      e.preventDefault();
      stopMotion();
      const g = e as Event & { clientX?: number; clientY?: number };
      startZoom = cameraRef.current.zoom;
      anchorPoint = toLocal(g.clientX ?? 0, g.clientY ?? 0);
    };

    const onGestureChange = (e: Event) => {
      e.preventDefault();
      const scale = (e as Event & { scale?: number }).scale ?? 1;
      applyCamera((c) =>
        zoomAt(
          c,
          (startZoom * scale) / c.zoom,
          anchorPoint,
          minZoomRef.current,
          GALLERY_MAX_ZOOM
        )
      );
    };

    const onGestureEnd = (e: Event) => e.preventDefault();

    el.addEventListener("gesturestart", onGestureStart, { passive: false });
    el.addEventListener("gesturechange", onGestureChange, { passive: false });
    el.addEventListener("gestureend", onGestureEnd, { passive: false });

    return () => {
      el.removeEventListener("gesturestart", onGestureStart);
      el.removeEventListener("gesturechange", onGestureChange);
      el.removeEventListener("gestureend", onGestureEnd);
    };
  }, [stopMotion, applyCamera, toLocal]);

  const dragRef = useRef<{
    id: number;
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
    vx: number;
    vy: number;
    /**
     * Which photo the gesture began on, resolved at pointerdown.
     *
     * It cannot be read from the pointerup event: `setPointerCapture` below
     * retargets every subsequent pointer event for this pointer to the
     * viewport, so pointerup's `target` is the viewport and not the photo.
     * Reading it there sent every click to fit-all instead of zooming in.
     */
    photoNum: number | null;
  } | null>(null);

  const startGlide = useCallback(
    (vx: number, vy: number) => {
      let velX = vx;
      let velY = vy;

      const step = () => {
        velX *= FRICTION;
        velY *= FRICTION;

        if (Math.hypot(velX, velY) < MOMENTUM_CUTOFF) {
          glideRef.current = null;
          return;
        }

        applyCamera((c) => panBy(c, velX, velY));
        glideRef.current = requestAnimationFrame(step);
      };

      glideRef.current = requestAnimationFrame(step);
    },
    [applyCamera]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    stopMotion();

    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    // A second finger turns the gesture into a pinch: abandon the pan so the
    // two don't fight, and take no click from it.
    if (pointersRef.current.size >= 2) {
      dragRef.current = null;
      setIsPanning(false);
      pinchRef.current = pinchGeometry();
      return;
    }
    // Resolved here, while `e.target` is still the element actually under the
    // pointer — pointer capture is claimed just below and rewrites the target
    // of everything that follows.
    const photoEl = (e.target as HTMLElement | null)?.closest?.("[data-photo]");

    dragRef.current = {
      id: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      lastY: e.clientY,
      vx: 0,
      vy: 0,
      photoNum: photoEl ? Number(photoEl.getAttribute("data-photo")) : null,
    };
    setIsPanning(true);

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* the pan still runs off pointermove */
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (pointersRef.current.has(e.pointerId)) {
      pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    }

    // Pinch: scale by how much the fingers' separation changed, anchored on
    // their midpoint, then follow the midpoint itself so the gesture can pan
    // and zoom at once the way a map does.
    if (pointersRef.current.size >= 2) {
      const now = pinchGeometry();
      const previous = pinchRef.current;
      if (!now || now.dist <= 0) return;

      if (previous && previous.dist > 0) {
        const factor = now.dist / previous.dist;
        const dx = now.mid.x - previous.mid.x;
        const dy = now.mid.y - previous.mid.y;

        applyCamera((c) =>
          panBy(
            zoomAt(c, factor, now.mid, minZoomRef.current, GALLERY_MAX_ZOOM),
            dx,
            dy
          )
        );
      }

      pinchRef.current = now;
      return;
    }

    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) return;

    const dx = e.clientX - drag.lastX;
    const dy = e.clientY - drag.lastY;
    drag.lastX = e.clientX;
    drag.lastY = e.clientY;

    // Exponential moving average — recent movement dominates, but one stalled
    // frame right before release can't zero the fling.
    drag.vx = drag.vx * 0.7 + dx * 0.3;
    drag.vy = drag.vy * 0.7 + dy * 0.3;

    applyCamera((c) => panBy(c, dx, dy));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const wasPinching = pointersRef.current.size >= 2;
    pointersRef.current.delete(e.pointerId);

    if (wasPinching) {
      // Lifting one finger of a pinch: reseed from whichever remains so the
      // gesture continues smoothly instead of jumping, and never treat the
      // release as a click.
      pinchRef.current = pointersRef.current.size >= 2 ? pinchGeometry() : null;

      const [remaining] = [...pointersRef.current.entries()];
      dragRef.current = remaining
        ? {
            id: remaining[0],
            startX: remaining[1].x,
            startY: remaining[1].y,
            lastX: remaining[1].x,
            lastY: remaining[1].y,
            vx: 0,
            vy: 0,
            photoNum: null,
          }
        : null;

      setIsPanning(false);
      return;
    }

    const drag = dragRef.current;
    dragRef.current = null;
    setIsPanning(false);
    if (!drag || drag.id !== e.pointerId) return;

    const moved = Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY);

    if (moved > CLICK_SLOP_PX) {
      if (Math.hypot(drag.vx, drag.vy) >= MOMENTUM_CUTOFF) startGlide(drag.vx, drag.vy);
      return;
    }

    const photo =
      drag.photoNum === null
        ? undefined
        : layout.photos.find((p) => p.num === drag.photoNum);

    if (!photo) {
      fitAll();
      return;
    }

    // Clicking the photo you're already on pulls back to the whole cluster, so
    // a photo is never a dead end.
    if (activePhoto === photo.num) {
      setActivePhoto(null);
      fitAll();
    } else {
      setActivePhoto(photo.num);
      flyToRect(photo, PHOTO_FIT_PADDING);
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "0") fitAll();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [fitAll]);

  const visiblePhotos = layout.photos.filter((p) =>
    isVisible(p, camera, viewport, CULL_MARGIN_PX)
  );

  return (
    <div className="gallery-canvas-page">
      <div
        ref={containerRef}
        className={`gallery-canvas-page__viewport${isPanning ? " is-panning" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        data-camera={`${camera.x.toFixed(1)},${camera.y.toFixed(1)},${camera.zoom.toFixed(3)}`}
        data-mounted={visiblePhotos.length}
        data-active={activePhoto ?? ""}
      >
        {/* One transform for the whole field — every photo shares it. */}
        <div
          className="gallery-canvas-page__stage"
          style={{ transform: cameraTransform(camera) }}
        >
          {visiblePhotos.map((photo) => (
            <div
              key={photo.num}
              data-photo={photo.num}
              className={`gallery-canvas-photo${activePhoto === photo.num ? " is-active" : ""}`}
              style={{ left: photo.x, top: photo.y, width: photo.w, height: photo.h }}
              onPointerEnter={() => setHoveredPhoto(photo.num)}
              onPointerLeave={() => setHoveredPhoto((n) => (n === photo.num ? null : n))}
            >
              <img
                src={`/gallery/${photo.num}.webp`}
                alt={photo.location}
                loading="lazy"
                decoding="async"
                draggable={false}
              />

              {hoveredPhoto === photo.num && (
                <span
                  className="gallery-canvas-photo__caption"
                  // Counter-scaled so the caption holds one size on screen.
                  style={{ transform: `scale(${1 / camera.zoom})` }}
                >
                  <MapPin size={14} /> {photo.location}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="gallery-canvas-hint">
        {tapWord} a photo to zoom in, {tapWord.toLowerCase()} again to zoom out
      </p>
    </div>
  );
};

export default GalleryCanvas;
