import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  House,
  FigmaLogo,
  FolderOpen,
  Camera,
  Sun,
  Moon,
  ArrowLeft,
  ArrowRight,
  PencilRuler,
  List,
  X
} from "@phosphor-icons/react";
import "../styles/StickyNavBar.scss";
import { projectSummaries } from "../utils/ProjectSummaries";
import logo from "../assets/logo.svg";

const StickyNavBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 800);
  const [isBelow776, setIsBelow776] = useState(() => window.innerWidth < 776);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
      setIsBelow776(window.innerWidth < 776);

      // Close menu on resize to larger screen
      if (window.innerWidth > 800) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu when clicking outside
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

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isProjectDetailPage = location.pathname.startsWith('/project/');
  const currentProjectId = isProjectDetailPage ? location.pathname.split('/').pop() : null;

  const getNextProjectId = () => {
    if (!currentProjectId) return null;
    const currentIndex = projectSummaries.findIndex(p => p.id === currentProjectId);
    if (currentIndex === -1 || currentIndex === projectSummaries.length - 1) return null;
    return projectSummaries[currentIndex + 1].id;
  };

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

  useEffect(() => {
    const activeEl = containerRef.current?.querySelector(".a-header.active");
    if (activeEl) {
      moveIndicator(activeEl as HTMLElement);
    }
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

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

  if (isProjectDetailPage) {
    return (
      <div className="container-nav">
        <nav className="navbar main-nav active project-nav" ref={containerRef}>
          <div className="hover-indicator" style={indicatorStyle}></div>

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

  return (
    <div className="container-nav">
      <nav className="navbar main-nav active" ref={containerRef}>
        <div className="navbar-left">
          <h6></h6>
        </div>
        <div className="navbar-center">
          <div className="hover-indicator" style={indicatorStyle}></div>

          <Link
            to="/home"
            className={`a-header${location.pathname === "/home" ? " active" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <House size={18} weight="duotone" />
            <span
              style={
                isBelow776
                  ? { display: "inline" }
                  : undefined
              }
            >
              Home
            </span>
          </Link>
          
          <Link
            to="/archive"
            className={`a-header${location.pathname === "/archive" ? " active" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <PencilRuler size={18} weight="duotone" />
            <span>Experiments</span>
          </Link>

          {/* Mobile menu */}
          {isMobile ? (
            <div className="menu-dropdown" ref={menuRef}>
              <button
                className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={18} weight="duotone" /> : <List size={18} weight="duotone" />}
              </button>

              <div className={`menu-content ${isMenuOpen ? 'open' : ''}`}>
                <Link
                  to="/figma-training"
                  className={`menu-item a-header${location.pathname === "/figma-training" ? " active" : ""}`}
                >
                  <FigmaLogo size={18} weight="duotone" />
                  <span>Training</span>
                </Link>
                <Link
                  to="/gallery"
                  className={`menu-item a-header${location.pathname === "/gallery" ? " active" : ""}`}
                >
                  <Camera size={18} weight="duotone" />
                  <span>Travel</span>
                </Link>
              </div>

              {/* Backdrop overlay */}
              {isMenuOpen && <div className="menu-backdrop" onClick={() => setIsMenuOpen(false)} />}
            </div>
          ) : (
            // Desktop menu items
            <>
              <Link
                to="/figma-training"
                className={`a-header${location.pathname === "/figma-training" ? " active" : ""}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <FigmaLogo size={18} weight="duotone" />
                <span
                  style={
                    isBelow776
                      ? { display: "inline" }
                      : undefined
                  }
                >
                  Figma Training
                </span>
              </Link>

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
      </nav>
    </div>
  );
};

export default StickyNavBar;