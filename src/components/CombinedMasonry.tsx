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
  { id: 'training-10', image: '/figma-training/training10.webp', title: 'Vibe coding talk', location: 'T-Hub, Hyderabad' },
  { id: 'training-9', image: '/figma-training/training9.webp', title: "Hosting the Figma Config '24 event", location: "Config '24 at IIT Delhi" },
  { id: 'training-11', image: '/figma-training/training11.webp', title: "Hosting the Figma Config '25 event", location: "Hosted Config '25 at Microsoft, Noida" },
  { id: 'training-14', image: '/figma-training/training14.webp', title: "Hosting the Figma Config '25 event", location: "Speaking at FoF Hyd event" },
  { id: 'training-15', image: '/figma-training/training15.webp', title: "Hosting the Figma Config '25 event", location: "Organizing RnD meetup in Mumbai" },
];

// Edit this list to control what shows and in what order — top to bottom here
// reads left-to-right, top-to-bottom in the masonry below.
const CARD_ORDER = [
  { type: 'experiment' as const, data: experiments[0] },
  { type: 'talk' as const, data: talks[0] },
  { type: 'experiment' as const, data: experiments[1] },
  { type: 'talk' as const, data: talks[2] },
  { type: 'experiment' as const, data: experiments[3] },
  { type: 'talk' as const, data: talks[3] },
  { type: 'experiment' as const, data: experiments[2] },
  { type: 'talk' as const, data: talks[4] },
  // { type: 'experiment' as const, data: experiments[4] },
  // { type: 'talk' as const, data: talks[1] },
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
      <div className="photo-caption">
        <span className="photo-caption-text">{children}</span>
        {external && (
          <ArrowSquareOut size={16} weight="bold" className="photo-external-icon" aria-hidden="true" />
        )}
      </div>
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
  title = 'After hours',
  communityTitle = 'Figma community files',
}) => {
  // 1 column on mobile, 2 above — matches the breakpoint Gallery.tsx uses.
  const [columnCount, setColumnCount] = useState(2);

  useEffect(() => {
    const updateColumns = () => setColumnCount(window.innerWidth < 700 ? 1 : 2);
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // A small alternating tilt per item, like the travel gallery's polaroid photos.
  const rotations = useMemo(
    () => CARD_ORDER.map((_, i) => (i % 2 === 0 ? -1 : 1) * Math.random()),
    []
  );

  const communityRotations = useMemo(
    () => communityFiles.map((_, i) => (i % 2 === 0 ? -1 : 1) * (0.5 + Math.random() * 0.5)),
    []
  );

  const columns = useMemo(() => {
    const cols: { entry: (typeof CARD_ORDER)[number]; index: number }[][] = Array.from(
      { length: columnCount },
      () => []
    );
    CARD_ORDER.forEach((entry, index) => {
      cols[index % columnCount].push({ entry, index });
    });
    return cols;
  }, [columnCount]);

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

        <div className="masonry-columns">
          {columns.map((col, colIndex) => (
            <div className="masonry-column" key={colIndex}>
              {col.map(({ entry, index }) => (
                <ScrollReveal key={`${entry.type}-${index}`} delay={scrollRevealStagger(index, 70)}>
                  {renderEntry(entry, rotations[index])}
                </ScrollReveal>
              ))}
            </div>
          ))}
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

        <div className="community-files-grid">
          {communityFiles[0] && (
            <div className="community-featured-column">
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

          <div className="community-stacked-column">
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
