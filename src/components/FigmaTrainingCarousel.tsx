import React, { useCallback, useEffect, useRef, useState } from 'react';
import ImageWithSkeleton from './ImageWithSkeleton';
import '../styles/HorizontalCarousel.scss';
import '../styles/Experiments.scss';

interface TrainingItem {
  id: string;
  image: string;
  title: string;
  location: string;
  isVideo?: boolean;
  aspectRatio: string;
}

const trainingItems: TrainingItem[] = [
  {
    id: 'iim-sbp',
    image: '/figma-training/IIM%20SBP.mp4',
    title: '300+ students in attendance',
    location: 'IIM Sambalpur',
    isVideo: true,
    aspectRatio: '405 / 720',
  },
  {
    id: 'training-8',
    image: '/figma-training/training8.webp',
    title: 'Figma Workshop for PMs',
    location: 'IIM Sambalpur',
    aspectRatio: '3009 / 2427',
  },
  {
    id: 'flame',
    image: '/figma-training/Flame.mp4',
    title: 'Figma for students',
    location: 'FLAME University',
    isVideo: true,
    aspectRatio: '841 / 720',
  },
  {
    id: 'training-10',
    image: '/figma-training/training10.webp',
    title: 'Design to development with AI',
    location: 'T-Hub, Hyderabad',
    aspectRatio: '3008 / 2684',
  },
  {
    id: 'training-9',
    image: '/figma-training/training9.webp',
    title: "Hosting the Figma Config '24 event",
    location: 'IIT Delhi',
    aspectRatio: '3010 / 2367',
  },
  {
    id: 'training-11',
    image: '/figma-training/training11.webp',
    title: "Hosting the Figma Config '25 event",
    location: 'Microsoft, Noida',
    aspectRatio: '1024 / 768',
  },
  {
    id: 'training-2',
    image: '/figma-training/training2.webp',
    title: 'Figma training for students',
    location: 'Indiana University, US',
    aspectRatio: '3010 / 2737',
  },
  {
    id: 'training-12',
    image: '/figma-training/training12.webp',
    title: 'Boosting design workflows',
    location: 'Keka',
    aspectRatio: '1024 / 768',
  },
  {
    id: 'training-13',
    image: '/figma-training/training13.webp',
    title: 'Figma training for PMs',
    location: 'IIM Shillong',
    aspectRatio: '1280 / 800',
  },
];

/**
 * 9-item grid scatter mirroring the design tool canvas aesthetic from the
 * experiments section: full-bleed 12-column stage (6 on phones) with natural
 * aspect ratios, unequal widths, vertical offsets, and dual parallax depth layers.
 */
const GRID_SCATTER = [
  // Row 1
  { row: 1, col: 1, span: 3, offset: 0, mRow: 1, mCol: 1, mSpan: 3, mOffset: 0, depth: 'back' },
  { row: 1, col: 5, span: 4, offset: 40, mRow: 1, mCol: 4, mSpan: 3, mOffset: 24, depth: 'front' },
  { row: 1, col: 10, span: 3, offset: 12, mRow: 2, mCol: 1, mSpan: 3, mOffset: 0, depth: 'back' },
  // Row 2
  { row: 2, col: 2, span: 3, offset: 0, mRow: 2, mCol: 4, mSpan: 3, mOffset: 24, depth: 'front' },
  { row: 2, col: 6, span: 4, offset: 48, mRow: 3, mCol: 1, mSpan: 4, mOffset: 12, depth: 'back' },
  { row: 2, col: 10, span: 3, offset: 8, mRow: 3, mCol: 5, mSpan: 2, mOffset: 0, depth: 'front' },
  // Row 3
  { row: 3, col: 1, span: 4, offset: 16, mRow: 4, mCol: 1, mSpan: 3, mOffset: 0, depth: 'back' },
  { row: 3, col: 6, span: 3, offset: 0, mRow: 4, mCol: 4, mSpan: 3, mOffset: 20, depth: 'front' },
  { row: 3, col: 9, span: 4, offset: 36, mRow: 5, mCol: 2, mSpan: 4, mOffset: 10, depth: 'back' },
] as const;

const PARALLAX_BACK = 28;
const PARALLAX_FRONT = -18;
const SELECTION_HANDLES = ['tl', 'tr', 'bl', 'br'] as const;
const NUDGE_STEP = 8;
const NUDGE_STEP_LARGE = 40;

interface Point {
  x: number;
  y: number;
}

const ORIGIN: Point = { x: 0, y: 0 };

const FigmaTrainingCarousel: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Record<number, Point>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [mediaRatios, setMediaRatios] = useState<Record<string, string>>({});

  const drag = useRef<{
    index: number;
    node: HTMLElement;
    pointerId: number;
    originX: number;
    originY: number;
    base: Point;
    latest: Point;
  } | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
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
  }, []);

  const move = useCallback((index: number, to: Point) => {
    setPositions((prev) => ({ ...prev, [index]: to }));
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLElement>, index: number) => {
    setSelected(index);
    if (event.pointerType === 'touch') return;

    const node = event.currentTarget;
    try {
      node.setPointerCapture(event.pointerId);
    } catch {
      /* no capture; fallback still works */
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
      /* already released */
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

    event.preventDefault();
    setSelected(index);
    const from = positions[index] ?? ORIGIN;
    move(index, { x: from.x + by.x, y: from.y + by.y });
  };

  const onStagePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) setSelected(null);
  };

  return (
    <div className="experiments-section horizontal-carousel-section home-experiments-section">
      <div
        className="experiments-grid"
        ref={stageRef}
        onPointerDown={onStagePointerDown}
      >
        {trainingItems.map((item, index) => {
          const place = GRID_SCATTER[index % GRID_SCATTER.length];
          const at = positions[index] ?? ORIGIN;
          const label = `${item.location} • ${item.title}`;
          const ratio = mediaRatios[item.id] || item.aspectRatio;

          const media = item.isVideo ? (
            <video
              src={item.image}
              autoPlay
              loop
              muted
              playsInline
              aria-label={label}
              onLoadedMetadata={(e) => {
                const { videoWidth, videoHeight } = e.currentTarget;
                if (videoWidth && videoHeight) {
                  setMediaRatios((prev) => ({
                    ...prev,
                    [item.id]: `${videoWidth} / ${videoHeight}`,
                  }));
                }
              }}
            />
          ) : (
            <ImageWithSkeleton
              src={item.image}
              alt={label}
              loading="lazy"
              onLoad={(e) => {
                const { naturalWidth, naturalHeight } = e.currentTarget;
                if (naturalWidth && naturalHeight) {
                  setMediaRatios((prev) => ({
                    ...prev,
                    [item.id]: `${naturalWidth} / ${naturalHeight}`,
                  }));
                }
              }}
            />
          );

          return (
            <figure
              key={item.id}
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
                  '--ratio': ratio,
                } as React.CSSProperties
              }
            >
              <div className="experiment-tile">
                <figcaption className="experiment-tile-label">
                  {label}
                </figcaption>
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
        })}
      </div>
    </div>
  );
};

export default FigmaTrainingCarousel;
