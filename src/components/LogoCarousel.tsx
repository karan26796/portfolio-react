import React from "react";
import "../styles/LogoCarousel.scss";
import { ImageItem } from "../utils/communityFiles"; // Ensure this is the correct path

// Interface for the props of the content rendering component
interface ContentComponentProps {
  images: ImageItem[];
}

// Interface for the props of the ImageCarousel component itself
interface ImageCarouselProps {
  imagesData: ImageItem[];
  ContentComponent: React.ComponentType<ContentComponentProps>; // Prop to specify the component used for rendering the carousel's content
}

// The ImageCarousel component
const LogoCarousel: React.FC<ImageCarouselProps> = ({
  imagesData,
  ContentComponent,
}) => {
  // Duplicate the images for infinite scrolling
  const duplicatedImages: ImageItem[] = [...imagesData, ...imagesData];

  return (
    <div className="carousel-container-logo">
      <div className="carousel-track-logo">
        <ContentComponent images={duplicatedImages} />
      </div>
    </div>
  );
};

export default LogoCarousel;
