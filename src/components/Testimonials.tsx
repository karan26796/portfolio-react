import React from 'react';
import '../styles/Testimonials.scss';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
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
      <h2>{title}</h2>
      <div className="testimonials-grid">
        {data.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <p>{highlightText(testimonial.testimonial, testimonial.highlightedWords)}</p>
            <div className="testimonial-header">
              <img
                src={testimonial.avatarUrl}
                alt={`${testimonial.name}'s avatar`}
                className="testimonial-avatar"
              />
              <div className="testimonial-meta">
                <h4>{testimonial.name} · {testimonial.role}</h4>
                <h5>Worked together at {testimonial.company}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;