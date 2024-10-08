// Gallery.tsx
import { useState, useEffect } from "react";
import "../styles/Gallery.scss";

const Gallery = () => {
  const [columns, setColumns] = useState(3);
  // Reverse the image numbers array
  const imageNumbers = Array.from({ length: 30 }, (_, i) => 30 - i);

  // Dynamic imports in reverse order
  const images = imageNumbers.map(num => {
    try {
      return require(`../utils/gallery/${num}.webp`);
    } catch (e) {
      console.error(`Failed to load image ${num}`, e);
      return null;
    }
  });

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 750) {
        setColumns(1);
      } else if (window.innerWidth < 900) {
        setColumns(2);
      } else {
        setColumns(2);
      }
    };

    window.addEventListener("resize", updateColumns);
    updateColumns();

    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const getColumns = () => {
    let cols = [];
    for (let i = 0; i < columns; i++) {
      cols.push(
        <div
          key={i}
          className="column"
        >
          {imageNumbers
            .filter((_, index) => index % columns === i)
            .map((num, index) => {
              const imagePath = images[30 - num];
              if (!imagePath) return null;
              
              return (
                <img
                  key={num}
                  src={imagePath}
                  alt={`Gallery image ${num}`}
                  className="gallery-image"
                />
              );
            })}
        </div>
      );
    }
    return cols;
  };

  return (
    <div
      className="gallery-grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {getColumns()}
    </div>
  );
};

export default Gallery;