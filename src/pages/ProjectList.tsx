import React from 'react';
import { FC } from 'react';
import '../styles/ProjectList.scss';
import { Link, useNavigate } from 'react-router-dom';
import indieImg from '../utils/project-imgs/thumb-indie.png'
import { ProjectCardData } from '../utils/interfaces';

interface ProjectListProps {
  projectData: ProjectCardData[];
  cardComponent: FC<{ 
    data: ProjectCardData; 
    variant: 'small' | 'large'; 
    onClick?: () => void;
    buttonType?: 'button' | 'static' | 'none';
    showDivider?: boolean;
  }>;
}

// IDs to hide (corresponding to Project3, Project4, Project5)
const HIDDEN_PROJECT_IDS = ['project3', 'project4', 'project5'];

const ProjectList: React.FC<ProjectListProps> = ({ projectData, cardComponent: ProjectCard }) => {
  const navigate = useNavigate();

  const handleCardClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  // Filter out hidden projects
  const visibleProjects = projectData.filter(
    (project) => !HIDDEN_PROJECT_IDS.includes(project.id.toLowerCase())
  );

  return (
    <div className='project-parent'>
      {visibleProjects.map((project, index) => (
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
  );
};

export default ProjectList;
