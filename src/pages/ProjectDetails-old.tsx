import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProjectDetails.scss";
import { ProjectElement } from "../utils/interfaces";
import ProjectDetailHeader from "../components/ProjectHeader";
import { projectSummaries } from "../utils/ProjectSummaries";

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [projectData, setProjectData] = useState<ProjectElement[]>([]);
  const [loading, setLoading] = useState(true);
  
  const projectSummary = projectSummaries.find(
    (summary) => summary.id === projectId
  );

  useEffect(() => {
    const loadProjectData = async () => {
      try {
        setLoading(true);
        setProjectData([]); // Reset project data before loading new data
        
        const data = await import(
          `../utils/projectcontent/project${projectId}`
        );
        setProjectData(data.default);
        
        // Scroll to top when loading new project
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Failed to load project data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      loadProjectData();
    }
  }, [projectId]);

  const renderElement = (element: ProjectElement) => {
    switch (element.type) {
      case "intro":
        return (
          <div className="intro" key={`intro-${element.text?.text || Math.random()}`}>
            {element.text && renderElement(element.text)}
            {element.desc && renderElement(element.desc)}
          </div>
        );

      case "header": {
        if (!element.text) return null;
        
        const headerContent = element.text
          .split("\n")
          .map((line, index, arr) => (
            <React.Fragment key={`${line}-${index}`}>
              {line}
              {index < arr.length - 1 && <br />}
            </React.Fragment>
          ));

        return React.createElement(
          `h${element.level || 1}`,
          { key: element.text },
          headerContent
        );
      }

      case "bullet":
        if (!Array.isArray(element.text)) return null;
        return (
          <ul key={`bullet-${element.text.join('-')}`}>
            {element.text.map((item, idx) => (
              <li key={`bullet-item-${idx}`}>{item}</li>
            ))}
          </ul>
        );

      case "figure":
        if (typeof element.image !== 'string') return null;
        return (
          <figure key={`figure-${element.caption || element.image}`}>
            <img src={element.image} alt={element.caption || 'Project image'} />
            {element.caption && <figcaption>{element.caption}</figcaption>}
          </figure>
        );

      case "p":
        if (typeof element.text !== 'string') return null;
        return (
          <p key={`p-${element.text.substring(0, 20)}`}>
            {element.text.split("\n").map((line, index, arr) => (
              <React.Fragment key={`line-${index}`}>
                {line}
                {index < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );

      case "custom":
        return (
          <div className="custom-element" key={`custom-${Math.random()}`}>
            {element.content}
          </div>
        );

      case "imgtext":
        if (!Array.isArray(element.body) || !Array.isArray(element.image)) return null;
        return (
          <div className="img-text-parent" key={`imgtext-${Math.random()}`}>
            <div className="body-element">
              {element.body.map((bodyElement, bodyIndex) => (
                <React.Fragment key={`imgtext-body-${bodyIndex}`}>
                  {renderElement(bodyElement)}
                </React.Fragment>
              ))}
            </div>
            <div className="figure-element">
              {element.image.map((img, imgIndex) => (
                <figure key={`imgtext-img-${imgIndex}`}>
                  {typeof img.image === 'string' && (
                    <img src={img.image} alt={img.caption || 'Project image'} />
                  )}
                  {img.caption && <figcaption>{img.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return <div className="loading-container">Loading project details...</div>;
  }

  if (!projectSummary) {
    return <div className="error-container">Project not found</div>;
  }

  return (
    <div className="container-project">
      <ProjectDetailHeader data={projectSummary} />
      {projectData.map((element, index) => (
        <React.Fragment key={`element-${index}`}>
          {renderElement(element)}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProjectDetails;