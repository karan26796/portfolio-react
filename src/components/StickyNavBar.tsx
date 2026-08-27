import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { House, FigmaLogo, Camera } from "@phosphor-icons/react";
import ResumePopup from "../pages/ResumePopup";
import "../styles/StickyNavBar.scss";

// Scrolling must move this far before the bar reacts, so small jitter and
// iOS rubber-banding don't flicker it.
const SCROLL_DELTA = 6;
// Above this the bar always shows — hiding it right at the top of the page
// reads as a glitch rather than an intent to get it out of the way.
const ALWAYS_VISIBLE_ABOVE = 80;

// The pages the nav lists, in order. The icon lives here with the label so the
// bar and the mobile overlay stay in step from one definition.
const NAV_PAGES: {
  to: string;
  label: string;
  Icon: React.ComponentType<{ size?: number; weight?: "regular" | "bold" }>;
}[] = [
  { to: "/home", label: "Work", Icon: House },
  { to: "/figma-training", label: "Figma training", Icon: FigmaLogo },
  { to: "/gallery", label: "Travel", Icon: Camera },
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

  // Tidies the state when the viewport grows past the breakpoint. The CSS
  // already guarantees the overlay is hidden and the page scrollable up there,
  // so this is housekeeping rather than the actual guard.
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 769px)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsMenuOpen(false);
    };

    wide.addEventListener("change", handleChange);
    return () => wide.removeEventListener("change", handleChange);
  }, []);

  // While the full-page menu is up, Escape closes it and the page behind it
  // stays put instead of scrolling under the overlay.
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    // A class rather than an inline style: the lock is scoped to the mobile
    // breakpoint in CSS, so growing the viewport past it frees the page even
    // if no resize event ever arrives.
    document.body.classList.add("nav-menu-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("nav-menu-open");
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

        {/* Exposed on web. Below the mobile breakpoint these are hidden and
            the three-line toggle below takes over — both read the same
            NAV_PAGES, so the list is defined once. */}
        <div className="navbar-right-links">
          {NAV_PAGES.map(({ to, label, Icon }) => (
            <Link
              key={to}
              to={to}
              className={`a-header${isActive(to) ? " active" : ""}`}
            >
              <Icon size={18} weight={isActive(to) ? "bold" : "regular"} />
              <span>{label}</span>
            </Link>
          ))}
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
          <div
            className="nav-menu-overlay"
            role="dialog"
            aria-modal="true"
            // Tapping the dimmed area outside the sheet closes it, which is
            // what a sheet trains people to expect.
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsMenuOpen(false);
            }}
          >
            <nav className="nav-menu-sheet" aria-label="Pages">
              <span className="nav-menu-sheet__handle" aria-hidden="true" />
                {NAV_PAGES.map(({ to, label, Icon }, index) => (
                  <Link
                    key={to}
                    to={to}
                    className={`nav-menu-item${isActive(to) ? " active" : ""}`}
                    // Each row rises in just behind the one above it.
                    style={{ animationDelay: `${60 + index * 55}ms` }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="nav-menu-item__index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon size={26} weight={isActive(to) ? "bold" : "regular"} />
                    <span className="nav-menu-item__label">{label}</span>
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
