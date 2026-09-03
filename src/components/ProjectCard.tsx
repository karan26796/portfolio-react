import React, { useState, useEffect, useRef } from "react";
import "../styles/ProjectCard.scss";
import "../styles/ProjectCardSmall.scss";
import Buttons from "./Buttons";
import ImageWithSkeleton from "./ImageWithSkeleton";
import Tag from "./Tag";
import { TOOL_LOGOS } from "../utils/toolLogos";

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
    tools?: string[];
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
  const [tilt, setTilt] = useState(0);
  const [activeDot, setActiveDot] = useState(0);
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

  /** Where the card goes — its own case study, or an external site. */
  const openProject = () => {
    if (onClick) {
      onClick();
    } else if (data.url) {
      window.open(data.url, "_blank", "noopener,noreferrer");
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openProject();
  };

  /**
   * The explicit control inside the card. The event is optional because
   * Buttons types its onClick as taking none, while React hands it one at
   * runtime — and stopping propagation is the point: without it the card's own
   * handler fires straight after this one, opening the project twice.
   */
  const handleCtaClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    openProject();
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
      style={{
        '--card-accent': data.accentColor || '#00e676',
      } as React.CSSProperties}
    >
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
        {(data.tags?.length > 0 || (data.tools && data.tools.length > 0)) && (
          <div className="card-meta-row">
            {data.tags?.length > 0 && (
              <div className="tag-pills">
                {data.tags.map((tag) => (
                  <Tag
                    key={tag}
                    text={tag}
                    // One neutral grey for every tag, rather than a colour
                    // per tag. `Tag` applies this as an inline style, so it
                    // has to be set here rather than overridden in CSS.
                    color={{ text: "var(--secondary-text)" }}
                    rotation={0}
                    dot={false}
                  />
                ))}
              </div>
            )}
            {data.tools && data.tools.length > 0 && (
              <div className="tool-logos">
                {data.tools
                  .filter((tool) => TOOL_LOGOS[tool])
                  .map((tool) => (
                    <span className="tool-logo" data-tooltip={tool} key={tool}>
                      <img src={TOOL_LOGOS[tool]} alt={tool} />
                    </span>
                  ))}
              </div>
            )}
          </div>
        )}
        {variant === "large" ? (
          // Two labelled columns: the headline reads as the solution, the
          // description as the problem. The numbers are the two blocks
          // (00/01) in reading order, not the card's position in the list.
          <div className="project-card-split">
            <div className="project-card-split__col">
              <p className="project-card-split__label">
                <span className="project-card-split__num">00</span>
                Solution
              </p>
              <h3 className="project-card-split__solution">{data.details}</h3>
            </div>

            <div className="project-card-split__col">
              <p className="project-card-split__label">
                <span className="project-card-split__num">01</span>
                Problem
              </p>
              {(data.newdesc || data.description) && (
                <p
                  className="project-card-split__problem"
                  dangerouslySetInnerHTML={{ __html: data.newdesc || data.description || "" }}
                />
              )}

              {/* The whole card is clickable, but it is a <div> with an
                  onClick — so until now the only way in was a mouse. This is
                  the same destination as a real control: reachable by keyboard,
                  announced as a button, and visible without hovering to
                  discover the cursor pill. stopPropagation keeps the card's own
                  handler from firing a second time behind it. */}
              {isClickable && buttonType !== "none" && (
                <div className="project-card-split__cta">
                  <Buttons
                    className="read-more-button"
                    text="Read more"
                    withText
                    withIcon
                    iconName="ArrowRight"
                    iconDirection="right"
                    size="s"
                    variant="primary"
                    onClick={handleCtaClick}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="title-details-group">
              <h6>{data.year}</h6>
              <h3>{data.details}</h3>
            </div>

            <div className="desc-btn-group">
              {(data.newdesc || data.description) && (
                <p
                  className="description"
                  dangerouslySetInnerHTML={{ __html: data.newdesc || data.description || "" }}
                />
              )}
              {isClickable && (
                <div className="button-container">
                  {renderButton()}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
