import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ResumePopup from "../pages/ResumePopup";
import "../styles/StickyNavBar.scss";

const StickyNavBar: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  const location = useLocation();
  const isHome = location.pathname === "/home" || location.pathname === "/";

  return (
    <header className="container-nav desktop-top-nav">
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/home" className="navbar-name-link">
            <span className="navbar-name">केके</span>
          </Link>
        </div>

        <div className="navbar-right-links">
          <Link
            to="/home"
            className={`a-header${isHome ? " active" : ""}`}
          >
            <span>Work</span>
          </Link>

          <Link
            to="/figma-training"
            className={`a-header${location.pathname === "/figma-training" ? " active" : ""}`}
          >
            <span>Figma training</span>
          </Link>

          <Link
            to="/gallery"
            className={`a-header${location.pathname === "/gallery" ? " active" : ""}`}
          >
            <span>Travel</span>
          </Link>
        </div>
      </nav>

      <ResumePopup isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </header>
  );
};

export default StickyNavBar;