import React from 'react';
import { FC } from 'react';
import '../styles/ProjectList.scss';
import { Link, useNavigate } from 'react-router-dom';
import indieImg from '../utils/project-imgs/thumb-indie.png'
import { ProjectCardData } from '../utils/interfaces';

interface ProjectListProps {
  projectData: ProjectCardData[];
  cardComponent: FC<{ data: ProjectCardData; variant: 'small' | 'large'; onClick?: () => void }>;
}

const ProjectList: React.FC<ProjectListProps> = ({ projectData, cardComponent: ProjectCard }) => {

  const navigate = useNavigate();

  const handleCardClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className='project-parent'>
      {/* Small variant for IndieFinds */}
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

      {/* Large variant for other projects */}
      {projectData.map((project) => (
        <div key={project.id} onClick={() => handleCardClick(project.id)}>
          <ProjectCard data={project} variant="large" />
        </div>
      ))}
    </div>
  );
};

export default ProjectList;