// ProjectCard.tsx

import React from "react";
import { ProjectCardData } from "../utils/interfaces";
import "../styles/ProjectCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

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
        <button> Read more</button>
      </div>
    </div>
  );
};

export default ProjectCard;
