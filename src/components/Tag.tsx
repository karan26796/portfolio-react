import React, { useState, useEffect } from "react";
import '../styles/Tag.scss'

export interface VibrantColor {
  bg: string;
  text: string;
};

type TagProps = {
  text: string;
  color: VibrantColor;
  rotation: number;
};

const Tag: React.FC<TagProps> = ({ text, color, rotation }) => {
    return (
      <h3
        className="tag"
        style={{
          backgroundColor: color.bg,
          color: color.text,
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {text}
      </h3>
    );
  };

  export default Tag;