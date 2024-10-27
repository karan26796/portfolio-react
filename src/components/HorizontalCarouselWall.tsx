import React, { useEffect, useState, useCallback } from "react";
import { allImages } from "../utils/assorted";
import '../styles/VerticalCarouselWall.scss';

interface CarouselRow {
  images: string[];
  direction: "left" | "right";
  speed: number;
  initialPosition: number;
}

const HorizontalCarouselWall: React.FC = () => {
  const normalSpeed = 0.1;
  const slowSpeed = 0.02; // Slower speed for hover state
  
  const shuffleArray = (array: string[]): string[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const createEqualRows = (): CarouselRow[] => {
    const allImagesList = Object.values(allImages);
    const doubledImages = [...allImagesList, ...allImagesList];
    const shuffledImages = shuffleArray(doubledImages);
    const midpoint = Math.floor(shuffledImages.length / 2);
    
    return [
      {
        images: shuffledImages.slice(0, midpoint),
        direction: "left",
        speed: normalSpeed,
        initialPosition: 0
      },
      {
        images: shuffledImages.slice(midpoint),
        direction: "right",
        speed: normalSpeed,
        initialPosition: -100
      }
    ];
  };

  const [rows] = useState<CarouselRow[]>(createEqualRows);
  const [positions, setPositions] = useState<number[]>([0, -100]);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const animate = useCallback(() => {
    setPositions((prev) =>
      prev.map((pos, index) => {
        const direction = rows[index].direction === "left" ? -1 : 1;
        const currentSpeed = isHovered ? slowSpeed : normalSpeed;
        let newPos = pos + currentSpeed * direction;
        
        // Reset position when reaching boundaries
        const threshold = 100;
        if (direction === -1 && newPos <= -threshold) {
          newPos = 0;
        } else if (direction === 1 && newPos >= 0) {
          newPos = -threshold;
        }
        
        return newPos;
      })
    );
  }, [rows, isHovered]);

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
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="carousel-row">
            <div
              className="row-content"
              style={{
                transform: `translateX(${positions[rowIndex]}%)`,
              }}
            >
              {/* Original set */}
              {row.images.map((imgSrc, imgIndex) => (
                <div key={`original-${imgIndex}`} className="image-wrapper">
                  <img src={imgSrc} alt={`Carousel image ${imgIndex + 1}`} />
                </div>
              ))}
              {/* Duplicated set for seamless scrolling */}
              {row.images.map((imgSrc, imgIndex) => (
                <div key={`duplicate-${imgIndex}`} className="image-wrapper">
                  <img src={imgSrc} alt={`Carousel image ${imgIndex + 1}`} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="gradient gradient--left" />
      <div className="gradient gradient--right" />
    </div>
  );
};

export default HorizontalCarouselWall;