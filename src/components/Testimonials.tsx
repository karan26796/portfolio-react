import React from 'react';
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

export const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="testimonial-card tweet-card">
    <div className="tweet-body">
      {testimonial.title && testimonial.title.trim() !== "" && (
        <h3 className="tweet-title-headline">{testimonial.title}</h3>
      )}
      <p className="tweet-text">
        {highlightText(testimonial.testimonial, testimonial.highlightedWords)}
      </p>
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
  const col1 = data.filter((_, idx) => idx % 2 === 0);
  const col2 = data.filter((_, idx) => idx % 2 === 1);

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

      <div className="testimonials-masonry">
        <div className="testimonials-column">
          {col1.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={scrollRevealStagger(index * 2, 70)}>
              <TestimonialCard testimonial={testimonial} />
            </ScrollReveal>
          ))}
        </div>
        <div className="testimonials-column">
          {col2.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={scrollRevealStagger(index * 2 + 1, 70)}>
              <TestimonialCard testimonial={testimonial} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
