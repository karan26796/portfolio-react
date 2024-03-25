// ProjectDetails.tsx

import React from "react";
import { useParams } from "react-router-dom";
import { projectDetails } from "../utils/ProjectDetailing";
import '../styles/ProjectDetails.scss'
import { ProjectDetail, ImageDetail } from "../utils/interfaces"; // Assuming this import path is correct

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const details = projectId ? projectDetails[projectId] : null;

  if (!details) {
    return <div>Project not found</div>;
  }

  return (
    <div className="container-project">
      {details.map((detail, index) => {
        switch (detail.type) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            const Tag = detail.type as keyof JSX.IntrinsicElements;
            return <Tag key={index}>{detail.content as string}</Tag>;
          case "bullet":
            return (
              <ul key={index}>
                {(detail.content as string[]).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            );
          case "image":
            // Make sure to cast the content to the correct type for TypeScript
            const imageContent = detail.content as ImageDetail;
            return (
              <figure key={index}>
                <img src={imageContent.url} alt="" />
                {imageContent.caption && (
                  <figcaption>{imageContent.caption}</figcaption>
                )}
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default ProjectDetails;
