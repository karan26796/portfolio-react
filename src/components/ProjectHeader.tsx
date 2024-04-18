// ProjectCard.tsx

import React from "react";
import { ProjectCardData } from "../utils/interfaces";
import "../styles/ProjectHeader.scss";

const ProjectHeader: React.FC<{ data: ProjectCardData }> = ({ data }) => {
  return (
    <div className="project-header">
      <div className="project-header-data">
        <h2>{data.description}</h2>
        <h4 className="project-tags">{data.tags.join(", ")}</h4>
      </div>
      <img className="project-header-image" src={data.img} alt={data.title} />
      {/* <div className="divider"></div> */}
    </div>
  );
};

export default ProjectHeader;

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
