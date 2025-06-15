import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  House,
  FigmaLogo,
  FolderOpen,
  Camera,
  Sun,
  Moon
} from "@phosphor-icons/react";
import "../styles/StickyNavBar.scss";

const StickyNavBar: React.FC = () => {
  const location = useLocation();
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const containerRef = useRef<HTMLDivElement>(null);

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
          <FolderOpen size={18} weight="duotone" />
          <span className="hide-on-mobile">Archive</span>
        </Link>

        <Link
          to="/gallery"
          className={`a-header ${location.pathname === "/gallery" ? "active" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Camera size={18} weight="duotone" />
          <span className="hide-on-mobile">Gallery</span>
        </Link>

        <button 
          className="theme-toggle a-header"
          onClick={toggleTheme}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isDarkMode ? <Sun size={18} weight="duotone" /> : <Moon size={18} weight="duotone" />}
        </button>
      </nav>
    </div>
  );
};

export default StickyNavBar;
