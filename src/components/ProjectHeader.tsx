import React from "react";
import { ProjectCardData } from "../utils/interfaces";
import "../styles/ProjectHeader.scss";
import Tag, { VibrantColor } from "./Tag";
import ProjectMetaGrid from "./ProjectMetaGrid";
import { ProjectMeta } from "../utils/ProjectSummaries";

// Define vibrant colors array
const vibrantColors: VibrantColor[] = [
  { bg: '#fefefe', text: '#FF2D55' }, // Pink
  { bg: '#fefefe', text: '#007AFF' }, // Blue
  { bg: '#fefefe', text: '#34C759' }, // Green
  { bg: '#fefefe', text: '#FF9500' }, // Orange
  { bg: '#fefefe', text: '#AF52DE' }, // Purple
  { bg: '#fefefe', text: '#00C7BE' }  // Teal
];

const ProjectHeader: React.FC<{ data: ProjectCardData & { meta?: ProjectMeta } }> = ({ data }) => {
  return (
    <div className="project-header">
      <div className="data">
        <h2>{data.title}</h2>
        <div className="tag-container">
          {data.tags.map((tag, index) => (
            <Tag
              key={index}
              text={tag}
              color={vibrantColors[index % vibrantColors.length]}
              rotation={0}
              variant="small"
            />
          ))}
        </div>
      </div>
      {data.meta && <ProjectMetaGrid meta={data.meta} />}
    </div>
  );
};

export default ProjectHeader;