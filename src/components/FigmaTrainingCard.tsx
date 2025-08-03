import React from 'react';
import '../styles/FigmaTrainingCard.scss';
import { ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import Button from './Buttons';

const FigmaTrainingCard: React.FC = () => {
  return (
    <Link to="/figma-training" className="figma-training-card" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="figma-training-content">
        <div className="figma-training-text">
          <h3>
            Figma training for designers, students, and PMs
          </h3>
          <p>I've conducted more than 100+ Figma training at IIMs, IITs, Indiana University, Shaadi.com and more.</p>
          <div style={{marginTop:'1em'}}>
          <Button
            text="Set up a session"
            iconName="ArrowRight"
            withIcon={true}
            iconDirection="right"
            size="s"
            variant="primary"
            weight="regular"
            withText={true}
          />
          </div>
        </div>
      </div>
      <div className="figma-training-image-stack">
        <img src={require('../utils/figma-training/training9.webp')} alt="Stacked 1" className="stacked-img stacked-img-bottom" />
        <img src={require('../utils/figma-training/training10.webp')} alt="Stacked 2" className="stacked-img stacked-img-middle" />
        <img src={require('../utils/figma-training/training8.webp')} alt="Stacked 3" className="stacked-img stacked-img-top" />
      </div>
    </Link>
  );
};

export default FigmaTrainingCard; 