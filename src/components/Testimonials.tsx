import React from 'react';
import '../styles/Testimonials.scss';

import kritika from '../utils/testimonials/pfp-02.jpg'
import malavika from '../utils/testimonials/pfp-03.jpg'
import nitin from '../utils/testimonials/pfp-04.jpg'
import megha from '../utils/testimonials/megha-pfp.jpeg'

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  testimonial: string;
  highlightedWords?: string[]; // Add this new property
}

const testimonialsData: Testimonial[] = [
  {
    "id": 1,
    "name": "Kritika Oberoi",
    "role": "Co-Founder",
    "company": "Looppanel",
    "avatarUrl": kritika,
    "testimonial": "Karan was a dedicated employee who gave his work his all. He excelled in design iteration and effectively conducted user research.",
    "highlightedWords": ["excelled in design iteration", "effectively conducted user research"] // Words to highlight
  },
  {
    "id": 2,
    "name": "Megha Agarwal",
    "role": "Designer",
    "company": "Looppanel",
    "avatarUrl": megha,
    "testimonial": "Karan is an exceptional designer who brings clarity to highly ambiguous problems. He established a comprehensive design system that maintained consistency in our fast-moving startup.",
    "highlightedWords": ["brings clarity to highly ambiguous problems", "established a comprehensive design system"] // Words to highlight
  },
  {
    "id": 3,
    "name": "Malavika Susan",
    "role": "Designer",
    "company": "Aphelia Innovations",
    "avatarUrl": malavika,
    "testimonial": "Karan is exceptional at combining technology with art through meticulous planning. His emphasis on design standardization created a strong foundation for all our projects.",
    "highlightedWords": ["meticulous planning", "design standardization"]
  },
  {
    "id": 4,
    "name": "Nitin Prakash",
    "role": "Android Developer",
    "company": "Guesthouser",
    "avatarUrl": nitin,
    "testimonial": "Karan is an outstanding product designer with valuable development skills. He can solve complex problems easily and has superb UI/UX capabilities.",
    "highlightedWords": ["valuable development skills", "solve complex problems easily"] // Words to highlight
  }
]

const Testimonials: React.FC = () => {
  const duplicatedData = [...testimonialsData];

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
      <h1>Hear from the people I've worked with</h1 >
      <div className="scroll-container">
        <div className="scroll-track testimonials-grid">
          {duplicatedData.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className={`testimonial-card item-${index+1}`}
            >
              <p>
                {highlightText(testimonial.testimonial, testimonial.highlightedWords)}
              </p>
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
    </div>
  );
};

export default Testimonials;