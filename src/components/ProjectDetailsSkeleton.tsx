import React from 'react';
import '../styles/ProjectDetailsSkeleton.scss';

const ProjectDetailsSkeleton: React.FC = () => {
    // Fake paragraph lines with slightly varied widths for a natural look.
    const lines = (count: number, minWidth = 80) =>
        Array.from({ length: count }).map((_, i) => (
            <div
                key={i}
                className="sk sk-line"
                style={{ width: `${Math.random() * (100 - minWidth) + minWidth}%` }}
            />
        ));

    // A content section: heading block (left) + body lines (right).
    const Section = ({ bodyLines }: { bodyLines: number }) => (
        <div className="sk-section">
            <div className="sk-section__heading">
                <div className="sk sk-heading-line" />
                <div className="sk sk-heading-line sk-heading-line--short" />
            </div>
            <div className="sk-section__body">{lines(bodyLines)}</div>
        </div>
    );

    return (
        <div className="container-project details-skeleton" aria-hidden="true">
            <div className="project-content-wrapper">
                {/* Header: big title, then description (left) + meta (right) */}
                <div className="sk-header">
                    <div className="sk-title">
                        <div className="sk sk-title-line" style={{ width: '92%' }} />
                        <div className="sk sk-title-line" style={{ width: '58%' }} />
                    </div>
                    <div className="sk-intro">
                        <div className="sk-desc">{lines(4, 85)}</div>
                        <div className="sk-meta">
                            {Array.from({ length: 2 }).map((_, i) => (
                                <div className="sk-meta__row" key={i}>
                                    <div className="sk sk-meta__label" />
                                    <div className="sk sk-meta__value" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content: sections (heading left / body right) with full-width images */}
                <Section bodyLines={4} />
                <div className="sk sk-figure" />
                <Section bodyLines={6} />
                <div className="sk sk-figure" />
                <Section bodyLines={3} />
            </div>
        </div>
    );
};

export default ProjectDetailsSkeleton;
