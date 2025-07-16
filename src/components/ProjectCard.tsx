import React, { useState, useEffect } from "react";
import "../styles/ProjectCard.scss";
import Buttons from "./Buttons";

interface ProjectCardProps {
  data: {
    id: string;
    img: string;
    title: string;
    description: string;
    tags: string[];
    type: "personal" | "client" | "other";
    url?: string;
    specialStatus?: string;
  };
  variant: "small" | "large";
  onClick?: () => void;
  buttonType?: "button" | "static" | "none";
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  data, 
  variant, 
  onClick,
  buttonType = "button"
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 900);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    } else if (data.url) {
      window.open(data.url, "_blank", "noopener,noreferrer");
    }
  };

  const renderButton = () => {
    if (buttonType === "none") return null;
    if (data.specialStatus && buttonType !== "static") {
      return (
        <div className="special-status">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>{data.specialStatus}</span>
        </div>
      );
    }
    if (buttonType === "static") {
      return (
        <div className="static-text">
          {data.specialStatus || (variant === "large" ? "View Project" : "Visit Site")}
        </div>
      );
    }
    const commonProps = {
      className: "read-more-button",
      withIcon: true,
      iconDirection: "right" as const,
      size: isSmallScreen ? "s" : (variant === "large" ? "m" : "s") as "s" | "m",
    };
    return (
      <Buttons
        {...commonProps}
        text={isSmallScreen ? "" : variant === "large" ? "Read" : "Visit site"}
        iconName={variant === "large" ? "ArrowRight" : "ArrowSquareOut"}
        withText={!isSmallScreen}
        variant="primary"
        size="s"
      />
    );
  };

  return (
    <div
      className={`project-container${variant === "small" ? " project-container-small" : ""}${data.specialStatus ? " has-special-status" : ""}`}
      onClick={data.specialStatus ? undefined : handleClick}
    >
      <img className="project-image" src={data.img} alt={data.title} />
      <div className="project-card">
        <div className="project-card-data">
          <div className="title">
            <div className="title-tag-group">
              <h5>
                {variant === "small"
                  ? data.type === "personal"
                    ? "Personal project"
                    : data.type
                  : data.tags.join(", ")}
              </h5>
              <h3>{data.title}</h3>
              {data.description && (
                <p className="description">{data.description}</p>
              )}
            </div>
            <div className="button-container">
              {renderButton()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
