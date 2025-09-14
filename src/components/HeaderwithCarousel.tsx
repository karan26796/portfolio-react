import React, { useState } from "react";
import "../styles/HeaderWithCarousel.scss";
import LogoCarousel from "./LogoCarousel";
import ResumePopup from "../pages/ResumePopup";

const HeaderWithCarousel: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  const toggleResume = (): void => {
    setIsResumeOpen(!isResumeOpen);
  };

  const closeResume = (): void => {
    setIsResumeOpen(false);
  };

  return (
    <div className="header-container">
      <div className="header-column-one">
        <img src={require("../utils/gallery/profile.webp")} alt="Karan" className="profile-pic" />
        <div className="name-tag-group">
          <h1>Hey, I'm Karan <br /> Product Designer & Photographer</h1>
          <p className="intro-text">
            Currently shaping employee experience for <strong>2 million users</strong> at <strong>Keka HR</strong> and integrating AI in my workflow.
            I love building communities, traveling, and trying new sports.
          </p>
        
        </div>

        <LogoCarousel align="center" />

        <ResumePopup isOpen={isResumeOpen} onClose={closeResume} />
      </div>

    </div>
  );
};

export default HeaderWithCarousel;