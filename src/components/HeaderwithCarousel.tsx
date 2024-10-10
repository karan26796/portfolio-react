import React from "react";
import "../styles/HeaderWithCarousel.scss";
import LogoCarousel from "./LogoCarousel";

const HeaderWithCarousel: React.FC = () => {
  return (
    <div className="header-details">
      <div className="profile" />
      <h1 className="semibold">Karan Kapoor</h1>
      <h3>SPD@Keka HR — XR Designer — Figma Trainer</h3>
      <h3 className="length-xxs">
      In my ~6 years as a designer, I have helped startups of different sizes build 0-to-1 products, achieve product-market fit, and conducted design workshops at leading organizations in India and the US.
      </h3>
      <LogoCarousel />
    </div>
  );
};

export default HeaderWithCarousel;
