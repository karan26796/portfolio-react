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
          <div className="profile-pic-container">
            <img src="/gallery/profile.webp" alt="Karan Kapoor" className="profile-pic" />
          </div>
        </ScrollReveal>

        <div className="header-text-content">
          <ScrollReveal delay={80}>
            <h1>Hey, I'm Karan</h1>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="header-pill-tags">
              {/* <Tag text="Product all rounder" color={{ text: '#ff9000' }} /> */}
              <Tag text="Vibe coder" color={{ text: '#2563eb' }} />
              <Tag text="Figma Trainer" color={{ text: '#10b981' }} />
              <Tag text="2X Founding Designer" color={{ text: '#9333ea' }} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <h3 className="intro-paragraph">
              My work spans across product design, research, design systems, and developing apps.
              <strong>Currently @Keka HR</strong>, shaping how companies reward & recognize employees.
            </h3>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <LogoCarousel align="center" />
          </ScrollReveal>
        </div>

        <ResumePopup isOpen={isResumeOpen} onClose={closeResume} />
      </div>
    </div>
  );
};

export default HeaderWithCarousel;