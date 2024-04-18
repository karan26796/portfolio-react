import React from "react";
import { ImageItem } from "../utils/communityFiles";

interface CarouselContentProps {
  images: ImageItem[];
}

const CarouselContent: React.FC<CarouselContentProps> = ({ images }) => {
  return (
    <>
      {images.map((image, index) => (
        <a
          key={`image-${index}`}
          href={image.link}
          className="carousel-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={image.url} alt={`Image ${index}`} />
        </a>
      ))}
    </>
  );
};

export default CarouselContent;
