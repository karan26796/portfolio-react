import React, { useState, useEffect, useRef, useCallback } from "react";
import "../styles/CanvasSpike.scss";
import {
  Camera,
  Rect,
  Viewport,
  MIN_ZOOM,
  MAX_ZOOM,
  panBy,
  zoomAt,
  fitTo,
  unionRect,
  isVisible,
  lerpCamera,
  easeInOutCubic,
  cameraTransform,
} from "../utils/canvasCamera";

/**
 * THROWAWAY SPIKE — step 1 of the canvas portfolio.
 *
 * The point is to answer one question: does panning and zooming this thing
 * feel good? So the frames hold placeholder blocks, not real sections. What is
 * meant to be judged here is the *feel* — trackpad vs mouse wheel, zoom
 * anchoring, the fly-to easing, and whether a scrolling frame inside a
 * pannable canvas is tolerable.
 *
 * Not in scope yet: link edges, level-of-detail swapping, the linear-document
 * fallback, and porting any real section.
 */

interface Frame extends Rect {
  id: string;
  title: string;
  /**
   * Frames whose content is taller than the frame itself scroll internally.
   * This is the interaction we most need to feel: a scrolling frame inside a
   * pannable canvas makes every wheel event ambiguous.
   */
  scrollable?: boolean;
  /** Reserved for step 3's prototype-arrow layer. */
  links?: string[];
}

const FRAMES: Frame[] = [
  { id: "hero", title: "Hero", x: 0, y: 0, w: 1200, h: 700, links: ["projects"] },
  {
    id: "projects",
    title: "Projects — scrolling frame",
    x: 1400,
    y: 0,
    w: 1000,
    h: 900,
    scrollable: true,
    links: ["case-study"],
  },
  { id: "testimonials", title: "Testimonials", x: 0, y: 900, w: 900, h: 600 },
  { id: "case-study", title: "Case study", x: 2600, y: 900, w: 760, h: 520 },
];

const FIT_PADDING = 80;
const FLIGHT_MS = 620;
// Above this zoom a scrollable frame takes the wheel for itself; below it the
// frame is a thumbnail you pan past, so the wheel belongs to the canvas.
const FOCUS_SCROLL_ZOOM = 0.7;
// A pointer that moves less than this between down and up counts as a click
// rather than a pan, so click-to-zoom survives a shaky hand.
const CLICK_SLOP_PX = 4;

const CanvasSpike: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [viewport, setViewport] = useState<Viewport>({ w: 1, h: 1 });
  const [camera, setCamera] = useState<Camera>({ x: -100, y: -100, zoom: 0.5 });
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState(false);

  // Mutable mirrors: the wheel/pointer listeners are attached once with
  // `{ passive: false }`, so they must not close over stale state.
  const cameraRef = useRef(camera);
  cameraRef.current = camera;
  const viewportRef = useRef(viewport);
  viewportRef.current = viewport;
  const focusedRef = useRef(focusedId);
  focusedRef.current = focusedId;

  const flightRef = useRef<number | null>(null);

  const cancelFlight = useCallback(() => {
    if (flightRef.current !== null) {
      cancelAnimationFrame(flightRef.current);
      flightRef.current = null;
    }
  }, []);

  /** Animate the camera to `target`. Any live flight is abandoned. */
  const flyTo = useCallback(
    (target: Camera) => {
      cancelFlight();
      const from = cameraRef.current;
      const vp = viewportRef.current;
      const start = performance.now();

      const step = (now: number) => {
        const t = Math.min(1, (now - start) / FLIGHT_MS);
        setCamera(lerpCamera(from, target, easeInOutCubic(t), vp));

        if (t < 1) {
          flightRef.current = requestAnimationFrame(step);
        } else {
          flightRef.current = null;
        }
      };

      flightRef.current = requestAnimationFrame(step);
    },
    [cancelFlight]
  );

  const focusFrame = useCallback(
    (frame: Frame) => {
      setFocusedId(frame.id);
      flyTo(fitTo(frame, viewportRef.current, FIT_PADDING));
    },
    [flyTo]
  );

  const fitAll = useCallback(() => {
    setFocusedId(null);
    flyTo(fitTo(unionRect(FRAMES), viewportRef.current, FIT_PADDING));
  }, [flyTo]);

  // Track the viewport, and open on a fit-all view.
  useEffect(() => {
    const measure = () => {
      const el = containerRef.current;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      setViewport({ w: width, h: height });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Separate from the measure effect so it runs once the first real viewport
  // lands, rather than against the 1x1 placeholder.
  const didOpenRef = useRef(false);
  useEffect(() => {
    if (didOpenRef.current || viewport.w <= 1) return;
    didOpenRef.current = true;
    setCamera(fitTo(unionRect(FRAMES), viewport, FIT_PADDING));
  }, [viewport]);

  // The page itself must not scroll while the canvas owns the viewport.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => cancelFlight, [cancelFlight]);

  /**
   * Wheel. Three cases, in priority order:
   *   1. ctrl/meta held — that's a trackpad pinch (browsers synthesise
   *      ctrl+wheel for it) or a deliberate zoom modifier.
   *   2. the cursor is over the focused scrollable frame and we're zoomed in
   *      far enough to be "reading" it — the frame takes the scroll, and only
   *      hands back to the canvas once it hits a boundary (scroll chaining).
   *   3. otherwise the canvas pans.
   */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Always: stop the browser page-zooming or triggering back-navigation.
      e.preventDefault();
      cancelFlight();

      const rect = el.getBoundingClientRect();
      const anchor = { x: e.clientX - rect.left, y: e.clientY - rect.top };

      if (e.ctrlKey || e.metaKey) {
        // 0.0015 keeps a trackpad pinch smooth without a mouse wheel feeling
        // sluggish; the exponential keeps each notch a constant *ratio*.
        setCamera((c) => zoomAt(c, Math.exp(-e.deltaY * 0.0015), anchor));
        return;
      }

      const focused = focusedRef.current;
      const scroller = focused ? scrollRefs.current[focused] : null;

      if (
        scroller &&
        cameraRef.current.zoom >= FOCUS_SCROLL_ZOOM &&
        (e.target as HTMLElement | null)?.closest?.(
          `[data-frame="${focused}"]`
        )
      ) {
        const atTop = scroller.scrollTop <= 0;
        const atBottom =
          scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;
        const escaping = (e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom);

        if (!escaping) {
          scroller.scrollTop += e.deltaY;
          return;
        }
        // Fall through to panning — the frame is done with this gesture.
      }

      setCamera((c) => panBy(c, -e.deltaX, -e.deltaY));
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [cancelFlight]);

  /** Drag to pan. A drag that barely moves is treated as a click instead. */
  const dragRef = useRef<{
    id: number;
    lastX: number;
    lastY: number;
    travel: number;
  } | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    // Left button / primary touch only.
    if (e.button !== 0) return;
    cancelFlight();
    dragRef.current = { id: e.pointerId, lastX: e.clientX, lastY: e.clientY, travel: 0 };
    setIsPanning(true);

    // Capture keeps the pan alive when the pointer leaves the viewport, but it
    // throws for a pointer that is no longer active. Guarded, and set after
    // the state above, so a failure costs us the capture and not the grab
    // cursor or the drag itself.
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* pan still works from the pointermove handler */
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

    setCamera((c) => panBy(c, dx, dy));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    dragRef.current = null;
    setIsPanning(false);
    if (!drag || drag.id !== e.pointerId) return;

    if (drag.travel <= CLICK_SLOP_PX) {
      const frameEl = (e.target as HTMLElement | null)?.closest?.("[data-frame]");
      const id = frameEl?.getAttribute("data-frame");
      const frame = FRAMES.find((f) => f.id === id);

      if (frame) {
        focusFrame(frame);
      } else {
        fitAll();
      }
    }
  };

  // Keyboard: a real implementation needs far more, but escape-to-overview and
  // +/- zoom are the two that get used constantly while judging the feel.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") fitAll();
      if (e.key === "0") fitAll();

      if (e.key === "=" || e.key === "+" || e.key === "-") {
        const vp = viewportRef.current;
        const centre = { x: vp.w / 2, y: vp.h / 2 };
        const factor = e.key === "-" ? 1 / 1.2 : 1.2;
        setCamera((c) => zoomAt(c, factor, centre));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [fitAll]);

  // Culling is pointless at four frames, but wiring it in now means the real
  // build can't accidentally depend on every frame being mounted.
  const visibleFrames = FRAMES.filter((f) => isVisible(f, camera, viewport, 400));

  return (
    <div className="canvas-spike">
      <div
        ref={containerRef}
        className={`canvas-spike__viewport${isPanning ? " is-panning" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        // Read by the verification pass; also handy while eyeballing the feel.
        data-camera={`${camera.x.toFixed(1)},${camera.y.toFixed(1)},${camera.zoom.toFixed(3)}`}
        data-focused={focusedId ?? ""}
        data-visible={visibleFrames.length}
      >
        <div
          className="canvas-spike__stage"
          style={{ transform: cameraTransform(camera) }}
        >
          {visibleFrames.map((frame) => (
            <div
              key={frame.id}
              className="spike-frame-group"
              style={{
                left: frame.x,
                top: frame.y,
                width: frame.w,
                height: frame.h,
              }}
            >
              {/* Frame name sits above the frame and counter-scales, so it
                  stays legible at every zoom — as Figma's labels do. It lives
                  on this unclipped wrapper rather than inside the frame,
                  which clips its own overflow. */}
              <span
                className="spike-frame__name"
                style={{
                  transform: `scale(${1 / camera.zoom})`,
                  transformOrigin: "0 100%",
                }}
              >
                {frame.title}
              </span>

              <div
                data-frame={frame.id}
                className={`spike-frame${focusedId === frame.id ? " is-focused" : ""}`}
              >
              {frame.scrollable ? (
                <div
                  className="spike-frame__scroller"
                  ref={(el) => {
                    scrollRefs.current[frame.id] = el;
                  }}
                >
                  {Array.from({ length: 8 }, (_, i) => (
                    <div className="spike-block" key={i}>
                      <span>Block {i + 1}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="spike-frame__body">
                  <div className="spike-block spike-block--tall" />
                  <div className="spike-frame__row">
                    <div className="spike-block" />
                    <div className="spike-block" />
                  </div>
                </div>
              )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="canvas-spike__hud">
        <div className="canvas-spike__readout">
          <strong>{Math.round(camera.zoom * 100)}%</strong>
          <span>
            {Math.round(camera.x)}, {Math.round(camera.y)}
          </span>
          <span>{visibleFrames.length}/{FRAMES.length} mounted</span>
          <span>{focusedId ? `focus: ${focusedId}` : "no focus"}</span>
        </div>
        <div className="canvas-spike__actions">
          {FRAMES.map((f) => (
            <button key={f.id} type="button" onClick={() => focusFrame(f)}>
              {f.title.split(" — ")[0]}
            </button>
          ))}
          <button type="button" onClick={fitAll}>
            Fit all
          </button>
        </div>
        <p className="canvas-spike__hint">
          Drag to pan · wheel/two-finger to pan · ctrl or pinch to zoom · click a
          frame to fly to it · Esc to fit all · zoom range {MIN_ZOOM}–{MAX_ZOOM}
        </p>
      </div>
    </div>
  );
};

export default CanvasSpike;
