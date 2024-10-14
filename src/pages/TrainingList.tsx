import React, { useEffect } from 'react';
import '../styles/TrainingList.scss';
import Button from '../components/Buttons';
import Testimonials, { Testimonial } from '../components/Testimonials';

import siva from '../utils/testimonials/sivaprakash.webp'
import shagun from '../utils/testimonials/shagun.webp'
import rishikesh from '../utils/testimonials/rishikesh.webp'
import megha from '../utils/testimonials/megha-pfp.jpeg'

const CompanyForm = () => (
  <form id="companyForm">
    <input type="text" placeholder="Company Name" />
    <input type="text" placeholder="Contact Person" />
    <input type="email" placeholder="Email" />
    <input type="number" placeholder="Team Size" />
    <Button
      className="submit-button"
      text="Get a quote"
      variant="primary"
      type="submit"
    />
  </form>
);

const CalendlyWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget calendly"
      data-url="https://calendly.com/karankapoor/figma-1-1-session?hide_gdpr_banner=1"
    />
  );
};

const TrainingList = () => {

  const trainingTestimonialsData: Testimonial[] = [
    {
      id: 1,
      name: "SivaPrakash",
      role: "UX Designer/Illustrator",
      company: "Attended Figma masterclasss",
      avatarUrl: siva,
      testimonial: "10/10 will definitely join the workshop again to help aspiring designers :) It was such a jam packed session and it has helped me learn so many shortcuts which I wouldn’t have known before.",
      highlightedWords: ["10/10 will definitely join the workshop again", "helped me learn so many shortcuts"]
    },
    {
      id: 2,
      name: "Shagun",
      role: "UX Designer",
      company: "Attended Figma masterclasss",
      avatarUrl: shagun,
      testimonial: "Absolutely loved the workshop! Since I started using Figma, I wanted to learn Autolayout. This workshop not only helped me learn that, but also other cool things like variants and states in components. I can see how all these tricks would help me save hours! Looking forward to attending more of these in the future!!  ",
      highlightedWords: ["Absolutely loved the workshop!", "cool things like variants and states in components.", "Looking forward to attending more of these in the future!!"]
    },
    {
      id: 3,
      name: "Rishikesh Medhi",
      role: "UX Designer",
      company: "Attended Figma masterclasss",
      avatarUrl: rishikesh,
      testimonial: "There is already good content on the net too but teaching it in a structured manner and even giving a room for instant feedback made this experience very valuable and wholesome. ",
      highlightedWords: ["room for instant feedback made this experience very valuable and wholesome."]
    },
    {
      id: 4,
      name: "Shivani Singh",
      role: "Design Student",
      company: "Attended Figma masterclasss",
      avatarUrl: "",
      testimonial: "The workshop was not too heavy, not very surface level either. everything that is required was covered. The course content was well-planned and taught with utmost patience. The step-by-step approach was very helpful.",
      highlightedWords: ["not too heavy, not very surface level either.","The course content was well-planned and taught with utmost patience"]
    }
  ];

  return (
    <div className='training-parent'>
      <div className='intro'>
        <h2>For Individuals</h2>
        <p>In the past 5 years, I've trained and taught Figma to more than 10k people across organizations in India and the US.</p>
      </div>

      <div className='training'>
        <div>
          <h2>For Individuals</h2>
          <p>Inaugural Offer: ₹1000 flat for one hour</p>
        </div>
        <CalendlyWidget />
      </div>

      <div className='training'>
        <div>
          <h2>For Companies</h2>
        </div>
        <CompanyForm />
      </div>

      {/* Add the Testimonials component here with custom data */}
      <Testimonials 
        data={trainingTestimonialsData} 
        title="What participants say about the training"
      />
    </div>
  );
};

export default TrainingList;