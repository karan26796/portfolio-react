import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useParams } from "react-router-dom";
import "../styles/ProjectDetails.scss";
import ProjectDetailHeader from "../components/ProjectHeader";
import { useProjects } from "../utils/useProjects";
import ProjectSidePanel from "../components/ProjectSidePanel";
import ProjectDetailsSkeleton from "../components/ProjectDetailsSkeleton";
import ProjectNextProjects from "../components/ProjectNextProjects";
import CustomVideo from "../components/CustomVideo";
import ScrollReveal from "../components/ScrollReveal";
import AISummarizer from "../components/AISummarizer";
import FAQ from "../components/FAQ";
import WorkTogether from "../components/WorkTogether";
import { formatSectionTitle } from "../utils/formatSectionTitle";
// Force fast refresh

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState<{ text: string; id: string }[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionIndexRef = useRef(0);

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

  // Extract h3 headers after markdown renders
  useEffect(() => {
    sectionIndexRef.current = 0;
  }, [markdownContent]);

  useEffect(() => {
    if (!loading && contentRef.current) {
      const h3s = Array.from(contentRef.current.querySelectorAll("h3"));
      const headerList = h3s.map((h3, idx) => {
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
      const navOffset = 88;
      const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  if (loading || projectsLoading) {
    return <ProjectDetailsSkeleton />;
  }

  if (!projectSummary) {
    return <div className="error-message">Project not found</div>;
  }

  return (
    <>
      <div className="container-project">
        <div className="project-content-wrapper">
          <ProjectDetailHeader data={projectSummary} />
          <div ref={contentRef} className="project-details">
            {markdownContent ? (
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={{
                  h3: ({ children, ...props }: any) => {
                    const id = props.id || `section-h3-${sectionIndexRef.current++}`;
                    return (
                      <ScrollReveal>
                        <h3 id={id} {...props}>
                          {formatSectionTitle(String(children))}
                        </h3>
                      </ScrollReveal>
                    );
                  },
                  img: ({ node, caption, alt, ...props }: any) => {
                    const captionText = caption || alt || "";
                    return (
                      <ScrollReveal variant="fade">
                        <figure>
                          <img alt={captionText} {...props} />
                          {captionText && <figcaption>{captionText}</figcaption>}
                        </figure>
                      </ScrollReveal>
                    );
                  },
                  video: ({ node, ...props }: any) => {
                    const customProps = props as any;
                    return (
                      <ScrollReveal variant="fade">
                        <CustomVideo src={props.src} caption={customProps.caption} />
                      </ScrollReveal>
                    );
                  },
                  faq: ({ node, ...props }: any) => {
                    try {
                      const parsedData = JSON.parse(props.data);
                      return (
                        <ScrollReveal>
                          <FAQ data={parsedData} hideTitle={true} />
                        </ScrollReveal>
                      );
                    } catch (error) {
                      console.error("Failed to parse FAQ JSON data in markdown:", error);
                      return null;
                    }
                  }
                } as any}
              >
                {markdownContent}
              </ReactMarkdown>
            ) : <div>Project content not available</div>}
          </div>

          <ProjectNextProjects currentProjectId={projectId!} />

          {markdownContent && (
            <AISummarizer
              text={markdownContent}
              buttonLabel="Ask Agent Vinod"
              initialPrompts={[
                "Can you summarize this project?",
                "What was my role here?",
                "What was the biggest challenge?"
              ]}
            />
          )}
        </div>

        <ProjectSidePanel
          headers={headers}
          onHeaderClick={handleHeaderClick}
          scrollRootRef={contentRef}
        />
      </div>
      <WorkTogether />
    </>
  );
};

export default ProjectDetails;
