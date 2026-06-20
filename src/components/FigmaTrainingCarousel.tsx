import React from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { MapPin } from '@phosphor-icons/react';
import '../styles/FigmaTrainingCarousel.scss';

interface TrainingItem {
  id: string;
  image: string;
  title: string;
  location: string;
  isVideo?: boolean;
}

const trainingItems: TrainingItem[] = [
  { id: 'flame', image: '/figma-training/Flame.mp4', title: 'Training', location: 'FLAME University', isVideo: true },
  { id: 'training-2', image: '/figma-training/training2.webp', title: 'Figma training', location: 'Indiana University, US' },
  { id: 'training-8', image: '/figma-training/training8.webp', title: 'Figma for PMs', location: 'IIM Sambalpur' },
  { id: 'training-9', image: '/figma-training/training9.webp', title: "Figma Config '24", location: 'IIT Delhi' },
  { id: 'training-10', image: '/figma-training/training10.webp', title: 'Design to code', location: 'T-Hub, Hyderabad' },
  { id: 'training-11', image: '/figma-training/training11.webp', title: "Figma Config '25", location: 'Microsoft, Noida' },
  { id: 'iim-sbp', image: '/figma-training/IIM%20SBP.mp4', title: 'Workshop', location: 'IIM Sambalpur', isVideo: true },
  { id: 'training-12', image: '/figma-training/training12.webp', title: 'Workshop', location: 'Keka' },
  { id: 'training-13', image: '/figma-training/training13.webp', title: 'Workshop for PMs', location: 'IIM Shillong' },
];

const FigmaTrainingMasonry: React.FC = () => (
  <section className="figma-training-masonry">
    <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 640: 2, 1024: 2 }}>
      <Masonry gutter="1em">
        {trainingItems.map((item) => (
          <article key={item.id} className="masonry-item">
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
        ))}
      </Masonry>
    </ResponsiveMasonry>
  </section>
);

export default FigmaTrainingMasonry;
