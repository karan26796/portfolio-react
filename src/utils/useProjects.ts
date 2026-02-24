import { useState, useEffect } from 'react';
import { ProjectCardData } from './interfaces';
import { projectSummaries } from './ProjectSummaries';

export interface ProjectMeta {
    duration: string;
    role: string;
    scope: string;
    impact: string;
}

export type FullProjectCardData = ProjectCardData & { meta: ProjectMeta };

export const useProjects = () => {
    const [projects, setProjects] = useState<FullProjectCardData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Simulate a tiny delay so skeleton flashes and data loads realistically fast
        const load = setTimeout(() => {
            setProjects(projectSummaries);
            setLoading(false);
        }, 300); // 300ms realistic fast load

        return () => clearTimeout(load);
    }, []);

    return { projects, loading, error };
};
