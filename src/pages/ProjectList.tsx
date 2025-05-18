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
  }>;
}

const ProjectList: React.FC<ProjectListProps> = ({ projectData, cardComponent: ProjectCard }) => {
  const navigate = useNavigate();

  const handleCardClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  // Create IndieFinds project card component
  const renderIndieFindsCard = () => (
    <ProjectCard
      data={{
        id: "indiefinds",
        img: indieImg,
        title: "IndieFinds.in",
        description: "Discover premium and affordable Indian brands across sneakers, apparel, watches etc.",
        tags: ["Personal project"],
        type: "personal",
        url: "https://indiefinds.in"
      }}
      variant="small"
      buttonType="button"
      onClick={() => {
        const baseUrl = "https://indiefinds.in";
        const utmParams = new URLSearchParams({
          utm_source: "kadankapoor.com",
          utm_medium: "personal_website",
          utm_campaign: "project_showcase"
        });
        const fullUrl = `${baseUrl}?${utmParams.toString()}`;
        window.open(fullUrl, "_blank", "noopener,noreferrer");
      }}
    />
  );

  return (
    <div className='project-parent'>
      {/* Render projects with IndieFinds after the first project */}
      {projectData.map((project, index) => {
        // Render the first project
        if (index === 0) {
          return (
            <React.Fragment key={`group-${index}`}>
              {/* Render the first project */}
              <div key={project.id}>
                <ProjectCard 
                  data={project.id === "6" ? 
                    {...project, specialStatus: "🔒 Under NDA"} : 
                    project
                  }
                  variant="large"
                  buttonType={project.id === "6" ? "static" : "button"}
                  onClick={project.id === "6" ? undefined : () => handleCardClick(project.id)}
                />
              </div>
              
              {/* Render IndieFinds project after the first project */}
              {renderIndieFindsCard()}
            </React.Fragment>
          );
        }
        
        // Render the rest of the projects normally
        return (
          <div key={project.id}>
            <ProjectCard 
              data={project.id === "6" ? 
                {...project, specialStatus: "🔒 Under NDA"} : 
                project
              }
              variant="large"
              buttonType={project.id === "6" ? "static" : "button"}
              onClick={project.id === "6" ? undefined : () => handleCardClick(project.id)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;