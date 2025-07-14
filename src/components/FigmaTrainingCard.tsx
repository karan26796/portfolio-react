import React from 'react';
import '../styles/FigmaTrainingCard.scss';
import { ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const FigmaTrainingCard: React.FC = () => {
  return (
    <Link to="/figma-training" className="figma-training-card" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="figma-training-content">
        <div className="figma-training-text">
          <h5>For Designers, Students, and PMs</h5>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.4em' }}>
            Book a Figma training session today
            <ArrowRight size={24} weight="regular" className="arrow-icon" />
          </h3>
          <p>I've conducted more than 100+ Figma training at top companies and institutes. Book a 1:1 session or a corporate workshop.</p>
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