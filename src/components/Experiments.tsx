import React from "react";
import experiments from "../utils/experiments";
import '../styles/Experiments.scss'

const TopNav: React.FC = () => {
  return (
    <>
      <h1>Experiments</h1>
      <div className="experiments-grid">
        {experiments.map((experiment, index) => (
          <div key={index} className="experiment-card">
            <div className="experiment-image-container">
              <img src={experiment.urlImg} className="static-image" />
              <img src={experiment.urlGif} className="hover-gif" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TopNav;
