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
  icon?: string | React.ReactNode;
}

const Tag: React.FC<TagProps> = ({
  text,
  color,
  rotation,
  dot,
  pulsatingDot = false,
  variant = 'default',
  icon
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
      {icon && (
        typeof icon === 'string' ? (
          <img src={icon} alt="" className="tag-icon" />
        ) : (
          <span className="tag-icon">{icon}</span>
        )
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