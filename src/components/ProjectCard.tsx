// ProjectCard.tsx

import React from "react";
import { ProjectCardData } from "../utils/interfaces";
import "../styles/ProjectCard.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';



const ProjectCard: React.FC<{ data: ProjectCardData }> = ({ data }) => {
  return (
    <div className="project-container"
    >
      <div className="img-container">
        <img className="project-image" src={data.img} alt={data.title} />
      </div>
      {/* <div className="divider"></div> */}
      <div className="project-card">
        <div className="project-data">
          <h2>{data.title}</h2>
          <p className="desc">{data.description}</p>
        </div>
        <div className="project-controls">
          {/* <h4 className="project-meta text">{data.tags.join(", ")}</h4>
          <button className="read-more text">
            Read More
            <i className="material-icons">arrow_forward</i>
          </button> */}
          <FontAwesomeIcon className="icon" icon={faArrowRight} />
        </div>
      </div>
      {/* <div className="divider"></div> */}
    </div>
  );
};

export default ProjectCard;

{
  /* <a
  key={project.id}
  className="project-card"
  onClick={() => navigate(`/projects/${project.id}`)}
>
  <div className="img-container">
    <img src={project.imageUrl} alt={project.title} className="project-image" />
  </div>
  <div className="project-text">
    <p style={{ fontSize: "1.15rem" }} className="semibold">
      {project.title}
    </p>
  </div>
  <div className="project-controls">
    <div className="project-meta text">
      <p style={{ fontSize: ".8rem" }} className="project-tags ">
        {project.tags.join(", ")}
      </p>
    </div>
    <button className="read-more text">
      Read More
      <i className="material-icons">arrow_forward</i>
    </button>
  </div>
</a>; */
}
