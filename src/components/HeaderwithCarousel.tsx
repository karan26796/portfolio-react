import React, { useState, useEffect } from "react";
import "../styles/HeaderWithCarousel.scss";
import LogoCarousel from "./LogoCarousel";
import ResumePopup from "../pages/ResumePopup";


const HeaderWithCarousel: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Clamp scrollY for effect (0 to 120px)
  const clampedScroll = Math.min(scrollY, 30);
  const scale = 1 - clampedScroll / 600; // Shrink to ~0.7
  const opacity = 1 - clampedScroll / 100 * 0.7; // Fade to 0.7

  const toggleResume = (): void => {
    setIsResumeOpen(!isResumeOpen);
  };

  const closeResume = (): void => {
    setIsResumeOpen(false);
  };

  return (
    <div
      className="header-container"
      style={{
        transform: `scale(${scale})`,
        opacity: opacity,
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s cubic-bezier(0.4,0,0.2,1)',
        willChange: 'transform, opacity',
      }}
    >
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