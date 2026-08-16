import React, { useState, useEffect } from "react";
import {
  CaretLeft,
  CaretRight,
  X,
  ArrowsOutSimple,
  ArrowsInSimple,
} from "@phosphor-icons/react";
import "../styles/ReaderModeHeader.scss";

interface ReaderModeHeaderProps {
  currentProjectId: string;
  projectList: { id: string; title: string; company?: string }[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

const ReaderModeHeader: React.FC<ReaderModeHeaderProps> = ({
  currentProjectId,
  projectList,
  onClose,
  onPrev,
  onNext,
  isExpanded = false,
  onToggleExpand,
}) => {
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [dragY, setDragY] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  // Touch drag-down handlers for mobile pull-down action
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY === null) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY;
    if (diff > 0) {
      setDragY(diff);
    }
  };

  const handleTouchEnd = () => {
    if (dragY > 100) {
      onClose();
    }
    setTouchStartY(null);
    setDragY(0);
  };

  return (
    <>
      {/* Mobile Top Drag Handle Pill */}
      <div
        className="mobile-top-pull-bar"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="handle-pill" />
      </div>

      <div
        className="reader-mode-header-sticky"
        style={{
          transform: dragY > 0 ? `translateY(${dragY}px)` : "none",
          transition: dragY === 0 ? "transform 0.2s ease" : "none",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="reader-topbar-content">
          {/* Left Side: Expand Toggle (Desktop only) & Prev/Next Arrows */}
          <div className="reader-topbar-left">
            {onToggleExpand && (
              <>
                <button
                  className="reader-icon-btn reader-expand-btn"
                  onClick={onToggleExpand}
                  title={isExpanded ? "Center view" : "Full width view"}
                  aria-label="Toggle view width"
                >
                  {isExpanded ? (
                    <ArrowsInSimple size={16} weight="bold" />
                  ) : (
                    <ArrowsOutSimple size={16} weight="bold" />
                  )}
                </button>
                <div className="reader-divider reader-expand-divider" />
              </>
            )}

            {/* Prev / Next Case Study Navigation */}
            <div className="reader-nav-cluster">
              <button
                className="nav-btn"
                onClick={onPrev}
                title="Previous Case Study (← Left Arrow)"
                aria-label="Previous case study"
              >
                <CaretLeft size={20} weight="bold" />
              </button>
              <button
                className="nav-btn"
                onClick={onNext}
                title="Next Case Study (→ Right Arrow)"
                aria-label="Next case study"
              >
                <CaretRight size={20} weight="bold" />
              </button>
            </div>
          </div>

          {/* Right Side: Close Cross Button */}
          <div className="reader-topbar-right">
            <button
              className="reader-close-btn"
              onClick={onClose}
              title="Close Case Study (Esc)"
              aria-label="Close reader mode"
            >
              <X size={18} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReaderModeHeader;
