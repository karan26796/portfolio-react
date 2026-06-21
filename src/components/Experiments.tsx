import React from "react";
import experiments from "../utils/experiments";
import '../styles/Experiments.scss'

const Experiments: React.FC = () => {
  const getTransform = (index: number): string => {
    const yOffset = index % 2 === 0 ? -10 : 10;
    const rotation = index % 2 === 0 ? -2 : 2;
    return `translateY(${yOffset}px) rotate(${rotation}deg)`;
  };

  return (
    <>
      <div className="experiments-grid">
        {experiments.map((experiment, index) => (
          <figure key={index} className="experiment-item">
            <div
              className="experiment-card"
              style={{
                transform: getTransform(index),
              }}
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
              <figcaption className="experiment-caption">
                {experiment.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </>
  );
};

export default Experiments;
