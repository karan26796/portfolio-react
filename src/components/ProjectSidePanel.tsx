import React, { useState, useEffect } from "react";
import { formatSectionTitle } from "../utils/formatSectionTitle";
import "../styles/ProjectSidePanel.scss";

interface ProjectSidePanelProps {
  headers: { text: string; id: string }[];
  onHeaderClick: (id: string) => void;
  scrollRootRef?: React.RefObject<HTMLElement>;
}

const NAV_OFFSET = 100;

const ProjectSidePanel: React.FC<ProjectSidePanelProps> = ({
  headers,
  onHeaderClick,
  scrollRootRef,
}) => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    if (headers.length === 0) return;

    const getSectionElements = () =>
      headers
        .map(({ id }) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

    const updateActiveSection = () => {
      const sections = getSectionElements();
      if (sections.length === 0) return;

      const rootTop = scrollRootRef?.current?.getBoundingClientRect().top ?? 0;
      const rootBottom = scrollRootRef?.current?.getBoundingClientRect().bottom ?? window.innerHeight;

      let activeId = headers[0].id;

      for (const section of sections) {
        const { top, bottom } = section.getBoundingClientRect();

        // Only track sections visible within the middle content column
        if (bottom < rootTop || top > rootBottom) continue;

        if (top <= NAV_OFFSET) {
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

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [headers, scrollRootRef]);

  const handleItemClick = (id: string) => {
    setActiveSection(id);
    onHeaderClick(id);
  };

  if (headers.length === 0) return null;

  return (
    <nav className="project-sidepanel" aria-label="Page sections">
      <ol className="project-sidepanel-list">
        {headers.map((header, index) => (
          <li key={header.id}>
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
