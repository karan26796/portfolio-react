import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import ResumePopup from "../pages/ResumePopup";
import "../styles/StickyNavBar.scss";

// Scrolling must move this far before the bar reacts, so small jitter and
// iOS rubber-banding don't flicker it.
const SCROLL_DELTA = 6;
// Above this the bar always shows — hiding it right at the top of the page
// reads as a glitch rather than an intent to get it out of the way.
const ALWAYS_VISIBLE_ABOVE = 80;

// The pages the menu lists, in the order they appear.
const NAV_PAGES: { to: string; label: string }[] = [
  { to: "/home", label: "Work" },
  { to: "/figma-training", label: "Figma training" },
  { to: "/gallery", label: "Travel" },
];

const StickyNavBar: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const location = useLocation();
  const isHome = location.pathname === "/home" || location.pathname === "/";

  const isActive = (to: string) =>
    to === "/home" ? isHome : location.pathname === to;

  // Slide the bar away when scrolling down and bring it back on the way up.
  useEffect(() => {
    let lastY = Math.max(0, window.scrollY);

    // Deliberately not rAF-throttled: the threshold below already gates how
    // often this can change, and setting a boolean to its current value is a
    // no-op in React. rAF would also stall the bar in a backgrounded tab.
    const handleScroll = () => {
      // Clamped because iOS reports negative values while overscrolling.
      const y = Math.max(0, window.scrollY);
      const diff = y - lastY;

      // `lastY` only advances once the threshold is cleared, so slow scrolls
      // still accumulate to a direction change rather than being swallowed.
      if (Math.abs(diff) < SCROLL_DELTA) return;

      setIsHidden(y > ALWAYS_VISIBLE_ABOVE && diff > 0);
      lastY = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Any route change starts at the top, so the bar should be showing — and the
  // menu, having done its job, should be closed.
  useEffect(() => {
    setIsHidden(false);
    setIsMenuOpen(false);
  }, [location.pathname]);

  // While the full-page menu is up, Escape closes it and the page behind it
  // stays put instead of scrolling under the overlay.
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  // The toggle doubles as the menu's close button, so the bar has to stay on
  // screen while the menu is up even if the last scroll had slid it away.
  const isBarHidden = isHidden && !isMenuOpen;

  return (
    <header className={`container-nav desktop-top-nav${isBarHidden ? " is-hidden" : ""}`}>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/home" className="navbar-name-link">
            <span className="navbar-name">केके</span>
          </Link>
        </div>

        <button
          type="button"
          className={`navbar-menu-toggle${isMenuOpen ? " is-open" : ""}`}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className="navbar-menu-toggle__bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </nav>

      {/* Rendered through a portal rather than inside <header>: the header is
          `position: fixed` and uses `transform`/`will-change: transform` to
          slide away, which would make it the containing block for a fixed
          child and shrink the overlay to the height of the bar. */}
      {isMenuOpen &&
        createPortal(
          <div className="nav-menu-overlay" role="dialog" aria-modal="true">
            <nav className="nav-menu-list">
              {NAV_PAGES.map((page, index) => (
                <Link
                  key={page.to}
                  to={page.to}
                  className={`nav-menu-item${isActive(page.to) ? " active" : ""}`}
                  // Each row rises in just behind the one above it.
                  style={{ animationDelay: `${60 + index * 55}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="nav-menu-item__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="nav-menu-item__label">{page.label}</span>
                </Link>
              ))}
            </nav>
          </div>,
          document.body
        )}

      <ResumePopup isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </header>
  );
};

export default StickyNavBar;
