// ProjectDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../styles/ProjectDetails.scss"

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [projectData, setProjectData] = useState<any[]>([]);

  useEffect(() => {
    const loadProjectData = async () => {
      try {
        const data = await import(`../utils/projectcontent/project${projectId}`);
        setProjectData(data.default);
      } catch (error) {
        console.error("Failed to load project data:", error);
      }
    };

    if (projectId) loadProjectData();
  }, [projectId]);

  return (
    <div className='container-project'>
      {projectData.map((element, index) => (
        <React.Fragment key={index}>
          {element.type === 'header' && (
            <React.Fragment>
              {React.createElement(`h${element.level}`, null, element.text)}
              <hr />
            </React.Fragment>
          )}
          {element.type === 'bullet' && (
            <ul>
              {(element.text as string[]).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
          {element.type === 'figure' && (
            <figure>
              <img src={element.image} alt={element.caption} />
              <figcaption>{element.caption}</figcaption>
            </figure>
          )}
          {element.type === 'custom' && element.content}
        </React.Fragment>
      ))
      }
    </div >
  );
};

export default ProjectDetails;

