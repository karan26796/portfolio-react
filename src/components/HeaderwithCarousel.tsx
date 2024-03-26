// src/components/HeaderWithCarousel.tsx
import React from "react";
import "../styles/HeaderWithCarousel.scss";

const HeaderWithCarousel: React.FC = () => {
  return (
    <div className="header-with-carousel">
      <div className="header-details">
        <h1 className="semibold">Hey Buds!</h1>

        <h5 className="semibold">Product Designer — NID Grad</h5>

        <h5 className="length-m medium">
          In my 5 years as a designer, I have helped startups build 0-1
          products, achieve product market fit, & conducted Designs workshops at
          leading orgs in India and the US.
        </h5>
      </div>
    </div>
  );
};

export default HeaderWithCarousel;