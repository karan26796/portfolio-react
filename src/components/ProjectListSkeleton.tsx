import React from 'react';
import '../styles/ProjectList.scss';
import '../styles/ProjectListSkeleton.scss';
import '../styles/ProjectCardSmall.scss';

const FEATURED_PROJECT_COUNT = 4;

export const ProjectListSkeleton: React.FC = () => {
    const featuredItems = Array.from({ length: FEATURED_PROJECT_COUNT }, (_, i) => i + 1);
    const overflowItems = [5, 6];

    return (
        <div className="project-parent project-wrapper">
            <div className="project-featured">
                {featuredItems.map((item) => (
                    <div
                        key={item}
                        className="project-container skeleton-container"
                        style={{
                            transform: `rotate(${Math.random() * 2 - 1}deg)`,
                            pointerEvents: 'none'
                        }}
                    >
                        <div className="skeleton-image"></div>
                        <div className="project-card skeleton-card">
                            <div className="title-details-group">
                                <div className="skeleton-line skeleton-title"></div>
                                <div className="skeleton-line skeleton-meta"></div>
                            </div>

                            <div className="desc-btn-group">
                                <div className="skeleton-line skeleton-desc"></div>
                                <div className="skeleton-line skeleton-desc short"></div>

                                <div className="button-container">
                                    <div className="skeleton-button"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="project-scroll-section">
                <div className="skeleton-line skeleton-meta" style={{ width: '8rem', height: '1.25rem' }}></div>
                <div className="project-scroll-row">
                    {overflowItems.map((item) => (
                        <div key={item} className="project-scroll-item">
                            <div
                                className="project-container skeleton-container project-container-small"
                                style={{ pointerEvents: 'none' }}
                            >
                                <div className="skeleton-image"></div>
                                <div className="project-card skeleton-card">
                                    <div className="title-details-group">
                                        <div className="skeleton-line skeleton-title"></div>
                                        <div className="skeleton-line skeleton-meta"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectListSkeleton;
