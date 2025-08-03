import React from "react";
import "../styles/ProjectMetaGrid.scss";
import { ProjectMeta } from "../utils/ProjectSummaries";

interface Props {
    meta: ProjectMeta;
}

const metaFields = [
    { key: "duration", title: "Duration" },
    { key: "role", title: "Role" },
    { key: "scope", title: "Scope" },
    { key: "impact", title: "Impact" },
] as const;

const ProjectMetaGrid: React.FC<Props> = ({ meta }) => (
    <div className="project-meta-grid">
        {metaFields.map(({ key, title }) => (
            <div key={key}>
                <p>{title}</p>
                <h4>{meta[key]}</h4>
            </div>
        ))}
    </div>
);

export default ProjectMetaGrid;
