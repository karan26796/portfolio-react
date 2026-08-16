import React, { useState, useEffect } from "react";
import "../styles/HeaderWithCarousel.scss";
import ScrollReveal from "./ScrollReveal";

import LogoCarousel from "./LogoCarousel";
import ResumePopup from "../pages/ResumePopup";
import Tag from "./Tag";
import kekaLogo from "../utils/logos/keka-logo.webp";


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
        <ScrollReveal variant="scale" delay={0} children={undefined}>
          {/* <img src="/gallery/profile.webp" alt="Karan" className="profile-pic" /> */}
        </ScrollReveal>
        <div className="header-text-content">
          <ScrollReveal delay={80}>
            <div className="name-tag-group">
              <div className="tags">
                {/* <Tag
                  text="Currently at Keka HR"
                  color={{ text: '#ff8c00' }}
                  dot={true}
                  pulsatingDot={true}
                  icon={kekaLogo}
                /> */}
                <Tag text="Vibe Coder" color={{ text: '#00e676' }} />
                <Tag text="2X Founding Designer" color={{ text: '#d0a4ffff' }} />
                <Tag text="Figma Trainer" color={{ text: '#ffb641ff' }} />
                <Tag text="NID Alum" color={{ text: '#5c98ffff' }} />
              </div>

              <h1>Hey, I'm Karan <br />
                I specialize in designing intuitive interfaces and complex product flows backed by deep user insights and behavior.
              </h1>

            </div>
          </ScrollReveal>
          {/* <ScrollReveal delay={160}>
            <h2 className="headline-text">
              I specialize in designing intuitive interfaces and complex product flows backed by deep user insights and behavior.
            </h2>
            <p className="intro-text">
              Product Designer with management & technical chops. Over the last ~8 years as a 2x Founding Designer and NID alum, I've brought 0-to-1 products to life for early-stage startups, led Friends of Figma Delhi for 5 years, and conducted 100+ design workshops. Currently shaping employee experience for 2+ million users at Keka HR while integrating AI and vibe coding into my workflow.
            </p>
          </ScrollReveal> */}
          <ScrollReveal delay={240}>
            <LogoCarousel align="flex-start" />
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