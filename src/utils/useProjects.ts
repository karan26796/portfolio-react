import { useState, useEffect } from 'react';
import { ProjectCardData } from './interfaces';

export interface ProjectMeta {
    duration: string;
    role: string;
    scope: string;
    impact: string;
}

export type FullProjectCardData = ProjectCardData & { meta: ProjectMeta };

let cachedProjects: FullProjectCardData[] | null = null;
let fetchPromise: Promise<FullProjectCardData[]> | null = null;

export const useProjects = () => {
    const [projects, setProjects] = useState<FullProjectCardData[]>(cachedProjects || []);
    const [loading, setLoading] = useState<boolean>(!cachedProjects);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (cachedProjects) {
            setProjects(cachedProjects);
            setLoading(false);
            return;
        }

        if (!fetchPromise) {
            fetchPromise = fetch('/api/projects')
                .then(res => {
                    if (!res.ok) throw new Error('Failed to fetch projects');
                    return res.json();
                })
                .then(data => {
                    cachedProjects = data;
                    return data;
                });
        }

        fetchPromise
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return { projects, loading, error };
};
