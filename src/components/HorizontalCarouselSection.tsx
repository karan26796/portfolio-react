import React, { useRef } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import ScrollReveal from "./ScrollReveal";
import "../styles/HorizontalCarousel.scss";

interface HorizontalCarouselSectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode[];
  className?: string;
}

const HorizontalCarouselSection: React.FC<HorizontalCarouselSectionProps> = ({
  title,
  subtitle,
  children,
  className = ""
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (trackRef.current) {
      const scrollAmount = direction === "left" ? -480 : 480;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className={`horizontal-carousel-section ${className}`}>
      <ScrollReveal>
        <div className="carousel-section-header">
          <div className="header-text">
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>

          <div className="carousel-nav-buttons">
            <button
              className="nav-btn"
              onClick={() => scroll("left")}
              aria-label="Scroll Left"
              title="Previous"
            >
              <CaretLeft size={20} weight="bold" />
            </button>
            <button
              className="nav-btn"
              onClick={() => scroll("right")}
              aria-label="Scroll Right"
              title="Next"
            >
              <CaretRight size={20} weight="bold" />
            </button>
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
