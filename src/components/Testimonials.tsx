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
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Kritika Oberoi",
    role: "Co-Founder",
    company: "Looppanel",
    avatarUrl: kritika,
    testimonial: "Karan was a part-time employee at Looppanel but he gave his work his all, took feedback very well, iterated on designs endlessly and learned how to run effective user research."
  },
  {
    id: 2,
    name: "Malavika Susan",
    role: "UX Designer",
    company: "Aphelia Innovations",
    avatarUrl: malavika,
    testimonial: "Karan's emphasis on design standardization, by meticulous planning and strategizing, made way for a strong foundation in design for me and all our future projects. His ability to combine technology with art is exceptional."
  },
  {
    id: 3,
    name: "Nitin Prakash",
    role: "Android Developer",
    company: "Guesthouser",
    avatarUrl: nitin,
    testimonial: "I had a pleasure of working with Karan at Guesthouser. He is not only a product designer but also has a great skill of programming which makes his work outstanding. He has superb UI/UX skills and can solve complex problems easily"
  },
  {
    id: 3,
    name: "Megha Agarwal",
    role: "Senior Product Designer",
    company: "Looppanel",
    avatarUrl: megha,
    testimonial: "I had the pleasure of working alongside Karan from July to September 2022 at Looppanel. Karan is an exceptional designer, mentor, and collaborator. He possesses a unique ability to bring clarity to highly ambiguous problem statements, a skill that is invaluable in the design field. Karan is also highly proficient with design tools, which he utilized to establish a comprehensive design system at Looppanel early on. This significantly contributed to maintaining pace and consistency within our fast-moving startup environment. Karan's enthusiasm is contagious, and I’m confident he would be an invaluable asset to any product team!"
  }
];

const Testimonials: React.FC = () => {
  const duplicatedData = [...testimonialsData, ...testimonialsData];

  return (
    <div className="testimonials-section">
      <h1>Hear from the people I've worked with</h1>
      <div className="scroll-container">
        <div className="scroll-track testimonials-grid">
          {duplicatedData.map((testimonial, index) => (
            <div key={`${testimonial.id}-${index}`} className="testimonial-card">
              <p>{testimonial.testimonial}</p>
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

