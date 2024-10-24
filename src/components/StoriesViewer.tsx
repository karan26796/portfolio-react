import React, { useState, useEffect, useRef, TouchEvent } from 'react';

interface Story {
  id: number;
  imageUrl: string;
  username?: string;
  timestamp?: string;
}

interface StoriesViewerProps {
  stories: Story[];
  onClose?: () => void;
  storyDuration?: number;
}

const StoriesViewer: React.FC<StoriesViewerProps> = ({
  stories,
  onClose,
  storyDuration = 3000, // 3 seconds default
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState<number[]>(new Array(stories.length).fill(0));
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number>(0);
  const touchStartTime = useRef<number>(0);

  const PROGRESS_UPDATE_INTERVAL = 30;
  const SWIPE_THRESHOLD = 50;

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    startProgress();
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [activeIndex, isPaused]);

  const startProgress = () => {
    let elapsed = 0;
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    if (!isPaused) {
      progressInterval.current = setInterval(() => {
        elapsed += PROGRESS_UPDATE_INTERVAL;
        
        setProgress(prev => {
          const newProgress = [...prev];
          newProgress[activeIndex] = (elapsed / storyDuration) * 100;
          return newProgress;
        });

        if (elapsed >= storyDuration) {
          if (activeIndex < stories.length - 1) {
            setActiveIndex(prev => prev + 1);
            setProgress(prev => {
              const newProgress = [...prev];
              newProgress[activeIndex] = 100;
              return newProgress;
            });
          } else {
            if (progressInterval.current) {
              clearInterval(progressInterval.current);
            }
            onClose?.();
          }
        }
      }, PROGRESS_UPDATE_INTERVAL);
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartTime.current = Date.now();
    setIsPaused(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault(); // Prevent scroll while swiping
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndTime = Date.now();
    const touchDuration = touchEndTime - touchStartTime.current;
    const swipeDistance = touchEndX - touchStartX.current;
    
    if (touchDuration < 250) {
      if (swipeDistance > SWIPE_THRESHOLD && activeIndex > 0) {
        setActiveIndex(prev => prev - 1);
      } else if (swipeDistance < -SWIPE_THRESHOLD && activeIndex < stories.length - 1) {
        setActiveIndex(prev => prev + 1);
      }
    }
    
    setIsPaused(false);
  };

  const handleNavigation = (e: React.MouseEvent | TouchEvent) => {
    if (!isMobile) return; // Only handle navigation on mobile

    const target = e.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const relativeX = x - rect.left;
    
    if (relativeX < rect.width * 0.3 && activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    } else if (relativeX > rect.width * 0.7 && activeIndex < stories.length - 1) {
      setActiveIndex(prev => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="h-full max-w-md mx-auto relative">
        {/* Progress bars container */}
        <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-2 bg-gradient-to-b from-black/50 to-transparent">
          {stories.map((_, index) => (
            <div 
              key={index} 
              className="h-1 flex-1 bg-gray-600/50 rounded-full overflow-hidden"
            >
              <div 
                className={`h-full bg-white transition-all duration-200 ease-linear ${
                  index < activeIndex ? 'w-full' : 
                  index === activeIndex ? '' : 'w-0'
                }`}
                style={{
                  width: index === activeIndex ? `${progress[index]}%` : 
                         index < activeIndex ? '100%' : '0%'
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-4 left-0 right-0 z-10 px-4 mt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-300" />
              <div>
                <p className="text-white text-sm font-semibold">
                  {stories[activeIndex].username || 'Username'}
                </p>
                <p className="text-white/70 text-xs">
                  {stories[activeIndex].timestamp || '1h ago'}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-white p-2 hover:bg-white/10 rounded-full"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Story Content */}
        <div 
          className="h-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleNavigation}
        >
          <img
            src={stories[activeIndex].imageUrl}
            alt={`Story ${activeIndex + 1}`}
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default StoriesViewer;