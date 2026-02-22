import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useParams } from "react-router-dom";
import "../styles/ProjectDetails.scss";
import ProjectDetailHeader from "../components/ProjectHeader";
import { projectSummaries } from "../utils/ProjectSummaries";
import ProjectMetaGrid from "../components/ProjectMetaGrid";
import ProjectSidePanel from "../components/ProjectSidePanel";
import Loader from "../components/Loader";

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState<{ text: string; id: string }[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const projectSummary = projectSummaries.find(
    (summary) => summary.id === projectId
  );

  useEffect(() => {
    const loadProjectContent = async () => {
      try {
        setLoading(true);

        // Fetch from our new Serverless Function instead of the public folder
        const response = await fetch(`/api/notion?slug=Project${projectId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch from Notion');
        }

        const data = await response.json();
        setMarkdownContent(data.content);

        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Failed to load project content from Notion:", error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      loadProjectContent();
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
  }, [loading, markdownContent]);

  const handleHeaderClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (loading) {
    return <Loader />;
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
      <div className="project-content-wrapper">
        <ProjectDetailHeader data={projectSummary} />
        {projectSummary?.meta && <ProjectMetaGrid meta={projectSummary.meta} />}
        <div ref={contentRef} className="project-details">
          {markdownContent ? (
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                img: ({ node, ...props }) => {
                  return (
                    <figure>
                      <img {...props} />
                      {props.alt && <figcaption>{props.alt}</figcaption>}
                    </figure>
                  );
                }
              }}
            >
              {markdownContent}
            </ReactMarkdown>
          ) : <div>Project content not available</div>}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
