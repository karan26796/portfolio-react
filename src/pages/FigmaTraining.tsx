import React, { useEffect } from "react";
import '../styles/FigmaTraining.scss';
import Testimonials from '../components/Testimonials';
import ScrollReveal from '../components/ScrollReveal';

import LogoCarousel from "../components/LogoCarousel";
import FigmaTrainingCarousel from "../components/FigmaTrainingCarousel";
import { trainingTestimonialsData, trainingFaqs } from '../utils/trainingData';
import AgentPromptCard from '../components/AgentPromptCard';

import iima from "../utils/logos/iima.webp";
import iimsbp from "../utils/logos/iim-sbp.webp";
import iitm from "../utils/logos/IIT-M.webp";
import zuddl from "../utils/logos/zuddl.webp";
import indiana from "../utils/logos/indiana.webp";
import flame from "../utils/logos/flame.webp";
import { Logo } from "../utils/logos";
import usePageSEO from "../utils/usePageSEO";
import { useSectionAccent } from "../utils/useSectionAccent";
import "../styles/hero.scss";

// Warm, in the family of Figma's own palette. Drives the page's top wash the
// same way the home page's sections drive theirs.
const TRAINING_ACCENT = "rgba(255, 122, 69, 0.12)";
const TRAINING_TESTIMONIALS_ACCENT = "rgba(0, 33, 54, 0.10)";
const TRAINING_FAQ_ACCENT = "rgba(112, 0, 255, 0.07)";

const TrainingList: React.FC = () => {
  usePageSEO({
    title: "Figma Training & Workshops by Karan Kapoor | Professional Figma Trainer",
    description: "Hands-on Figma training & corporate design workshops led by Karan Kapoor. Learn Auto Layout, Design Systems, Prototyping, and Design Tokens.",
    keywords: "Figma Training, Figma Trainer, Learn Figma, Karan Kapoor, Figma Workshop, Design Systems Training, UI UX Workshop",
    canonicalUrl: "https://kadankapoor.com/figma-training",
    ogImage: "https://kadankapoor.com/figma-training-thumbnail.webp"
  });

  useSectionAccent(TRAINING_ACCENT);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="figma-training-main-content">
      <div className="training-parent" data-accent={TRAINING_ACCENT}>
        <IntroSection />
      </div>
      <FigmaTrainingCarousel />
      <div data-accent={TRAINING_TESTIMONIALS_ACCENT}>
        <TestimonialsSection />
      </div>
      <div data-accent={TRAINING_FAQ_ACCENT}>
        {/* The same section the home page closes with: the questions answered
            outright, then pills that open the assistant already asking. The
            pills carry the phrasing its training knowledge actually answers —
            see the training branch of AISummarizer in App.tsx — so a short
            label can never land it on a guess. */}
        <AgentPromptCard
          faqs={trainingFaqs}
          questions={[
            {
              label: "What a workshop looks like",
              ask: "What do you cover in a Figma workshop?",
            },
            { label: "Who should attend", ask: "Who are these sessions for?" },
            {
              label: "Running one for my team",
              ask: "Can you run a session for my team?",
            },
          ]}
        />
      </div>
    </div>
  );
};

// The masthead, in the same shape as the home page's: name, role in grey at
// the same size, a row of logos, then the paragraph. The shared rules live in
// hero.scss so the two cannot drift apart.
const IntroSection: React.FC = () => {
  const logos: Logo[] = [
    { url: iima },
    { url: iimsbp },
    { url: zuddl },
    { url: iitm },
    { url: indiana },
    { url: flame },
  ];

  return (
    <div className="training-hero">
      <div className="hero-text-content">
        <ScrollReveal delay={0}>
          <h1 className="hero-name">Figma Training</h1>
        </ScrollReveal>

        <ScrollReveal delay={60}>
          <p className="hero-role">for designers, product managers, and students</p>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <p className="intro-paragraph">
            In the last 5 years, I've taught Figma to over 10,000 people - from beginners to pros orgs and institutions across <strong>India and the US</strong>. I have also <strong>led the Figma community in Delhi</strong> for 5 years and conducted 20+ sessions and events.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <LogoCarousel logos={logos} align="flex-start" />
        </ScrollReveal>
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => (
  <Testimonials
    data={trainingTestimonialsData}
    title="What people have said about the training"
  />
);



export default TrainingList;
