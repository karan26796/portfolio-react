import React from "react";
import "../styles/ProjectCardSmall.scss";
import indieImg from "../utils/project-imgs/thumb-indie.png";
import Buttons from "./Buttons";

const ProjectCardSmall: React.FC = () => {
  const handleButtonClick = () => {
    const baseUrl = "https://indiefinds.in";
    const utmParams = new URLSearchParams({
      utm_source: "kadankapoor.com",
      utm_medium: "personal_website",
      utm_campaign: "project_showcase"
    });
    const fullUrl = `${baseUrl}?${utmParams.toString()}`;
    window.open(fullUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <a className="project-container-small" onClick={handleButtonClick}>
      <img className="project-image" src={indieImg} alt="IndieFinds Thumbnail" />
      <div className="project-card">
        <div className="project-card-data">
          <h5>Personal project</h5>
          <h3 className="slab">IndieFinds.in</h3>
          <p>
            Discover premium and affordable Indian brands across sneakers,
            apparel, watches etc.
          </p>
        </div>
      </div>
      <Buttons
        className="link"
        iconName="ArrowSquareOut"
        withIcon={true}
        iconDirection="right"
        withText={false}
        size="m"
        variant="secondary"
        onClick={handleButtonClick}
      />
    </a>
  );
};

export default ProjectCardSmall;