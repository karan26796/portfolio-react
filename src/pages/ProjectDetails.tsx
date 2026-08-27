import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProjectDetails.scss";
import { useProjects } from "../utils/useProjects";
import ProjectDetailsSkeleton from "../components/ProjectDetailsSkeleton";
import CustomVideo from "../components/CustomVideo";
import ScrollyBeforeAfter, { ScrollyBeforeSlot, ScrollyAfterSlot } from "../components/ScrollyBeforeAfter";
import ScrollWipeCompare from "../components/ScrollWipeCompare";
import AwardProgramCTA from "../components/skeletons/AwardProgramCTA";
import AwardCard from "../components/skeletons/AwardCard";
import NomineeRow from "../components/skeletons/NomineeRow";
import ScrollReveal from "../components/ScrollReveal";
import AISummarizer from "../components/AISummarizer";
import FAQ from "../components/FAQ";
import ReaderModeHeader from "../components/ReaderModeHeader";
import { formatSectionTitle } from "../utils/formatSectionTitle";
// Projects that render as bespoke React pages instead of markdown.
const CUSTOM_PROJECTS: Record<string, React.ComponentType> = {};

// Explicit IDs of projects that do NOT have a detailed case study or should be skipped in navigation
const EXCLUDED_PROJECT_IDS = new Set(["10", "11"]);

// Deterministic slug from a heading's text
const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "section";

// Helper to extract <faq> data from markdown content and strip it from the body
const extractFAQ = (content: string | null) => {
  if (!content) return { cleanContent: content, faqData: null };
  const faqRegex = /(?:<section[^>]*>\s*)?<faq\s+data=(['"])(.*?)\1\s*><\/faq>(?:\s*<\/section>)?/s;
  const match = content.match(faqRegex);
  if (match && match[2]) {
    try {
      const parsed = JSON.parse(match[2]);
      const cleanContent = content.replace(faqRegex, '').trim();
      return { cleanContent, faqData: parsed };
    } catch (err) {
      console.error("Failed to parse FAQ JSON from markdown:", err);
    }
  }
  return { cleanContent: content, faqData: null };
};

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Fetch the list of all projects dynamically
  const { projects: projectSummaries, loading: projectsLoading } = useProjects();

  const projectSummary = projectSummaries.find(
    (summary) => summary.id === projectId
  );

  // Filter to only include projects that have valid case study content
  const validProjectList = projectSummaries
    .filter((p) => !EXCLUDED_PROJECT_IDS.has(p.id) && (p as any).hasCaseStudy !== false)
    .map((p) => ({
      id: p.id,
      title: p.title,
      company: p.company,
    }));

  const currentIndex = validProjectList.findIndex((p) => p.id === projectId);

  const handlePrev = () => {
    if (validProjectList.length === 0) return;
    const prevIdx = currentIndex > 0 ? currentIndex - 1 : validProjectList.length - 1;
    navigate(`/project/${validProjectList[prevIdx].id}`);
  };

  const handleNext = () => {
    if (validProjectList.length === 0) return;
    const nextIdx = currentIndex < validProjectList.length - 1 ? currentIndex + 1 : 0;
    navigate(`/project/${validProjectList[nextIdx].id}`);
  };

  const handleClose = () => {
    navigate("/home");
  };

  const { cleanContent, faqData } = React.useMemo(() => {
    return extractFAQ(markdownContent);
  }, [markdownContent]);

  useEffect(() => {
    const loadProjectContent = async () => {
      try {
        setLoading(true);

        // Fetch markdown statically from public folder
        const response = await fetch(`/projects/Project${projectId}.md`);

        if (!response.ok) {
          throw new Error('Case study content not available');
        }

        const text = await response.text();

        if (!text || text.trim().length === 0) {
          throw new Error('Case study content is empty');
        }

        setTimeout(() => {
          setMarkdownContent(text);
          setLoading(false);
        }, 200);

        if (bodyRef.current) {
          bodyRef.current.scrollTop = 0;
        } else {
          window.scrollTo(0, 0);
        }
      } catch (error) {
        console.error("Failed to load project content:", error);
        setMarkdownContent(null);
        setLoading(false);
      }
    };

    if (projectId && !CUSTOM_PROJECTS[projectId]) {
      loadProjectContent();
    } else {
      setLoading(false);
    }
  }, [projectId]);

  // Give every section heading a unique id so anchors stay stable when a case
  // study repeats a title. The markdown renderer already slugifies each one;
  // this only disambiguates collisions.
  useEffect(() => {
    if (loading || projectsLoading || !contentRef.current) return;

    const seen = new Map<string, number>();
    contentRef.current.querySelectorAll("h3").forEach((h3) => {
      let id = h3.id || slugify(h3.textContent || "");
      const count = seen.get(id) ?? 0;
      seen.set(id, count + 1);
      if (count > 0) id = `${id}-${count}`;
      h3.id = id;
    });
  }, [loading, projectsLoading, cleanContent]);

  // Bespoke React case-study pages bypass markdown pipeline
  const CustomPage = projectId ? CUSTOM_PROJECTS[projectId] : undefined;


  // The docs format accents the lead-in of the headline. Our titles read
  // "Name : descriptor", so the name before the colon takes the accent rule
  // and the descriptor follows on its own line.
  const [titleLead, titleRest] = React.useMemo(() => {
    const raw = projectSummary?.title ?? "";
    const idx = raw.indexOf(":");
    if (idx === -1) return [raw, ""];
    return [raw.slice(0, idx).trim(), raw.slice(idx + 1).trim()];
  }, [projectSummary?.title]);

  return (
    <div
      className="reader-mode-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className={`reader-mode-window${isExpanded ? " full-width" : ""}`}>
        <ReaderModeHeader
          currentProjectId={projectId || ""}
          projectList={validProjectList}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
          isExpanded={isExpanded}
          onToggleExpand={() => setIsExpanded(!isExpanded)}
        />

        <div className="reader-mode-body" ref={bodyRef}>
          {CustomPage ? (
            <CustomPage />
          ) : loading || projectsLoading ? (
            <ProjectDetailsSkeleton />
          ) : !projectSummary || !markdownContent ? (
            <div className="error-message" style={{ padding: '4em 2em', textAlign: 'center' }}>
              <h3>Case study coming soon</h3>
              <p style={{ opacity: 0.7, marginTop: '0.5em' }}>This project does not have a detailed case study document yet.</p>
            </div>
          ) : (
            <>
              <div className="project-details-main-content">
                <div className="docs-layout">
                  <div className="docs-main">
                    <header className="docs-hero">
                      {projectSummary.year && (
                        <p className="docs-hero__stamp">{projectSummary.year}</p>
                      )}
                      <h1 className="docs-hero__title">
                        {/* The accent rule only reads as an accent when it
                            underlines a short lead-in, so it's reserved for
                            titles that actually split on a colon. */}
                        <span
                          className={`docs-hero__title-lead${titleRest ? " has-accent" : ""}`}
                        >
                          {titleLead}
                        </span>
                        {titleRest && (
                          <span className="docs-hero__title-rest">{titleRest}</span>
                        )}
                      </h1>
                      {projectSummary.description && (
                        <p className="docs-hero__lede">{projectSummary.description}</p>
                      )}
                    </header>

                    <div ref={contentRef} className="project-details">
                      {cleanContent ? (
                        <ReactMarkdown
                          rehypePlugins={[rehypeRaw]}
                          components={{
                            h3: ({ children, ...props }: any) => {
                              const id = props.id || slugify(String(children));
                              return (
                                <ScrollReveal>
                                  <h3 {...props} id={id}>
                                    {formatSectionTitle(String(children))}
                                  </h3>
                                </ScrollReveal>
                              );
                            },
                            img: ({ node, caption, alt, ...props }: any) => {
                              const captionText = caption || alt || "";
                              return (
                                <ScrollReveal variant="image-reveal">
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
                            "scrolly-before-after": ({ node, children, ...props }: any) => (
                              <ScrollyBeforeAfter
                                before={props.before}
                                after={props.after}
                                beforelabel={props.beforelabel}
                                afterlabel={props.afterlabel}
                              >
                                {children}
                              </ScrollyBeforeAfter>
                            ),
                            "scrolly-step": ({ node, children }: any) => <>{children}</>,
                            "scrolly-before": ScrollyBeforeSlot,
                            "scrolly-after": ScrollyAfterSlot,
                            "wipe-compare": ({ node, ...props }: any) => (
                              <ScrollWipeCompare
                                before={props.before}
                                after={props.after}
                                beforelabel={props.beforelabel}
                                afterlabel={props.afterlabel}
                                beforecaption={props.beforecaption}
                                aftercaption={props.aftercaption}
                              />
                            ),
                            "award-cta": ({ node, ...props }: any) => (
                              <AwardProgramCTA label={props.label} variant={props.variant} />
                            ),
                            "award-card": ({ node, ...props }: any) => (
                              <AwardCard
                                title={props.title}
                                description={props.description}
                                tags={props.tags ? String(props.tags).split(",").map((t: string) => t.trim()) : undefined}
                                editable={props.editable === "true"}
                              />
                            ),
                            "nominee-row": ({ node, ...props }: any) => (
                              <NomineeRow
                                name={props.name}
                                role={props.role}
                                comment={props.comment}
                                editable={props.editable === "true"}
                              />
                            ),
                          } as any}
                        >
                          {cleanContent}
                        </ReactMarkdown>
                      ) : <div>Project content not available</div>}
                    </div>

                    {faqData && (
                      <FAQ data={faqData} hideTitle={false} title="FAQs" />
                    )}

                    {markdownContent && (
                      <AISummarizer
                        text={markdownContent}
                        buttonLabel="Ask Agent Vinod"
                        pageType="project"
                        initialPrompts={[
                          "Can you summarize this project?",
                          "What was my role here?",
                          "What was the biggest challenge?"
                        ]}
                      />
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
