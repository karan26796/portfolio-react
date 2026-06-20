import React from 'react';
import { FC } from 'react';
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
  const [hasScrolled, setHasScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCardClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  const featuredProjects = projectData.slice(0, FEATURED_PROJECT_COUNT);
  const overflowProjects = projectData.slice(FEATURED_PROJECT_COUNT);

  return (
    <div className={`project-parent ${!hasScrolled ? 'is-bouncing' : ''}`}>
      <div className="project-featured">
        {featuredProjects.map((project) => (
          <div key={project.id}>
            <ProjectCard
              data={project}
              variant="large"
              buttonType="button"
              onClick={() => handleCardClick(project.id)}
              showDivider={true}
            />
          </div>
        ))}
      </div>

      {overflowProjects.length > 0 && (
        <div className="project-scroll-section">
          <h4 className="project-scroll-label">More projects</h4>
          <div className="project-scroll-row">
            {overflowProjects.map((project) => (
              <div key={project.id} className="project-scroll-item">
                <ProjectCard
                  data={project}
                  variant="small"
                  buttonType="none"
                  onClick={() => handleCardClick(project.id)}
                  showDivider={false}
                  enableTilt={false}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
