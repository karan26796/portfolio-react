import React from 'react';
import experiments from "../utils/experiments";
import '../styles/HorizontalCarousel.scss';
import '../styles/Experiments.scss';
import ImageWithSkeleton from './ImageWithSkeleton';
import ScrollReveal from './ScrollReveal';

interface ExperimentsProps {
  title?: string;
  subtitle?: string;
}

// Hand-placed per-index so the scatter reads as arranged, not random.
const CORK_LAYOUT = [
  { top: '2%', left: '1%', rotate: -4 },
  { top: '0%', left: '35%', rotate: 3 },
  { top: '4%', left: '65%', rotate: -2 },
  { top: '54%', left: '15%', rotate: 4 },
  { top: '50%', left: '48%', rotate: -3 },
  { top: '56%', left: '76%', rotate: 2 },
];

const Experiments: React.FC<ExperimentsProps> = ({
  title = "Experiments",
  subtitle = ""
}) => {
  return (
    <div className="experiments-section horizontal-carousel-section">
      <ScrollReveal>
        <div className="carousel-section-header">
          <div className="header-text">
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>
      </ScrollReveal>
      <div className="experiments-corkboard">
        {experiments.map((experiment, index) => {
          const layout = CORK_LAYOUT[index % CORK_LAYOUT.length];
          return (
            <figure
              key={index}
              className="experiment-figure cork-item"
              style={{ top: layout.top, left: layout.left, '--rotate': `${layout.rotate}deg` } as React.CSSProperties}
            >
              <span className="cork-pin" aria-hidden="true" />
              <div className="experiment-card-gallery-style">
                <div className="experiment-media-wrapper">
                  {experiment.type === "video" ? (
                    <video
                      src={experiment.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      aria-label={experiment.caption ?? `Experiment ${index + 1}`}
                    />
                  ) : (
                    <ImageWithSkeleton
                      src={experiment.src}
                      alt={experiment.caption ?? `Experiment ${index + 1}`}
                    />
                  )}
                </div>
                {experiment.caption && (
                  <div className="experiment-caption-handwritten">
                    {experiment.caption}
                  </div>
                )}
              </div>
            </figure>
          );
        })}
      </div>
    </div>
  );
};

export default Experiments;
