import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mainProjectSummaries } from '../utils/ProjectSummaries';
import '../styles/ProjectNextProjects.scss';

interface ProjectNextProjectsProps {
  currentProjectId: string;
}

const ProjectNextProjects: React.FC<ProjectNextProjectsProps> = ({ currentProjectId }) => {
  const navigate = useNavigate();
  const otherProjects = mainProjectSummaries.filter(
    (project) => project.id !== currentProjectId
  );

  if (otherProjects.length === 0) return null;

  return (
    <section className="project-next-projects">
      <h3>More projects</h3>
      <div className="project-next-scroll">
        {otherProjects.map((project) => (
          <button
            key={project.id}
            type="button"
            className="project-next-card"
            onClick={() => navigate(`/project/${project.id}`)}
          >
            <img src={project.img} alt={project.title} loading="lazy" />
            <div className="project-next-card-text">
              <h4>{project.title}</h4>
              {project.details && <p>{project.details}</p>}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ProjectNextProjects;
