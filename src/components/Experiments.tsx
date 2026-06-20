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
          <div 
            key={index} 
            className="experiment-card"
            style={{
              transform: getTransform(index)
            }}
          >
            <div className="experiment-image-container">
              <img src={experiment.urlGif} alt={`Experiment ${index + 1}`} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Experiments;
