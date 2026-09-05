import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { MapPin } from "@phosphor-icons/react";
import "../styles/GalleryCanvas.scss";
import { LOCATIONS, ASPECT_RATIOS, REGIONS } from "./Gallery";
import { masonryGallery, PhotoBox } from "../utils/galleryLayout";
import {
  Camera,
  Viewport,
  panBy,
  zoomAt,
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

/* How far the zoom may move either side of the opening view.
   Five per cent is a nudge, not a journey: the photographs are meant to be
   seen at one size, and this exists so a pinch or a wheel does something
   rather than feeling broken. Looking closely at one photograph is the
   lightbox's job now, not the camera's. */
const ZOOM_RANGE = 0.4;
// Used only before the viewport has been measured.
const FALLBACK_ZOOM = 1;

// How much zoom each wheel notch or pinch delivers, as an exponent — so every
// notch is a constant *ratio* rather than a constant step. At 0.0038 a single
// 100-unit notch multiplied the zoom by ~1.46, which overshot whatever you
// were aiming at; 0.0016 makes it ~1.17 and gives the gesture some travel.
const ZOOM_RATE = 0.002;

const FLIGHT_MS = 650;

/* The flight to a photo being opened, which is a different job from crossing
   the field: the photo it lands on is already growing to fill the screen in
   0.18s, and a camera still gliding half a second after that has finished
   reads as two separate animations rather than one movement. */
const FOCUS_FLIGHT_MS = 280;

/* How much of the viewport an opened photo grows to fill. Short of the whole
   screen on purpose: the photographs it pushes aside stay visible at the
   edges, which is what keeps this reading as one photograph coming forward out
   of a field rather than as a slideshow that has replaced it. */
const FOCUS_FILL = 0.78;

/* How far the rest are shoved out of its way, as a multiple of how far the
   opened photo's own edges advance. Slightly over 1, so they clear it with a
   little daylight rather than coming to rest exactly against it. */
const PUSH_CLEARANCE = 1.25;
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
// is wide, because a phone viewport is portrait and a wide field would put most
// of the gallery off to the sides.
const MOBILE_MASONRY = {
  // Three columns of forty photographs: wide enough that there is somewhere to
  // pan sideways to, narrow enough that pulling right back still leaves each
  // photo readable rather than a speck.
  columns: 3,
  columnWidth: 460,
  gap: 48,
};

// How many photos should span the screen at the opening zoom. The zoom is
// derived from this and the layout's own median photo width, so the column
// count holds whatever the photo sizes are later tuned to.
/* A little over one: a photograph opens at nearly the full width of the phone,
   with the edge of its neighbour showing to say the field carries on. */
const MOBILE_TARGET_COLUMNS = 1.15;

/* Under two, so the opening view holds four or five photographs and the ones
   at the edges are cut by the frame. The overflow is the point: a screen that
   ends mid-photograph says there is more of this in every direction, which a
   view that tidily contains its contents does not. */
const DESKTOP_TARGET_COLUMNS = 3;

const GalleryCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [viewport, setViewport] = useState<Viewport>({ w: 1, h: 1 });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, zoom: 0.4 });
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  /** Where the camera was before a photo was opened, so closing can go back. */
  const cameraBeforeFocusRef = useRef<Camera | null>(null);
  /** Read by the keydown handler, which is registered once and would not see
      the state itself change. */
  const activePhotoRef = useRef<number | null>(null);
  activePhotoRef.current = activePhoto;
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
      masonryGallery(
        ALL_IMAGES,
        ASPECT_RATIOS,
        LOCATIONS,
        isMobile ? MOBILE_MASONRY : undefined
      ),
    [isMobile]
  );

  // Listeners attach once with `{ passive: false }`, so they read state through
  // refs rather than closing over stale values.
  /**
   * The zoom the page opens at: whatever puts TARGET_COLUMNS photographs
   * across the viewport. Derived rather than stored, so resizing the window
   * re-derives it and the photographs keep their size relative to the screen.
   */
  const baseZoom = useMemo(() => {
    if (viewport.w <= 1 || layout.photos.length === 0) return FALLBACK_ZOOM;

    if (isMobile) {
      // Median rather than mean or widest: it's the width that actually
      // characterises a column, and one outlier landscape shot shouldn't
      // decide the zoom for all forty.
      const widths = layout.photos.map((p) => p.w).sort((a, b) => a - b);
      const median = widths[Math.floor(widths.length / 2)] || 1;
      return viewport.w / (MOBILE_TARGET_COLUMNS * median);
    }

    return viewport.w / (DESKTOP_TARGET_COLUMNS * (layout.photos[0]?.w || 520));
  }, [viewport, isMobile, layout.photos]);

  /** The band the camera may zoom within: the opening view, plus or minus 5%. */
  const minZoom = baseZoom * (1 - ZOOM_RANGE);
  const maxZoom = baseZoom * (1 + ZOOM_RANGE);

  /**
   * The camera the page opens at, and the one every reset returns to: the
   * middle of the field at the base zoom, so there are photographs in every
   * direction from the off and the edges are something you arrive at.
   */
  const homeCamera = useMemo<Camera>(() => {
    const tile = layout.tile;
    return clampCamera(
      {
        x: tile.w / 2 - viewport.w / (2 * baseZoom),
        y: tile.h / 2 - viewport.h / (2 * baseZoom),
        zoom: baseZoom,
      },
      tile,
      viewport
    );
  }, [layout.tile, viewport, baseZoom]);

  const cameraRef = useRef(camera);
  cameraRef.current = camera;
  const viewportRef = useRef(viewport);
  viewportRef.current = viewport;
  const minZoomRef = useRef(minZoom);
  minZoomRef.current = minZoom;
  const maxZoomRef = useRef(maxZoom);
  maxZoomRef.current = maxZoom;

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
  /**
   * The field is bounded, so this is also where the edges are enforced: pan and
   * fling both compose through here, and neither can put the camera anywhere
   * the photographs are not. Zoom is bounded separately, in zoomAt, which is
   * handed the band directly.
   */
  const applyCamera = useCallback(
    (update: (current: Camera) => Camera) =>
      setCamera((current) =>
        clampCamera(update(current), layout.tile, viewportRef.current)
      ),
    [layout.tile]
  );

  const flyTo = useCallback(
    (target: Camera, duration = FLIGHT_MS) => {
      stopMotion();
      const from = cameraRef.current;
      const vp = viewportRef.current;
      const start = performance.now();

      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        applyCamera(() => lerpCamera(from, target, easeInOutCubic(t), vp));
        if (t < 1) flightRef.current = requestAnimationFrame(step);
        else flightRef.current = null;
      };

      flightRef.current = requestAnimationFrame(step);
    },
    [stopMotion, applyCamera]
  );

  /**
   * Back to the view the page opened at.
   *
   * There is no "fit everything" any more — the zoom band is five per cent
   * wide, so the whole field never fits on a screen. What a reset can do is
   * undo the panning and the nudge of zoom, which is what this does.
   */
  const resetView = useCallback(() => {
    setActivePhoto(null);
    cameraBeforeFocusRef.current = null;
    flyTo(homeCamera);
  }, [flyTo, homeCamera]);

  /**
   * Opens a photo, or closes the one that is open.
   *
   * The photo grows where it stands rather than being replaced by an overlay,
   * so the camera only ever slides sideways to put it in the middle — the zoom
   * is untouched. The camera it slid from is kept, and closing flies back to
   * it exactly, so a photo opened near the edge of the field returns you to
   * the corner you were looking at rather than to the middle of the gallery.
   */
  const toggleFocus = useCallback((num: number) => {
    setActivePhoto((current) => (current === num ? null : num));
  }, []);

  const closeFocus = useCallback(() => setActivePhoto(null), []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      setViewport({ w: width, h: height });
    };

    measure();
    // Re-measures whenever the canvas element changes size.
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Opening view, applied once the viewport is measured and again whenever the
  // layout flips between the wide field and the tall column — the two want
  // different starting cameras. Not on every homeCamera change: that would
  // yank the camera home the moment anything resized under it.
  const openedForRef = useRef<boolean | null>(null);
  useEffect(() => {
    if (viewport.w <= 1 || openedForRef.current === isMobile) return;
    openedForRef.current = isMobile;
    setCamera(homeCamera);
  }, [viewport, isMobile, homeCamera]);

  /**
   * Travels to the photo that has just been opened, and back when it closes.
   *
   * In an effect rather than in the click handler, because the flight belongs
   * to the *change* of which photo is open, not to the click: it also has to
   * run for Escape, and it used to live inside the `setActivePhoto` updater,
   * which React may call during render and calls twice under StrictMode. A
   * flight started from there is a side effect in render — it fired twice,
   * with the second cancelling the first, and could be discarded entirely.
   *
   * Only the position moves; the zoom is left exactly as it was. The photo
   * grows to fill the screen on its own, and a camera that also zoomed would
   * fight the band the whole page is pinned to.
   */
  const flownForRef = useRef<number | null>(null);
  useEffect(() => {
    if (flownForRef.current === activePhoto) return;
    flownForRef.current = activePhoto;

    const vp = viewportRef.current;
    if (vp.w <= 1) return;

    if (activePhoto === null) {
      // Nothing to go back to if the view was reset rather than closed —
      // resetView clears this first, precisely so it can fly home instead.
      const previous = cameraBeforeFocusRef.current;
      cameraBeforeFocusRef.current = null;
      if (previous) flyTo(previous, FOCUS_FLIGHT_MS);
      return;
    }

    const photo = layout.photos.find((p) => p.num === activePhoto);
    if (!photo) return;

    const from = cameraRef.current;
    // Stored only on the way in, so opening a second photo without closing the
    // first still returns to where the whole thing began.
    if (!cameraBeforeFocusRef.current) cameraBeforeFocusRef.current = from;

    flyTo(
      {
        zoom: from.zoom,
        x: photo.x + photo.w / 2 - vp.w / (2 * from.zoom),
        y: photo.y + photo.h / 2 - vp.h / (2 * from.zoom),
      },
      FOCUS_FLIGHT_MS
    );
  }, [activePhoto, layout.photos, flyTo]);

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
            maxZoomRef.current
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
          maxZoomRef.current
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
            zoomAt(c, factor, now.mid, minZoomRef.current, maxZoomRef.current),
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
      // With a photo open the background is the way out of it. Only once
      // nothing is open does clicking it mean "back to the opening view".
      if (activePhoto !== null) closeFocus();
      else resetView();
      return;
    }

    toggleFocus(photo.num);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape" && e.key !== "0") return;
      // Escape closes the open photo first and only resets the view if there
      // isn't one — otherwise one key would do two things at once.
      if (activePhotoRef.current !== null) closeFocus();
      else resetView();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [resetView, closeFocus]);

  /**
   * The photos currently worth mounting: the field is drawn once, so this is
   * simply the ones near enough the viewport to matter. The margin keeps a
   * screen's worth of photographs mounted just outside the frame, so panning
   * reveals images that have already decoded rather than empty boxes.
   */
  const visiblePhotos = (() => {
    if (viewport.w <= 1) return [];
    return layout.photos.filter((p) => isVisible(p, camera, viewport, CULL_MARGIN_PX));
  })();

  const openPhoto =
    activePhoto === null
      ? null
      : layout.photos.find((p) => p.num === activePhoto) ?? null;

  /**
   * How far the open photo grows.
   *
   * Worked out in canvas units against the current zoom, so the photo lands at
   * the same size on screen whatever the camera happens to be doing and
   * whatever shape the photograph is — a tall one is limited by the height of
   * the window, a wide one by its width. Never below 1: a photo already larger
   * than the frame should stay as it is rather than shrink on being opened.
   */
  const focusScale = (() => {
    if (!openPhoto || viewport.w <= 1) return 1;
    const availableW = (viewport.w * FOCUS_FILL) / camera.zoom;
    const availableH = (viewport.h * FOCUS_FILL) / camera.zoom;
    return Math.max(1, Math.min(availableW / openPhoto.w, availableH / openPhoto.h));
  })();

  /* How far the open photo's own edges advance, which is how far everything
     else has to move to stay out of its way. */
  const pushX = openPhoto ? ((focusScale - 1) * openPhoto.w * PUSH_CLEARANCE) / 2 : 0;
  const pushY = openPhoto ? ((focusScale - 1) * openPhoto.h * PUSH_CLEARANCE) / 2 : 0;

  /**
   * Where one photo is shoved to while another is open.
   *
   * Pushed along each axis by the side it is on rather than radially outward:
   * what has to be cleared is a rectangle, and a photo directly above the open
   * one needs to move up, not diagonally. A photo sharing a centre line stays
   * put on that axis, which is what `Math.sign` of 0 gives.
   */
  const shoveFor = (photo: PhotoBox) => {
    if (!openPhoto || photo.num === openPhoto.num) return { x: 0, y: 0 };
    const dx = photo.x + photo.w / 2 - (openPhoto.x + openPhoto.w / 2);
    const dy = photo.y + photo.h / 2 - (openPhoto.y + openPhoto.h / 2);
    return { x: Math.sign(dx) * pushX, y: Math.sign(dy) * pushY };
  };

  /**
   * The blur every photo arrives through, cleared the moment its file has
   * decoded. Written straight to the element rather than held in state: this
   * fires for every photo that scrolls into the field, and re-rendering the
   * canvas each time one of forty images finished loading would be absurd.
   * Adding a class twice is harmless, which matters because React re-runs an
   * inline ref callback on every commit.
   */
  const markLoaded = (el: HTMLImageElement | null) => {
    if (el?.complete && el.naturalWidth) el.classList.add("is-loaded");
  };

  return (
    <div className={`gallery-canvas-page${openPhoto ? " is-focused" : ""}`}>
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
          {visiblePhotos.map((photo) => {
            const isOpen = activePhoto === photo.num;
            const shove = shoveFor(photo);
            // The photo's total scale, which the caption has to undo on top of
            // the camera's if it is to hold one size on screen.
            const scale = isOpen ? focusScale : 0.92;

            return (
              <div
                key={photo.num}
                data-photo={photo.num}
                className={`gallery-canvas-photo${isOpen ? " is-active" : ""}`}
                style={
                  {
                    left: photo.x,
                    top: photo.y,
                    width: photo.w,
                    height: photo.h,
                    "--push-x": `${shove.x}px`,
                    "--push-y": `${shove.y}px`,
                    ...(isOpen ? { "--photo-scale": focusScale } : null),
                  } as React.CSSProperties
                }
                onPointerEnter={() => setHoveredPhoto(photo.num)}
                onPointerLeave={() => setHoveredPhoto((n) => (n === photo.num ? null : n))}
              >
                <img
                  src={`/gallery/${photo.num}.webp`}
                  alt={photo.location}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  ref={markLoaded}
                  onLoad={(e) => e.currentTarget.classList.add("is-loaded")}
                  // A file that fails leaves a permanently invisible box
                  // otherwise: the blur-up starts at opacity 0 and only `load`
                  // ever clears it.
                  onError={(e) => e.currentTarget.classList.add("is-loaded")}
                />

                {(isOpen || hoveredPhoto === photo.num) && (
                  <span
                    className={`gallery-canvas-photo__caption${
                      isOpen ? " gallery-canvas-photo__caption--open" : ""
                    }`}
                    // Counter-scaled so the caption holds one size on screen.
                    style={{ transform: `scale(${1 / (camera.zoom * scale)})` }}
                  >
                    <MapPin size={14} /> {photo.location}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="gallery-canvas-hint">
        Drag to explore. {tapWord} a photo to open it.
      </p>

    </div>
  );
};

export default GalleryCanvas;
