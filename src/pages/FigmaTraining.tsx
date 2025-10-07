import React, { useMemo, useRef, useEffect } from "react";
import '../styles/FigmaTraining.scss';
import Button from '../components/Buttons';
import Testimonials from '../components/Testimonials';
import Tag, { VibrantColor } from "../components/Tag";
import LogoCarousel from "../components/LogoCarousel";
import FigmaTrainingCarousel from "../components/FigmaTrainingCarousel";
import CompanyForm from '../components/CompanyForm';
import { trainingTestimonialsData, tagTextIndividual, tagTextCompany, vibrantColors } from '../utils/trainingData';

import iima from "../utils/logos/iima.webp";
import iimsbp from "../utils/logos/iim-sbp.webp";
import iitm from "../utils/logos/IIT-M.webp";
import zuddl from "../utils/logos/zuddl.webp";
import indiana from "../utils/logos/indiana.webp";
import flame from "../utils/logos/flame.webp";
import { Logo } from "../utils/logos";

const TrainingList: React.FC = () => {
  // Add useEffect to reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href) {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Refs for individual and company sections
  const individualRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);

  // Generate random properties for the individual and company tags
  const individualTagProperties = useMemo(() => {
    return tagTextIndividual.map(() => ({
      color: vibrantColors[Math.floor(Math.random() * vibrantColors.length)],
      rotation: Math.random() * 4 - 2,
    }));
  }, []);

  const companyTagProperties = useMemo(() => {
    return tagTextCompany.map(() => ({
      color: vibrantColors[Math.floor(Math.random() * vibrantColors.length)],
      rotation: Math.random() * 4 - 2,
    }));
  }, []);

  // Function to handle scrolling to the specific section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className='training-parent'>
      <IntroSection
        onIndividualClick={() => scrollToSection(individualRef)}
        onCompanyClick={() => scrollToSection(companyRef)}
      />
      <FigmaTrainingCarousel />
      <TestimonialsSection />
            <CompanyForm />

    </div>
  );
};

interface IntroSectionProps {
  onIndividualClick: () => void;
  onCompanyClick: () => void;
}

// Intro Section with buttons to scroll to the relevant sections
const IntroSection: React.FC<IntroSectionProps> = ({ onIndividualClick, onCompanyClick }) => {

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
    <div className='intro'>
      <h1>Figma Training for designers, product managers, and students</h1>
      <p style={{marginBottom:"1.5em"}}>In the last 5 years, I've taught Figma to over 10,000 people - from beginners to pros orgs and institutions across <strong>India and the US</strong>. I have also <strong>led the Figma community in Delhi</strong> for 5 years and conducted 20+ sessions and events.
      </p>

      <LogoCarousel logos={logos} />

      <a style={{ scrollBehavior: "smooth", marginTop: "2em", marginBottom:"2em" }} href="#company">
        <Button
          text="Book a training today"
          withIcon={true}
          iconName="ArrowDown"
          iconDirection="right"
          withText={true}
          size="m"
          variant="primary"
          weight="regular"
          type="button"
        />
      </a>
    </div>
  );
};

const TestimonialsSection: React.FC = () => (
  <Testimonials
    data={trainingTestimonialsData}
    title="What people have said about the training"
  />
);

interface TrainingSectionProps {
  tagProperties: { color: VibrantColor; rotation: number; }[];
}

export default TrainingList;
