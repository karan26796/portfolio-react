import React, { useMemo, useRef } from "react";
import '../styles/FigmaTraining.scss';
import Button from '../components/Buttons';
import Testimonials from '../components/Testimonials';
import Tag, { VibrantColor } from "../components/Tag";
import LogoCarousel from "../components/LogoCarousel";
import FigmaTrainingCarousel from "../components/FigmaTrainingCarousel";
import CompanyForm from '../components/CompanyForm';
import CalendlyWidget from '../components/CalendlyWidget';
import { trainingTestimonialsData, tagTextIndividual, tagTextCompany, vibrantColors } from '../utils/trainingData';

import iima from "../utils/logos/iima.webp";
import iimsbp from "../utils/logos/iim-sbp.webp";
import iitm from "../utils/logos/IIT-M.webp";
import zuddl from "../utils/logos/zuddl.webp";
import { BuildingOffice, ChalkboardTeacher, Student } from "@phosphor-icons/react";
import { Logo } from "../utils/logos";

const TrainingList: React.FC = () => {

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
      {/* Pass refs to the Individual and Company training sections */}
      <IndividualTrainingSection ref={individualRef} tagProperties={individualTagProperties} />
      <CompanyTrainingSection ref={companyRef} tagProperties={companyTagProperties} />
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
  ]

  return (
    <div className='intro'>
      <h1 style={{maxWidth:"30ch"}}>Figma Training for Design Students, Professionals, and Product Managers</h1>
      <p>In the last 5 years, I've taught Figma to over 10,000 people - from beginners to pros. My workshops have helped startups and educational institutes boost the design skills of their employees and students efficiently.
      </p>

      <LogoCarousel logos={logos} />


      <div className="data">
        <div className="data-points">
          <h2><ChalkboardTeacher size={32} weight="duotone" />100+</h2>
          <p>Online + Offline Workshops</p>
        </div>
        <div className="data-points">
          <h2><BuildingOffice size={32} weight="duotone" />10+</h2>
          <p>Corporate training</p>
        </div>
        <div className="data-points">
          <h2><Student size={32} weight="duotone" />5+</h2>
          <p>Educational workshops</p>
        </div>
      </div>


      <div className="button-group">

        <a href="#individual">
          <Button
            text="Book 1:1 Session"
            withIcon={true}
            iconName="User"
            iconDirection="left"
            withText={true}
            size="m"
            variant="secondary"
            weight="regular"
            type="button"
          />
        </a>

        <a href="#company">
          <Button
            text="Book Corporate/Institute Training"
            withIcon={true}
            iconName="UsersThree"
            iconDirection="left"
            withText={true}
            size="m"
            variant="primary"
            weight="regular"
            type="button"
          />
        </a>
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

interface TrainingSectionProps {
  tagProperties: { color: VibrantColor; rotation: number; }[];
}

// Individual training section
const IndividualTrainingSection = React.forwardRef<HTMLDivElement, TrainingSectionProps>(
  ({ tagProperties }, ref) => (
    <div id="individual" className='training' ref={ref}>
      <h1>Book 1:1 session </h1><h4 style={{ margin: "0" }}>Inaugural Offer: ₹1000 for one session</h4>
      <p>You'll receive an email post blocking a time slot to pay</p>
      {/* Keep the TagsSection intact */}
      <TagsSection tagProperties={tagProperties} tagTexts={tagTextIndividual} />
      <CalendlyWidget />
    </div>
  )
);

// Company training section
const CompanyTrainingSection = React.forwardRef<HTMLDivElement, TrainingSectionProps>(
  ({ tagProperties }, ref) => (
    <div id="company" className='training' ref={ref}>
      <h1>For Companies & Institutes</h1>
      {/* Keep the TagsSection intact */}
      <TagsSection tagProperties={tagProperties} tagTexts={tagTextCompany} />
      <CompanyForm />
    </div>
  )
);

// Tags section used in both individual and company sections
interface TagsSectionProps extends TrainingSectionProps {
  tagTexts: string[];
}

const TagsSection: React.FC<TagsSectionProps> = ({ tagProperties, tagTexts }) => (
  <div className='tags-topics'>
    {tagTexts.map((text, index) => (
      <Tag
        key={index}
        text={text}
        color={tagProperties[index].color}
        rotation={tagProperties[index].rotation}
        dot={false}
      />
    ))}
  </div>
);

export default TrainingList;
