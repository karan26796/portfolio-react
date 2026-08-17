import React, { useEffect, useRef, useState } from 'react';
import { User } from '@phosphor-icons/react';
import communityFiles from '../utils/communityFiles';
import Button from './Buttons';
import ImageWithSkeleton from './ImageWithSkeleton';
import ScrollReveal from './ScrollReveal';
import '../styles/HorizontalCarousel.scss';
import '../styles/CommunityDeck.scss';

const SWIPE_INTERVAL = 4200;
const SWIPE_DURATION = 550;

const CommunityDeck: React.FC = () => {
  const [order, setOrder] = useState(() => communityFiles.map((_, i) => i));
  const [leavingDir, setLeavingDir] = useState<'left' | 'right' | null>(null);
  const nextDirRef = useRef<'left' | 'right'>('left');
  const intervalRef = useRef<number>();
  const timeoutRef = useRef<number>();

  const swipeNext = () => {
    const dir = nextDirRef.current;
    nextDirRef.current = dir === 'left' ? 'right' : 'left';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOrder((o) => [...o.slice(1), o[0]]);
      return;
    }

    setLeavingDir(dir);
    timeoutRef.current = window.setTimeout(() => {
      setOrder((o) => [...o.slice(1), o[0]]);
      setLeavingDir(null);
    }, SWIPE_DURATION);
  };

  const start = () => {
    intervalRef.current = window.setInterval(swipeNext, SWIPE_INTERVAL);
  };
  const stop = () => window.clearInterval(intervalRef.current);

  useEffect(() => {
    start();
    return () => {
      stop();
      window.clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="community-deck-section horizontal-carousel-section">
      <ScrollReveal>
        <div className="carousel-section-header">
          <div className="header-text">
            <h2>Figma community</h2>
          </div>
        </div>
      </ScrollReveal>

      <div
        className="community-deck"
        onMouseEnter={stop}
        onMouseLeave={start}
      >
        {order.map((fileIndex, stackPos) => {
          const file = communityFiles[fileIndex];
          const isLeaving = stackPos === 0 && leavingDir;
          const className = [
            'deck-card',
            `stack-${Math.min(stackPos, 2)}`,
            isLeaving ? `leaving-${leavingDir}` : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <a
              key={fileIndex}
              className={className}
              href={file.link}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={stackPos === 0 ? 0 : -1}
              aria-hidden={stackPos !== 0}
            >
              <div className="deck-card-media">
                <ImageWithSkeleton src={file.url} alt={file.name} />
              </div>
              <div className="deck-card-content">
                <h6>{file.name}</h6>
                <h5>
                  <User size={18} weight="duotone" />
                  {file.downloads}
                </h5>
                <Button
                  className="submit-button"
                  text="Download Figma file"
                  withIcon
                  iconDirection="left"
                  iconName="FigmaLogo"
                  variant="secondary"
                  type="submit"
                  weight="duotone"
                  size="s"
                />
              </div>
            </a>
          );
        })}
      </div>

      <div className="deck-dots" aria-hidden="true">
        {communityFiles.map((_, i) => (
          <span key={i} className={i === order[0] ? 'active' : ''} />
        ))}
      </div>
    </div>
  );
};

export default CommunityDeck;
