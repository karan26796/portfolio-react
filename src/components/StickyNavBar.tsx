import React, { useState, useEffect } from "react";
import "../styles/StickyNavBar.scss";
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import { projectSummaries } from "../utils/ProjectSummaries";

const StickyNavBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleNextProject = () => {
    const nextId = getNextProjectId();
    if (nextId) {
      navigate(`/project/${nextId}`);
    }
  };

  if (isProjectDetails) {
    const nextProjectId = getNextProjectId();
    return (
      <div className="container-nav">
        <nav className={`navbar ${isVisible ? "active" : ""}`}>
          <Link className='a-header' to="/home">Back to Home</Link>
          {nextProjectId && (
            <button 
              className='a-header next-project-btn' 
              onClick={handleNextProject}
            >
              Next Project ({nextProjectId})
            </button>
          )}
        </nav>
      </div>
    );
  }

  return (
    <div className="container-nav">
      <nav className={`navbar ${isVisible ? "active" : ""}`}>
        <Link className='a-header' to="/about">About</Link>
        <Link className='a-header' to="/home">Home</Link>
        <Link className='a-header' to="/gallery">Gallery</Link>
        {/* <Link className='a-header' to="/figma-training">Figma Training</Link> */}
      </nav>
    </div>
  );
};

export default StickyNavBar;