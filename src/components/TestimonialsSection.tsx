import React from 'react';
import '../styles/TestimonialsSection.scss';

interface TestimonialProps {
  name: string;
  role: string;
  quote: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, role, quote }) => (
  <div className="card-parent">
    <div className="person">
      <div className="profile-img"></div>
      <div className="name">
        <h4>{name}</h4>
        <p>{role}</p>
      </div>
    </div>
    <p>{quote}</p>
  </div>
);

const TestimonialsSection: React.FC = () => (
  <section>
    <h3>Testimonials</h3>
    <div className='testimonial-cards'>
      <Testimonial
        name="Sarah Johnson"
        role="UI Designer at TechCorp"
        quote="The Figma training was exactly what our team needed. We're now much more efficient and consistent in our design process."
      />
      <Testimonial
        name="Mike Chen"
        role="Product Designer at StartupX"
        quote="The instructor's knowledge of Figma was impressive. I learned so many time-saving techniques that I use daily."
      />
    </div>
  </section>
);

export default TestimonialsSection;