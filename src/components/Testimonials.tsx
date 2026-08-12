import React from 'react';
import HorizontalCarouselSection from './HorizontalCarouselSection';
import '../styles/Testimonials.scss';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
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

const Testimonials: React.FC<TestimonialsProps> = ({ data, title, subtitle }) => {
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
      <HorizontalCarouselSection title={title} subtitle={subtitle}>
        {data.map((testimonial) => {
          const handle = `@${testimonial.name.toLowerCase().replace(/\s+/g, '')}`;
          return (
            <div key={testimonial.id} className="testimonial-card tweet-card">
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
                  <div className="tweet-author-line">
                    <span className="tweet-author-name">{testimonial.name}</span>
                    <span className="tweet-verified-badge" title="Verified">
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="verified-icon">
                        <g>
                          <path
                            fill="#eab308"
                            d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.575 9.55.7 10.92.7 12.5c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238.65 1.273 2.02 2.148 3.6 2.148 1.58 0 2.95-.875 3.6-2.148.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6zm-10.61 4.352l-4.242-4.242 1.414-1.414 2.828 2.828 6.364-6.364 1.414 1.414-7.778 7.778z"
                          />
                        </g>
                      </svg>
                    </span>
                    <span className="tweet-handle">{handle}</span>
                    <span className="tweet-dot">·</span>
                    <span className="tweet-role">{testimonial.role}</span>
                  </div>
                  <div className="tweet-sub-info">{testimonial.company}</div>
                </div>
              </div>

              <div className="tweet-body">
                {testimonial.title && testimonial.title.trim() !== "" && (
                  <div className="tweet-title-headline">{testimonial.title}</div>
                )}
                <p className="tweet-text">
                  {highlightText(testimonial.testimonial, testimonial.highlightedWords)}
                </p>
              </div>
            </div>
          );
        })}
      </HorizontalCarouselSection>
    </div>
  );
};

export default Testimonials;
