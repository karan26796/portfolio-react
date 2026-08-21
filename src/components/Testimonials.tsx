import React from 'react';
import ScrollReveal, { scrollRevealStagger } from './ScrollReveal';
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

const Testimonials: React.FC<TestimonialsProps> = ({ data, title, subtitle }) => {
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

      <div className="testimonials-grid">
        {data.map((testimonial, index) => (
          <ScrollReveal key={testimonial.id} delay={scrollRevealStagger(index, 70)}>
            <TestimonialCard testimonial={testimonial} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
