import React, { useEffect, useRef, useState } from 'react';
import figma1 from '../utils/figma-training/training1.webp';
import figma2 from '../utils/figma-training/training2.webp';
import figma3 from '../utils/figma-training/training3.webp';
import figma4 from '../utils/figma-training/training4.webp';
import figma5 from '../utils/figma-training/training5.webp';
import figma6 from '../utils/figma-training/training6.webp';
import figma7 from '../utils/figma-training/training7.webp';
import figma8 from '../utils/figma-training/training8.webp';
import figma9 from '../utils/figma-training/training9.webp';
import figma10 from '../utils/figma-training/training10.webp';
import youtube from '../utils/resources/figma-shortcuts.webp';
import community from '../utils/resources/evolve.webp';

import '../styles/FigmaTrainingCarousel.scss'
import { MapPin } from '@phosphor-icons/react';

interface CarouselItem {
  image: string;
  title: string;
  location: string;
}

const carouselItems: CarouselItem[] = [
  { image: figma1, title: "Figma for PMs", location: "IIM Ahmedabad" },
  { image: youtube, title: "Figma tutorial", location: "YouTube" },
  { image: figma2, title: "Figma for UI Design", location: "Indiana University, US" },
  { image: figma3, title: "Design Masterclass", location: "Online" },
  { image: figma4, title: "Figma Masterclass", location: "Online" },
  { image: community, title: "Design library", location: "Figma community" },
  { image: figma5, title: "Figma Masterclass", location: "Online" },
  { image: figma6, title: "Figma Masterclass", location: "Online" },
  { image: figma7, title: "Figma Masterclass", location: "Online" },
  { image: figma8, title: "Figma for PMs", location: "IIM Sambalpur" },
  { image: figma9, title: "Figma config", location: "IIT Delhi" },
  { image: figma10, title: "Design to Dev with AI", location: "T-Hub, Hyderabad" },
];

const LogoCarousel: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const moveCarousel = () => {
      if (isHovered) return;
      carousel.scrollLeft += 1;
      if (carousel.scrollLeft >= (carousel.scrollWidth - carousel.clientWidth)) {
        carousel.scrollLeft = 0;
      }
    };

    const intervalId = setInterval(moveCarousel, 15);

    return () => clearInterval(intervalId);
  }, [isHovered]);

  return (
    <div 
      className="carousel-container-figma"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={carouselRef}
    >
      {carouselItems.concat(carouselItems).map((item, index) => (
        <div key={index} className="carousel-item">
          <img src={item.image} alt={item.title} />
          <div className="carousel-text">
            <h4>{item.title}</h4>
            <h5 style={{display:"flex", alignItems:"center", gap:".2em"}}><MapPin size={22} weight='regular'></MapPin>{item.location}</h5>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LogoCarousel;