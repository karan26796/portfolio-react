import React from "react";
import { ProjectCardData } from "../utils/interfaces";
import "../styles/ProjectHeader.scss";
import Tag, { VibrantColor } from "./Tag";

// Define vibrant colors array
const vibrantColors: VibrantColor[] = [
  { bg: '#fefefe', text: '#FF2D55' }, // Pink
  { bg: '#fefefe', text: '#007AFF' }, // Blue
  { bg: '#fefefe', text: '#34C759' }, // Green
  { bg: '#fefefe', text: '#FF9500' }, // Orange
  { bg: '#fefefe', text: '#AF52DE' }, // Purple
  { bg: '#fefefe', text: '#00C7BE' }  // Teal
];

const ProjectHeader: React.FC<{ data: ProjectCardData }> = ({ data }) => {
  return (
    <div className="project-header">
      <div className="project-header-data">
        <h1>{data.title}</h1>
        {/* <h5>{data.tags.join(", ")}</h5> */}
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
      <img className="project-header-image" src={data.img} alt={data.title} />
    </div>
  );
};

export default ProjectHeader;