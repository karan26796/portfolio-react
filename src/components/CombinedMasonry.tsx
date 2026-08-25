import React, { useEffect, useMemo, useState } from 'react';
import { MapPin, DownloadSimple, FilmSlate, ArrowSquareOut } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import experiments from '../utils/experiments';
import communityFiles from '../utils/communityFiles';
import ImageWithSkeleton from './ImageWithSkeleton';
import ScrollReveal, { scrollRevealStagger } from './ScrollReveal';
import '../styles/HorizontalCarousel.scss';
import '../styles/CombinedMasonry.scss';

interface WorkshopItem {
  id: string;
  image: string;
  title: string;
  location: string;
  isVideo?: boolean;
}

const talks: WorkshopItem[] = [
  { id: 'training-10', image: '/figma-training/training10.webp', title: 'Vibe coding talk', location: 'UX India \'24 at T-Hub, Hyderabad' },
  { id: 'training-9', image: '/figma-training/training9.webp', title: "Hosting the Figma Config '24 event", location: "Config '24 at IIT Delhi" },
  { id: 'training-11', image: '/figma-training/training11.webp', title: "Hosting the Figma Config '25 event", location: "Hosted Config '25 at Microsoft, Noida" },
  { id: 'training-14', image: '/figma-training/training14.webp', title: "Hosting the Figma Config '25 event", location: "Speaking at FoF Hyd event" },
  { id: 'training-15', image: '/figma-training/training15.webp', title: "Hosting the Figma Config '25 event", location: "Organizing RnD meetup in Mumbai" },
];

// Edit this list to control what shows and in what order — top to bottom here
// reads left-to-right, top-to-bottom in the masonry below.
const CARD_ORDER = [
  { type: 'talk' as const, data: talks[0] },
  { type: 'talk' as const, data: talks[2] },
  { type: 'talk' as const, data: talks[3] },
  { type: 'experiment' as const, data: experiments[0] },
  { type: 'talk' as const, data: talks[4] },
  { type: 'experiment' as const, data: experiments[3] },
  { type: 'experiment' as const, data: experiments[1] },
  { type: 'experiment' as const, data: experiments[2] },
  { type: 'experiment' as const, data: experiments[4] },
];

interface PhotoCardProps {
  href?: string;
  to?: string;
  rotate: number;
  children: React.ReactNode;
  media: React.ReactNode;
  external?: boolean;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ to, href, rotate, media, children, external }) => {
  const style = { '--rotate': `${rotate}deg` } as React.CSSProperties;
  const inner = (
    <>
      <div className="photo-media">{media}</div>
      {/* <div className="photo-caption">
        <span className="photo-caption-text">{children}</span>
        {external && (
          <ArrowSquareOut size={16} weight="bold" className="photo-external-icon" aria-hidden="true" />
        )}
      </div> */}
    </>
  );

  if (to) {
    return (
      <Link to={to} className="masonry-photo-card" style={style}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a className="masonry-photo-card" style={style} href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <article className="masonry-photo-card" style={style}>
      {inner}
    </article>
  );
};

const renderEntry = (entry: (typeof CARD_ORDER)[number], rotate: number) => {
  if (entry.type === 'talk') {
    return (
      <PhotoCard
        rotate={rotate}
        media={
          entry.data.isVideo ? (
            <video src={entry.data.image} autoPlay loop muted playsInline />
          ) : (
            <ImageWithSkeleton src={entry.data.image} alt={entry.data.title} loading="lazy" />
          )
        }
      >
        <MapPin size={18} />
        {entry.data.location}
      </PhotoCard>
    );
  }
  return (
    <PhotoCard
      rotate={rotate}
      media={
        entry.data.type === 'video' ? (
          <video src={entry.data.src} autoPlay loop muted playsInline />
        ) : (
          <ImageWithSkeleton src={entry.data.src} alt={entry.data.caption ?? 'Experiment'} loading="lazy" />
        )
      }
    >
      <FilmSlate size={18} />
      {entry.data.caption}
    </PhotoCard>
  );
};

const CombinedMasonry: React.FC<{ title?: string; communityTitle?: string }> = ({
  title = 'Design and community interactions',
  communityTitle = 'Figma community files',
}) => {
  // A small alternating tilt per item, like the travel gallery's polaroid photos.
  const rotations = useMemo(
    () => CARD_ORDER.map((_, i) => (i % 2 === 0 ? -1 : 1) * Math.random()),
    []
  );

  const communityRotations = useMemo(
    () => [-0.8, 0.8, -0.6],
    []
  );

  const cardBlocks = useMemo(() => {
    const blocks: {
      featured?: { entry: (typeof CARD_ORDER)[number]; index: number };
      stacked: { entry: (typeof CARD_ORDER)[number]; index: number }[];
    }[] = [];
    for (let i = 0; i < CARD_ORDER.length; i += 3) {
      const featured = { entry: CARD_ORDER[i], index: i };
      const stacked: { entry: (typeof CARD_ORDER)[number]; index: number }[] = [];
      if (i + 1 < CARD_ORDER.length) stacked.push({ entry: CARD_ORDER[i + 1], index: i + 1 });
      if (i + 2 < CARD_ORDER.length) stacked.push({ entry: CARD_ORDER[i + 2], index: i + 2 });
      blocks.push({ featured, stacked });
    }
    return blocks;
  }, []);

  return (
    <>
      <div className="combined-masonry-section horizontal-carousel-section">
        <ScrollReveal>
          <div className="carousel-section-header">
            <div className="header-text">
              <h2>{title}</h2>
            </div>
          </div>
        </ScrollReveal>

        <div className="asymmetric-grid-container">
          {cardBlocks.map((block, blockIndex) => {
            const isReversed = blockIndex % 2 === 1;
            return (
              <div
                className={`asymmetric-grid-block ${isReversed ? 'reverse-layout' : ''}`}
                key={`block-${blockIndex}`}
              >
                {block.featured && (
                  <div className="grid-featured-column">
                    <ScrollReveal delay={scrollRevealStagger(block.featured.index, 70)}>
                      {renderEntry(block.featured.entry, rotations[block.featured.index])}
                    </ScrollReveal>
                  </div>
                )}

                <div className="grid-stacked-column">
                  {block.stacked.map(({ entry, index }) => (
                    <ScrollReveal key={`${entry.type}-${index}`} delay={scrollRevealStagger(index, 70)}>
                      {renderEntry(entry, rotations[index])}
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="combined-masonry-section horizontal-carousel-section community-section">
        <ScrollReveal>
          <div className="carousel-section-header">
            <div className="header-text">
              <h2>{communityTitle}</h2>
            </div>
          </div>
        </ScrollReveal>

        <div className="asymmetric-grid-block">
          {communityFiles[0] && (
            <div className="grid-featured-column">
              <ScrollReveal delay={scrollRevealStagger(0, 70)}>
                <PhotoCard
                  href={communityFiles[0].link}
                  external
                  rotate={communityRotations[0]}
                  media={<ImageWithSkeleton src={communityFiles[0].url} alt={communityFiles[0].name} loading="lazy" />}
                >
                  <DownloadSimple size={18} weight="duotone" />
                  {communityFiles[0].downloads}
                </PhotoCard>
              </ScrollReveal>
            </div>
          )}

          <div className="grid-stacked-column">
            {communityFiles.slice(1).map((item, i) => {
              const index = i + 1;
              return (
                <ScrollReveal key={`comm-${index}`} delay={scrollRevealStagger(index, 70)}>
                  <PhotoCard
                    href={item.link}
                    external
                    rotate={communityRotations[index]}
                    media={<ImageWithSkeleton src={item.url} alt={item.name} loading="lazy" />}
                  >
                    <DownloadSimple size={18} weight="duotone" />
                    {item.downloads}
                  </PhotoCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CombinedMasonry;
