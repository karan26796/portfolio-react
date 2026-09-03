import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProjectDetails.scss";
import { useProjects } from "../utils/useProjects";
import ProjectDetailsSkeleton from "../components/ProjectDetailsSkeleton";
import ImageWithSkeleton from "../components/ImageWithSkeleton";
import CustomVideo from "../components/CustomVideo";
import ScrollyBeforeAfter, { ScrollyBeforeSlot, ScrollyAfterSlot } from "../components/ScrollyBeforeAfter";
import ScrollWipeCompare from "../components/ScrollWipeCompare";
import AwardProgramCTA from "../components/skeletons/AwardProgramCTA";
import AwardCard from "../components/skeletons/AwardCard";
import NomineeRow from "../components/skeletons/NomineeRow";
import ScrollReveal from "../components/ScrollReveal";
import AISummarizer from "../components/AISummarizer";
import ProjectSidePanel from "../components/ProjectSidePanel";
import { formatSectionTitle } from "../utils/formatSectionTitle";
import { toAccentTint } from "../utils/dominantColor";
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
  const contentRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  /**
   * Whether the cover has been scrolled past.
   *
   * The index of sections has nothing to point at while the reader is still on
   * the title and the cover image — the first heading is below both — so it
   * stays out of the way until the cover has left the top of the reader.
   */
  const [isPastCover, setIsPastCover] = useState(false);

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

  // The dock replaced the reader's own control bar, so back and forward now
  // arrive as events from it. Re-bound on every change to currentIndex, since
  // the handlers close over it.
  useEffect(() => {
    const prev = () => handlePrev();
    const next = () => handleNext();
    window.addEventListener("project:prev", prev);
    window.addEventListener("project:next", next);
    return () => {
      window.removeEventListener("project:prev", prev);
      window.removeEventListener("project:next", next);
    };
  });

  useEffect(() => {
    const root = bodyRef.current;
    if (!root) return;

    let ticking = false;

    const measure = () => {
      ticking = false;
      // The cover if there is one, otherwise the body itself — a project with
      // no image should still not show the index over its title.
      const anchor = coverRef.current ?? contentRef.current;
      if (!anchor) {
        setIsPastCover(true);
        return;
      }
      const rootTop = root.getBoundingClientRect().top;
      setIsPastCover(anchor.getBoundingClientRect().bottom <= rootTop + 8);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    measure();
    root.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      root.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // Re-measured once the markdown is in: the cover only exists after the
    // project's data has loaded, and its height decides where the line is.
  }, [markdownContent, projectsLoading]);

  /**
   * Locks the document's scroll while a case study is open.
   *
   * The home page deliberately stays mounted behind this overlay (see AppShell)
   * so that closing returns to it untouched — but it keeps its own scrollbar
   * while it is back there, and the reader has one of its own. That is two
   * scrollbars side by side, and a wheel gesture drives whichever happens to be
   * under the pointer: scroll over the reader and the case study moves, scroll
   * over the margin beside it and the page behind moves instead.
   *
   * Hiding the document's overflow leaves exactly one scroller. The browser
   * keeps the scroll offset of an element it has stopped scrolling, so the home
   * page is still where it was when the lock is lifted — nothing has to be
   * measured or restored by hand.
   */
  useEffect(() => {
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const previousPadding = root.style.paddingRight;

    // Taking the scrollbar away widens the viewport by its width, which shifts
    // the whole page sideways as the overlay opens. Padding by the difference
    // holds it still. It is 0 where scrollbars are overlaid, as on most Macs.
    const scrollbarWidth = window.innerWidth - root.clientWidth;

    root.style.overflow = "hidden";
    if (scrollbarWidth > 0) root.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      root.style.overflow = previousOverflow;
      root.style.paddingRight = previousPadding;
    };
  }, []);

  // The <faq> block is still pulled out of the markdown so it doesn't render
  // as literal markup in the body; nothing displays it any more.
  const { cleanContent } = React.useMemo(() => {
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

  /**
   * The section headings, read straight out of the markdown.
   *
   * Both the index and the headings themselves take their ids from this one
   * list, so the two cannot disagree. It replaces an effect that assigned ids
   * to the rendered DOM: react-markdown builds fresh nodes on every render, so
   * anything written onto them from outside was discarded the next time the
   * component re-rendered — and since the effect only re-ran when the content
   * changed, the ids never came back.
   */
  const headings = React.useMemo(() => {
    if (!cleanContent) return [] as { text: string; id: string; line: number }[];

    const seen = new Map<string, number>();
    const found: { text: string; id: string; line: number }[] = [];

    cleanContent.split("\n").forEach((raw, index) => {
      const match = raw.match(/^###\s+(.+)$/);
      if (!match) return;

      const text = match[1].trim();
      const base = slugify(text);
      // A case study can use the same heading twice ("Final design" appears in
      // both halves of one of them), so repeats get a suffix.
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);

      found.push({ text, id: count > 0 ? `${base}-${count}` : base, line: index + 1 });
    });

    return found;
  }, [cleanContent]);

  /**
   * Heading id by its line in the markdown.
   *
   * The renderer looks itself up here rather than counting as it goes: React
   * can invoke a render pass more than once, and a shared counter drifts when
   * it does — the ids came out shifted by one heading each time.
   */
  const idByLine = React.useMemo(
    () => new Map(headings.map((h) => [h.line, h.id])),
    [headings]
  );

  /**
   * Scrolls a section to the top of the reader.
   *
   * Measured against the scroll container's own top rather than the viewport's:
   * the reader is its own scrolling element, and offsetting from the window
   * puts every heading behind its top edge.
   */
  const scrollToHeader = React.useCallback((id: string) => {
    const target = document.getElementById(id);
    const container = bodyRef.current;
    if (!target || !container) return;

    const delta =
      target.getBoundingClientRect().top - container.getBoundingClientRect().top;
    container.scrollTo({ top: container.scrollTop + delta - 24, behavior: "smooth" });
  }, []);

  // Bespoke React case-study pages bypass markdown pipeline
  const CustomPage = projectId ? CUSTOM_PROJECTS[projectId] : undefined;


  /**
   * The page wash, taken from the project's own colour.
   *
   * Set on the overlay rather than on :root: the home page stays mounted
   * underneath a case study and its own observer keeps writing --page-accent
   * there, so the two would overwrite each other. A custom property inherits,
   * so scoping it here gives the case study its own wash and leaves the page
   * below untouched.
   */
  const pageAccent = React.useMemo(
    () => toAccentTint(projectSummary?.bgColor || "#30a46c"),
    [projectSummary?.bgColor]
  );

  /**
   * The facts beside the summary: label on the left, value on the right.
   *
   * Built from whatever the project actually carries rather than from a fixed
   * list — a row with nothing behind it is worse than a missing row, and not
   * every project records its tools. `year` arrives pre-formatted as
   * "Company / 2026", so the year is taken off the end of it.
   */
  const heroMeta = React.useMemo(() => {
    if (!projectSummary) return [] as { label: string; value: string }[];
    const year = projectSummary.year?.split("/").pop()?.trim();
    return [
      { label: "Org", value: projectSummary.company || "" },
      { label: "Tools", value: (projectSummary.tools || []).join(", ") },
      { label: "Year", value: year || "" },
    ].filter((row) => row.value);
  }, [projectSummary]);

  /**
   * The media that opens the case study. `images[0]` where a project has a
   * set, otherwise its single one — the same frame the card in the list leads
   * with, so arriving here is continuous with clicking it. It may be a video.
   */
  const heroMedia = projectSummary?.images?.[0] || projectSummary?.img || "";

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
      style={{ "--page-accent": pageAccent } as React.CSSProperties}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="reader-mode-window">
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
                  {/* Left of the column on a wide screen, hidden below that —
                      see ProjectDetails.scss, where the grid decides. */}
                  <ProjectSidePanel
                    headers={headings}
                    onHeaderClick={scrollToHeader}
                    scrollRootRef={bodyRef}
                    projectIndex={currentIndex + 1}
                    projectCount={validProjectList.length}
                    visible={isPastCover}
                  />

                  <div className="docs-main">
                    <header className="docs-hero">
                      <div className="docs-hero__head">
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
                      </div>

                      {/* Everything you need before deciding to read on: what
                          the work was, then the facts of it. Beside the title
                          on a wide screen, under it once the column narrows. */}
                      <div className="docs-hero__aside">
                        {projectSummary.description && (
                          <p className="docs-hero__lede">{projectSummary.description}</p>
                        )}

                        {heroMeta.length > 0 && (
                          <dl className="docs-hero__meta">
                            {heroMeta.map(({ label, value }) => (
                              <div className="docs-hero__meta-row" key={label}>
                                <dt>{label}</dt>
                                <dd>{value}</dd>
                              </div>
                            ))}
                          </dl>
                        )}
                      </div>
                    </header>

                    {/* The project's own media, between the facts and the
                        argument — the case study proper starts below it.

                        ImageWithSkeleton rather than a bare <img>: several
                        projects lead with an .mp4 rather than a still, and it
                        already picks the right element for the file. A <div>
                        rather than a <figure> because index.scss gives every
                        `figure img` a border, a radius and 140% width, none of
                        which belong on a full-column opener. */}
                    {heroMedia && (
                      <div className="docs-hero-media" ref={coverRef}>
                        <ImageWithSkeleton
                          src={heroMedia}
                          alt=""
                          skeletonAspectRatio="16 / 9"
                        />
                      </div>
                    )}

                    <div ref={contentRef} className="project-details">
                      {cleanContent ? (
                        <ReactMarkdown
                          rehypePlugins={[rehypeRaw]}
                          components={{
                            // Keyed on where the heading sits in the source,
                            // which react-markdown carries on the node — so a
                            // heading and its index entry always resolve to
                            // the same anchor however often this re-renders.
                            h3: ({ node, children, ...props }: any) => {
                              const line = node?.position?.start?.line;
                              const id =
                                (line != null && idByLine.get(line)) ||
                                slugify(String(children));
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

                    {/* Mounted, but its floating button is hidden on a case
                        study — see AISummarizer.scss. The summary card's pills
                        used to be the way in; with those gone nothing on this
                        page opens the chat, so this is here only to keep
                        listening for `open-agent-vinod`. */}
                    {markdownContent && (
                      <AISummarizer
                        text={markdownContent}
                        buttonLabel="Ask Agent Vinod"
                        pageType="project"
                        initialPrompts={[
                          "Can you summarize this project?",
                          "What was your role here?",
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
