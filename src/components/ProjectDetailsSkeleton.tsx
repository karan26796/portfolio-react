import React, { useEffect, useState } from 'react';
import '../styles/ProjectDetailsSkeleton.scss';

const ProjectDetailsSkeleton: React.FC = () => {
    // Generate some random lines for the fake paragraph content
    const generateLines = (count: number) => {
        return Array.from({ length: count }).map((_, i) => (
            <div
                key={i}
                className="skeleton-text-line"
                style={{ width: `${Math.random() * 20 + 80}%` }}
            ></div>
        ));
    };

    return (
        <div className="container-project details-skeleton">
            {/* Sidepanel skeleton */}
            <div className="project-side-panel">
                <div className="side-panel-content">
                    <div className="skeleton-sidebar-title"></div>
                    <div className="skeleton-sidebar-line"></div>
                    <div className="skeleton-sidebar-line"></div>
                    <div className="skeleton-sidebar-line short"></div>
                    <div className="skeleton-sidebar-line"></div>
                </div>
            </div>

            {/* Main Content skeleton */}
            <div className="project-content-wrapper">
                {/* Header Skeleton */}
                <div className="project-detail-header-skeleton">
                    <div className="skeleton-tags">
                        <div className="skeleton-tag"></div>
                        <div className="skeleton-tag"></div>
                    </div>
                    <div className="skeleton-title-big"></div>
                    <div className="skeleton-desc-block">
                        {generateLines(3)}
                    </div>
                </div>

                {/* Meta Grid Skeleton */}
                <div className="project-meta-grid-skeleton">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div className="meta-item-skeleton" key={i}>
                            <div className="meta-title-skeleton"></div>
                            <div className="meta-value-skeleton"></div>
                        </div>
                    ))}
                </div>

                {/* Content Skeleton */}
                <div className="project-details skeleton-markdown">
                    <div className="skeleton-h2"></div>
                    <div className="skeleton-paragraph">
                        {generateLines(4)}
                    </div>
                    <div className="skeleton-hero-image"></div>
                    <div className="skeleton-h3"></div>
                    <div className="skeleton-paragraph">
                        {generateLines(6)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsSkeleton;
