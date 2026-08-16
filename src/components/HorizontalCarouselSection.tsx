import React, { useRef, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";
import "../styles/HorizontalCarousel.scss";

interface HorizontalCarouselSectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode[];
  className?: string;
  enableParallax?: boolean;
}

const HorizontalCarouselSection: React.FC<HorizontalCarouselSectionProps> = ({
  title,
  subtitle,
  children,
  className = "",
  enableParallax = true,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enableParallax) return;

    const track = trackRef.current;
    if (!track) return;

    let rafId: number;

    const updateParallax = () => {
      const trackRect = track.getBoundingClientRect();
      if (!trackRect.width) return;

      const trackCenter = trackRect.left + trackRect.width / 2;

      const mediaTargets = track.querySelectorAll<HTMLElement>(
        ".experiment-image-container img, .experiment-image-container video, .experiment-image-container .image-skeleton-wrapper, .card-media img, .card-media video, .card-media .image-skeleton-wrapper"
      );

      mediaTargets.forEach((target) => {
        const itemContainer = target.closest(".carousel-item") || target.parentElement;
        if (!itemContainer) return;

        const itemRect = itemContainer.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 2;
        const normalizedOffset = (itemCenter - trackCenter) / (trackRect.width / 2);

        // Clamp normalized offset between -1.5 and 1.5
        const clampedOffset = Math.max(-1.5, Math.min(1.5, normalizedOffset));
        const parallaxX = clampedOffset * -24;

        target.style.transform = `scale(1.14) translateX(${parallaxX.toFixed(2)}px)`;
        target.style.willChange = "transform";
      });
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateParallax);
    };

    // Run initial update
    updateParallax();

    track.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      track.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [enableParallax, children]);

  return (
    <div className={`horizontal-carousel-section ${className}`}>
      <ScrollReveal>
        <div className="carousel-section-header">
          <div className="header-text">
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>
      </ScrollReveal>

      <div className="carousel-track" ref={trackRef}>
        {React.Children.map(children, (child, idx) => (
          <div key={idx} className="carousel-item">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCarouselSection;
