import React from 'react';
import experiments from "../utils/experiments";
import HorizontalCarouselSection from './HorizontalCarouselSection';
import '../styles/Experiments.scss';

interface ExperimentsProps {
  title?: string;
  subtitle?: string;
}

const Experiments: React.FC<ExperimentsProps> = ({
  title = "Experiments",
  subtitle = ""
}) => {
  const getTransform = (index: number): string => {
    const yOffset = index % 2 === 0 ? -4 : 4;
    const rotation = index % 2 === 0 ? -1 : 1;
    return `translateY(${yOffset}px) rotate(${rotation}deg)`;
  };

  return (
    <HorizontalCarouselSection title={title} subtitle={subtitle}>
      {experiments.map((experiment, index) => (
        <figure key={index} className="experiment-figure" style={{ margin: 0 }}>
          <div
            className="experiment-card"
          >
            <div className="experiment-image-container">
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
                <img
                  src={experiment.src}
                  alt={experiment.caption ?? `Experiment ${index + 1}`}
                />
              )}
            </div>
          </div>
          {experiment.caption && (
            <figcaption className="experiment-caption" style={{ marginTop: '0.75em' }}>
              {experiment.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </HorizontalCarouselSection>
  );
};

export default Experiments;
