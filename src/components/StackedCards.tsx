import React, { useState, useEffect } from 'react';
import '../styles/StackedCard.scss';
import Button from './Buttons';
import { User } from '@phosphor-icons/react';

interface StackedCardProps {
  file: {
    link: string;
    url: string;
    name: string;
    downloads: string;
  };
  index: number;
}

// Define a type for the allowed icon names based on the error message
type IconName = "YoutubeLogo" | "FigmaLogo" | "IconContext" | "IconBase" | 
  "SSR" | "Acorn" | "AddressBook" | "AddressBookTabs" | 
  "AirTrafficControl" | "Airplane" | "AirplaneInFlight" | "AirplaneLanding";

interface ButtonConfig {
  text: string;
  iconName: IconName;
}

const StackedCard: React.FC<StackedCardProps> = ({ file, index }) => {
  const [rotation] = useState(() => -1 + Math.random() * 2);
  const [buttonText, setButtonText] = useState('Download Figma file');

  const bgColors = [
    '#603D01', // Pale yellow
    '#9E6400', // Pale green
    '#E2950E', // Pale pink
    '#FFC868', // Pale blue
  ];

  const isYouTubeVideo = file.downloads.toLowerCase() === 'youtube live';

  useEffect(() => {
    const updateButtonText = () => {
      if (window.innerWidth < 800 && !isYouTubeVideo) {
        setButtonText('Download');
      } else {
        setButtonText(isYouTubeVideo ? 'Open video' : 'Download Figma file');
      }
    };

    updateButtonText();

    window.addEventListener('resize', updateButtonText);
    return () => window.removeEventListener('resize', updateButtonText);
  }, [isYouTubeVideo]);

  const buttonConfig: ButtonConfig = {
    text: buttonText,
    iconName: isYouTubeVideo ? "YoutubeLogo" : "FigmaLogo"
  };

  return (
    <a
      className="community-file-card"
      href={file.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div 
        className="image-stack-container"
        style={{
          transform: `rotate(${rotation}deg) translateY(20px)`,
        }}
      >
        {/* Background stacked cards */}
        <div className="stacked-bg-card" />
        <div className="stacked-bg-card secondary" />
        {/* Main image container */}
        <div className="main-image-container">
          <img src={file.url} alt={`Community file ${index + 1}`} />
        </div>
      </div>
      
      <div className="community-content">
        <h6>{file.name}</h6>
        <h5>
          {!isYouTubeVideo && <User size={22} weight='duotone' />}
          {file.downloads}
        </h5>

        <Button
          className="submit-button"
          text={buttonConfig.text}
          withIcon={true}
          iconDirection='left'
          iconName={buttonConfig.iconName}
          variant="secondary"
          type="submit"
          weight='duotone'
          size='s'
        />
      </div>
    </a>
  );
};

export default StackedCard;
