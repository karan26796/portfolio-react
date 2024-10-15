import React, { useState, useEffect } from "react";
import "../styles/StickyNavBar.scss";
import { Link, useLocation, useMatch } from "react-router-dom";
import { projectSummaries } from "../utils/ProjectSummaries";
import { Archive, ArrowLeft, ArrowRight, FigmaLogo, House, Image } from "@phosphor-icons/react";

const StickyNavBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const match = useMatch('/project/:projectId');
  const projectId = match?.params?.projectId;
  let lastScrollTop = 0;

  useEffect(() => {
    const handleScroll = () => {
      let currentScrollPos = window.pageYOffset;
      if (currentScrollPos < lastScrollTop) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      lastScrollTop = currentScrollPos <= 0 ? 0 : currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isProjectDetails = location.pathname.startsWith('/project/');

  const getNextProjectId = () => {
    if (!projectId) return null;

    const currentIndex = projectSummaries.findIndex(p => p.id === projectId);
    if (currentIndex === -1) return null;

    const nextIndex = (currentIndex + 1) % projectSummaries.length;
    return projectSummaries[nextIndex].id;
  };

  if (isProjectDetails) {
    const nextProjectId = getNextProjectId();
    return (
      <div className="container-nav">
        <nav className={`navbar project-nav ${isVisible ? "active" : ""}`}>
          <Link className='a-header back-btn' to="/home">
            <ArrowLeft size={18} weight="bold" />
            Back
          </Link>
          {nextProjectId && (
            <Link 
              className='a-header next-project-btn' 
              to={`/project/${nextProjectId}`}
            >
              Next
              <ArrowRight size={18} weight="bold" />
            </Link>
          )}
        </nav>
      </div>
    );
  }

  return (
    <div className="container-nav">
      <nav className={`navbar main-nav ${isVisible ? "active" : ""}`}>
        <Link 
          className={`a-header ${location.pathname === '/home' ? 'active' : ''}`} 
          to="/home"
        >
          <House size={18} weight="duotone" />Home
        </Link>
        <Link 
          className={`a-header ${location.pathname === '/gallery' ? 'active' : ''}`} 
          to="/gallery"
        >
          <Image size={18} weight="duotone" />Gallery
        </Link>
        <Link 
          className={`a-header ${location.pathname === '/archive' ? 'active' : ''}`} 
          to="/archive"
        >
          <Archive size={18} weight="duotone" />Archive
        </Link>
        <Link 
          className={`a-header ${location.pathname === '/figma-training' ? 'active' : ''}`} 
          to="/figma-training"
        >
          <FigmaLogo size={18} weight="duotone" />Training
        </Link>
      </nav>
    </div>
  );
};

export default StickyNavBar;