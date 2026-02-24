import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useParams } from "react-router-dom";
import "../styles/ProjectDetails.scss";
import ProjectDetailHeader from "../components/ProjectHeader";
import { useProjects } from "../utils/useProjects";
import ProjectMetaGrid from "../components/ProjectMetaGrid";
import ProjectSidePanel from "../components/ProjectSidePanel";
import ProjectDetailsSkeleton from "../components/ProjectDetailsSkeleton";
import CustomVideo from "../components/CustomVideo";
import AISummarizer from "../components/AISummarizer";
// Force fast refresh

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState<{ text: string; id: string }[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  // Fetch the list of all projects dynamically
  const { projects: projectSummaries, loading: projectsLoading } = useProjects();

  const projectSummary = projectSummaries.find(
    (summary) => summary.id === projectId
  );

  useEffect(() => {
    const loadProjectContent = async () => {
      try {
        setLoading(true);

        // Fetch markdown statically from public folder
        const response = await fetch(`/projects/Project${projectId}.md`);

        if (!response.ok) {
          throw new Error('Failed to fetch from local path');
        }

        const text = await response.text();

        // Simulate a tiny network delay to test skeleton locally
        setTimeout(() => {
          setMarkdownContent(text);
          setLoading(false);
        }, 400);

        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Failed to load project content:", error);
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

  if (loading || projectsLoading) {
    return <ProjectDetailsSkeleton />;
  }

  if (!projectSummary) {
    return <div className="error-message">Project not found</div>;
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
                      <img alt={props.alt || ""} {...props} />
                      {props.alt && <figcaption>{props.alt}</figcaption>}
                    </figure>
                  );
                },
                video: ({ node, ...props }) => {
                  const customProps = props as any;
                  return <CustomVideo src={props.src} caption={customProps.caption} />
                }
              }}
            >
              {markdownContent}
            </ReactMarkdown>
          ) : <div>Project content not available</div>}
        </div>
      </div>

      {markdownContent && (
        <AISummarizer
          text={markdownContent}
          buttonLabel="Ask AI anything"
          initialPrompts={[
            "Can you summarize this project?",
            "What was my role here?",
            "What was the biggest challenge?"
          ]}
        />
      )}
    </div>
  );
};

export default ProjectDetails;
