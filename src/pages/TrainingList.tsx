import React, { useMemo } from "react";
import '../styles/TrainingList.scss';
import Button from '../components/Buttons';
import Testimonials from '../components/Testimonials';
import Tag, { VibrantColor } from "../components/Tag";
import LogoCarousel from "../components/LogoCarousel";
import FigmaTrainingCarousel from "../components/FigmaTrainingCarousel";
import CompanyForm from '../components/CompanyForm';
import CalendlyWidget from '../components/CalendlyWidget';
import { trainingTestimonialsData, tagTextIndividual, tagTextCompany, vibrantColors } from '../utils/trainingData';

const TrainingList: React.FC = () => {
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

  return (
    <div className='training-parent'>
      <IntroSection />
      <LogoCarousel />
      <FigmaTrainingCarousel />
      <TestimonialsSection />
      <IndividualTrainingSection tagProperties={individualTagProperties} />
      <CompanyTrainingSection tagProperties={companyTagProperties} />
    </div>
  );
};

const IntroSection: React.FC = () => (
  <div className='intro'>
    <h1>Figma Training</h1>
    <h3>In the past 5 years, I've trained and taught Figma to more than 10k people across organizations in India and the US.</h3>
    <div className="button-group">
      <Button
        text="Book 1:1 Session"
        withIcon={true}
        iconName="User"
        iconDirection="left"
        withText={true}
        size="m"
        variant="secondary"
        weight="regular"
        type="submit"
        onClick={() => {
          const individual = document.getElementById("individual");
          if (individual) {
            individual.scrollIntoView({ behavior: "smooth" });
          }
        }}
      />
      <Button
        text="Book Corporate/Institute Training"
        withIcon={true}
        iconName="UsersThree"
        iconDirection="left"
        withText={true}
        size="m"
        variant="primary"
        weight="regular"
        type="submit"
        onClick={() => {
          const company = document.getElementById("company");
          if (company) {
            company.scrollIntoView({ behavior: "smooth" });
          }
        }}
      />
    </div>
  </div>
);

const TestimonialsSection: React.FC = () => (
  <div style={{marginTop:"4em"}}>
  <Testimonials
    data={trainingTestimonialsData}
    title="What people have said about the training"
  />
  </div>
);

interface TrainingSectionProps {
  tagProperties: { color: VibrantColor; rotation: number; }[];
}

const IndividualTrainingSection: React.FC<TrainingSectionProps> = ({ tagProperties }) => (
  <div id="individual" className='training'>
    <h1>For Individuals</h1>
    <h3>Inaugural Offer: ₹1000 flat for one hour</h3>
    <TagsSection tagProperties={tagProperties} tagTexts={tagTextIndividual} />
    <CalendlyWidget />
  </div>
);

const CompanyTrainingSection: React.FC<TrainingSectionProps> = ({ tagProperties }) => (
  <div id="company" className='training'>
    <h1>For Companies & Institutes</h1>
    <TagsSection tagProperties={tagProperties} tagTexts={tagTextCompany} />
    <CompanyForm />
  </div>
);

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