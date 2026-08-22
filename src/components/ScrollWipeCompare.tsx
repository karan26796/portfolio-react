import React, { useEffect, useRef, useState } from "react";
import { ArrowsVertical } from "@phosphor-icons/react";
import "../styles/ScrollWipeCompare.scss";

interface ScrollWipeCompareProps {
  before: string;
  after: string;
  beforelabel?: string;
  afterlabel?: string;
  /** Caption shown above the frame, describing the old system. */
  beforecaption?: string;
  /** Caption shown below the frame, describing the new system. */
  aftercaption?: string;
}

/**
 * Single-frame before/after slider — both static images sit in one frame,
 * split by a horizontal divider whose position tracks scroll progress,
 * sweeping top to bottom automatically instead of requiring the reader to
 * drag a handle (the reader can also drag the handle directly at any time).
 * Only one label is shown at a time, matching whichever side is dominant.
 * The sweep only starts once the whole frame has scrolled into view, not as
 * it's entering.
 *
 * Usage inside project markdown:
 *   <wipe-compare before="/img/old.png" after="/img/new.png" beforelabel="Old" afterlabel="New"
 *     beforecaption="What the old system showed" aftercaption="What the new system shows" />
 */
const ScrollWipeCompare: React.FC<ScrollWipeCompareProps> = ({
  before,
  after,
  beforelabel = "Before",
  afterlabel = "After",
  beforecaption,
  aftercaption,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const isDraggingRef = useRef(false);

  // The two screenshots are rarely captured at the same resolution. Fitting
  // each independently into the same box (object-fit: cover) scales them by
  // different factors, so UI elements end up visibly different sizes between
  // "before" and "after". Instead, measure both images' real dimensions and
  // apply one shared scale — computed from whichever is wider — so 1 native
  // pixel renders the same size in both. The smaller image ends up centered
  // with a little breathing room rather than stretched to fill.
  const [naturalSizes, setNaturalSizes] = useState<{
    before?: { w: number; h: number };
    after?: { w: number; h: number };
  }>({});

  const handleBeforeLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setNaturalSizes((s) => ({ ...s, before: { w: img.naturalWidth, h: img.naturalHeight } }));
  };

  const handleAfterLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setNaturalSizes((s) => ({ ...s, after: { w: img.naturalWidth, h: img.naturalHeight } }));
  };

  let frameStyle: React.CSSProperties = {};
  let beforeImgStyle: React.CSSProperties = {};
  let afterImgStyle: React.CSSProperties = {};

  if (naturalSizes.before && naturalSizes.after) {
    const refWidth = Math.max(naturalSizes.before.w, naturalSizes.after.w);
    const beforeWPct = (naturalSizes.before.w / refWidth) * 100;
    const beforeHPct = (naturalSizes.before.h / refWidth) * 100;
    const afterWPct = (naturalSizes.after.w / refWidth) * 100;
    const afterHPct = (naturalSizes.after.h / refWidth) * 100;
    const maxHPct = Math.max(beforeHPct, afterHPct);

    frameStyle = { aspectRatio: `100 / ${maxHPct}` };
    beforeImgStyle = { width: `${beforeWPct}%`, height: `${(beforeHPct / maxHPct) * 100}%` };
    afterImgStyle = { width: `${afterWPct}%`, height: `${(afterHPct / maxHPct) * 100}%` };
  }

  const setProgressFromPointerY = (clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = (clientY - rect.top) / rect.height;
    setProgress(Math.min(1, Math.max(0, ratio)));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    isDraggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setProgressFromPointerY(e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    setProgressFromPointerY(e.clientY);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  useEffect(() => {
    let ticking = false;

    // Case studies scroll inside a custom overlay container, not the window,
    // so find whichever ancestor is actually scrollable and measure against it.
    const findScrollParent = (node: HTMLElement | null): HTMLElement | Window => {
      let current = node?.parentElement ?? null;
      while (current) {
        const style = getComputedStyle(current);
        if (
          /(auto|scroll)/.test(style.overflowY) &&
          current.scrollHeight > current.clientHeight
        ) {
          return current;
        }
        current = current.parentElement;
      }
      return window;
    };

    const scrollParent = findScrollParent(containerRef.current);
    const viewportHeight = () =>
      scrollParent === window
        ? window.innerHeight
        : (scrollParent as HTMLElement).clientHeight;

    const measure = () => {
      ticking = false;
      if (isDraggingRef.current) return;
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const containerTop =
        scrollParent === window ? 0 : (scrollParent as HTMLElement).getBoundingClientRect().top;
      const vh = viewportHeight();
      // Don't start the sweep until the whole frame has scrolled fully into
      // view (its bottom edge has cleared the viewport bottom). The sweep
      // then covers a fixed scroll distance (independent of the frame's own
      // height, which varies with viewport width) so it always plays out
      // gradually instead of snapping through for tall frames.
      const enterPoint = vh - rect.height;
      const sweepDistance = vh * 0.32;
      const relativeTop = rect.top - containerTop;
      const traveled = enterPoint - relativeTop;
      const p = Math.min(1, Math.max(0, traveled / sweepDistance));
      setProgress(p);
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(measure);
      }
    };

    measure();
    scrollParent.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      scrollParent.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const dividerPos = progress * 100;

  return (
    <div className="scroll-wipe-compare" ref={containerRef}>
      {beforecaption && (
        <div className="scroll-wipe-caption scroll-wipe-caption--before">{beforecaption}</div>
      )}
      <div
        className="scroll-wipe-frame"
        ref={frameRef}
        style={frameStyle}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="scroll-wipe-canvas" ref={canvasRef}>
          <img
            src={before}
            alt={beforelabel}
            className="scroll-wipe-image scroll-wipe-image--before"
            draggable={false}
            onLoad={handleBeforeLoad}
            style={beforeImgStyle}
          />
          <div className="scroll-wipe-image-clip" style={{ clipPath: `inset(0 0 ${100 - dividerPos}% 0)` }}>
            <img
              src={after}
              alt={afterlabel}
              className="scroll-wipe-image scroll-wipe-image--after"
              draggable={false}
              onLoad={handleAfterLoad}
              style={afterImgStyle}
            />
          </div>

          <div className="scroll-wipe-divider" style={{ top: `${dividerPos}%` }}>
            <div className="scroll-wipe-handle">
              <ArrowsVertical size={14} weight="bold" />
            </div>
          </div>

          <div className="scroll-wipe-label">{progress < 0.5 ? beforelabel : afterlabel}</div>
        </div>
      </div>
      {aftercaption && (
        <div className="scroll-wipe-caption scroll-wipe-caption--after">{aftercaption}</div>
      )}
    </div>
  );
};

export default ScrollWipeCompare;
