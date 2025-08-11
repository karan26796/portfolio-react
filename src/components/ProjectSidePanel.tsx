import React, { useState, useEffect } from "react";
import "../styles/ProjectSidePanel.scss";

interface ProjectSidePanelProps {
  headers: { text: string; id: string }[];
  onHeaderClick: (id: string) => void;
}

const ProjectSidePanel: React.FC<ProjectSidePanelProps> = ({
  headers,
  onHeaderClick,
}) => {
  const [activeSection, setActiveSection] = useState<string>("");

  // Track which section is currently in view
  useEffect(() => {
    if (headers.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.3;
      
      for (let i = headers.length - 1; i >= 0; i--) {
        const element = document.getElementById(headers[i].id);
        if (element) {
          const elementTop = element.offsetTop;
          if (scrollPosition >= elementTop) {
            setActiveSection(headers[i].id);
            break;
          }
        }
      }
    };

    // Set initial section
    if (headers.length > 0) {
      setActiveSection(headers[0].id);
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headers]);

  const handleItemClick = (id: string) => {
    setActiveSection(id);
    onHeaderClick(id);
  };

  return (
    <nav className="project-sidepanel">
      <p style={{ marginBottom: ".5em", fontWeight: 500 }}>Sections</p>
      {headers.map((header) => (
        <button
          key={header.id}
          className={activeSection === header.id ? "active" : ""}
          onClick={() => handleItemClick(header.id)}
        >
          {header.text}
        </button>
      ))}
    </nav>
  );
};

export default ProjectSidePanel;
