import React from 'react';
import '../styles/ProjectListSkeleton.scss';

export const ProjectListSkeleton: React.FC = () => {
    // Simulating 5 projects based on typical list length
    const dummyProjects = [1, 2, 3, 4, 5];

    return (
        <div className="project-wrapper">
            <div className="title-section" style={{ minHeight: '80px' }}>
                {/* Skeleton for the 'Projects' title could go here if needed, but normally title is outside */}
            </div>

            {dummyProjects.map((item, index) => {
                const isSmallScreen = window.innerWidth < 900;
                // Alternate layouts for large screen (small / large variants)
                const isSmallVariant = !isSmallScreen && index % 2 !== 0;

                return (
                    <div
                        key={item}
                        className={`project-container skeleton-container ${isSmallVariant ? 'project-container-small' : ''}`}
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
                );
            })}
        </div>
    );
};

export default ProjectListSkeleton;
