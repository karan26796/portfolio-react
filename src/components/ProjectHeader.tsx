import React from "react";
import { ProjectCardData } from "../utils/interfaces";
import ScrollReveal from "./ScrollReveal";
import "../styles/ProjectHeader.scss";
import ProjectMetaGrid from "./ProjectMetaGrid";
import { ProjectMeta } from "../utils/ProjectSummaries";

const ProjectHeader: React.FC<{ data: ProjectCardData & { meta?: ProjectMeta } }> = ({ data }) => {
  return (
    <ScrollReveal className="project-header">
      <ScrollReveal delay={80}>
        <h2>{data.title}</h2>
      </ScrollReveal>
      <ScrollReveal delay={160}>
        <div className="project-header-intro">
          {data.description && (
            <h4 className="project-header-desc">{data.description}</h4>
          )}
          {data.meta && <ProjectMetaGrid meta={data.meta} />}
        </div>
      </ScrollReveal>
    </ScrollReveal>
  );
};

export default ProjectHeader;
