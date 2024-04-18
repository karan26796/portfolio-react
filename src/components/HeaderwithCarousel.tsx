// src/components/HeaderWithCarousel.tsx
import React from "react";
import "../styles/HeaderWithCarousel.scss";
import Logos from "../utils/logos"
import DifferentCarouselContent from "./DifferentCarouselContent";
import LogoCarousel from "./LogoCarousel";

const HeaderWithCarousel: React.FC = () => {
  return (
    <div className="header-with-carousel">
      <div className="header-details">
        {/* <h1 className="semibold" style={{fontSize:"4em"}}>👋</h1> */}
        <h1 className="length-xxs"> I love designing and building products 
        backed by research that look good and are a delight to use.</h1>
          {/* <h3 className="length-s">Hey, Karan here. I've been a designer for ~6 years now.
          My work spans across diverse domains which you can see a glimpse of below. 
          I love picking hard problems and learning how to solve them on the go using the required skills and tools.</h3> */}
      </div>
      {/* <LogoCarousel imagesData={Logos} ContentComponent={DifferentCarouselContent}/> */}
    </div>
  );
};

export default HeaderWithCarousel;