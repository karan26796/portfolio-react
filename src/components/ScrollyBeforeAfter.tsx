import React, { useEffect, useRef, useState } from "react";
import "../styles/ScrollyBeforeAfter.scss";

interface ScrollyBeforeAfterProps {
  /** Image URL for the before state. Ignored if a <scrolly-before> child slot is present. */
  before?: string;
  /** Image URL for the after state. Ignored if a <scrolly-after> child slot is present. */
  after?: string;
  beforelabel?: string;
  afterlabel?: string;
  children?: React.ReactNode;
}

/** Marker slot — its children render as the "before" visual instead of an image. */
export const ScrollyBeforeSlot: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
/** Marker slot — its children render as the "after" visual instead of an image. */
export const ScrollyAfterSlot: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;

const isSlot = (child: unknown, slot: React.FC<{ children?: React.ReactNode }>) =>
  React.isValidElement(child) && child.type === slot;

/**
 * Scroll-driven before/after reveal for case studies.
 * Steps (the children, one block of text per beat) scroll past a sticky
 * visual that crossfades from `before` to `after` as the reader progresses.
 *
 * The visual can be a real image (`before`/`after` URL props) or composed
 * content (a <scrolly-before>/<scrolly-after> child slot) — e.g. a coded
 * skeleton screen built from AwardCard/NomineeRow/AwardProgramCTA — so the
 * same component works for both photographic and coded before/afters.
 *
 * Usage inside project markdown:
 *   <scrolly-before-after before="/img/a.webp" after="/img/b.webp" beforelabel="Draft" afterlabel="Launched">
 *     <scrolly-step>Step one copy...</scrolly-step>
 *     <scrolly-step>Step two copy...</scrolly-step>
 *   </scrolly-before-after>
 *
 * or, with composed content instead of images:
 *   <scrolly-before-after beforelabel="Draft" afterlabel="Launched">
 *     <scrolly-before>...composed skeleton markup...</scrolly-before>
 *     <scrolly-after>...composed skeleton markup...</scrolly-after>
 *     <scrolly-step>Step one copy...</scrolly-step>
 *   </scrolly-before-after>
 */
const SHIFT_LINE_CONFIGS = [
  // Step 0: Draft / initial layout boundaries
  [
    { left: "12%", opacity: 0.85 },
    { left: "32%", opacity: 0.85 },
    { left: "70%", opacity: 0.2 }
  ],
  // Step 1: Add awards / grid alignment
  [
    { left: "18%", opacity: 0.9 },
    { left: "48%", opacity: 0.9 },
    { left: "78%", opacity: 0.9 }
  ],
  // Step 2: Flexible dates alignment
  [
    { left: "24%", opacity: 0.95 },
    { left: "58%", opacity: 0.95 },
    { left: "84%", opacity: 0.6 }
  ],
  // Step 3: Actionable CTA focus
  [
    { left: "35%", opacity: 0.3 },
    { left: "75%", opacity: 1 },
    { left: "92%", opacity: 0.9 }
  ],
  // Step 4: Launch / final output alignment
  [
    { left: "8%", opacity: 0.85 },
    { left: "50%", opacity: 0.85 },
    { left: "92%", opacity: 0.85 }
  ]
];

const ScrollyBeforeAfter: React.FC<ScrollyBeforeAfterProps> = ({
  before,
  after,
  beforelabel = "Before",
  afterlabel = "After",
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const allChildren = React.Children.toArray(children).filter(
    (child) => !(typeof child === "string" && child.trim() === "")
  );

  const beforeContent = allChildren.find((child) => isSlot(child, ScrollyBeforeSlot));
  const afterContent = allChildren.find((child) => isSlot(child, ScrollyAfterSlot));
  const steps = allChildren.filter(
    (child) => !isSlot(child, ScrollyBeforeSlot) && !isSlot(child, ScrollyAfterSlot)
  );

  useEffect(() => {
    let ticking = false;

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
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const containerTop =
        scrollParent === window ? 0 : (scrollParent as HTMLElement).getBoundingClientRect().top;
      const vh = viewportHeight();
      const relativeTop = rect.top - containerTop;
      const total = rect.height - vh;
      const scrolled = -relativeTop;
      const p = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
      setProgress(p);

      const viewportCenter = containerTop + vh / 2;
      let closestIdx = 0;
      let closestDist = Infinity;
      stepRefs.current.forEach((stepEl, i) => {
        if (!stepEl) return;
        const r = stepEl.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - viewportCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      });
      setActiveStep(closestIdx);
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

  const currentLines = SHIFT_LINE_CONFIGS[activeStep % SHIFT_LINE_CONFIGS.length];

  const handleStepClick = (index: number) => {
    const stepEl = stepRefs.current[index];
    if (stepEl) {
      stepEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="scrolly-before-after" ref={containerRef}>
      <div className="scrolly-steps">
        {steps.map((step, i) => (
          <div
            className={`scrolly-step${i === activeStep ? " is-active" : ""}`}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            key={i}
            onClick={() => handleStepClick(i)}
            role="button"
            tabIndex={0}
          >
            {step}
          </div>
        ))}
      </div>

      <div className="scrolly-sticky-visual">
        <div className={`scrolly-image-frame${beforeContent || afterContent ? " is-composed" : ""}`}>
          {/* Shifting alignment lines overlay */}
          <div className="scrolly-shift-lines" aria-hidden="true">
            {currentLines.map((line, idx) => (
              <div
                key={idx}
                className="shift-line"
                style={{
                  left: line.left,
                  opacity: line.opacity,
                }}
              />
            ))}
          </div>

          {beforeContent ? (
            <div className="scrolly-composed is-before" style={{ opacity: 1 - progress }}>
              {beforeContent}
            </div>
          ) : (
            <img src={before} alt={beforelabel} className="scrolly-image is-before" style={{ opacity: 1 - progress }} />
          )}
          {afterContent ? (
            <div className="scrolly-composed is-after" style={{ opacity: progress }}>
              {afterContent}
            </div>
          ) : (
            <img src={after} alt={afterlabel} className="scrolly-image is-after" style={{ opacity: progress }} />
          )}
          <div className="scrolly-label">
            <span className={progress < 0.5 ? "is-active" : ""}>{beforelabel}</span>
            <span className={progress >= 0.5 ? "is-active" : ""}>{afterlabel}</span>
          </div>
          <div className="scrolly-progress-track">
            <div className="scrolly-progress-fill" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollyBeforeAfter;
