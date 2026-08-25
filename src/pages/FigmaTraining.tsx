import React, { useEffect } from "react";
import '../styles/FigmaTraining.scss';
import Testimonials from '../components/Testimonials';
import ScrollReveal from '../components/ScrollReveal';

import LogoCarousel from "../components/LogoCarousel";
import FigmaTrainingCarousel from "../components/FigmaTrainingCarousel";
import { trainingTestimonialsData } from '../utils/trainingData';

import iima from "../utils/logos/iima.webp";
import iimsbp from "../utils/logos/iim-sbp.webp";
import iitm from "../utils/logos/IIT-M.webp";
import zuddl from "../utils/logos/zuddl.webp";
import indiana from "../utils/logos/indiana.webp";
import flame from "../utils/logos/flame.webp";
import { Logo } from "../utils/logos";
import usePageSEO from "../utils/usePageSEO";

const TrainingList: React.FC = () => {
  usePageSEO({
    title: "Figma Training & Workshops by Karan Kapoor | Professional Figma Trainer",
    description: "Hands-on Figma training & corporate design workshops led by Karan Kapoor. Learn Auto Layout, Design Systems, Prototyping, and Design Tokens.",
    keywords: "Figma Training, Figma Trainer, Learn Figma, Karan Kapoor, Figma Workshop, Design Systems Training, UI UX Workshop",
    canonicalUrl: "https://kadankapoor.com/figma-training",
    ogImage: "https://kadankapoor.com/figma-training-thumbnail.webp"
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="figma-training-main-content">
      <div className="training-parent">
        <IntroSection />
      </div>
      <FigmaTrainingCarousel />
      <TestimonialsSection />
    </div>
  );
};

// Intro Section with title, bio, and client logos
const IntroSection: React.FC = () => {

  const logos: Logo[] = [
    {
      url: iima,
    },
    {
      url: iimsbp,
    },
    {
      url: zuddl,
    },
    {
      url: iitm,
    },
    {
      url: indiana,
    },
    {
      url: flame,
    }
  ]

  return (
    <ScrollReveal className='intro'>
      <h1>Figma Training for designers, product managers, and students</h1>
      <ScrollReveal delay={80}>
        <p style={{ marginBottom: "1.5em" }}>In the last 5 years, I've taught Figma to over 10,000 people - from beginners to pros orgs and institutions across <strong>India and the US</strong>. I have also <strong>led the Figma community in Delhi</strong> for 5 years and conducted 20+ sessions and events.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={160}>
        <LogoCarousel logos={logos} />
      </ScrollReveal>
    </ScrollReveal>
  );
};

const TestimonialsSection: React.FC = () => (
  <Testimonials
    data={trainingTestimonialsData}
    title="What people have said about the training"
  />
);



export default TrainingList;
