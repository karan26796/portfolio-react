import React, { useState, useEffect } from "react";
import { XLogo, FigmaLogo, Sparkle } from "@phosphor-icons/react";
import "../styles/HeaderWithCarousel.scss";
import ScrollReveal from "./ScrollReveal";
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
        <div className="header-text-content">
          <ScrollReveal delay={0}>
            <h1 className="serif-line">
              Hey, my name is{" "}
              <span className="inline-icon-chip avatar-chip">
                <img src="/gallery/profile.webp" alt="Karan Kapoor" />
              </span>{" "}
              Karan
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1 className="serif-line muted-line">
              Product Designer at{" "}
              <span className="inline-icon-chip light-chip">
                <img src="/project-imgs/kekalogo.webp" alt="Keka HR" />
              </span>{" "}
              <a
                className="underline-link"
                href="https://www.keka.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Keka HR
              </a>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            {/* <h3 className="intro-paragraph">
              My work spans across product design, research, design systems, and developing apps,
              shaping how companies reward &amp; recognize employees. Along the way I've worn the
              hats of a{" "}
              <span className="text-badge outline">
                <FigmaLogo size={16} weight="bold" />
                Figma Trainer
              </span>
              ,{" "}
              <span className="text-badge solid">
                <Sparkle size={16} weight="fill" />
                Vibe coder
              </span>
              , and <span className="text-badge solid">2X Founding Designer</span>.
            </h3> */}
            <h3 className="intro-paragraph">
              Currently shaping how companies reward &amp; recognize their employees. I specialize in customer research, design systems, product design, and developing apps. Along the way I've led{" "}
              <span className="inline-badge">
                <img src="/project-imgs/figma-logo.webp" alt="Figma" className="badge-icon" />
                <span>Friends of Figma, Delhi</span>
              </span>{" "}
              for 5 years, been a founding designer at{" "}
              <span className="inline-badge">
                <img src="/project-imgs/Looppanel-logo.webp" alt="Looppanel" className="badge-icon" />
                <span>Looppanel</span>
              </span>{" "} and vibe coded a few apps.
            </h3>
          </ScrollReveal>

          {/* <ScrollReveal delay={260}>
            <h3 className="worked-with-line">
              I've collaborated with teams at
              <LogoCarousel align="center" />
            </h3>
          </ScrollReveal> */}
        </div>

        <ResumePopup isOpen={isResumeOpen} onClose={closeResume} />
      </div>
    </div>
  );
};

export default HeaderWithCarousel;