import React from "react";
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
  };
  variant: "small" | "large";
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data, variant, onClick }) => {
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

  return (
    <div 
      className={`project-container ${variant === "small" ? "project-container-small" : ""}`} 
      onClick={handleClick}
    >
      <img className="project-image" src={data.img} alt={data.title} />
      <div className="project-card">
        <div className="project-card-data">
          <div className="tag-container">
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
          </div>

          <h3 className="slab">{data.title}</h3>
          <p>{data.description}</p>
        </div>

        {variant === "large" ? (
          <Buttons
            className="read-more-button"
            text="Read more"
            iconName="ArrowRight"
            withIcon={true}
            iconDirection="right"
            withText={true}
            size="m"
            variant="primary"
          />
        ) : (
          <Buttons
            className="link"
            iconName="ArrowSquareOut"
            withIcon={true}
            iconDirection="right"
            withText={false}
            size="m"
            variant="secondary"
          />
        )}
      </div>
    </div>
  );
};

export default ProjectCard;