import React, { useEffect, useRef, useState } from "react";
import { formatSectionTitle } from "../utils/formatSectionTitle";
import "../styles/ProjectSidePanel.scss";

interface ProjectSidePanelProps {
  headers: { text: string; id: string }[];
  onHeaderClick: (id: string) => void;
  scrollRootRef?: React.RefObject<HTMLElement>;
  /** Where this case study sits in the navigable list, 1-based. */
  projectIndex?: number;
  /** How many there are to move between. */
  projectCount?: number;
}

const NAV_OFFSET = 100;

// How the list falls away either side of the section being read, so the eye
// lands on that one rather than on ten equal lines. A couple of neighbours
// stay at full strength — the next section is the useful one, and the previous
// one gives the current position something to sit against — and beyond them it
// steps down until it bottoms out.
//
// Behind and ahead use the same curve: an asymmetric one read as the list
// being lit unevenly rather than as a focus.
const FOCUS_CLEAR = 2;
const FADE_PER_ITEM = 0.22;
const FADE_FLOOR = 0.18;

const focusOpacity = (index: number, activeIndex: number): number => {
  if (activeIndex < 0) return 1;

  const steps = Math.abs(index - activeIndex) - FOCUS_CLEAR;
  if (steps <= 0) return 1;

  return Math.max(FADE_FLOOR, 1 - steps * FADE_PER_ITEM);
};

const ProjectSidePanel: React.FC<ProjectSidePanelProps> = ({
  headers,
  onHeaderClick,
  scrollRootRef,
  projectIndex,
  projectCount,
}) => {
  const [activeSection, setActiveSection] = useState<string>("");
  // Which ends of the list are cut off, so the fade only appears where there is
  // actually more to see. A permanent fade on a list that already fits reads as
  // the last few sections being disabled.
  const [clipped, setClipped] = useState({ top: false, bottom: false });
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (headers.length === 0) return;

    const getSectionElements = () =>
      headers
        .map(({ id }) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

    const updateActiveSection = () => {
      const sections = getSectionElements();
      if (sections.length === 0) return;

      const root = scrollRootRef?.current;
      const rootTop = root?.getBoundingClientRect().top ?? 0;

      // The last section often sits less than a screen from the end, so it can
      // never climb to the offset line — there is nothing left to scroll. It
      // would stay unlit while the reader looked right at it, and worse, with
      // nothing qualifying the highlight snapped back to the first item.
      const atBottom = root
        ? root.scrollHeight - root.scrollTop - root.clientHeight <= 4
        : window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 4;

      if (atBottom) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      // The last heading to have crossed the line, measured against the
      // scroll container rather than the viewport. Sections already scrolled
      // past still count: the one above the fold is the one being read.
      let activeId = sections[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top - rootTop <= NAV_OFFSET) {
          activeId = section.id;
        }
      }

      setActiveSection(activeId);
    };

    let ticking = false;
    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
    };

    setActiveSection(headers[0].id);
    updateActiveSection();

    // The panel can sit inside its own scroll container (the case-study
    // reader body) rather than scrolling with the page. `scroll` doesn't
    // bubble, so the listener has to go on that element — window alone would
    // never fire and the active section would stay stuck on the first one.
    const scrollTarget: HTMLElement | Window = scrollRootRef?.current ?? window;
    scrollTarget.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      scrollTarget.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [headers, scrollRootRef]);

  // Keeps the current section in view as the reader moves down the page, and
  // tracks which edges are cut off so the fade can follow.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const overflowing = list.scrollHeight - list.clientHeight > 1;
      setClipped({
        top: overflowing && list.scrollTop > 1,
        bottom: overflowing && list.scrollHeight - list.scrollTop - list.clientHeight > 1,
      });
    };

    measure();
    list.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(list);

    return () => {
      list.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [headers]);

  useEffect(() => {
    const list = listRef.current;
    if (!list || !activeSection) return;

    const item = list.querySelector<HTMLElement>(`[data-section="${activeSection}"]`);
    if (!item) return;

    // Only when it is actually out of view — scrollIntoView on every change
    // would tug the list about while the reader is only a section or two in.
    const listBox = list.getBoundingClientRect();
    const itemBox = item.getBoundingClientRect();
    if (itemBox.top < listBox.top + 8 || itemBox.bottom > listBox.bottom - 8) {
      item.scrollIntoView({ block: "nearest" });
    }
  }, [activeSection]);

  const handleItemClick = (id: string) => {
    setActiveSection(id);
    onHeaderClick(id);
  };

  if (headers.length === 0) return null;

  const activeIndex = headers.findIndex((h) => h.id === activeSection);
  // Hidden when there is nowhere to go: "1/1" tells the reader nothing, and a
  // negative index means this project is not in the navigable list at all.
  const showCount =
    typeof projectIndex === "number" &&
    typeof projectCount === "number" &&
    projectIndex > 0 &&
    projectCount > 1;

  return (
    <nav
      className={[
        "project-sidepanel",
        clipped.top ? "is-clipped-top" : "",
        clipped.bottom ? "is-clipped-bottom" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Page sections"
    >
      {/* Which case study this is, above the section index. Two counters in
          one column would be confusing, so this one is the project and the
          numbers down the list are its sections. */}
      {showCount && (
        <p className="project-sidepanel-count">
          <span className="project-sidepanel-count__current">{projectIndex}</span>
          <span className="project-sidepanel-count__total">/{projectCount}</span>
        </p>
      )}

      <ol className="project-sidepanel-list" ref={listRef}>
          {headers.map((header, index) => (
            <li
              key={header.id}
              data-section={header.id}
              style={
                { "--section-dim": focusOpacity(index, activeIndex) } as React.CSSProperties
              }
            >
              <a
                href={`#${header.id}`}
                className={activeSection === header.id ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick(header.id);
                }}
              >
                <span className="section-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="section-label">{formatSectionTitle(header.text)}</span>
              </a>
            </li>
          ))}
        </ol>

    </nav>
  );
};

export default ProjectSidePanel;
