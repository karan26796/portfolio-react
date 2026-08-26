import React from "react";
import "../styles/ProjectScrollIndicator.scss";

interface ProjectScrollIndicatorProps {
  /** 0-based index of whichever project card currently fills the viewport. */
  activeIndex: number;
  /** 0 (card just entered) to 1 (card about to hand off to the next one). */
  progress: number;
  total: number;
  /** Only shown while the project stack is actually pinned on screen. */
  visible: boolean;
}

/**
 * Right-edge scroll companion for the vertical project-card stack, modeled
 * on semaloop.com's step indicator: every project renders as the same small
 * pill, but the active one stretches into a tall capsule with a diamond
 * that travels top-to-bottom inside it as the reader scrolls through that
 * card. Inactive pills collapse to plain dots, so the whole list reads as
 * one continuous column with the current step "expanded" in place.
 */
const ProjectScrollIndicator: React.FC<ProjectScrollIndicatorProps> = ({ activeIndex, progress, total, visible }) => {
  const clamped = Math.max(0, Math.min(1, progress));

  return (
    <div className={`project-scroll-indicator${visible ? " is-visible" : ""}`} aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === activeIndex;
        return (
          <div key={i} className={`project-scroll-indicator__pill${isActive ? " is-active" : ""}`}>
            <span
              className="project-scroll-indicator__dot"
              style={
                isActive
                  ? { top: `${clamped * 100}%`, transform: `translate(-50%, -50%) rotate(${45 + clamped * 315}deg)` }
                  : undefined
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProjectScrollIndicator;
