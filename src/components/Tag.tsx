import React, { useState } from "react";
import "../styles/Tag.scss";

export interface VibrantColor {
  bg?: string;
  text: string;
}

interface TagProps {
  text: string;
  color: VibrantColor;
  rotation?: number;
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
  // Use state to ensure stable random value across re-renders
  const [randomRotation] = useState(() => Math.random() * 4 - 2);

  const finalRotation = rotation !== undefined ? rotation : randomRotation;

  return (
    <div
      className={`tag-parent ${variant}`}
      style={{
        backgroundColor: variant !== 'nobg' ? 'var(--bg-color-high)' : 'transparent',
        transform: `rotate(${finalRotation}deg)`,
      }}
    >
      {dot && (
        <div
          className={`dot ${pulsatingDot ? 'pulsating' : ''}`}
          style={{ backgroundColor: color.text }}
        ></div>
      )}
      <p
        className="tag"
        style={{
          color: color.text,
        }}
      >
        {text}
      </p>
    </div>
  );
};

export default Tag;