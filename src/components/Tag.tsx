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
  dot: boolean;
}

const Tag: React.FC<TagProps> = ({ text, color, rotation, dot }) => {
  return (
    <div
      className="tag-parent"
      style={{
        backgroundColor: color.bg,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {dot && <div className="dot" style={{ backgroundColor: color.text }}></div>}
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