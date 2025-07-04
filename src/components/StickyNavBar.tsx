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
  PencilRuler
} from "@phosphor-icons/react";
import "../styles/StickyNavBar.scss";
import { projectSummaries } from "../utils/ProjectSummaries";

const StickyNavBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 800);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
            <ArrowRight size={18} weight="duotone" />
            <span>Next</span>
          </Link>
        </nav>
      </div>
    );
  }

  return (
    <div className="container-nav">
      <nav className="navbar main-nav active" ref={containerRef}>
        <div className="hover-indicator" style={indicatorStyle}></div>

        <Link
          to="/home"
          className={`a-header ${location.pathname === "/home" ? "active" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <House size={18} weight="duotone" />
          <span>Home</span>
        </Link>

        <Link
          to="/figma-training"
          className={`a-header ${location.pathname === "/figma-training" ? "active" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FigmaLogo size={18} weight="duotone" />
          <span>Training</span>
        </Link>

        <Link
          to="/archive"
          className={`a-header ${location.pathname === "/archive" ? "active" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <PencilRuler size={18} weight="duotone" />
          {!isMobile && <span className="hide-on-mobile">Craft</span>}
        </Link>

        <Link
          to="/gallery"
          className={`a-header ${location.pathname === "/gallery" ? "active" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Camera size={18} weight="duotone" />
          {!isMobile && <span className="hide-on-mobile">Gallery</span>}
        </Link>

        <Link 
          to="#"
          className="theme-toggle a-header"
          onClick={e => { e.preventDefault(); toggleTheme(); }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isDarkMode ? <Sun size={18} weight="duotone" /> : <Moon size={18} weight="duotone" />}
        </Link>
      </nav>
    </div>
  );
};

export default StickyNavBar;
