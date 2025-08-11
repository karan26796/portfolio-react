import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProjectDetails.scss";
import ProjectDetailHeader from "../components/ProjectHeader";
import { projectSummaries } from "../utils/ProjectSummaries";
import ProjectMetaGrid from "../components/ProjectMetaGrid";
import ProjectSidePanel from "../components/ProjectSidePanel";

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [ProjectComponent, setProjectComponent] = useState<React.FC | null>(null);
  const [loading, setLoading] = useState(true);
  const projectContentRef = useRef<HTMLDivElement>(null);
  
  const projectSummary = projectSummaries.find(
    (summary) => summary.id === projectId
  );

  useEffect(() => {
    const loadProjectComponent = async () => {
      try {
        setLoading(true);
        
        // Dynamically import the correct project component based on projectId
        const { default: Component } = await import(
          `../projects/Project${projectId}` // dynamically imports the required project
        );
        setProjectComponent(() => Component); // store the loaded component
        
        // Scroll to top when loading new project
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Failed to load project component:", error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      loadProjectComponent();
    }
  }, [projectId]);

  if (loading) {
    return <div className="loading-container">Loading project details...</div>;
  }

  if (!projectSummary) {
    return <div className="error-container">Project not found</div>;
  }

  return (
    <div className="container-project">
      <div className="project-layout">
        <ProjectSidePanel projectRef={projectContentRef} />
        <div className="project-main-content">
          <ProjectDetailHeader data={projectSummary} />
          {projectSummary?.meta && <ProjectMetaGrid meta={projectSummary.meta} />}
          <div ref={projectContentRef} className="project-content-wrapper">
            {ProjectComponent ? <ProjectComponent /> : <div>Project content not available</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
