import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  House,
  FigmaLogo,
  Camera,
  ArrowLeft,
  ArrowRight,
  List,
  X,
  XLogo,
  LinkedinLogo,
  Sun,
  Moon
} from "@phosphor-icons/react";
import "../styles/StickyNavBar.scss";
import { useProjects } from "../utils/useProjects";
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



  // Responsive breakpoint states
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= BREAKPOINT_MOBILE);
  const [isBelow776, setIsBelow776] = useState(() => window.innerWidth < BREAKPOINT_SMALL);

  // UI states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') || 'dark';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // ============================================================================
  // PROJECT NAVIGATION HELPERS
  // ============================================================================
  const { projects: projectSummaries } = useProjects();
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

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      // If they had light saved previously, let's force them to dark once
      localStorage.setItem('theme', 'dark');
    }
    setTheme('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
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



  // ============================================================================
  // RENDER: PROJECT DETAIL PAGE NAVIGATION (mobile only — desktop uses the
  // same left sidebar as every other page, see below)
  // ============================================================================
  if (isProjectDetailPage && isMobile) {
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
  // RENDER: DESKTOP LEFT SIDEBAR
  // ============================================================================
  if (!isMobile) {
    const isResumeCtaPage = location.pathname === "/figma-training" || location.pathname === "/gallery";

    const mainCta = isResumeCtaPage ? (
      <Button
        text="View Resume"
        onClick={() => setIsResumeOpen(true)}
        variant="secondary"
        size="m"
        withIcon={true}
        iconName="FileText"
      />
    ) : (
      <Button
        text="Let's work together"
        onClick={() => {
          if (location.pathname !== "/home" && location.pathname !== "/") {
            navigate("/home#contact");
          } else {
            const section = document.getElementById("contact") || document.querySelector(".work-together");
            if (section) {
              section.scrollIntoView({ behavior: "smooth" });
            }
          }
        }}
        variant={location.pathname === "/home" || location.pathname === "/" ? "primary" : "secondary"}
        size="m"
      />
    );

    return (
      <aside className="sidebar-nav">
        <Link to="/home" className="sidebar-logo">
          <img src="/gallery/profile.webp" alt="Karan Kapoor" className="sidebar-logo-img" />
        </Link>

        <nav className="sidebar-links">
          <Link
            to="/home"
            className={`sidebar-link${location.pathname === "/home" ? " active" : ""}`}
          >
            <House size={22} weight="duotone" />
            <span>Work</span>
          </Link>

          <Link
            to="/figma-training"
            className={`sidebar-link${location.pathname === "/figma-training" ? " active" : ""}`}
          >
            <FigmaLogo size={22} weight="duotone" />
            <span>Figma training</span>
          </Link>

          <Link
            to="/gallery"
            className={`sidebar-link${location.pathname === "/gallery" ? " active" : ""}`}
          >
            <Camera size={22} weight="duotone" />
            <span>Travel</span>
          </Link>

          <div className="sidebar-cta-wrapper">
            {mainCta}
          </div>
        </nav>

        <div className="sidebar-bottom">
          <a
            href="https://x.com/kadankapoor"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-user-badge twitter-badge"
          >
            <div className="avatar-wrapper twitter-icon-bg">
              <XLogo size={18} weight="bold" />
            </div>
            <div className="user-details">
              <span className="name">Karan Kapoor</span>
              <span className="handle">@kadankapoor</span>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/karankapoorux/"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-user-badge linkedin-badge"
          >
            <div className="avatar-wrapper linkedin-icon-bg">
              <LinkedinLogo size={18} weight="bold" />
            </div>
            <div className="user-details">
              <span className="name">Karan Kapoor</span>
              <span className="handle">in/karankapoorux</span>
            </div>
          </a>
        </div>

        <ResumePopup isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      </aside>
    );
  }

  // ============================================================================
  // RENDER: MAIN NAVIGATION (MOBILE)
  // ============================================================================
  return (
    <div className="container-nav">
      <nav className="navbar main-nav active" ref={containerRef}>
        {/* Left Section - LinkedIn icon (Desktop Only) */}
        {!isMobile && (
          <div className="navbar-left">
            <Button
              variant="secondary"
              withText={false}
              onClick={() => window.open("https://www.linkedin.com/in/karankapoorux/", "_blank", "noopener,noreferrer")}
              size="m"
              withIcon={true}
              iconName="LinkedinLogo"
              className="a-header linkedin-btn"
            />
          </div>
        )}

        {/* Center Section - Main Navigation (3 Tabs) */}
        <div className="navbar-center">
          <div className="hover-indicator" style={indicatorStyle}></div>

          {/* Work Link */}
          <Link
            to="/home"
            className={`a-header${location.pathname === "/home" ? " active" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <House size={18} weight="duotone" />
            <span>Work</span>
          </Link>

          {/* Training Link */}
          <Link
            to="/figma-training"
            className={`a-header${location.pathname === "/figma-training" ? " active" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FigmaLogo size={18} weight="duotone" />
            <span>Training</span>
          </Link>

          {/* Travel Link */}
          <Link
            to="/gallery"
            className={`a-header${location.pathname === "/gallery" ? " active" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Camera size={18} weight="duotone" />
            <span>Travel</span>
          </Link>
        </div>

        {/* Right Section - LinkedIn icon (Mobile) & CTA Button (Desktop) */}
        <div className="navbar-right-group">
          {isMobile && (
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

          {!isMobile && (
            <>
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
            </>
          )}
        </div>
        <ResumePopup isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      </nav>
    </div>
  );
};

export default StickyNavBar;