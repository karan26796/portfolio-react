// ProjectCard.tsx
import React from "react";
import "../styles/ProjectCardSmall.scss";
import indieImg from "../utils/project-imgs/thumb-indie.png";
import Buttons from "./Buttons";

const ProjectCardSmall: React.FC = () => {
  const handleButtonClick = () => {
    // Replace 'https://example.com' with the actual URL you want to open
    window.open("https://indiefinds.in", "_blank", "noopener,noreferrer");
  };

  return (
    <a className="project-container-small" onClick={handleButtonClick}>
      <img className="project-image" src={indieImg} alt={indieImg} />
      <div className="project-card">
        <div className="project-card-data">
          <h5>Personal project</h5>
          <h3 className="slab">IndieFinds.in</h3>
          <p>
            Discover premium and affordable Indian brands across sneakers,
            apparel, watches etc.{" "}
          </p>
        </div>
      </div>
      <Buttons
        className="read-more-button"
        text="Read more"
        iconName="ArrowSquareOut"
        withIcon={true}
        iconDirection="right"
        withText={false}
        size="m"
        variant="tertiary"
        onClick={handleButtonClick}
        // weight="regular"
      />
    </a>
  );
};

export default ProjectCardSmall;
