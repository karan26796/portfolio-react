import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  House,
  FigmaLogo,
  FolderOpen,
  Camera
} from "@phosphor-icons/react";
import "../styles/StickyNavBar.scss";

const StickyNavBar: React.FC = () => {
  const location = useLocation();
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeEl = containerRef.current?.querySelector(".a-header.active");
    if (activeEl) {
      moveIndicator(activeEl as HTMLElement);
    }
  }, [location.pathname]);

  const moveIndicator = (el: HTMLElement) => {
    const { offsetLeft, offsetWidth } = el;
    setIndicatorStyle({
      left: `${offsetLeft}px`,
      width: `${offsetWidth}px`
    });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
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
      </nav>
    </div>
  );
};

export default StickyNavBar;
