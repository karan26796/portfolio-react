import React, { useState, useEffect } from "react";
import "../styles/ProjectCard.scss";
import Buttons from "./Buttons";
import Tag, { VibrantColor } from "./Tag";

interface ProjectCardProps {
  data: {
    id: string;
    img: string;
    title: string;
    description: string;
    tags: string[];
    type: "personal" | "client" | "other";
    url?: string;
    specialStatus?: string; // For NDA or other special statuses
  };
  variant: "small" | "large";
  onClick?: () => void;
  buttonType?: "button" | "static" | "none"; // Control what type of action element to show
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  data, 
  variant, 
  onClick,
  buttonType = "button" // Default to showing a button
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

  const vibrantColors: VibrantColor[] = [
    { bg: "#fefefe", text: "#FF4D4D" },
    { bg: "#fefefe", text: "#00CC66" },
    { bg: "#fefefe", text: "#3399FF" },
    { bg: "#fefefe", text: "#FF9933" },
    { bg: "#fefefe", text: "#9933FF" },
  ];

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    } else if (data.url) {
      window.open(data.url, "_blank", "noopener,noreferrer");
    }
  };

  const renderButton = () => {
    // If buttonType is "none", don't render anything
    if (buttonType === "none") return null;
    
    // If there's a special status like "Under NDA", render it instead of a button
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

    // If buttonType is "static", render static text
    if (buttonType === "static") {
      return (
        <div className="static-text">
          {data.specialStatus || (variant === "large" ? "View Project" : "Visit Site")}
        </div>
      );
    }

    // Otherwise render interactive button
    const commonProps = {
      className: "read-more-button",
      withIcon: true,
      iconDirection: "right" as const,
      size: isSmallScreen ? "s" : (variant === "large" ? "m" : "s") as "s" | "m",
    };

    if (variant === "large") {
      return (
        <Buttons
          {...commonProps}
          text={isSmallScreen ? "" : "Read"}
          iconName="ArrowRight"
          withText={!isSmallScreen}
          variant="primary"
          size="s"
        />
      );
    } else {
      return (
        <Buttons
          {...commonProps}
          text={isSmallScreen ? "" : "Visit site"}
          iconName="ArrowSquareOut"
          withText={!isSmallScreen}
          variant="primary"
          size="s"
        />
      );
    }
  };

  return (
    <div
      className={`project-container ${variant === "small" ? "project-container-small" : ""} ${data.specialStatus ? "has-special-status" : ""}`}
      onClick={data.specialStatus ? undefined : handleClick}
    >
      <img className="project-image" src={data.img} alt={data.title} />
      <div className="project-card">
        <div className="project-card-data">
          <div className="title">
            <h3>{data.title}</h3>
            <h5>
              {variant === "small"
                ? data.type === "personal"
                  ? "Personal project"
                  : data.type
                : data.tags.join(", ")}
            </h5>
            {/* <div className="tag-container">
              {variant === "small" ? (
                <Tag
                  text={data.type === "personal" ? "Personal project" : data.type}
                  color={vibrantColors[2]}
                  rotation={0}
                  variant="small"
                />
              ) : (
                data.tags.map((tag, index) => (
                  <Tag
                    key={index}
                    text={tag}
                    color={vibrantColors[index % vibrantColors.length]}
                    rotation={0}
                    variant="small"
                  />
                ))
              )}
            </div> */}
          </div>
          <div className="link">
            <p>{data.description}</p>
            {renderButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
