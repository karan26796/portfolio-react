import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mainProjectSummaries } from '../utils/ProjectSummaries';
import ScrollReveal, { scrollRevealStagger } from './ScrollReveal';
import '../styles/ProjectNextProjects.scss';

interface ProjectNextProjectsProps {
  currentProjectId: string;
}

const ProjectNextProjects: React.FC<ProjectNextProjectsProps> = ({ currentProjectId }) => {
  const navigate = useNavigate();
  // Show exactly two "more projects" so they can sit as equal-width cards
  // that fill the available container width.
  const otherProjects = mainProjectSummaries
    .filter((project) => project.id !== currentProjectId)
    .slice(0, 2);

  if (otherProjects.length === 0) return null;

  return (
    <ScrollReveal className="project-next-projects">
      <h3>More projects</h3>
      <div className="project-next-grid">
        {otherProjects.map((project, index) => (
          <ScrollReveal key={project.id} delay={scrollRevealStagger(index, 60)}>
            <button
              type="button"
              className="project-next-card"
              onClick={() => navigate(`/project/${project.id}`)}
            >
              <img src={project.img} alt={project.title} loading="lazy" />
              <div className="project-next-card-body">
                {project.tags && project.tags.length > 0 && (
                  <span className="project-next-card-tag">
                    {project.tags.join(" · ")}
                  </span>
                )}
                <h4>{project.title}</h4>
                {project.description && (
                  <p className="project-next-card-desc">{project.description}</p>
                )}
              </div>
            </button>
          </ScrollReveal>
        ))}
      </div>
    </ScrollReveal>
  );
};

export default ProjectNextProjects;
