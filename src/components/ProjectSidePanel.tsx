import React, { useState, useEffect } from "react";
import "../styles/ProjectSidePanel.scss";

interface ProjectSidePanelProps {
  headers: { text: string; id: string }[];
  onHeaderClick: (id: string) => void;
}

const ProjectSidePanel: React.FC<ProjectSidePanelProps> = ({ headers, onHeaderClick }) => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    if (headers.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.3;

      for (let i = headers.length - 1; i >= 0; i--) {
        const element = document.getElementById(headers[i].id);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(headers[i].id);
          break;
        }
      }
    };

    setActiveSection(headers[0].id);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [headers]);

  const handleItemClick = (id: string) => {
    setActiveSection(id);
    onHeaderClick(id);
  };

  return (
    <nav className="project-sidepanel">
      {headers.map((header) => (
        <a
          key={header.id}
          href={`#${header.id}`}
          className={activeSection === header.id ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            handleItemClick(header.id);
          }}
        >
          {header.text}
        </a>
      ))}
    </nav>
  );
};

export default ProjectSidePanel;
