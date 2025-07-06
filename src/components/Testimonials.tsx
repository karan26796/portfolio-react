import React, { useRef, useEffect } from 'react';
import '../styles/Testimonials.scss';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatarUrl?: string; // avatarUrl is optional now
  testimonial: string;
  highlightedWords?: string[];
}

interface TestimonialsProps {
  data: Testimonial[];
  title: string;
}

const Testimonials: React.FC<TestimonialsProps> = ({ data, title }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);

  // Duplicate testimonials for seamless infinite scroll
  const testimonials = [...data, ...data];

  // Auto-scroll logic
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollStep = 1; // px per frame
    const scrollDelay = 10; // ms per frame (about 60fps)
    let isScrolling = true;

    function scroll() {
      if (!carousel) return;
      if (!isScrolling) return;
      carousel.scrollLeft += scrollStep;
      // If we've scrolled past the first set, reset to start
      if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
        carousel.scrollLeft = 0;
      }
      autoScrollInterval.current = setTimeout(scroll, scrollDelay);
    }

    scroll();

    // Pause on hover
    const handleMouseEnter = () => { isScrolling = false; };
    const handleMouseLeave = () => {
      if (!isScrolling) {
        isScrolling = true;
        scroll();
      }
    };
    carousel.addEventListener('mouseenter', handleMouseEnter);
    carousel.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (autoScrollInterval.current) clearTimeout(autoScrollInterval.current);
      carousel.removeEventListener('mouseenter', handleMouseEnter);
      carousel.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [data]);

  const highlightText = (text: string, wordsToHighlight: string[] = []) => {
    if (!wordsToHighlight.length) return text;
    const parts = text.split(new RegExp(`(${wordsToHighlight.join('|')})`, 'gi'));
    return parts.map((part, index) => {
      const isHighlighted = wordsToHighlight.some(word =>
        part.toLowerCase() === word.toLowerCase()
      );
      return isHighlighted ?
        <span key={index} className="highlighted">{part}</span> :
        <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  return (
    <div className="testimonials-section">
      <h1>{title}</h1>
      <div className="testimonials-carousel" ref={carouselRef}>
        <div className="carousel-track">
          {testimonials.map((testimonial, idx) => (
            <div key={testimonial.id + '-' + idx} className="testimonial-card">
              <p>{highlightText(testimonial.testimonial, testimonial.highlightedWords)}</p>
              <div className="testimonial-header">
                {testimonial.avatarUrl ? (
                  <img
                    src={testimonial.avatarUrl}
                    alt={`${testimonial.name}'s avatar`}
                    className="testimonial-avatar"
                  />
                ) : (
                  <div className="testimonial-avatar placeholder" />
                )}
                <div className="testimonial-meta">
                  <p className='name'>{testimonial.name} · {testimonial.role}</p>
                  <h5>{testimonial.company}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
