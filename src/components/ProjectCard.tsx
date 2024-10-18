// ProjectCard.tsx
import React from "react";
import { ProjectCardData } from "../utils/interfaces";
import "../styles/ProjectCard.scss";
import Buttons from "./Buttons";

const ProjectCard: React.FC<{ data: ProjectCardData }> = ({ data }) => {
  return (
    <div className="project-container">
      <img className="project-image" src={data.img} alt={data.title} />
      <div className="project-card">
        <div className="project-card-data">
          <h5>{data.tags.join(", ")}</h5>
          <h3 className="slab">{data.title}</h3>
          {/* <p>{data.description}</p> */}
        </div>

        <Buttons
          className="read-more-button"
          text="Read more"
          // iconName="ArrowRight"
          withIcon={true}
          iconDirection="right"
          withText={true}
          size="m"
          variant="primary"
          // weight="regular"
        />

        {/* <button className="read-more-button"> Read more</button> */}
      </div>
    </div>
  );
};

export default ProjectCard;
