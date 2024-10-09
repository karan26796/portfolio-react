import React from "react";
import "../styles/HeaderWithCarousel.scss";
import LogoCarousel from "./LogoCarousel";

const HeaderWithCarousel: React.FC = () => {
  return (
    <div className="header-details">
      <div className="profile" />
      <h1 className="semibold">Karan Kapoor</h1>
      <h3>SPD @Keka HR — XR Designer — Figma Trainer</h3>
      <h3 className="length-xxs">
        I love designing and building products backed by research that look good and are a delight to use.
      </h3>
      <LogoCarousel />
    </div>
  );
};

export default HeaderWithCarousel;
