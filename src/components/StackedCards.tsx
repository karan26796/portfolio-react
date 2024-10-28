import React, { useState } from 'react';
import '../styles/StackedCard.scss';

interface StackedCardProps {
  file: {
    link: string;
    url: string;
    name: string;
    downloads: string;
  };
  index: number;
}

const StackedCard: React.FC<StackedCardProps> = ({ file, index }) => {
  const [rotation] = useState(() => -1 + Math.random() * 2);
  
  const bgColors = [
    '#603D01', // Pale yellow
    '#9E6400', // Pale green
    '#E2950E', // Pale pink
    '#FFC868', // Pale blue
  ];
  
//   const [stackColors] = useState(() => [
//     bgColors[Math.floor(Math.random() * bgColors.length)],
//     bgColors[Math.floor(Math.random() * bgColors.length)]
//   ]);

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
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {/* Background stacked cards */}
        <div
          className="stacked-bg-card"
          style={{
            // backgroundColor: stackColors[0],
          }}
        />
        <div
          className="stacked-bg-card secondary"
          style={{
            // backgroundColor: stackColors[1],
          }}
        />
        {/* Main image container */}
        <div className="main-image-container">
          <img src={file.url} alt={`Community file ${index + 1}`} />
        </div>
      </div>
      
      <div className="community-content">
        <h6>{file.name}</h6>
        <h5>{file.downloads}</h5>
      </div>
    </a>
  );
};

export default StackedCard;