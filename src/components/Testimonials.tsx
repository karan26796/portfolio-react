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
}

const Testimonials: React.FC<TestimonialsProps> = ({ data, title }) => {
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
      <ScrollReveal>
        <h2>{title}</h2>
      </ScrollReveal>
      <div className="testimonials-grid">
        {data.map((testimonial, index) => (
          <ScrollReveal key={testimonial.id} delay={scrollRevealStagger(index, 70)}>
            <div className="testimonial-card">
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
                  <p className="name">
                    {testimonial.name} · {testimonial.role}
                  </p>
                  <h5>{testimonial.company}</h5>
                </div>
              </div>
              <div className="testimonial-content">
                {testimonial.title && testimonial.title.trim() !== "" && (
                  <h4 className="testimonial-title">{testimonial.title}</h4>
                )}
                <p className="testimonial-quote">
                  {highlightText(testimonial.testimonial, testimonial.highlightedWords)}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
