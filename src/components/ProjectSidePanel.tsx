import React, { useState, useEffect } from "react";
import "../styles/ProjectSidePanel.scss";
import Button from "./Buttons";
import { useNavigate } from "react-router-dom";

interface ProjectSidePanelProps {
  headers: { text: string; id: string }[];
  onHeaderClick: (id: string) => void;
}

const ProjectSidePanel: React.FC<ProjectSidePanelProps> = ({
  headers,
  onHeaderClick,
}) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const navigate = useNavigate();

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
      <Button
        text="Back"
        iconName="ArrowLeft"
        withIcon={true}
        iconDirection="left"
        withText={true}
        size="s"
        variant="tertiary"
        weight="regular"
        onClick={() => navigate("/home")}
      />
      {/* <p style={{ marginBottom: ".5em", fontWeight: 500 }}>Sections</p> */}
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
