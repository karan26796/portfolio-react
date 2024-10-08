import React, { useState, useEffect } from "react";
import "../styles/StickyNavBar.scss";
import { Link, useLocation, useMatch } from "react-router-dom";
import { projectSummaries } from "../utils/ProjectSummaries";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

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
            <span>Back</span>
          </Link>
          {nextProjectId && (
            <Link 
              className='a-header next-project-btn' 
              to={`/project/${nextProjectId}`}
            >
              <span>Next</span>
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
        {/* <Link className='a-header' to="/about">About</Link> */}
        <Link className='a-header' to="/home">Home</Link>
        <Link className='a-header' to="/gallery">Gallery</Link>
      </nav>
    </div>
  );
};

export default StickyNavBar;