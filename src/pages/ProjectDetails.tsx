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
  const [headers, setHeaders] = useState<{ text: string; id: string }[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const projectSummary = projectSummaries.find(
    (summary) => summary.id === projectId
  );

  useEffect(() => {
    const loadProjectComponent = async () => {
      try {
        setLoading(true);

        const { default: Component } = await import(
          `../projects/Project${projectId}`
        );
        setProjectComponent(() => Component);

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

  // Extract h3 headers after component is rendered
  useEffect(() => {
    if (!loading && contentRef.current) {
      const h3s = Array.from(contentRef.current.querySelectorAll("h3"));
      const headerList = h3s.map((h3, idx) => {
        // Ensure each h3 has an id for scrolling
        if (!h3.id) {
          h3.id = `section-h3-${idx}`;
        }
        return { text: h3.textContent || "", id: h3.id };
      });
      setHeaders(headerList);
    }
  }, [loading, ProjectComponent]);

  const handleHeaderClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (loading) {
    return <div className="loading-container">Loading project details...</div>;
  }

  if (!projectSummary) {
    return <div className="error-container">Project not found</div>;
  }

  return (
    <div className="container-project">
      {/* Sidepanel */}
      <ProjectSidePanel
        headers={headers}
        onHeaderClick={handleHeaderClick}
      />
      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <ProjectDetailHeader data={projectSummary} />
        {projectSummary?.meta && <ProjectMetaGrid meta={projectSummary.meta} />}
        <div ref={contentRef}>
          {ProjectComponent ? <ProjectComponent /> : <div>Project content not available</div>}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
