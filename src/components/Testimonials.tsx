import React, { useState, useEffect } from 'react';
import ScrollReveal, { scrollRevealStagger } from './ScrollReveal';
import '../styles/Testimonials.scss';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  companyLogoUrl?: string;
  avatarUrl?: string;
  title?: string;
  testimonial: string;
  highlightedWords?: string[];
}

interface TestimonialsProps {
  data: Testimonial[];
  title: string;
  subtitle?: string;
}

export const highlightText = (text: string, wordsToHighlight: string[] = []) => {
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

export const TestimonialCard: React.FC<{
  testimonial: Testimonial;
  featured?: boolean;
  onClick?: () => void;
}> = ({
  testimonial,
  featured = false,
  onClick,
}) => (
  <div
    className={`testimonial-card tweet-card ${featured ? 'featured-testimonial' : 'compact-testimonial'}`}
    onClick={onClick}
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
    onKeyDown={(e) => {
      if (onClick && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick();
      }
    }}
  >
    <div className="tweet-body">
      {testimonial.title && testimonial.title.trim() !== "" && (
        <h3 className="tweet-title-headline">{testimonial.title}</h3>
      )}
      {featured && (
        <p className="tweet-text">
          {highlightText(testimonial.testimonial, testimonial.highlightedWords)}
        </p>
      )}
    </div>

    <div className="tweet-footer-divider" />

    <div className="tweet-header">
      {testimonial.avatarUrl ? (
        <img
          src={testimonial.avatarUrl}
          alt={`${testimonial.name}'s avatar`}
          className="tweet-avatar"
        />
      ) : (
        <div className="tweet-avatar placeholder" />
      )}
      <div className="tweet-author-info">
        <span className="tweet-author-name">{testimonial.name}</span>
        <div className="tweet-author-role-company">
          {testimonial.role}{testimonial.role && testimonial.company ? " at " : ""}{testimonial.company}
        </div>
      </div>
    </div>
  </div>
);

const Testimonials: React.FC<TestimonialsProps> = ({ data, title, subtitle }) => {
  const [activeId, setActiveId] = useState<number | string>(() => data[0]?.id);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (data.length > 0 && !data.some((item) => item.id === activeId)) {
      setActiveId(data[0].id);
    }
  }, [data, activeId]);

  const handleSelect = (id: number | string) => {
    if (id === activeId) return;
    setIsAnimating(true);
    setActiveId(id);
    setTimeout(() => setIsAnimating(false), 450);
  };

  const featuredTestimonial = data.find((item) => item.id === activeId) || data[0];
  const remainingTestimonials = data.filter((item) => item.id !== featuredTestimonial?.id);

  return (
    <div className="testimonials-section">
      <ScrollReveal>
        <div className="carousel-section-header">
          <div className="header-text">
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>
      </ScrollReveal>

      <div className={`testimonials-grid ${isAnimating ? 'swapping' : ''}`}>
        {featuredTestimonial && (
          <div className="testimonials-featured-column">
            <ScrollReveal delay={scrollRevealStagger(0, 70)}>
              <TestimonialCard testimonial={featuredTestimonial} featured />
            </ScrollReveal>
          </div>
        )}

        <div className="testimonials-stacked-column">
          {remainingTestimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={scrollRevealStagger(index + 1, 70)}>
              <TestimonialCard
                testimonial={testimonial}
                onClick={() => handleSelect(testimonial.id)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
