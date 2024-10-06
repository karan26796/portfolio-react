import React from 'react';
import { projectSummaries } from '../utils/ProjectSummaries';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import '../styles/ProjectList.scss';
import { Link } from 'react-router-dom';

interface ProjectListProps {
  projectData: typeof projectSummaries; // Assuming projectSummaries is the type you want
  cardComponent: React.ComponentType<{ data: any }>; // Generic card component type
}

const ProjectList: React.FC<ProjectListProps> = ({ projectData, cardComponent: CardComponent }) => {
  return (
    <ResponsiveMasonry className='project-parent'
      columnsCountBreakPoints={{350: 1, 750: 1, 900: 2 }}>
      <Masonry className='project-list' gutter="2em">
        {projectData.map((project) => (
          <Link key={project.id} to={`/project/${project.id}`} style={{ textDecoration: 'none' }}>
            <CardComponent data={project} />
          </Link>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default ProjectList;
