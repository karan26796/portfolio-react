import React, { FC, useMemo } from 'react';
import CircleArrowIcon from '../components/CircleArrowIcon';
import ScrollReveal, { scrollRevealStagger } from '../components/ScrollReveal';
import '../styles/ProjectList.scss';
import { useNavigate } from 'react-router-dom';
import { ProjectCardData } from '../utils/interfaces';

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

const COMPANY_TENURES: Record<string, string> = {
  "Keka HR": "Mar 2024 – Present",
  "Looppanel": "2022",
  "Side Projects": "2025 - Present",
  "Nimbuzz": "2021",
  "NID": "2017 – 2019",
};

const COMPANY_LOGOS: Record<string, string> = {
  "Keka HR": "/project-imgs/kekalogo.webp",
  "Looppanel": "/project-imgs/Looppanel-logo.webp",
};

const ProjectList: React.FC<ProjectListProps> = ({ projectData, cardComponent: ProjectCard }) => {
  const navigate = useNavigate();

  const handleCardClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  const handleIndiefindsClick = () => {
    window.open('https://indiefinds.vercel.app', '_blank', 'noopener,noreferrer');
  };

  // Group projects by company tag/metadata
  const companyGroups = useMemo(() => {
    const groups: { company: string; projects: ProjectCardData[] }[] = [];

    projectData.forEach((project) => {
      const companyName =
        project.company ||
        (project.year ? project.year.split('/')[0].trim() : 'Featured Projects');

      let group = groups.find((g) => g.company === companyName);
      if (!group) {
        group = { company: companyName, projects: [] };
        groups.push(group);
      }
      group.projects.push(project);
    });

    return groups;
  }, [projectData]);

  return (
    <div className="project-parent">
      {companyGroups.map((group, groupIndex) => (
        <div key={group.company} className="company-project-section">
          <ScrollReveal delay={scrollRevealStagger(groupIndex * 2)}>
            <div className="company-section-title">
              <div className="company-info-group">
                {COMPANY_LOGOS[group.company] && (
                  <img
                    src={COMPANY_LOGOS[group.company]}
                    alt={`${group.company} logo`}
                    className="company-logo"
                  />
                )}
                <h4 className="company-name">{group.company}</h4>
              </div>
              {COMPANY_TENURES[group.company] && (
                <p className="company-tenure">{COMPANY_TENURES[group.company]}</p>
              )}
            </div>
          </ScrollReveal>

          <div className="company-project-cards">
            {group.projects.map((project, index) => (
              <ScrollReveal key={project.id} delay={scrollRevealStagger(index)}>
                <ProjectCard
                  data={project}
                  variant="large"
                  buttonType="button"
                  onClick={project.id === '10' || project.id === '11' ? undefined : () => handleCardClick(project.id)}
                  showDivider={index < group.projects.length - 1}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      ))}

      {/* Side Project Highlight Banner */}
      <div className="indiefinds-wrapper">
        <ScrollReveal delay={scrollRevealStagger(3)}>
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
    </div>
  );
};

export default ProjectList;
