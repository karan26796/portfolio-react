import React, { useEffect, useState, useCallback } from "react";
import { imagesByProject } from "../utils/assorted";
import '../styles/VerticalCarouselWall.scss';

type ProjectKey = 'banner' | 'aiguire' | 'frontrow' | 'pause' | 'qohoo' | 'skylark' | 'vdoAi' | 'vector';

interface HorizontalCarouselWallProps {
  projects: ProjectKey[];
  direction?: 'left' | 'right';
  speed?: number;
}

const HorizontalCarouselWall: React.FC<HorizontalCarouselWallProps> = ({
  projects,
  direction = 'left',
  speed = 0.9
}) => {
  const normalSpeed = speed;
  const slowSpeed = speed * 0.2;

  const getProjectImages = (projectKeys: ProjectKey[]): string[] => {
    const images = projectKeys.flatMap(project => 
      Object.values(imagesByProject[project])
    );
    // Duplicate images for seamless scrolling
    return [...images, ...images];
  };

  const [images] = useState(() => getProjectImages(projects));
  const [position, setPosition] = useState(direction === 'left' ? 0 : -100);
  const [isHovered, setIsHovered] = useState(false);

  const animate = useCallback(() => {
    setPosition((prev) => {
      const directionMultiplier = direction === 'left' ? -1 : 1;
      const currentSpeed = isHovered ? slowSpeed : normalSpeed;
      let newPos = prev + currentSpeed * directionMultiplier;
      
      // Reset position when reaching boundaries
      const threshold = 100;
      if (directionMultiplier === -1 && newPos <= -threshold) {
        newPos = 0;
      } else if (directionMultiplier === 1 && newPos >= 0) {
        newPos = -threshold;
      }
      
      return newPos;
    });
  }, [direction, isHovered, slowSpeed, normalSpeed]);

  useEffect(() => {
    const intervalId = setInterval(animate, 16);
    return () => clearInterval(intervalId);
  }, [animate]);

  return (
    <div 
      className="carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="carousel-rows">
        <div className="carousel-row">
          <div
            className="row-content"
            style={{
              transform: `translateX(${position}%)`,
            }}
          >
            {images.map((imgSrc, index) => (
              <div
                key={`original-${index}`}
                className="image-wrapper"
                style={{
                  transform: `translateY(${index % 2 === 0 ? '0px' : '0px'})`,
                }}
              >
                <img src={imgSrc} alt={`Carousel image ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="gradient gradient--left" />
      <div className="gradient gradient--right" />
    </div>
  );
};

export default HorizontalCarouselWall;