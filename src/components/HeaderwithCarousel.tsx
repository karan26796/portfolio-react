import React, { useState, useEffect } from "react";
import "../styles/HeaderWithCarousel.scss";
import ScrollReveal from "./ScrollReveal";

import LogoCarousel from "./LogoCarousel";
import ResumePopup from "../pages/ResumePopup";
import Tag from "./Tag";


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
        <ScrollReveal variant="scale" delay={0}>
          {/* <img src="/gallery/profile.webp" alt="Karan" className="profile-pic" /> */}
        </ScrollReveal>
        <div className="header-text-content">
          <ScrollReveal delay={80}>
            <div className="name-tag-group">
              <h1>Hey, I'm Karan</h1>
              <div className="tags">
                <Tag text="Currently at Keka HR" color={{ text: '#ff8c00' }} dot={true} pulsatingDot={true} />
                <Tag text="Figma Trainer" color={{ text: '#41ffc0ff' }} />
                <Tag text="2X Founding Designer" color={{ text: '#a754ffff' }} />
                <Tag text="NID Alum" color={{ text: '#5c98ffff' }} />
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <p className="intro-text">
              Product Designer with management & technical chops. In the last ~8 years I've worked with early stage startups on 0-1 projects, conducted 100+ Figma workshops, headed FoF Delhi for 5 years, and built passion projects using with AI as a sidekick.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={240}>
            <LogoCarousel align="flex-end" />
          </ScrollReveal>
        </div>
        {/* <Tag text="Open to new roles" color={{ text: '#3100f4ff' }} dot={true} pulsatingDot={true} /> */}
        {/* <Button
            text="Let's work together"
            iconName="ArrowDown"
            withIcon={true}
            iconDirection="right"
            variant="primary"
            size="m"
          /> */}
        <ResumePopup isOpen={isResumeOpen} onClose={closeResume} />
      </div>
    </div>
  );
};

export default HeaderWithCarousel;