import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { XLogo, FigmaLogo, Sparkle } from "@phosphor-icons/react";
import "../styles/HeaderWithCarousel.scss";
import ScrollReveal from "./ScrollReveal";
import ResumePopup from "../pages/ResumePopup";
import grabLogo from "../utils/logos/grab.png";
import obviousLogo from "../utils/logos/obvious.webp";
import interconnect from "../utils/logos/interconnect.webp";

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
            <h3 className="intro-paragraph">
              Currently shaping how companies reward &amp; recognize their employees. I specialize in customer research, design systems, 0-1 product design, and developing apps. I've worked with{" "}
              <span className="inline-badge">
                <img src={grabLogo} alt="Grab" className="badge-icon" />
                <span>Grab</span>
              </span>{" "}
              through{" "}
              <span className="inline-badge">
                <img src={obviousLogo} alt="Obvious" className="badge-icon" />
                <span>Obvious</span>
              </span>{" "}
              and was a founding designer at{" "}
              <span className="inline-badge has-hover-card">
                <img src="/project-imgs/Looppanel-logo.webp" alt="Looppanel" className="badge-icon" />
                <span>Looppanel</span>
                <a
                  href="https://looppanel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge-hover-card"
                >
                  <span className="hover-card-media">
                    <img src="/project-imgs/loop-research/thumb.webp" alt="Looppanel" />
                  </span>
                  <span className="hover-card-body">
                    <span className="hover-card-header">
                      <img src="/project-imgs/Looppanel-logo.webp" alt="" className="hover-card-icon" />
                      <span className="hover-card-titles">
                        <span className="hover-card-title">Looppanel</span>
                        <span className="hover-card-subtitle">looppanel.com</span>
                      </span>
                    </span>
                    <span className="hover-card-desc">AI-powered qualitative user research &amp; time-to-insights platform</span>
                  </span>
                </a>
              </span>. I also led{" "}
              <span className="inline-badge has-hover-card">
                <img src="/project-imgs/figma-logo.webp" alt="Figma" className="badge-icon" />
                <span>Friends of Figma, Delhi</span>
                <Link to="/figma-training" className="badge-hover-card">
                  <span className="hover-card-media">
                    <img src="/figma-training/training9.webp" alt="Friends of Figma, Delhi" />
                  </span>
                  <span className="hover-card-body">
                    <span className="hover-card-header">
                      <img src="/project-imgs/figma-logo.webp" alt="" className="hover-card-icon" />
                      <span className="hover-card-titles">
                        <span className="hover-card-title">Friends of Figma, Delhi</span>
                        <span className="hover-card-subtitle">Figma Training Gallery</span>
                      </span>
                    </span>
                    <span className="hover-card-desc">Organized 20+ workshops &amp; events for 5,000+ designers</span>
                  </span>
                </Link>
              </span>{" "}
              for 5 years and built{" "}
              <span className="inline-badge has-hover-card">
                <img src={interconnect} alt="Interconnect" className="badge-icon" />
                <span>Interconnect</span>
                <a
                  href="https://getinterconnect.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge-hover-card"
                >
                  <span className="hover-card-media">
                    <img src="/project-imgs/interconnect/interconnect-thumb.webp" alt="Interconnect" />
                  </span>
                  <span className="hover-card-body">
                    <span className="hover-card-header">
                      <img src={interconnect} alt="" className="hover-card-icon" />
                      <span className="hover-card-titles">
                        <span className="hover-card-title">Interconnect</span>
                        <span className="hover-card-subtitle">getinterconnect.vercel.app</span>
                      </span>
                    </span>
                    <span className="hover-card-desc">Platform to connect teams and streamline workplace communication</span>
                  </span>
                </a>
              </span>.
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