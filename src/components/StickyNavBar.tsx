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

  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  // RENDER: DESKTOP LEFT SIDEBAR
  // ============================================================================
  if (!isMobile) {
    const mainCta = (
      <Button
        text={location.pathname === "/home" || location.pathname === "/" ? "Let's work together" : "View Resume"}
        withIcon={true}
        iconName={location.pathname === "/home" || location.pathname === "/" ? "ArrowRight" : "FileText"}
        iconDirection={location.pathname === "/home" || location.pathname === "/" ? "right" : "left"}
        onClick={() => {
          if (location.pathname !== "/home" && location.pathname !== "/") {
            setIsResumeOpen(true);
          } else {
            const section = document.getElementById("contact");
            if (section) {
              section.scrollIntoView({ behavior: "smooth" });
            }
          }
        }}
        variant={location.pathname === "/home" || location.pathname === "/" ? "primary" : "secondary"}
        size="m"
      />
    );

    return (
      <aside className="sidebar-nav">
        <Link to="/home" className="sidebar-logo">
          <img src="/gallery/profile.webp" alt="Karan Kapoor" className="sidebar-logo-img" />
        </Link>

        <nav className="sidebar-links">
          <Link
            to="/home"
            className={`sidebar-link${location.pathname === "/home" ? " active" : ""}`}
          >
            <House size={22} weight="light" />
            <span>Work</span>
          </Link>

          <Link
            to="/figma-training"
            className={`sidebar-link${location.pathname === "/figma-training" ? " active" : ""}`}
          >
            <FigmaLogo size={22} weight="light" />
            <span>Figma training</span>
          </Link>

          <Link
            to="/gallery"
            className={`sidebar-link${location.pathname === "/gallery" ? " active" : ""}`}
          >
            <Camera size={22} weight="light" />
            <span>Travel</span>
          </Link>

          <div className="sidebar-cta-wrapper">
            {mainCta}
          </div>
        </nav>

        <div className="sidebar-bottom">
          <a
            href="https://x.com/kadankapoor"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-user-badge twitter-badge"
          >
            <div className="avatar-wrapper twitter-icon-bg">
              <XLogo size={18} weight="bold" />
            </div>
            <div className="user-details">
              <span className="handle">@kadankapoor</span>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/karankapoorux/"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-user-badge linkedin-badge"
          >
            <div className="avatar-wrapper linkedin-icon-bg">
              <LinkedinLogo size={18} weight="bold" />
            </div>
            <div className="user-details">
              <span className="handle">in/karankapoorux</span>
            </div>
          </a>
        </div>

        <ResumePopup isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      </aside>
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