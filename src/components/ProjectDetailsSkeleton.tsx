import React from 'react';
import '../styles/ProjectDetailsSkeleton.scss';

// Fixed widths rather than Math.random(): a random skeleton reshuffles its own
// lines on every re-render, which reads as a glitch on a placeholder that is
// meant to sit still.
const LINE_WIDTHS = ['96%', '89%', '93%', '72%', '97%', '84%'];

const ProjectDetailsSkeleton: React.FC = () => {
    const lines = (count: number, offset = 0) =>
        Array.from({ length: count }).map((_, i) => (
            <div
                key={i}
                className="sk sk-line"
                style={{ width: LINE_WIDTHS[(i + offset) % LINE_WIDTHS.length] }}
            />
        ));

    // One documentation block, in the shape the markdown renders: a short
    // label with a hairline running off it, a statement, then body copy.
    const Section = ({ bodyLines, offset }: { bodyLines: number; offset: number }) => (
        <div className="sk-section">
            <div className="sk-section__label">
                <div className="sk sk-label" />
                <span className="sk-rule" />
            </div>
            <div className="sk sk-statement" />
            <div className="sk-section__body">{lines(bodyLines, offset)}</div>
        </div>
    );

    return (
        <div className="details-skeleton" aria-hidden="true">
            <div className="sk-layout">
                {/* Mirrors .docs-hero: the year stamp sits opposite the
                    headline, then the title, then the lede. */}
                <div className="sk-hero">
                    <div className="sk sk-hero__stamp" />
                    <div className="sk-hero__title">
                        <div className="sk sk-title-line" style={{ width: '88%' }} />
                        <div className="sk sk-title-line" style={{ width: '52%' }} />
                    </div>
                    {/* Three lines, not two: a lede at 60ch typically wraps to
                        about this much, and two left the sections below sitting
                        ~40px high, so the page stepped down as markdown landed. */}
                    <div className="sk-hero__lede">
                        <div className="sk sk-line" style={{ width: '94%' }} />
                        <div className="sk sk-line" style={{ width: '88%' }} />
                        <div className="sk sk-line" style={{ width: '43%' }} />
                    </div>
                </div>

                <Section bodyLines={3} offset={0} />
                <div className="sk sk-figure" />
                <Section bodyLines={4} offset={2} />
                <div className="sk sk-figure" />
                <Section bodyLines={2} offset={4} />
            </div>
        </div>
    );
};

export default ProjectDetailsSkeleton;
