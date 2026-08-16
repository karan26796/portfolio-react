import React from 'react';
import { MapPin, ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import HorizontalCarouselSection from './HorizontalCarouselSection';
import ImageWithSkeleton from './ImageWithSkeleton';
import '../styles/TalksAndWorkshops.scss';

interface WorkshopItem {
  id: string;
  image: string;
  title: string;
  location: string;
  isVideo?: boolean;
}

const workshopItems: WorkshopItem[] = [
  { id: 'training-10', image: '/figma-training/training10.webp', title: 'Vibe coding talk', location: 'T-Hub, Hyderabad' },
  { id: 'iim-sbp', image: '/figma-training/IIM%20SBP.mp4', title: '300+ students in attendance', location: 'IIM Sambalpur', isVideo: true },
  { id: 'training-8', image: '/figma-training/training8.webp', title: 'Figma Workshop for PMs', location: 'IIM Sambalpur' },
  { id: 'flame', image: '/figma-training/Flame.mp4', title: 'Figma for students', location: 'FLAME University', isVideo: true },
  { id: 'training-9', image: '/figma-training/training9.webp', title: "Hosting the Figma Config '24 event", location: 'IIT Delhi' },
  { id: 'training-11', image: '/figma-training/training11.webp', title: "Hosting the Figma Config '25 event", location: 'Microsoft, Noida' },
  { id: 'training-12', image: '/figma-training/training12.webp', title: 'Boosting design workflows', location: 'Keka' },
  { id: 'training-13', image: '/figma-training/training13.webp', title: 'Figma training for PMs', location: 'IIM Shillong' },
];

const TalksAndWorkshops: React.FC = () => {
  return (
    <div className="talks-workshops-section">
      <HorizontalCarouselSection
        title="Talks & Workshops"
      // subtitle="I've taught Figma and design workflows to 10,000+ designers, PMs, and students across India and the US."
      >
        {workshopItems.map((item) => (
          <Link to="/figma-training" key={item.id} className="common-gallery-card">
            <div className="card-media">
              {item.isVideo ? (
                <video src={item.image} autoPlay loop muted playsInline />
              ) : (
                <ImageWithSkeleton src={item.image} alt={item.title} loading="lazy" />
              )}
            </div>
            <div className="card-body">
              <h4 className="card-title">{item.title}</h4>
              <div className="card-meta">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25em' }}>
                  <MapPin size={18} weight="regular" />
                  {item.location}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </HorizontalCarouselSection>
      {/* <div className="talks-workshops-footer">
        <Link to="/figma-training" className="view-all-workshops-btn">
          Explore all Figma Training & Workshops <ArrowRight size={18} weight="bold" />
        </Link>
      </div> */}
    </div>
  );
};

export default TalksAndWorkshops;
