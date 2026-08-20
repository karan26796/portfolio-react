import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  House,
  FigmaLogo,
  Camera,
  LinkedinLogo,
  XLogo,
  Sparkle,
} from "@phosphor-icons/react";
import Button from "./Buttons";
import ResumePopup from "../pages/ResumePopup";
import "../styles/StickyNavBar.scss";

const StickyNavBar: React.FC = () => {
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({ left: 0, width: 0, opacity: 0 });

  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 800);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isContactInView, setIsContactInView] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHome = location.pathname === "/home" || location.pathname === "/";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hide the "Let's work together" sidebar CTA once the user has scrolled
  // to the contact/WorkTogether section on the home page.
  useEffect(() => {
    if (isMobile || !isHome) {
      setIsContactInView(false);
      return;
    }

    const checkContactVisibility = () => {
      const contactEl = document.getElementById("contact") || document.querySelector(".contact-form-container");
      if (!contactEl) return;

      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const scrollBottom = window.scrollY + windowHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Hide CTA when scrolled near page bottom / WorkTogether section
      const isNearBottom = (docHeight - scrollBottom) < 550;
      setIsContactInView(isNearBottom);
    };

    checkContactVisibility();

    window.addEventListener("scroll", checkContactVisibility, { passive: true });
    window.addEventListener("resize", checkContactVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", checkContactVisibility);
      window.removeEventListener("resize", checkContactVisibility);
    };
  }, [isHome, isMobile, location.pathname]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobile) return;
    const target = e.currentTarget;
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      setIndicatorStyle({
        left: targetRect.left - containerRect.left,
        width: targetRect.width,
        opacity: 1,
      });
    }
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  // ============================================================================
  // RENDER: DESKTOP TOP NAVBAR (horizontal)
  // ============================================================================
  if (!isMobile) {
    return (
      <div className="container-nav desktop-top-nav">
        <nav className="navbar main-nav active">
          <div className="navbar-center-pill">
            <Link
              to="/home"
              className={`a-header${isHome ? " active" : ""}`}
            >
              <House size={18} weight={isHome ? "bold" : "regular"} />
              <span>Home</span>
            </Link>

            <Link
              to="/figma-training"
              className={`a-header${location.pathname === "/figma-training" ? " active" : ""}`}
            >
              <FigmaLogo size={18} weight={location.pathname === "/figma-training" ? "bold" : "regular"} />
              <span>Figma Training</span>
            </Link>

            <Link
              to="/gallery"
              className={`a-header${location.pathname === "/gallery" ? " active" : ""}`}
            >
              <Camera size={18} weight={location.pathname === "/gallery" ? "bold" : "regular"} />
              <span>Travel</span>
            </Link>
          </div>

          <div className="navbar-right-group">
            <Button
              text={isHome ? "Let's work together" : "View Resume"}
              variant="primary"
              size="s"
              onClick={() => {
                if (!isHome) {
                  setIsResumeOpen(true);
                } else {
                  const section = document.getElementById("contact");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
            />

            <a
              href="https://x.com/kadankapoor"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="@kadankapoor on X"
              title="X (Twitter)"
            >
              <Button
                iconName="XLogo"
                withIcon={true}
                withText={false}
                variant="secondary"
                size="s"
                weight="bold"
              />
            </a>

            <a
              href="https://www.linkedin.com/in/karankapoorux/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Karan Kapoor on LinkedIn"
              title="LinkedIn"
            >
              <Button
                iconName="LinkedinLogo"
                withIcon={true}
                withText={false}
                variant="secondary"
                size="s"
                weight="bold"
              />
            </a>
          </div>
        </nav>

        <ResumePopup isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      </div>
    );
  }

  // ============================================================================
  // RENDER: MOBILE BOTTOM FLOATING NAVIGATION
  // ============================================================================
  return (
    <div className="container-nav mobile-floating-nav">
      <nav className="navbar main-nav active" ref={containerRef}>
        <div className="navbar-center">
          {/* Work Link */}
          <Link
            to="/home"
            className={`a-header${location.pathname === "/home" || location.pathname === "/" ? " active" : ""}`}
          >
            <House size={20} weight="duotone" />
            <span>Work</span>
          </Link>

          {/* Training Link */}
          <Link
            to="/figma-training"
            className={`a-header${location.pathname === "/figma-training" ? " active" : ""}`}
          >
            <FigmaLogo size={20} weight="duotone" />
            <span>Training</span>
          </Link>

          {/* Travel Link */}
          <Link
            to="/gallery"
            className={`a-header${location.pathname === "/gallery" ? " active" : ""}`}
          >
            <Camera size={20} weight="duotone" />
            <span>Travel</span>
          </Link>
        </div>

        {/* Standalone Agent Vinod Sparkle Button with Full Agent Vinod Styling */}
        <button
          className="mobile-agent-vinod-btn"
          onClick={() => window.dispatchEvent(new CustomEvent('open-agent-vinod'))}
          aria-label="Ask Agent Vinod"
        >
          <div className="ai-button-glow-ring">
            <div className="ai-button-inner">
              <div className="sparkle-group">
                <Sparkle size={18} weight="fill" className="main-sparkle" />
              </div>
            </div>
          </div>
        </button>

        <ResumePopup isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      </nav>
    </div>
  );
};

export default StickyNavBar;