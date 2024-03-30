import React, { useState, useEffect } from 'react';
import '../styles/StackOfCards.scss';
import imagesData from '../utils/communityFiles'; // The path to your images data

const StackOfCards: React.FC = () => {
    const [stackIndex, setStackIndex] = useState(0);

    const handleScroll = (event: WheelEvent) => {
        event.preventDefault(); // Prevent the default scroll behavior

        // Get the direction of scroll: down is positive, up is negative
        const direction = Math.sign(event.deltaY);

        setStackIndex((prevIndex) => {
            // Calculate new index based on direction, prevent it from going below 0
            const newIndex = prevIndex + direction;
            return newIndex >= 0 ? newIndex : prevIndex;
        });
    };

    useEffect(() => {
        window.addEventListener('wheel', handleScroll, { passive: false });
        // Optional: Lock the body scroll
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('wheel', handleScroll);
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className="stack-container">
            {imagesData.map((image, index) => (
                <div
                    key={index}
                    className={`card ${index <= stackIndex ? 'stacked' : ''}`}
                    style={{
                        backgroundImage: `url(${image.url})`,
                        // Stack the cards on top of each other by adjusting the `top` value
                        top: `${index <= stackIndex ? 50 + (stackIndex - index) * 5 : 100}%`, // Adjust 5 to control the overlap
                        zIndex: index <= stackIndex ? imagesData.length - index : 0, // Bring stacked cards to the front
                    }}
                />
            ))}
        </div>
    );
};

export default StackOfCards;
