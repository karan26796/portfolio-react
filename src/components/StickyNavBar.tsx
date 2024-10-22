import React from "react";
import "../styles/StickyNavBar.scss";
import { Link, useLocation, useMatch } from "react-router-dom";
import { projectSummaries } from "../utils/ProjectSummaries";
import { Archive, ArrowLeft, ArrowRight, Camera, FigmaLogo, FolderOpen, House, Image } from "@phosphor-icons/react";

const StickyNavBar: React.FC = () => {
  const location = useLocation();
  const match = useMatch('/project/:projectId');
  const projectId = match?.params?.projectId;
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
        <nav className="navbar project-nav active">
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
      <nav className="navbar main-nav active">
        <Link
          className={`a-header ${location.pathname === '/home' ? 'active' : ''}`}
          to="/home"
        >
          <House size={18} weight="duotone" />
          <span>Home</span>
        </Link>
        <Link
          className={`a-header ${location.pathname === '/figma-training' ? 'active' : ''}`}
          to="/figma-training"
        >
          <FigmaLogo size={18} weight="duotone" />
          <span>Training</span>
        </Link>
        <Link
          className={`a-header ${location.pathname === '/archive' ? 'active' : ''}`}
          to="/archive"
        >
          <FolderOpen size={18} weight="duotone" />
          <span className="hide-on-mobile">Archive</span>
        </Link>
        <Link
          className={`a-header ${location.pathname === '/gallery' ? 'active' : ''}`}
          to="/gallery"
        >
          <Camera size={18} weight="duotone" />
          <span className="hide-on-mobile">Gallery</span>
        </Link>
      </nav>
    </div>
  )
};

export default StickyNavBar;