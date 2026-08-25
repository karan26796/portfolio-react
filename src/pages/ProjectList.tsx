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
  "Keka": "/project-imgs/kekalogo.webp",
  "Keka HR": "/project-imgs/kekalogo.webp",
  "Looppanel": "/project-imgs/Looppanel-logo.webp",
};

const ProjectList: React.FC<ProjectListProps> = ({ projectData, cardComponent: ProjectCard }) => {
  const navigate = useNavigate();

  const handleCardClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  // Group consecutive same-company projects under one heading — grouping
  // against only the previous group (not any earlier one) keeps the
  // original display order intact instead of merging a company's projects
  // together out of order when they're not adjacent.
  const companyGroups = useMemo(() => {
    const groups: { company: string; projects: ProjectCardData[] }[] = [];

    projectData.forEach((project) => {
      const companyName =
        project.company ||
        (project.year ? project.year.split('/')[0].trim() : 'Featured Projects');

      const last = groups[groups.length - 1];
      if (last && last.company === companyName) {
        last.projects.push(project);
      } else {
        groups.push({ company: companyName, projects: [project] });
      }
    });

    return groups;
  }, [projectData]);

  let cardIndex = 0;

  return (
    <div className="project-parent">
      {companyGroups.map((group, groupIndex) => (
        <div key={`${group.company}-${groupIndex}`} className="company-project-section">
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
            {group.projects.map((project, indexInGroup) => {
              const index = cardIndex++;
              return (
                <div key={project.id} className="project-card-row">
                  <ScrollReveal delay={scrollRevealStagger(index)}>
                    <ProjectCard
                      data={project}
                      variant="large"
                      buttonType="button"
                      onClick={project.id === '10' || project.id === '11' ? undefined : () => handleCardClick(project.id)}
                      showDivider={indexInGroup < group.projects.length - 1}
                    />
                  </ScrollReveal>
                  {project.story && (
                    <ScrollReveal
                      className={`project-story-note-wrap${index % 2 === 0 ? " is-left" : " is-right"}`}
                      delay={scrollRevealStagger(index) + 150}
                    >
                      <div className="project-story-note">{project.story}</div>
                    </ScrollReveal>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
