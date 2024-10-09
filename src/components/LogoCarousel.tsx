import React from "react";
import "../styles/LogoCarousel.scss";
import logos from "../utils/logos";

const LogoCarousel: React.FC = () => {
  return (
    <div className="carousel-container-logo">
      {logos.map((image, index) => (
        <img src={image.url} alt="" />
      ))}
    </div>
  );
};

export default LogoCarousel;