import React, { useMemo } from "react";
import '../styles/TrainingList.scss';
import Button from '../components/Buttons';
import Testimonials from '../components/Testimonials';
import Tag, { VibrantColor } from "../components/Tag";
import LogoCarousel from "../components/LogoCarousel";
import FigmaTrainingCarousel from "../components/FigmaTrainingCarousel";
import CompanyForm from '../components/CompanyForm';
import CalendlyWidget from '../components/CalendlyWidget';
import { trainingTestimonialsData, tagTexts, vibrantColors } from '../utils/trainingData';

const TrainingList: React.FC = () => {
  const tagProperties = useMemo(() => {
    return tagTexts.map(() => ({
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
      <IndividualTrainingSection tagProperties={tagProperties} />
      <CompanyTrainingSection tagProperties={tagProperties} />
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
      />
    </div>
  </div>
);

const TestimonialsSection: React.FC = () => (
  <Testimonials
    data={trainingTestimonialsData}
    title="What people have said about the training"
  />
);

interface TrainingSectionProps {
  tagProperties: { color: VibrantColor; rotation: number; }[];
}

const IndividualTrainingSection: React.FC<TrainingSectionProps> = ({ tagProperties }) => (
  <div className='training'>
    <h2>For Individuals</h2>
    <p>Inaugural Offer: ₹1000 flat for one hour</p>
    <TagsSection tagProperties={tagProperties} />
    <CalendlyWidget />
  </div>
);

const CompanyTrainingSection: React.FC<TrainingSectionProps> = ({ tagProperties }) => (
  <div className='training'>
    <h2>For Companies</h2>
    <TagsSection tagProperties={tagProperties} />
    <CompanyForm />
  </div>
);

const TagsSection: React.FC<TrainingSectionProps> = ({ tagProperties }) => (
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