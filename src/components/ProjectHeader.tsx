import React from "react";
import { ProjectCardData } from "../utils/interfaces";
import ScrollReveal, { scrollRevealStagger } from "./ScrollReveal";
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
    <ScrollReveal className="project-header">
      <ScrollReveal delay={80}>
      <div className="data">
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
        <h2>{data.title}</h2>
      </div>
      </ScrollReveal>
      {data.meta && (
        <ScrollReveal delay={160}>
          <ProjectMetaGrid meta={data.meta} />
        </ScrollReveal>
      )}
    </ScrollReveal>
  );
};

export default ProjectHeader;