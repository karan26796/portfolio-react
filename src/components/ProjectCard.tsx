import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowSquareOut } from "@phosphor-icons/react";
import "../styles/ProjectCard.scss";
import "../styles/ProjectCardSmall.scss";
import Buttons from "./Buttons";
import ImageWithSkeleton from "./ImageWithSkeleton";

interface ProjectCardProps {
  data: {
    id: string;
    img: string;
    images?: string[];
    newdesc: string;
    title: string;
    description: string;
    tags: string[];
    type: "personal" | "client" | "other";
    details?: string;
    url?: string;
    specialStatus?: string;
    year?: string;
    accentColor?: string;
    meta?: {
      impact?: string;
    };
  };
  variant: "small" | "large";
  onClick?: () => void;
  buttonType?: "button" | "static" | "none";
  showDivider?: boolean;
  enableTilt?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  data,
  variant,
  onClick,
  buttonType = "button",
  showDivider = true,
  enableTilt = true,
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [tilt, setTilt] = useState(0);
  const [activeDot, setActiveDot] = useState(0);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const imageList = (data.images && data.images.length > 0) ? data.images : [data.img];
  const isCarouselEnabled = variant === "large" && imageList.length > 1;

  const handleScroll = () => {
    if (scrollTrackRef.current) {
      const { scrollLeft, clientWidth } = scrollTrackRef.current;
      if (clientWidth > 0) {
        const itemWidth = clientWidth * 0.90 + 8;
        const newIndex = Math.round(scrollLeft / itemWidth);
        setActiveDot(Math.min(newIndex, imageList.length - 1));
      }
    }
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    if (scrollTrackRef.current) {
      const clientWidth = scrollTrackRef.current.clientWidth;
      const itemWidth = clientWidth * 0.90 + 8;
      scrollTrackRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth',
      });
      setActiveDot(index);
    }
  };

  useEffect(() => {
    if (enableTilt) {
      setTilt(Math.random() * 4 - 2);
    }
  }, [enableTilt]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    } else if (data.url) {
      window.open(data.url, "_blank", "noopener,noreferrer");
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isSmallScreen || !isClickable) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    if (!isSmallScreen && isClickable) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCursorPos(null);
  };

  const renderButton = () => {
    if (buttonType === "none") return null;
    if (data.specialStatus && buttonType !== "static") {
      return (
        <div className="special-status">
          <span style={{ color: "var(--primary-color)", fontSize: "1em", fontWeight: "bold" }}>{data.specialStatus}</span>
        </div>
      );
    }
    if (buttonType === "static") {
      return (
        <div className="static-text">
          {data.specialStatus || (variant === "large" ? "View Project" : "Visit Site")}
        </div>
      );
    }
    const commonProps = {
      className: "read-more-button",
      withIcon: true,
      iconDirection: "right" as const,
      size: "s" as "s" | "m",
    };
    return (
      <Buttons
        {...commonProps}
        size="s"
        text={variant === "large" ? "Read" : "Visit site"}
        iconName={variant === "large" ? "ArrowRight" : "ArrowSquareOut"}
        withText={true}
        variant="primary"
      />
    );
  };

  const isClickable = !!(onClick || data.url) && !data.specialStatus;
  const containerClass = `project-container${variant === "small" ? " project-container-small" : ""}${data.specialStatus ? " has-special-status" : ""}${showDivider === false ? " no-divider" : ""}${!isClickable ? " unclickable" : ""}`;

  return (
    <div
      className={containerClass}
      onClick={isClickable ? handleClick : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        '--card-accent': data.accentColor || '#00e676',
      } as React.CSSProperties}
    >
      {isClickable && !isSmallScreen && isHovered && cursorPos && (
        <div
          className="custom-cursor-read-pill"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
          }}
        >
          <span>{variant === "large" ? "Read" : "Visit"}</span>
          {variant === "large" ? (
            <ArrowRight size={14} weight="bold" />
          ) : (
            <ArrowSquareOut size={14} weight="bold" />
          )}
        </div>
      )}

      {isCarouselEnabled ? (
        <div className="project-card-image-carousel">
          <div
            className="carousel-track"
            ref={scrollTrackRef}
            onScroll={handleScroll}
          >
            {imageList.map((imgSrc, idx) => (
              <ImageWithSkeleton
                key={idx}
                containerClassName="project-image-wrapper"
                className="project-image"
                src={imgSrc}
                alt={`${data.title} ${idx + 1}`}
              />
            ))}
          </div>

          <div className="carousel-dots">
            {imageList.map((_, idx) => (
              <button
                type="button"
                key={idx}
                className={`carousel-dot${idx === activeDot ? " active" : ""}`}
                onClick={(e) => handleDotClick(e, idx)}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="project-image-single-wrapper">
          <ImageWithSkeleton
            containerClassName="project-image-single-inner"
            className="project-image"
            src={data.img}
            alt={data.title}
          />
        </div>
      )}

      <div className="project-card">
        <div className="title-details-group">
          <h6>{data.year}</h6>
          <h3>{data.details}</h3>
        </div>

        <div className="desc-btn-group">
          {(data.newdesc || data.description) && (
            <p className="description">{data.newdesc || data.description}</p>
          )}
          {isClickable && (
            <div className="button-container">
              {renderButton()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
