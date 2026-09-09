import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { MapPin } from "@phosphor-icons/react";
import "../styles/canvasCard.scss";
import "../styles/dottedBoard.scss";
import "../styles/GalleryCanvas.scss";
import { LOCATIONS, ASPECT_RATIOS, REGIONS } from "./Gallery";
import { masonryGallery, PhotoBox } from "../utils/galleryLayout";
import {
  Camera,
  Viewport,
  panBy,
  zoomAt,
  isVisible,
  lerpCamera,
  easeInOutCubic,
  cameraTransform,
} from "../utils/canvasCamera";

/**
 * The photo gallery as one endless pannable field of photographs.
 *
 * Lives alongside the existing /gallery rather than replacing it, so the two
 * can be compared before either wins.
 *
 * Every photo sits on a single plane and the whole field moves together. The
 * field itself is *tiled*: the masonry layout returns one repeating unit and
 * the canvas draws that unit again at every multiple of it in both directions,
 * so panning never arrives at an edge — there is always more gallery in every
 * direction. The one piece of physics kept is the camera's own momentum: a
 * flung drag coasts to a halt instead of stopping dead.
 */

/* How far the zoom may move either side of the opening view.
   The photographs are meant to be seen at roughly one size, and this exists so
   a pinch or a wheel does something rather than feeling broken. Looking closely
   at one photograph is the opened-photo state's job, not the camera's. */
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

/* Ceiling on how many copies of the tile are drawn along either axis.
   The tile is sized to more than fill a screen at the opening zoom, so two
   deep is already generous; this only exists so an unexpected viewport or
   zoom can't ask for a hundred copies and mount two thousand photographs. */
const MAX_TILES_PER_AXIS = 4;

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

/* The tilt every photograph sits at, by its number.
   A fixed cycle rather than a random draw: the field is tiled, so the same
   photograph is on screen more than once, and a tilt that differed between
   copies would give the repeat away. Never zero — a photo hung straight in a
   field of tilted ones reads as a mistake rather than as variety. */
const TILTS = [-2, 1, -1, 2];

// Below this width the cluster is rebuilt as a tall column instead of a wide
// field: a phone viewport is portrait, so spreading horizontally puts most of
// the gallery off to the sides where it reads as a wall to scrub past rather
// than something to explore.
const MOBILE_BREAKPOINT = 750;

/* Column width and gutter, taken from the reference: photographs a little over
   five hundred units wide, separated by a gutter about a seventh of that. The
   gutter is what stops a tilted photograph's corner from crossing into its
   neighbour's. */
const DESKTOP_MASONRY = {
  columns: 7,
  columnWidth: 542,
  gap: 80,
};

// The desktop field, flipped to portrait: same photo sizes, but taller than it
// is wide, because a phone viewport is portrait and a wide field would put most
// of the gallery off to the sides.
const MOBILE_MASONRY = {
  // Three columns of forty photographs: wide enough that there is somewhere to
  // pan sideways to, narrow enough that pulling right back still leaves each
  // photo readable rather than a speck.
  columns: 3,
  columnWidth: 460,
  gap: 72,
};

// How many photos should span the screen at the opening zoom. The zoom is
// derived from this and the layout's own median photo width, so the column
// count holds whatever the photo sizes are later tuned to.
/* A little over one: a photograph opens at nearly the full width of the phone,
   with the edge of its neighbour showing to say the field carries on. */
const MOBILE_TARGET_COLUMNS = 1.15;

/* Read off the view this was tuned to by hand: photographs a little over a
   quarter of the screen wide, so between three and four columns are in frame
   and the ones at the edges are cut by it. The overflow is the point — a
   screen that ends mid-photograph says there is more of this in every
   direction, which a view that tidily contains its contents does not.

   Was 4.4, which read as slightly too far back: a photograph is the subject
   here, and at a fifth of the screen each one was closer to a swatch. Lower
   is closer. This single number is the whole opening zoom — the camera, the
   dot grid's cell and the cards' chrome are all derived from it. */
const DESKTOP_TARGET_COLUMNS = 3.8;

/**
 * One drawn copy of a photograph.
 *
 * The field repeats, so a photograph's number no longer identifies a thing on
 * screen — there are several of each. `x`/`y` are absolute canvas coordinates
 * with the tile offset already folded in, and `key` identifies this copy, so
 * everything downstream (opening, pushing aside, flying to) works on copies
 * and not on photographs.
 */
interface PhotoInstance extends PhotoBox {
  key: string;
  tilt: number;
}

const GalleryCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [viewport, setViewport] = useState<Viewport>({ w: 1, h: 1 });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, zoom: 0.4 });
  /** The copy of a photograph currently opened, if any. */
  const [active, setActive] = useState<PhotoInstance | null>(null);
  /** Where the camera was before a photo was opened, so closing can go back. */
  const cameraBeforeFocusRef = useRef<Camera | null>(null);
  /** Read by the keydown handler, which is registered once and would not see
      the state itself change. */
  const activeRef = useRef<PhotoInstance | null>(null);
  activeRef.current = active;
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  // "Click" reads wrong on a phone. Resolved once on mount rather than per
  // render — the pointer type doesn't change mid-visit.
  const [tapWord] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(hover: none)").matches
      ? "Tap"
      : "Click"
  );

  /**
   * Whether every photograph carries its location, or only the one being
   * pointed at.
   *
   * Keyed on `(hover: none)` rather than on a width, and not on the `isMobile`
   * below: the reason to show them all is not that the screen is narrow, it is
   * that a device with no pointer can never produce the hover that reveals
   * one, so on a phone the label would otherwise only ever appear on a photo
   * you had already opened. Resolved once on mount, like `tapWord` — the
   * pointer type does not change mid-visit.
   */
  const [labelsAlwaysOn] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches
  );

  const isMobile = viewport.w > 1 && viewport.w < MOBILE_BREAKPOINT;

  const layout = useMemo(
    () =>
      masonryGallery(
        ALL_IMAGES,
        ASPECT_RATIOS,
        LOCATIONS,
        isMobile ? MOBILE_MASONRY : DESKTOP_MASONRY
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

  /** The band the camera may zoom within: the opening view, plus or minus 40%. */
  const minZoom = baseZoom * (1 - ZOOM_RANGE);
  const maxZoom = baseZoom * (1 + ZOOM_RANGE);

  /**
   * The camera the page opens at, and the one every reset returns to: the
   * middle of the first copy of the tile at the base zoom.
   *
   * Nothing is clamped to it. The field repeats without end, so there is no
   * edge to hold the camera inside — "home" is just a landmark to come back
   * to, not a boundary.
   */
  const homeCamera = useMemo<Camera>(() => {
    const tile = layout.tile;
    return {
      x: tile.w / 2 - viewport.w / (2 * baseZoom),
      y: tile.h / 2 - viewport.h / (2 * baseZoom),
      zoom: baseZoom,
    };
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
   * Every camera write goes through here.
   *
   * Takes an updater rather than a value on purpose. Trackpads fire many wheel
   * events per frame, and reading `cameraRef.current` in each one meant they
   * all built on the same pre-commit camera — 24 rapid notches produced a
   * single notch of zoom. Composing through setState makes every event land.
   *
   * There is nothing to clamp: the field has no edges. Zoom is bounded
   * separately, in zoomAt, which is handed the band directly.
   */
  const applyCamera = useCallback(
    (update: (current: Camera) => Camera) => setCamera(update),
    []
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
   * There is no "fit everything" — the field repeats without end, so there is
   * no everything to fit. What a reset can do is undo the wandering and the
   * nudge of zoom, which is what this does.
   */
  const resetView = useCallback(() => {
    setActive(null);
    cameraBeforeFocusRef.current = null;
    flyTo(homeCamera);
  }, [flyTo, homeCamera]);

  /**
   * Opens a photo, or closes the one that is open.
   *
   * The photo grows where it stands rather than being replaced by an overlay,
   * so the camera only ever slides sideways to put it in the middle — the zoom
   * is untouched. The camera it slid from is kept, and closing flies back to
   * it exactly, so a photo opened far out in the field returns you to the
   * ground you were looking at rather than to the middle of the gallery.
   */
  const toggleFocus = useCallback((instance: PhotoInstance) => {
    setActive((current) => (current?.key === instance.key ? null : instance));
  }, []);

  const closeFocus = useCallback(() => setActive(null), []);

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
   * run for Escape, and it used to live inside the `setActive` updater, which
   * React may call during render and calls twice under StrictMode. A flight
   * started from there is a side effect in render — it fired twice, with the
   * second cancelling the first, and could be discarded entirely.
   *
   * Only the position moves; the zoom is left exactly as it was. The photo
   * grows to fill the screen on its own, and a camera that also zoomed would
   * fight the band the whole page is pinned to.
   */
  const flownForRef = useRef<string | null>(null);
  useEffect(() => {
    const key = active?.key ?? null;
    if (flownForRef.current === key) return;
    flownForRef.current = key;

    const vp = viewportRef.current;
    if (vp.w <= 1) return;

    if (!active) {
      // Nothing to go back to if the view was reset rather than closed —
      // resetView clears this first, precisely so it can fly home instead.
      const previous = cameraBeforeFocusRef.current;
      cameraBeforeFocusRef.current = null;
      if (previous) flyTo(previous, FOCUS_FLIGHT_MS);
      return;
    }

    const from = cameraRef.current;
    // Stored only on the way in, so opening a second photo without closing the
    // first still returns to where the whole thing began.
    if (!cameraBeforeFocusRef.current) cameraBeforeFocusRef.current = from;

    flyTo(
      {
        zoom: from.zoom,
        x: active.x + active.w / 2 - vp.w / (2 * from.zoom),
        y: active.y + active.h / 2 - vp.h / (2 * from.zoom),
      },
      FOCUS_FLIGHT_MS
    );
  }, [active, flyTo]);

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
     * Which copy of which photo the gesture began on, resolved at pointerdown.
     *
     * It cannot be read from the pointerup event: `setPointerCapture` below
     * retargets every subsequent pointer event for this pointer to the
     * viewport, so pointerup's `target` is the viewport and not the photo.
     * Reading it there sent every click to reset-view instead of opening the
     * photograph.
     */
    photoKey: string | null;
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
      photoKey: photoEl?.getAttribute("data-photo") ?? null,
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
            photoKey: null,
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

    const instance =
      drag.photoKey === null
        ? undefined
        : instances.find((p) => p.key === drag.photoKey);

    if (!instance) {
      // With a photo open the background is the way out of it. Only once
      // nothing is open does clicking it mean "back to the opening view".
      if (active) closeFocus();
      else resetView();
      return;
    }

    toggleFocus(instance);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape" && e.key !== "0") return;
      // Escape closes the open photo first and only resets the view if there
      // isn't one — otherwise one key would do two things at once.
      if (activeRef.current) closeFocus();
      else resetView();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [resetView, closeFocus]);

  /**
   * The copies of the field currently worth mounting.
   *
   * The layout is one repeating unit, so this walks the copies of that unit
   * that the viewport overlaps and mounts the photographs inside them that are
   * near enough the frame to matter. The margin keeps a screen's worth of
   * photographs mounted just outside it, so panning reveals images that have
   * already decoded rather than empty boxes.
   *
   * The open photograph is always included, whether or not it is still within
   * the margin: the camera is mid-flight towards it while it opens, and a photo
   * that unmounted halfway through that would take the whole focused state
   * with it.
   */
  const instances = useMemo<PhotoInstance[]>(() => {
    if (viewport.w <= 1) return [];

    const { tile, photos } = layout;
    const margin = CULL_MARGIN_PX / camera.zoom;
    const viewW = viewport.w / camera.zoom;
    const viewH = viewport.h / camera.zoom;

    const span = (start: number, size: number, unit: number) => {
      const first = Math.floor((start - margin) / unit);
      const last = Math.floor((start + size + margin) / unit);
      return { first, last: Math.min(last, first + MAX_TILES_PER_AXIS - 1) };
    };

    const cols = span(camera.x, viewW, tile.w);
    const rows = span(camera.y, viewH, tile.h);

    const out: PhotoInstance[] = [];

    for (let i = cols.first; i <= cols.last; i++) {
      for (let j = rows.first; j <= rows.last; j++) {
        for (const photo of photos) {
          const box: PhotoInstance = {
            ...photo,
            x: photo.x + i * tile.w,
            y: photo.y + j * tile.h,
            key: `${photo.num}@${i},${j}`,
            tilt: TILTS[photo.num % TILTS.length],
          };
          if (isVisible(box, camera, viewport, CULL_MARGIN_PX)) out.push(box);
        }
      }
    }

    if (active && !out.some((p) => p.key === active.key)) out.push(active);

    return out;
  }, [layout, camera, viewport, active]);

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
    if (!active || viewport.w <= 1) return 1;
    const availableW = (viewport.w * FOCUS_FILL) / camera.zoom;
    const availableH = (viewport.h * FOCUS_FILL) / camera.zoom;
    return Math.max(1, Math.min(availableW / active.w, availableH / active.h));
  })();

  /* How far the open photo's own edges advance, which is how far everything
     else has to move to stay out of its way. */
  const pushX = active ? ((focusScale - 1) * active.w * PUSH_CLEARANCE) / 2 : 0;
  const pushY = active ? ((focusScale - 1) * active.h * PUSH_CLEARANCE) / 2 : 0;

  /**
   * Where one photo is shoved to while another is open.
   *
   * Pushed along each axis by the side it is on rather than radially outward:
   * what has to be cleared is a rectangle, and a photo directly above the open
   * one needs to move up, not diagonally. A photo sharing a centre line stays
   * put on that axis, which is what `Math.sign` of 0 gives.
   */
  const shoveFor = (photo: PhotoInstance) => {
    if (!active || photo.key === active.key) return { x: 0, y: 0 };
    const dx = photo.x + photo.w / 2 - (active.x + active.w / 2);
    const dy = photo.y + photo.h / 2 - (active.y + active.h / 2);
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
    <div className={`gallery-canvas-page${active ? " is-focused" : ""}`}>
      <div
        ref={containerRef}
        className={`gallery-canvas-page__viewport${isPanning ? " is-panning" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        data-camera={`${camera.x.toFixed(1)},${camera.y.toFixed(1)},${camera.zoom.toFixed(3)}`}
        data-mounted={instances.length}
        data-active={active?.key ?? ""}
        /* The dotted ground. Drawn on the viewport rather than as a child of
           the stage, so one repeating background does the work of a tiled
           element the size of the whole field: the origin follows the camera
           and the cell scales with the zoom, which is what makes the dots read
           as lying *under* the photographs rather than floating over them at a
           fixed size.

           Sized off the *base* zoom rather than the current one, so the cell
           is 40px and the dot 2px across at the opening view — the density the
           grid was drawn for — and only breathes with the zoom from there.
           Multiplying the raw zoom instead put the cell at 21px, which stopped
           being a scattering of dots and became a mesh. */
        style={
          {
            "--dot-radius": `${(2 * camera.zoom) / baseZoom}px`,
            backgroundSize: `${(40 * camera.zoom) / baseZoom}px ${
              (40 * camera.zoom) / baseZoom
            }px`,
            backgroundPosition: `${-camera.x * camera.zoom}px ${-camera.y * camera.zoom}px`,
          } as React.CSSProperties
        }
      >
        {/* One transform for the whole field — every photo shares it. */}
        <div
          className="gallery-canvas-page__stage"
          style={
            {
              transform: cameraTransform(camera),
              /* The reciprocal of the zoom, so the card's chrome — corner
                 radius, white edge, shadow — can be written at the size it
                 should appear on screen and hold that size as the camera
                 zooms, instead of growing and shrinking with the photographs
                 the way a scaled border would. */
              "--canvas-k": 1 / camera.zoom,
            } as React.CSSProperties
          }
        >
          {instances.map((photo) => {
            const isOpen = active?.key === photo.key;
            const shove = shoveFor(photo);
            // The photo's total scale, which the caption has to undo on top of
            // the camera's if it is to hold one size on screen.
            const scale = isOpen ? focusScale : 1;

            return (
              <div
                key={photo.key}
                className={`gallery-canvas-photo${isOpen ? " is-active" : ""}`}
                style={{
                  left: photo.x,
                  top: photo.y,
                  width: photo.w,
                  height: photo.h,
                }}
              >
                {/* The card itself. Separate from the box that positions it so
                    that the arrival — a fade up from three-quarter size — has a
                    transform of its own to animate, instead of fighting the
                    tilt, the shove and the opening scale for the same one. */}
                <div
                  data-photo={photo.key}
                  className="gallery-canvas-photo__frame canvas-card"
                  style={
                    {
                      "--push-x": `${shove.x}px`,
                      "--push-y": `${shove.y}px`,
                      "--photo-tilt": `${photo.tilt}deg`,
                      ...(isOpen ? { "--photo-scale": focusScale } : null),
                    } as React.CSSProperties
                  }
                  onPointerEnter={() => setHoveredKey(photo.key)}
                  onPointerLeave={() =>
                    setHoveredKey((k) => (k === photo.key ? null : k))
                  }
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

                  {(isOpen || labelsAlwaysOn || hoveredKey === photo.key) && (
                    <span
                      className="gallery-canvas-photo__caption canvas-card-label"
                      /* Counter-scaled so the pill holds one size on screen
                         however far the camera is zoomed and however far the
                         photograph has grown, and counter-rotated so it sits
                         level while the photograph it labels hangs crooked. */
                      style={{
                        transform: `rotate(${-photo.tilt}deg) scale(${
                          1 / (camera.zoom * scale)
                        })`,
                      }}
                    >
                      <MapPin size={14} /> {photo.location}
                    </span>
                  )}
                </div>
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
