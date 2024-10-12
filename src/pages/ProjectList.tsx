import React from 'react';
import { projectSummaries } from '../utils/ProjectSummaries';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import '../styles/ProjectList.scss';
import { Link } from 'react-router-dom';
import ProjectCardSmall from '../components/ProjectCardSmall';

interface ProjectListProps {
  projectData: typeof projectSummaries; // Assuming projectSummaries is the type you want
  cardComponent: React.ComponentType<{ data: any }>; // Generic card component type
}

const ProjectList: React.FC<ProjectListProps> = ({ projectData, cardComponent: CardComponent }) => {
  return (
    <div className='project-parent'>
      <ProjectCardSmall/>
      {projectData.map((project) => (
        <Link key={project.id} to={`/project/${project.id}`} style={{ textDecoration: 'none' }}>
          <CardComponent data={project} />
        </Link>
      ))}
    </div>
  );
};

export default ProjectList;
