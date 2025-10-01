import React from "react";
import "../styles/ProjectMetaGrid.scss";
import { ProjectMeta } from "../utils/ProjectSummaries";

interface Props {
    meta: ProjectMeta;
}

const metaFields = [
    { key: "duration", title: "Duration" },
    { key: "role", title: "My role" },
    // { key: "scope", title: "Scope" },
    { key: "impact", title: "Impact" },
] as const;

const ProjectMetaGrid: React.FC<Props> = ({ meta }) => (
    <div className="project-meta-grid">
        {metaFields.map(({ key, title }) => (
            <div key={key}>
                <h4>{title}</h4>
                <p>{meta[key]}</p>
            </div>
        ))}
    </div>
);

export default ProjectMetaGrid;
