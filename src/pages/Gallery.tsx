import { useState, useEffect } from "react";
import "../styles/Gallery.scss";
import { InstagramLogo, MapPin } from "@phosphor-icons/react";
// import Buttons from '../components/Buttons'

interface LocationsType {
  [key: number]: string;
}

const Gallery = () => {
  const [columns, setColumns] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

  const imageNumbers = Array.from({ length: 41 }, (_, i) => i + 1);

  const locations: LocationsType = {
    1: "Tabo, Himachal",
    2: "Chandratal lake, Himachal",
    3: "Langza, Spiti Valley",
    4: "Serolsar lake trek, Himachal",
    5: "Dhanushkodi, Rameswaram",
    6: "Parashar lake trek, Himachal",
    7: "Munnar, Kerala",
    9: "Kaza, Spiti Valley",
    10: "Humayun's Tomb, Delhi",
    12: "Tabo, Himachal",
    13: "Kashmir",
    14: "Bir, Himachal",
    15: "Doodhpathri, Kashmir",
    16: "Srinagar, Kashmir",
    17: "Shanti stupa, Leh",
    18: "Indian Astronomical Observatory, Hanle, Ladakh",
    19: "Bir, Himachal",
    20: "Bir, Himachal",
    21: "Doodhpathri, Kashmir",
    22: "Hanle, Ladakh",
    23: "Lamayuru moonland, Ladakh",
    24: "Leh, Ladakh",
    25: "Surajtal, Himachal",
    26: "Srinagar, Kashmir",
    27: "Pahalgam, Kashmir",
    28: "Hanle, Ladakh",
    29: "Tso Moriri, Ladakh",
    30: "en route Umling La, Ladakh",
    31: "Doodhpathri, Kashmir",
    32: "Kashmir",
    33: "Switzerland",
    34: "Zurich, Switzerland",
    35: "Rhine Falls, Switzerland",
    36: "Mount Titlis, Switzerland",
    37: "Interlaken, Switzerland",
    38: "Eiffel Tower",
    39: "Opera House, Paris",
    40: "Paris",
    41: "Zurich, Switzerland",
  };

  const images: (string | null)[] = imageNumbers.map((num) => {
    try {
      return require(`../utils/gallery/${num}.webp`);
    } catch (e) {
      console.error(`Failed to load image ${num}`, e);
      return null;
    }
  });

  // Add useEffect for scroll reset
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      setIsMobile(width < 750);
      if (width < 750) {
        setColumns(1);
      } else if (width < 900) {
        setColumns(2);
      } else {
        setColumns(2);
      }
    };

    window.addEventListener("resize", updateLayout);
    updateLayout();

    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const getRotation = (index: number) => {
    const isOdd = index % 2 !== 0;
    if (isOdd) {
      return Math.random() * -1;
    } else {
      return Math.random() * 1;
    }
  };

  const handleInstagramClick = () => {
    window.open('https://instagram.com/kadankapoor', '_blank');
  };

  const getColumns = () => {
    let cols = [];
    for (let i = 0; i < columns; i++) {
      cols.push(
        <div key={i} className="column">
          {imageNumbers
            .filter((_, index) => index % columns === i)
            .map((num, index) => {
              const actualImageNum = 41 - num; // Calculate the actual image number being displayed
              const imagePath = images[actualImageNum];
              if (!imagePath) return null;

              const rotation = getRotation(index);

              return (
                <div 
                  key={num} 
                  className="image-container"
                  style={{ 
                    transform: `rotate(${rotation}deg)`,
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <img
                    src={imagePath}
                    alt={`Gallery image ${actualImageNum + 1}`}
                    className="gallery-image"
                  />
                  <div
                    className={`location-text ${
                      isMobile ? "always-visible" : ""
                    }`}
                  >
                    <MapPin size={18} /> {locations[actualImageNum + 1] || `Location ${actualImageNum + 1}`}
                  </div>
                </div>
              );
            })}
        </div>
      );
    }
    return cols;
  };

  return (
    <div className="gallery-parent">
      <div className="gallery-content">
        <h1>Photo gallery</h1>
        <p>
          I have been fortunate to visit some of the most stunning places
          in India. Here are some of my favorite pictures. I hope you like
          them! 😌
        </p>
        {/* <Buttons
          className="button-header"
          text="Follow for more"
          iconName="InstagramLogo"
          withIcon={true}
          iconDirection="left"
          withText={true}
          size="m"
          variant="secondary"
          weight="regular"
          onClick={handleInstagramClick}
        /> */}
      </div>
      <div
        className="gallery-grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {getColumns()}
      </div>
    </div>
  );
};

export default Gallery;