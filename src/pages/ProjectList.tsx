import React from 'react';
import { FC } from 'react';
import '../styles/ProjectList.scss';
import { Link, useNavigate } from 'react-router-dom';
import indieImg from '../utils/project-imgs/thumb-indie.png'
import { ProjectCardData } from '../utils/interfaces';
import FigmaTrainingCard from '../components/FigmaTrainingCard';

interface ProjectListProps {
  projectData: ProjectCardData[];
  cardComponent: FC<{ 
    data: ProjectCardData; 
    variant: 'small' | 'large'; 
    onClick?: () => void;
    buttonType?: 'button' | 'static' | 'none';
  }>;
}

// IDs to hide (corresponding to Project3, Project4, Project5)
const HIDDEN_PROJECT_IDS = ['project3', 'project4', 'project5'];

const ProjectList: React.FC<ProjectListProps> = ({ projectData, cardComponent: ProjectCard }) => {
  const navigate = useNavigate();

  const handleCardClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  // Remove IndieFinds card logic

  // Filter out hidden projects
  const visibleProjects = projectData.filter(
    (project) => !HIDDEN_PROJECT_IDS.includes(project.id.toLowerCase())
  );

  return (
    <div className='project-parent'>
      {/* Render projects with FigmaTrainingCard after the second project */}
      {visibleProjects.map((project, index) => {
        // Render the first and second projects
        if (index === 0 || index === 1) {
          return (
            <div key={project.id}>
              <ProjectCard 
                data={project}
                variant="large"
                buttonType="button"
                onClick={() => handleCardClick(project.id)}
              />
            </div>
          );
        }
        // Render FigmaTrainingCard after the second project
        if (index === 2) {
          return (
            <React.Fragment key={`group-${index}`}>
              {/* Render the third project */}
              <div key={project.id}>
                <ProjectCard 
                  data={project}
                  variant="large"
                  buttonType="button"
                  onClick={() => handleCardClick(project.id)}
                />
              </div>
              {/* Render FigmaTrainingCard after the second project */}
              <FigmaTrainingCard />
            </React.Fragment>
          );
        }
        // Render the rest of the projects normally
        return (
          <div key={project.id}>
            <ProjectCard 
              data={project}
              variant="large"
              buttonType="button"
              onClick={() => handleCardClick(project.id)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;