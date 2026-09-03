import React, { useCallback, useEffect, useRef, useState } from 'react';
import experiments from "../utils/experiments";
import '../styles/HorizontalCarousel.scss';
import '../styles/Experiments.scss';
import ImageWithSkeleton from './ImageWithSkeleton';
import ScrollReveal from './ScrollReveal';

interface ExperimentsProps {
  title?: string;
  subtitle?: string;
  /**
   * "corkboard" is the scattered, pinned arrangement used on the archive page.
   * "grid" scatters the same media across a 12-column stage on two depth
   * layers that drift against each other as you scroll — for the home page,
   * where a section of fixed height sitting between the projects and the
   * testimonials would read as a detour.
   */
  layout?: 'corkboard' | 'grid';
}

/**
 * The grid scatter, hand-placed per index. The tiles span a full-bleed stage
 * — 12 columns across the page on desktop, 6 on a phone — at unequal widths,
 * aspect ratios and vertical offsets.
 *
 * `row`/`col`/`span` are explicit grid lines rather than auto-placement, so
 * the arrangement is exactly what is written here at both sizes instead of
 * whatever the source order happens to pack into.
 *
 * `offset` (px) drops a tile below the top of its row. It is applied as a
 * margin, not a transform: the row grows to contain it, so a tile can never
 * be pushed over its neighbour. The only transform on a tile is the parallax
 * drift, which is bounded well under the row gap for the same reason — an
 * earlier version staggered with transforms and the near layer covered the
 * far layer's caption.
 *
 * `m*` are the phone equivalents; `depth` picks the parallax layer and is
 * shared by both.
 */
const GRID_SCATTER = [
  { row: 1, col: 1, span: 4, ratio: '4 / 3', offset: 0, mRow: 1, mCol: 1, mSpan: 4, mOffset: 0, depth: 'back' },
  { row: 1, col: 6, span: 3, ratio: '3 / 4', offset: 48, mRow: 1, mCol: 5, mSpan: 2, mOffset: 30, depth: 'front' },
  { row: 1, col: 10, span: 3, ratio: '1 / 1', offset: 16, mRow: 2, mCol: 1, mSpan: 2, mOffset: 0, depth: 'back' },
  { row: 2, col: 2, span: 3, ratio: '1 / 1', offset: 0, mRow: 2, mCol: 3, mSpan: 4, mOffset: 20, depth: 'front' },
  { row: 2, col: 6, span: 4, ratio: '4 / 3', offset: 40, mRow: 3, mCol: 1, mSpan: 3, mOffset: 12, depth: 'back' },
  { row: 2, col: 10, span: 3, ratio: '16 / 10', offset: 8, mRow: 3, mCol: 4, mSpan: 3, mOffset: 0, depth: 'front' },
] as const;

// How far each layer travels, in px, across the section's whole pass through
// the viewport. Opposite signs: the far layer lags behind the scroll and the
// near one runs ahead of it, so the two separate in both directions rather
// than merely moving at different speeds in the same one.
//
// Their sum is what two vertically adjacent tiles can close on each other,
// so it has to stay under the stage's row gap less the height of a tile's
// name label, which hangs above its top edge — see the row-gap note in
// Experiments.scss, and --px-damp there, which scales both down to suit the
// tighter gap on a phone.
const PARALLAX_BACK = 28;
const PARALLAX_FRONT = -18;

// The four corner squares of the selection frame, clockwise from top-left.
const SELECTION_HANDLES = ['tl', 'tr', 'bl', 'br'] as const;

// How far an arrow key moves the selected frame, and how far it moves with
// shift held — the same pair of steps a design tool uses.
const NUDGE_STEP = 8;
const NUDGE_STEP_LARGE = 40;

interface Point {
  x: number;
  y: number;
}

const ORIGIN: Point = { x: 0, y: 0 };

// Hand-placed per-index so the scatter reads as arranged, not random.
const CORK_LAYOUT = [
  { top: '2%', left: '1%', rotate: -4 },
  { top: '0%', left: '35%', rotate: 3 },
  { top: '4%', left: '65%', rotate: -2 },
  { top: '54%', left: '15%', rotate: 4 },
  { top: '50%', left: '48%', rotate: -3 },
  { top: '56%', left: '76%', rotate: 2 },
];

const Experiments: React.FC<ExperimentsProps> = ({
  title = "Experiments",
  subtitle = "",
  layout = 'corkboard'
}) => {
  const isGrid = layout === 'grid';
  const stageRef = useRef<HTMLDivElement>(null);

  /**
   * Drives the two layers off the stage's own pass through the viewport,
   * writing the offsets as custom properties on the stage rather than through
   * React state — this runs on every scroll frame, and a re-render per frame
   * for two numbers would cost the whole subtree.
   *
   * Progress is 0 with the stage centred and ±1 at the two extremes (centre at
   * the bottom edge, centre at the top), so the layers cross zero mid-section
   * and ramp continuously either side of it instead of snapping at a boundary.
   */
  useEffect(() => {
    const stage = stageRef.current;
    if (!isGrid || !stage) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;

    const measure = () => {
      ticking = false;
      const rect = stage.getBoundingClientRect();
      const vh = window.innerHeight;
      const travel = (vh + rect.height) / 2;
      const progress = Math.max(-1, Math.min(1, (vh / 2 - (rect.top + rect.height / 2)) / travel));

      stage.style.setProperty('--px-back', `${(progress * PARALLAX_BACK).toFixed(2)}px`);
      stage.style.setProperty('--px-front', `${(progress * PARALLAX_FRONT).toFixed(2)}px`);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isGrid]);

  /**
   * Where each frame has been dragged to, keyed by index and applied as a
   * translation on top of its placement — so a frame that has been moved
   * still holds its grid cell, and nothing below it reflows.
   */
  const [positions, setPositions] = useState<Record<number, Point>>({});
  const [selected, setSelected] = useState<number | null>(null);

  /**
   * The drag in flight. A ref rather than state: pointermove fires far faster
   * than React should re-render, so the moving frame is written straight to
   * the DOM and only the final resting place is committed to state, which
   * re-renders it at the same coordinates it already has.
   */
  const drag = useRef<{
    index: number;
    node: HTMLElement;
    pointerId: number;
    originX: number;
    originY: number;
    base: Point;
    latest: Point;
  } | null>(null);

  const move = useCallback((index: number, to: Point) => {
    setPositions((prev) => ({ ...prev, [index]: to }));
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLElement>, index: number) => {
    setSelected(index);

    // Touch drags are left alone: the page has to keep scrolling under a
    // finger, and a frame that follows the thumb would eat that gesture. A
    // tap still selects.
    if (event.pointerType === 'touch') return;

    const node = event.currentTarget;
    // Capture keeps the moves coming even when the cursor outruns the frame.
    // It throws if the pointer is already gone, which is not worth failing the
    // drag over — the move handlers work without it.
    try {
      node.setPointerCapture(event.pointerId);
    } catch {
      /* no capture; the drag still tracks while the pointer is over the frame */
    }
    drag.current = {
      index,
      node,
      pointerId: event.pointerId,
      originX: event.clientX,
      originY: event.clientY,
      base: positions[index] ?? ORIGIN,
      latest: positions[index] ?? ORIGIN,
    };
    // Otherwise the browser starts its own image drag and the frame detaches.
    event.preventDefault();
  };

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const current = drag.current;
    if (!current || event.pointerId !== current.pointerId) return;

    current.latest = {
      x: current.base.x + (event.clientX - current.originX),
      y: current.base.y + (event.clientY - current.originY),
    };
    current.node.style.setProperty('--drag-x', `${current.latest.x}px`);
    current.node.style.setProperty('--drag-y', `${current.latest.y}px`);
  };

  const onPointerUp = (event: React.PointerEvent<HTMLElement>) => {
    const current = drag.current;
    if (!current || event.pointerId !== current.pointerId) return;

    drag.current = null;
    try {
      current.node.releasePointerCapture(event.pointerId);
    } catch {
      /* already released, e.g. the pointer left the window */
    }
    move(current.index, current.latest);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>, index: number) => {
    if (event.key === 'Escape') {
      setSelected(null);
      event.currentTarget.blur();
      return;
    }

    const step = event.shiftKey ? NUDGE_STEP_LARGE : NUDGE_STEP;
    const delta: Record<string, Point> = {
      ArrowLeft: { x: -step, y: 0 },
      ArrowRight: { x: step, y: 0 },
      ArrowUp: { x: 0, y: -step },
      ArrowDown: { x: 0, y: step },
    };
    const by = delta[event.key];
    if (!by) return;

    // The page would otherwise scroll out from under the frame being moved.
    event.preventDefault();
    setSelected(index);
    const from = positions[index] ?? ORIGIN;
    move(index, { x: from.x + by.x, y: from.y + by.y });
  };

  // Clicking the stage itself — the space between the frames — clears the
  // selection, as clicking empty canvas does.
  const onStagePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) setSelected(null);
  };

  return (
    <div className="experiments-section horizontal-carousel-section">
      {(title || subtitle) && (
        <ScrollReveal>
          <div className="carousel-section-header">
            <div className="header-text">
              {title && <h2>{title}</h2>}
              {subtitle && <p>{subtitle}</p>}
            </div>
          </div>
        </ScrollReveal>
      )}
      <div
        className={isGrid ? "experiments-grid" : "experiments-corkboard"}
        ref={isGrid ? stageRef : undefined}
        onPointerDown={isGrid ? onStagePointerDown : undefined}
      >
        {experiments.map((experiment, index) => {
          const pin = CORK_LAYOUT[index % CORK_LAYOUT.length];
          const label = experiment.caption ?? `Experiment ${index + 1}`;
          const media =
            experiment.type === "video" ? (
              <video
                src={experiment.src}
                autoPlay
                loop
                muted
                playsInline
                aria-label={label}
              />
            ) : (
              <ImageWithSkeleton src={experiment.src} alt={label} />
            );

          if (isGrid) {
            // Dressed as a selected frame on a design canvas — square corners,
            // a stroke, corner handles and the name sitting above the top-left
            // corner — rather than as a card. The stroke colour is the site's
            // existing --frame-stroke, the same selection blue the photo
            // canvas uses.
            const place = GRID_SCATTER[index % GRID_SCATTER.length];
            const at = positions[index] ?? ORIGIN;
            return (
              <figure
                key={index}
                className={`experiment-figure grid-item is-${place.depth}${
                  selected === index ? ' is-selected' : ''
                }`}
                tabIndex={0}
                onPointerDown={(event) => onPointerDown(event, index)}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onKeyDown={(event) => onKeyDown(event, index)}
                onFocus={() => setSelected(index)}
                style={
                  {
                    '--drag-x': `${at.x}px`,
                    '--drag-y': `${at.y}px`,
                    '--row': place.row,
                    '--col-start': place.col,
                    '--col-span': place.span,
                    '--offset': `${place.offset}px`,
                    '--m-row': place.mRow,
                    '--m-col-start': place.mCol,
                    '--m-col-span': place.mSpan,
                    '--m-offset': `${place.mOffset}px`,
                    '--ratio': place.ratio,
                  } as React.CSSProperties
                }
              >
                <div className="experiment-tile">
                  {experiment.caption && (
                    <figcaption className="experiment-tile-label">
                      {experiment.caption}
                    </figcaption>
                  )}
                  <div className="experiment-media-wrapper">{media}</div>
                  {SELECTION_HANDLES.map((corner) => (
                    <span
                      key={corner}
                      className={`experiment-tile-handle is-${corner}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </figure>
            );
          }

          return (
            <figure
              key={index}
              className="experiment-figure cork-item"
              style={{ top: pin.top, left: pin.left, '--rotate': `${pin.rotate}deg` } as React.CSSProperties}
            >
              <span className="cork-pin" aria-hidden="true" />
              <div className="experiment-card-gallery-style">
                <div className="experiment-media-wrapper">{media}</div>
                {experiment.caption && (
                  <div className="experiment-caption-handwritten">
                    {experiment.caption}
                  </div>
                )}
              </div>
            </figure>
          );
        })}
      </div>
    </div>
  );
};

export default Experiments;
