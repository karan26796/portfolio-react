import React from "react";
import "../styles/LogoCarousel.scss";
import defaultLogos, { Logo } from "../utils/logos";

interface LogoCarouselProps {
  logos?: Logo[];
  align?: 'flex-start' | 'center' | 'flex-end';
}

const LogoCarousel: React.FC<LogoCarouselProps> = ({ logos = defaultLogos, align = 'center' }) => {
  return (
    <div className="carousel-container-logo" style={{ justifyContent: align }}>
      {logos.map((image, index) => (
        <img src={image.url} alt={`Logo ${index + 1}`} key={index} />
      ))}
    </div>
  );
};

export default LogoCarousel;