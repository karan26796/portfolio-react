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
  /** The image area the overlay button is positioned inside. */
  const mediaRef = useRef<HTMLDivElement>(null);
  /** Latest pointer position within it, and the frame scheduled to apply it. */
  const pointer = useRef({ x: 0, y: 0 });
  const followFrame = useRef<number | null>(null);
  /** Whether the button has been placed at least once on this card. */
  const hasFollowed = useRef(false);
  const imageList = (data.images && data.images.length > 0) ? data.images : [data.img];
  const isCarouselEnabled = variant === "large" && imageList.length > 1;

  /**
   * Walks the "Read more" button along with the pointer while it is over the
   * image.
   *
   * Written straight to the element as two custom properties rather than
   * through state: this fires on every pointer move, and re-rendering the card
   * — its carousel, its tags, its copy — at that rate to move one button would
   * be absurd. One rAF per frame at most, so a burst of moves between paints
   * collapses into a single write.
   *
   * The easing is the transform transition in the stylesheet, not a lerp here,
   * so the button trails the cursor slightly and settles on its own.
   */
  const followPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const media = mediaRef.current;
    if (!media) return;

    const rect = media.getBoundingClientRect();
    pointer.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };

    const apply = () => {
      const el = mediaRef.current;
      if (!el) return;
      el.style.setProperty("--cta-x", `${pointer.current.x}px`);
      el.style.setProperty("--cta-y", `${pointer.current.y}px`);
    };

    // The first placement is written straight away rather than waiting for a
    // frame: the button becomes visible the moment the pointer is over the
    // image, and a frame's delay would have it fade in at its resting spot and
    // then slide across to the cursor.
    if (!hasFollowed.current) {
      hasFollowed.current = true;
      apply();
      return;
    }

    if (followFrame.current !== null) return;
    followFrame.current = requestAnimationFrame(() => {
      followFrame.current = null;
      apply();
    });
  };

  // A card can unmount mid-gesture — scrolled out of a list, or the case study
  // opening over it — and a frame left scheduled would run against a detached
  // element.
  useEffect(() => () => {
    if (followFrame.current !== null) cancelAnimationFrame(followFrame.current);
  }, []);

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
    return (
      <Buttons
        size="s"
        text={variant === "large" ? "Read" : "Visit site"}
        iconName={variant === "large" ? "ArrowRight" : "ArrowSquareOut"}
        withText={true}
        withIcon={true}
        iconDirection="right"
        variant="secondary"
      />
    );
  };

  const isClickable = !!(onClick || data.url) && !data.specialStatus;

  const hasReadMore = isClickable && buttonType !== "none";

  /**
   * The way into the case study.
   *
   * Rendered twice, into two slots that never show at the same time: over the
   * image on a pointer device, where it appears on hover, and under the
   * problem copy on a phone, where there is no hover to reveal it. The one
   * that is not in use is `display: none`, which takes it out of the tab order
   * and out of the accessibility tree too — so this is one button as far as
   * anyone using the page is concerned, not two.
   *
   * A function rather than one shared element, because the two slots want
   * different weights. Over the image the button has to hold its own against a
   * photograph and appears only when pointed at, so it is primary. On a phone
   * it sits in the card's own copy, permanently, directly under the problem
   * statement — and a filled button there competes with the card's title for
   * the first thing you look at, when the whole card is already tappable and
   * this is only the visible, tabbable way to the same place. Secondary.
   */
  const readMore = (emphasis: "primary" | "secondary") => (
    <Buttons
      text="Read more"
      withText
      withIcon
      iconName="ArrowRight"
      iconDirection="right"
      size="s"
      // Named `emphasis` rather than `variant`: the component already has a
      // prop by that name, for the card's own size, and shadowing it here
      // would make this read as though the card's variant decided the
      // button's weight.
      variant={emphasis}
      onClick={handleCtaClick}
    />
  );
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
        <div
          className="project-card-image-carousel"
          ref={mediaRef}
          onPointerEnter={hasReadMore ? followPointer : undefined}
          onPointerMove={hasReadMore ? followPointer : undefined}
        >
          {hasReadMore && (
            <div className="image-overlay-cta">{readMore("primary")}</div>
          )}
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
        <div
          className="project-image-single-wrapper"
          ref={mediaRef}
          onPointerEnter={hasReadMore ? followPointer : undefined}
          onPointerMove={hasReadMore ? followPointer : undefined}
        >
          {hasReadMore && (
            <div className="image-overlay-cta">{readMore("primary")}</div>
          )}
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
            <div className="project-card-split__col project-card-split__col--solution">
              <p className="project-card-split__label">
                <span className="project-card-split__num">00</span>
                Solution
              </p>
              <h3 className="project-card-split__solution">{data.details}</h3>
            </div>

            <div className="project-card-split__col project-card-split__col--problem">
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

              {/* The phone's slot for it. On a pointer device this one is
                  hidden and the copy over the image takes over — see
                  .project-card-split__cta in ProjectCard.scss. */}
              {hasReadMore && (
                <div className="project-card-split__cta">
                  {readMore("secondary")}
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
