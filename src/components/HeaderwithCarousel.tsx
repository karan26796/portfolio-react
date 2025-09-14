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
          <h1>Hey, I'm Karan</h1>
          <h3 style={{margin:"0"}}>Dessigner, Figma trainer & AI powered builder</h3>
          <p className="intro-text">
            Product Designer with 6+ years of experience, currently shaping employee engagement for <strong>2 million users</strong> at <strong>Keka HR</strong> and integrating AI in my workflow.
            I love building communities, travelling, taking pictures, and playing tennis.
          </p>
        
        </div>

        <LogoCarousel align="center" />

        <ResumePopup isOpen={isResumeOpen} onClose={closeResume} />
      </div>

    </div>
  );
};

export default HeaderWithCarousel;