import React from 'react';
import '../styles/ImageCarousel.scss';
import imagesData from '../utils/communityFiles'; // Ensure this is the correct path to your data

interface ImageItem {
  url: string;
  link: string;
}

const ImageCarousel: React.FC = () => {
    // Duplicate the images for infinite scrolling
    const duplicatedImages: ImageItem[] = [...imagesData, ...imagesData]; // Duplicating content twice

    return (
        <div className="carousel-container">
            <h1> Figma community and YouTube Tutorials</h1>
            <div className="carousel-track">
                {duplicatedImages.map((image: ImageItem, index: number) => (
                    <a key={`image-${index}`} href={image.link} className="carousel-item" target="_blank" rel="noopener noreferrer">
                        <img src={image.url} alt={`Image ${index}`} />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
