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
        {/* <h4 className="project-meta text">{data.tags.join(", ")}</h4> */}
        <h3>{data.title}</h3>
        {/* <p className="desc">{data.description}</p> */}
        <FontAwesomeIcon className="icon" icon={faArrowRight} />
      </div>
    </div>
  );
};

export default ProjectCard;
