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

// Zooming is the primary gesture, so the band is deliberately huge — roughly
// 70x end to end. The low end pulls back until the whole cluster is a small
// constellation; the high end fills the screen with one photo's detail. Above
// about 2.5 the source files (~1800-2000px wide) start upscaling, which is
// why the ceiling stops where it does.
const GALLERY_MIN_ZOOM = 0.05;
const GALLERY_MAX_ZOOM = 3.5;

// How much of a zoom each wheel notch or pinch delivers. The previous 0.0015
// took dozens of notches to cross the band, which read as the zoom being
// limited rather than merely slow.
const ZOOM_RATE = 0.0038;

const FIT_PADDING = 70;
// Small, so a clicked photo nearly fills the screen and the zoom-in lands hard.
const PHOTO_FIT_PADDING = 36;
const FLIGHT_MS = 650;
const CULL_MARGIN_PX = 600;

// Camera momentum after a fling.
const MOMENTUM_CUTOFF = 0.35;
const FRICTION = 0.945;
const CLICK_SLOP_PX = 4;

const ALL_IMAGES = REGIONS.flatMap((r) => r.images);

// Below this width the cluster is rebuilt as a tall column instead of a wide
// field: a phone viewport is portrait, so spreading horizontally puts most of
// the gallery off to the sides where it reads as a wall to scrub past rather
// than something to explore.
const MOBILE_BREAKPOINT = 750;
// Width is kept close to a single screen's worth at the opening zoom, so there
// is only a little horizontal slack and the gesture is genuinely vertical. An
// earlier 2500 was about three screens wide, which left photos cut off at both
// edges. Photos are correspondingly smaller so the widest still fits.
const MOBILE_SCATTER = {
  areaWidth: 900,
  // 9500 is the tightest this column packs before rejection sampling starts
  // failing: measured across the range, 9500 gives 48% coverage with zero
  // overlaps, while 8500 gives 57% but eight overlapping pairs.
  areaHeight: 9500,
  minHeight: 200,
  maxHeight: 340,
  spacing: 36,
};
// Fitting the whole column on a phone would leave photos ~50px wide, so mobile
// opens at the top of the column and explores downward. This is a ceiling, not
// the zoom itself: the actual value is derived below so the widest photo in the
// layout always fits the screen, whatever the layout is later tuned to.
const MOBILE_MAX_OPEN_ZOOM = 0.5;
const MOBILE_EDGE_GUTTER = 24;

const GalleryCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [viewport, setViewport] = useState<Viewport>({ w: 1, h: 1 });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, zoom: 0.4 });
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);
  const [isPanning, setIsPanning] = useState(false);

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
  const cameraRef = useRef(camera);
  cameraRef.current = camera;
  const viewportRef = useRef(viewport);
  viewportRef.current = viewport;

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
      flyTo(
        fitTo(rect, viewportRef.current, padding, GALLERY_MIN_ZOOM, GALLERY_MAX_ZOOM)
      ),
    [flyTo]
  );

  const fitAll = useCallback(() => {
    setActivePhoto(null);
    flyToRect(layout.bounds, 50);
  }, [flyToRect, layout.bounds]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      setViewport({ w: width, h: height });
    };

    measure();
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
      const widest = Math.max(...layout.photos.map((p) => p.w));
      const zoom = Math.min(
        MOBILE_MAX_OPEN_ZOOM,
        (viewport.w - MOBILE_EDGE_GUTTER * 2) / widest
      );

      setCamera(
        clampCamera(
          {
            x: b.x + b.w / 2 - viewport.w / (2 * zoom),
            y: b.y - 40,
            zoom,
          },
          b,
          viewport
        )
      );
    } else {
      // The wide field is roughly the viewport's aspect, so the whole cluster
      // is a legible starting view rather than a wall of thumbnails.
      setCamera(fitTo(b, viewport, 50, GALLERY_MIN_ZOOM, GALLERY_MAX_ZOOM));
    }
  }, [viewport, isMobile, layout.bounds]);

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
            GALLERY_MIN_ZOOM,
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

  const dragRef = useRef<{
    id: number;
    lastX: number;
    lastY: number;
    travel: number;
    vx: number;
    vy: number;
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
    dragRef.current = {
      id: e.pointerId,
      lastX: e.clientX,
      lastY: e.clientY,
      travel: 0,
      vx: 0,
      vy: 0,
    };
    setIsPanning(true);

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* the pan still runs off pointermove */
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) return;

    const dx = e.clientX - drag.lastX;
    const dy = e.clientY - drag.lastY;
    drag.lastX = e.clientX;
    drag.lastY = e.clientY;
    drag.travel += Math.abs(dx) + Math.abs(dy);

    // Exponential moving average — recent movement dominates, but one stalled
    // frame right before release can't zero the fling.
    drag.vx = drag.vx * 0.7 + dx * 0.3;
    drag.vy = drag.vy * 0.7 + dy * 0.3;

    applyCamera((c) => panBy(c, dx, dy));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    dragRef.current = null;
    setIsPanning(false);
    if (!drag || drag.id !== e.pointerId) return;

    if (drag.travel > CLICK_SLOP_PX) {
      if (Math.hypot(drag.vx, drag.vy) >= MOMENTUM_CUTOFF) startGlide(drag.vx, drag.vy);
      return;
    }

    const photoEl = (e.target as HTMLElement | null)?.closest?.("[data-photo]");
    const num = Number(photoEl?.getAttribute("data-photo"));
    const photo = layout.photos.find((p) => p.num === num);

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

      <div className="gallery-canvas-hud">
        <p className="gallery-canvas-hud__title">
          Photo gallery
          <span>
            {Math.round(camera.zoom * 100)}% · {visiblePhotos.length}/
            {layout.photos.length} in view
          </span>
        </p>
        <p className="gallery-canvas-hud__hint">
          Drag to fling · pinch or ctrl-scroll to zoom · click a photo to fill
          the screen · Esc to see everything
        </p>
      </div>
    </div>
  );
};

export default GalleryCanvas;
