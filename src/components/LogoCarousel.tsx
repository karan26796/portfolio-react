import React from "react";
import "../styles/LogoCarousel.scss";
import defaultLogos from "../utils/logos";
import { ImageItem } from "../utils/communityFiles";

interface LogoCarouselProps {
  logos?: ImageItem[];
}

const LogoCarousel: React.FC<LogoCarouselProps> = ({ logos = defaultLogos }) => {
  return (
    <div className="carousel-container-logo">
      {logos.map((image, index) => (
        <a key={index} href={image.link} target="_blank" rel="noopener noreferrer">
          <img src={image.url} alt={`Logo ${index + 1}`} />
        </a>
      ))}
    </div>
  );
};

export default LogoCarousel;