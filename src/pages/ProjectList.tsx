import React from 'react';
import { FC } from 'react';
import CircleArrowIcon from '../components/CircleArrowIcon';
import ScrollReveal, { scrollRevealStagger } from '../components/ScrollReveal';
import '../styles/ProjectList.scss';
import { useNavigate } from 'react-router-dom';
import { ProjectCardData } from '../utils/interfaces';

import { FEATURED_PROJECT_COUNT } from '../utils/ProjectSummaries';

interface ProjectListProps {
  projectData: ProjectCardData[];
  cardComponent: FC<{
    data: ProjectCardData;
    variant: 'small' | 'large';
    onClick?: () => void;
    buttonType?: 'button' | 'static' | 'none';
    showDivider?: boolean;
    enableTilt?: boolean;
  }>;
}

const ProjectList: React.FC<ProjectListProps> = ({ projectData, cardComponent: ProjectCard }) => {
  const navigate = useNavigate();

  const handleCardClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  const featuredProjects = projectData.slice(0, FEATURED_PROJECT_COUNT);
  const overflowProjects = projectData.slice(FEATURED_PROJECT_COUNT, FEATURED_PROJECT_COUNT + 3);

  const handleIndiefindsClick = () => {
    window.open('https://indiefinds.vercel.app', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="project-parent">
      <div className="project-featured">
        {featuredProjects.map((project, index) => (
          <ScrollReveal key={project.id} delay={scrollRevealStagger(index)}>
            <ProjectCard
              data={project}
              variant="large"
              buttonType="button"
              onClick={index === 0 ? undefined : () => handleCardClick(project.id)}
              showDivider={true}
            />
          </ScrollReveal>
        ))}
      </div>

      <div className="indiefinds-wrapper">
        <ScrollReveal delay={scrollRevealStagger(featuredProjects.length)}>
          <div
            className="indiefinds-banner"
            onClick={handleIndiefindsClick}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleIndiefindsClick()}
          >
            <div className="indiefinds-banner__content">
              <div className="indiefinds-banner__text">
                <p className="indiefinds-banner__eyebrow">#Side project</p>
                <h3 className="indiefinds-banner__title">Discover affordable homegrown brands</h3>
                <p className="indiefinds-banner__desc">
                  A curated directory of affordable Indian brands that give international ones a run for their money
                </p>
                <CircleArrowIcon className="indiefinds-banner__cta" size={44} variant="primary" />
              </div>
            </div>
            <div className="indiefinds-banner__visual" aria-hidden="true">
              <img
                className="indiefinds-banner__img indiefinds-banner__img--left"
                src="/project-imgs/indie-finds/Container-2.png"
                alt=""
              />
              <img
                className="indiefinds-banner__img indiefinds-banner__img--center"
                src="/project-imgs/indie-finds/Container.png"
                alt=""
              />
              <img
                className="indiefinds-banner__img indiefinds-banner__img--right"
                src="/project-imgs/indie-finds/Container-1.png"
                alt=""
              />
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* overflowProjects.length > 0 && (
        <div className="project-scroll-section">
          <ScrollReveal delay={scrollRevealStagger(featuredProjects.length + 1)}>
            <h4 className="project-scroll-label">More projects</h4>
          </ScrollReveal>
          <div className="project-scroll-row">
            {overflowProjects.map((project, index) => (
              <ScrollReveal
                key={project.id}
                className="project-scroll-item"
                delay={scrollRevealStagger(index, 60)}
              >
                <ProjectCard
                  data={project}
                  variant="small"
                  buttonType="none"
                  onClick={() => handleCardClick(project.id)}
                  showDivider={false}
                  enableTilt={false}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      ) */}
    </div>
  );
};

export default ProjectList;
