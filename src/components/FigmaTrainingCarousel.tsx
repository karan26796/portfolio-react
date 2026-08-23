import React, { useEffect, useMemo, useState } from 'react';
import { MapPin } from '@phosphor-icons/react';
import ImageWithSkeleton from './ImageWithSkeleton';
import ScrollReveal, { scrollRevealStagger } from './ScrollReveal';
import '../styles/CombinedMasonry.scss';

interface TrainingItem {
  id: string;
  image: string;
  title: string;
  location: string;
  isVideo?: boolean;
}

const trainingItems: TrainingItem[] = [
  { id: 'iim-sbp', image: '/figma-training/IIM%20SBP.mp4', title: '300+ students in attendance', location: 'IIM Sambalpur', isVideo: true },
  { id: 'training-8', image: '/figma-training/training8.webp', title: 'Figma Workshop for PMs', location: 'IIM Sambalpur' },
  { id: 'flame', image: '/figma-training/Flame.mp4', title: 'Figma for students', location: 'FLAME University', isVideo: true },
  { id: 'training-10', image: '/figma-training/training10.webp', title: 'Design to development with AI', location: 'T-Hub, Hyderabad' },
  { id: 'training-9', image: '/figma-training/training9.webp', title: "Hosting the Figma Config '24 event", location: 'IIT Delhi' },
  { id: 'training-11', image: '/figma-training/training11.webp', title: "Hosting the Figma Config '25 event", location: 'Microsoft, Noida' },
  { id: 'training-2', image: '/figma-training/training2.webp', title: 'Figma training for students', location: 'Indiana University, US' },
  { id: 'training-12', image: '/figma-training/training12.webp', title: 'Boosting design workflows', location: 'Keka' },
  { id: 'training-13', image: '/figma-training/training13.webp', title: 'Figma training for PMs', location: 'IIM Shillong' },
];

const FigmaTrainingMasonry: React.FC = () => {
  const [columnCount, setColumnCount] = useState(2);

  useEffect(() => {
    const updateColumns = () => setColumnCount(window.innerWidth < 700 ? 1 : 2);
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const rotations = useMemo(
    () => trainingItems.map((_, i) => (i % 2 === 0 ? -1 : 1) * Math.random()),
    []
  );

  const itemBlocks = useMemo(() => {
    const blocks: {
      featured?: { item: TrainingItem; index: number };
      stacked: { item: TrainingItem; index: number }[];
    }[] = [];
    for (let i = 0; i < trainingItems.length; i += 3) {
      const featured = { item: trainingItems[i], index: i };
      const stacked: { item: TrainingItem; index: number }[] = [];
      if (i + 1 < trainingItems.length) stacked.push({ item: trainingItems[i + 1], index: i + 1 });
      if (i + 2 < trainingItems.length) stacked.push({ item: trainingItems[i + 2], index: i + 2 });
      blocks.push({ featured, stacked });
    }
    return blocks;
  }, []);

  return (
    <div className="combined-masonry-section" style={{ padding: '2em 1em' }}>
      <div className="asymmetric-grid-container">
        {itemBlocks.map((block, blockIndex) => {
          const isReversed = blockIndex % 2 === 1;
          return (
            <div
              className={`asymmetric-grid-block ${isReversed ? 'reverse-layout' : ''}`}
              key={`block-${blockIndex}`}
            >
              {block.featured && (
                <div className="grid-featured-column">
                  <ScrollReveal delay={scrollRevealStagger(block.featured.index, 70)}>
                    <article
                      className="masonry-photo-card"
                      style={{ '--rotate': `${rotations[block.featured.index]}deg` } as React.CSSProperties}
                    >
                      <div className="photo-media">
                        {block.featured.item.isVideo ? (
                          <video src={block.featured.item.image} autoPlay loop muted playsInline />
                        ) : (
                          <ImageWithSkeleton src={block.featured.item.image} alt={block.featured.item.title} loading="lazy" />
                        )}
                      </div>
                      <div className="photo-caption">
                        <span className="photo-caption-text">
                          <MapPin size={18} />
                          {block.featured.item.location} • {block.featured.item.title}
                        </span>
                      </div>
                    </article>
                  </ScrollReveal>
                </div>
              )}

              <div className="grid-stacked-column">
                {block.stacked.map(({ item, index }) => (
                  <ScrollReveal key={item.id} delay={scrollRevealStagger(index, 70)}>
                    <article
                      className="masonry-photo-card"
                      style={{ '--rotate': `${rotations[index]}deg` } as React.CSSProperties}
                    >
                      <div className="photo-media">
                        {item.isVideo ? (
                          <video src={item.image} autoPlay loop muted playsInline />
                        ) : (
                          <ImageWithSkeleton src={item.image} alt={item.title} loading="lazy" />
                        )}
                      </div>
                      <div className="photo-caption">
                        <span className="photo-caption-text">
                          <MapPin size={18} />
                          {item.location} • {item.title}
                        </span>
                      </div>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FigmaTrainingMasonry;
