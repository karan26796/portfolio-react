import React from "react";
import "../styles/Tag.scss";

export interface VibrantColor {
  bg: string;
  text: string;
}

interface TagProps {
  text: string;
  color: VibrantColor;
  rotation: number;
  dot?: boolean;
  pulsatingDot?: boolean;
  variant?: 'default' | 'nobg' | 'small';
}

const Tag: React.FC<TagProps> = ({ 
  text, 
  color, 
  rotation, 
  dot, 
  pulsatingDot = false, 
  variant = 'default' 
}) => {
  return (
    <div
      className={`tag-parent ${variant}`}
      style={{
        backgroundColor: variant !== 'nobg' ? color.bg : 'transparent',
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {dot && (
        <div 
          className={`dot ${pulsatingDot ? 'pulsating' : ''}`} 
          style={{ backgroundColor: color.text }}
        ></div>
      )}
      <h3
        className="tag"
        style={{
          color: color.text,
        }}
      >
        {text}
      </h3>
    </div>
  );
};

export default Tag;