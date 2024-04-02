// ProjectDetails.tsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProjectDetails.scss";
import { ProjectElement } from "../utils/interfaces"; // Ensure this path matches the location of your interfaces.ts file
import ProjectDetailHeader from "../components/ProjectHeader";
import { projectSummaries } from "../utils/ProjectSummaries";

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [projectData, setProjectData] = useState<ProjectElement[]>([]);
  // Assuming projectId is a string and projectSummaries uses ids as strings
  const projectSummary = projectSummaries.find(
    (summary) => summary.id === projectId
  );

  useEffect(() => {
    const loadProjectData = async () => {
      try {
        const data = await import(
          `../utils/projectcontent/project${projectId}`
        );
        setProjectData(data.default);
      } catch (error) {
        console.error("Failed to load project data:", error);
      }
    };

    if (projectId) loadProjectData();
  }, [projectId]);

  const renderElement = (element: ProjectElement) => {
    switch (element.type) {
      case "intro":
        return (
          <div className="intro" key={`intro-${element.text.text}`}>
            {renderElement(element.text)}
            {renderElement(element.desc)}
          </div>
        );
      case "header": {
        const headerContent = element.text
          .split("\n")
          .map((line, index, arr) => (
            <React.Fragment key={`${element.text}-${index}`}>
              {line}
              {index < arr.length - 1 && <br />}
            </React.Fragment>
          ));

        return React.createElement(
          `h${element.level}`,
          { key: element.text },
          ...headerContent // Spread the array of React Fragments as children
        );
      }
      case "bullet":
        return (
          <ul key={element.text.toString()}>
            {element.text.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
      case "figure":
        return (
          <figure key={element.caption}>
            <img src={element.image} alt={element.caption} />
            <figcaption>{element.caption}</figcaption>
          </figure>
        );
      case "p":
        return (
          <p key={element.text}>
            {element.text.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < element.text.split("\n").length - 1 ? <br /> : null}
              </React.Fragment>
            ))}
          </p>
        );
      case "custom":
        return (
          <React.Fragment key={`custom-${Math.random()}`}>
            {element.content}
          </React.Fragment>
        );
      case "imgtext":
        return (
          <div key={`imgtext-${element.body.map((el) => el.text).join("-")}`}>
            {element.body.map((bodyElement, bodyIndex) => (
              <React.Fragment key={`imgtext-body-${bodyIndex}`}>
                {renderElement(bodyElement)}
              </React.Fragment>
            ))}
            {element.image.map((img, imgIndex) => (
              <figure key={`imgtext-img-${imgIndex}`}>
                <img src={img.image} alt={img.caption} />
                {img.caption && <figcaption>{img.caption}</figcaption>}
              </figure>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container-project">
      {projectSummary && <ProjectDetailHeader data={projectSummary} />}
      {projectData.map((element, index) => (
        <React.Fragment key={index}>{renderElement(element)}</React.Fragment>
      ))}
    </div>
  );
};

export default ProjectDetails;
