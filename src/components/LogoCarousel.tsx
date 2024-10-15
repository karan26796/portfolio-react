import React from "react";
import "../styles/LogoCarousel.scss";
import defaultLogos, { Logo } from "../utils/logos";

interface LogoCarouselProps {
  logos?: Logo[];
}

const LogoCarousel: React.FC<LogoCarouselProps> = ({ logos = defaultLogos }) => {
  return (
    <div className="carousel-container-logo">
      {logos.map((image, index) => (
        <img src={image.url} alt={`Logo ${index + 1}`} />
      ))}
    </div>
  );
};

export default LogoCarousel;