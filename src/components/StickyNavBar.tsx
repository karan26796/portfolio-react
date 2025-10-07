import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  House,
  FigmaLogo,
  Camera,
  ArrowLeft,
  ArrowRight,
  PencilRuler,
  List,
  X,
  LinkedinLogo
} from "@phosphor-icons/react";
import "../styles/StickyNavBar.scss";
import { projectSummaries } from "../utils/ProjectSummaries";
import Button from "./Buttons";
import ResumePopup from "../pages/ResumePopup";

// ============================================================================
// BREAKPOINTS
// ============================================================================
const BREAKPOINT_MOBILE = 800; // Mobile/tablet breakpoint
const BREAKPOINT_SMALL = 776;  // Small screen breakpoint for text hiding

const StickyNavBar: React.FC = () => {
  // ============================================================================
  // HOOKS & STATE
  // ============================================================================
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Theme state - persisted in localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // Responsive breakpoint states
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= BREAKPOINT_MOBILE);
  const [isBelow776, setIsBelow776] = useState(() => window.innerWidth < BREAKPOINT_SMALL);

  // UI states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  // ============================================================================
  // PROJECT NAVIGATION HELPERS
  // ============================================================================
  const isProjectDetailPage = location.pathname.startsWith('/project/');
  const currentProjectId = isProjectDetailPage ? location.pathname.split('/').pop() : null;

  const getNextProjectId = () => {
    if (!currentProjectId) return null;
    const currentIndex = projectSummaries.findIndex(p => p.id === currentProjectId);
    if (currentIndex === -1 || currentIndex === projectSummaries.length - 1) return null;
    return projectSummaries[currentIndex + 1].id;
  };

  // ============================================================================
  // NAVIGATION HANDLERS
  // ============================================================================
  const handleBack = () => {
    navigate('/home');
  };

  const handleNext = () => {
    const nextId = getNextProjectId();
    if (nextId) {
      navigate(`/project/${nextId}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // ============================================================================
  // HOVER INDICATOR ANIMATION
  // ============================================================================
  const moveIndicator = (el: HTMLElement) => {
    const { offsetLeft, offsetWidth } = el;
    setIndicatorStyle({
      left: `${offsetLeft}px`,
      width: `${offsetWidth}px`
    });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    moveIndicator(e.currentTarget);
  };

  const handleMouseLeave = () => {
    const activeEl = containerRef.current?.querySelector(".a-header.active");
    if (activeEl) {
      moveIndicator(activeEl as HTMLElement);
    }
  };

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Handle window resize - update breakpoint states
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= BREAKPOINT_MOBILE);
      setIsBelow776(window.innerWidth < BREAKPOINT_SMALL);

      // Auto-close mobile menu when resizing to desktop
      if (window.innerWidth > BREAKPOINT_MOBILE) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Update hover indicator position on route change
  useEffect(() => {
    const activeEl = containerRef.current?.querySelector(".a-header.active");
    if (activeEl) {
      moveIndicator(activeEl as HTMLElement);
    }
  }, [location.pathname]);

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // ============================================================================
  // RENDER: PROJECT DETAIL PAGE NAVIGATION
  // ============================================================================
  if (isProjectDetailPage) {
    return (
      <div className="container-nav">
        <nav className="navbar main-nav active project-nav" ref={containerRef}>
          <div className="hover-indicator" style={indicatorStyle}></div>

          {/* Back to Home */}
          <Link
            to="/home"
            className="a-header"
            onClick={handleBack}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ArrowLeft size={18} weight="duotone" />
            <span>Back</span>
          </Link>

          {/* Next Project */}
          <Link
            to={getNextProjectId() ? `/project/${getNextProjectId()}` : '#'}
            className="a-header"
            onClick={e => {
              if (!getNextProjectId()) {
                e.preventDefault();
                return;
              }
              handleNext();
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-disabled={!getNextProjectId()}
            tabIndex={getNextProjectId() ? 0 : -1}
            style={!getNextProjectId() ? { pointerEvents: 'none', opacity: 0.5 } : {}}
          >
            <span>Next</span>
            <ArrowRight size={18} weight="duotone" />
          </Link>
        </nav>
      </div>
    );
  }

  // ============================================================================
  // RENDER: MAIN NAVIGATION
  // ============================================================================
  return (
    <div className="container-nav">
      <nav className="navbar main-nav active" ref={containerRef}>
        {/* Left Section - LinkedIn icon for desktop */}
        <div className="navbar-left">
          {!isMobile && (
            <Button
              variant="secondary"
              withText={false}
              onClick={() => window.open("https://www.linkedin.com/in/karankapoorux/", "_blank", "noopener,noreferrer")}
              size="m"
              withIcon={true}
              iconName="LinkedinLogo"
              className="a-header linkedin-btn"
            />
          )}
        </div>

        {/* Center Section - Main Navigation */}
        <div className="navbar-center">
          <div className="hover-indicator" style={indicatorStyle}></div>

          {/* Home Link */}
          <Link
            to="/home"
            className={`a-header${location.pathname === "/home" ? " active" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <House size={18} weight="duotone" />
            <span style={isBelow776 ? { display: "inline" } : undefined}>
              Home
            </span>
          </Link>

          {/* Experiments Link */}
          <Link
            to="/archive"
            className={`a-header${location.pathname === "/archive" ? " active" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <PencilRuler size={18} weight="duotone" />
            <span>Experiments</span>
          </Link>

          {/* ================================================================== */}
          {/* MOBILE NAVIGATION */}
          {/* ================================================================== */}
          {isMobile ? (
            <div className="menu-dropdown" ref={menuRef}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* LinkedIn - Mobile */}
                <a
                  href="https://www.linkedin.com/in/karankapoorux/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="a-header linkedin-btn"
                >
                  <LinkedinLogo size={18} weight="duotone" />
                </a>

                {/* Menu Toggle Button */}
                <button
                  className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
                  onClick={toggleMenu}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMenuOpen}
                >
                  {isMenuOpen ? <X size={18} weight="duotone" /> : <List size={18} />}
                </button>
              </div>

              {/* Dropdown Menu Content */}
              <div className={`menu-content ${isMenuOpen ? 'open' : ''}`}>
                <Link
                  to="/figma-training"
                  className={`menu-item a-header${location.pathname === "/figma-training" ? " active" : ""}`}
                >
                  <FigmaLogo size={18} weight="duotone" />
                  <span>Design Training</span>
                </Link>

                <Link
                  to="/gallery"
                  className={`menu-item a-header${location.pathname === "/gallery" ? " active" : ""}`}
                >
                  <Camera size={18} weight="duotone" />
                  <span>Travel</span>
                </Link>
              </div>

              {/* Backdrop Overlay */}
              {isMenuOpen && (
                <div className="menu-backdrop" onClick={() => setIsMenuOpen(false)} />
              )}
            </div>
          ) : (
            /* ================================================================ */
            /* DESKTOP NAVIGATION */
            /* ================================================================ */
            <>
              {/* Figma Training Link - Desktop */}
              <Link
                to="/figma-training"
                className={`a-header${location.pathname === "/figma-training" ? " active" : ""}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <FigmaLogo size={18} weight="duotone" />
                <span style={isBelow776 ? { display: "inline" } : undefined}>
                  Design Training
                </span>
              </Link>

              {/* Gallery Link - Desktop */}
              <Link
                to="/gallery"
                className={`a-header${location.pathname === "/gallery" ? " active" : ""}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Camera size={18} weight="duotone" />
                <span>Travel</span>
              </Link>
            </>
          )}
        </div>

        {/* Right Section - Resume Button (Desktop Only) */}
        {!isMobile && (
          <>
            <div className="navbar-right">
              {location.pathname === "/home" ? (
                <Button
                  text="Let's work together"
                  onClick={() => {
                    const section = document.getElementById("contact");
                    if (section) {
                      section.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  variant="primary"
                  size="s"
                  withIcon={false}
                  iconName="FileText"
                />
              ) : (
                <Button
                  text="View Resume"
                  onClick={() => setIsResumeOpen(true)}
                  variant="tertiary"
                  size="s"
                  withIcon={true}
                  iconName="FileText"
                />
              )}
            </div>
            <ResumePopup isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
          </>
        )}
      </nav>
    </div>
  );
};

export default StickyNavBar;