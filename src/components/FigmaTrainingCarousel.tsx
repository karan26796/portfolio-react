import React from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { MapPin } from '@phosphor-icons/react';
import ScrollReveal, { scrollRevealStagger } from './ScrollReveal';
import '../styles/FigmaTrainingCarousel.scss';

interface TrainingItem {
  id: string;
  image: string;
  title: string;
  location: string;
  isVideo?: boolean;
}

const trainingItems: TrainingItem[] = [
  { id: 'iim-sbp', image: '/figma-training/IIM%20SBP.mp4', title: 'Figma Workshop for PMs', location: 'IIM Sambalpur', isVideo: true },
  { id: 'training-8', image: '/figma-training/training8.webp', title: '300+ students in attendance', location: 'IIM Sambalpur' },
  { id: 'flame', image: '/figma-training/Flame.mp4', title: 'Figma for students', location: 'FLAME University', isVideo: true },
  { id: 'training-10', image: '/figma-training/training10.webp', title: 'Design to development with AI', location: 'T-Hub, Hyderabad' },
  { id: 'training-9', image: '/figma-training/training9.webp', title: "Hosting the Figma Config '24 event", location: 'IIT Delhi' },
  { id: 'training-11', image: '/figma-training/training11.webp', title: "Hosting the Figma Config '25 event", location: 'Microsoft, Noida' },
  { id: 'training-2', image: '/figma-training/training2.webp', title: 'Figma training for students', location: 'Indiana University, US' },
  { id: 'training-12', image: '/figma-training/training12.webp', title: 'Boosting design workflows', location: 'Keka' },
  { id: 'training-13', image: '/figma-training/training13.webp', title: 'Figma training for PMs', location: 'IIM Shillong' },
];

const FigmaTrainingMasonry: React.FC = () => (
  <section className="figma-training-masonry">
    <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 640: 2, 1024: 2 }}>
      <Masonry gutter="1em">
        {trainingItems.map((item, index) => (
          <ScrollReveal key={item.id} delay={scrollRevealStagger(index, 70)}>
            <article className="masonry-item">
            {item.isVideo ? (
              <video src={item.image} autoPlay loop muted playsInline />
            ) : (
              <img src={item.image} alt={item.title} loading="lazy" />
            )}
            <div className="masonry-item-text">
              <h4>{item.title}</h4>
              <h5>
                <MapPin size={20} weight="regular" />
                {item.location}
              </h5>
            </div>
            </article>
          </ScrollReveal>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  </section>
);

export default FigmaTrainingMasonry;
