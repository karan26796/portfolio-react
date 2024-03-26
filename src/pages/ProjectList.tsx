// ProjectList.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { projectSummaries } from '../utils/ProjectSummaries';
import ProjectCard from '../components/ProjectCard'; // Assuming you have a component to render each project's summary
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import '../styles/ProjectList.scss'

const ProjectList: React.FC = () => {
  return (
    <ResponsiveMasonry className='grid-projects'
      columnsCountBreakPoints={{ 350: 1, 750: 1, 900: 2 }}
    >
      <Masonry gutter="1.5em">
        {projectSummaries.map((project) => (
          <Link key={project.id} to={`/project/${project.id}`} style={{ textDecoration: 'none' }}>
            <ProjectCard data={project} />
          </Link>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default ProjectList;
