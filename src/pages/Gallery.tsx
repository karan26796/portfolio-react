import { useState, useEffect } from "react";
import "../styles/Gallery.scss";
import { MapPin } from "@phosphor-icons/react";

// Define an interface for the locations object
interface LocationsType {
  [key: number]: string;
}

const Gallery = () => {
  const [columns, setColumns] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

  const imageNumbers = Array.from({ length: 33 }, (_, i) => 33 - i);

  // Now TypeScript knows this object can have any number as a key
  const locations: LocationsType = {
    1: "Tabo, Himachal",
    2: "Chandratal lake, Himachal",
    3: "Langza, Spiti Valley",
    4: "Serolsar lake trek, Himachal",
    5: "Dhanushkodi, Rameswaram",
    6: "Parashar lake trek, Himachal",
    7: "Munnar, Kerala",
    8: "My balcony, Delhi",
    9: "Kaza, Spiti Valley",
    10: "Humayun's Tomb, Delhi",
    11: "Langza, Spiti Valley",
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
    31: "Kashmir",
    32: "Doodhpathri, Kashmir",
    33: "Doodhpathri, Kashmir",
  };

  // Type the images array
  const images: (string | null)[] = imageNumbers.map((num) => {
    try {
      return require(`../utils/gallery/${num}.webp`);
    } catch (e) {
      console.error(`Failed to load image ${num}`, e);
      return null;
    }
  });

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

  const getColumns = () => {
    let cols = [];
    for (let i = 0; i < columns; i++) {
      cols.push(
        <div key={i} className="column">
          {i === 0 && (
            <div className="gallery-content">
              <h1>Photo gallery</h1>
              <p>
                I have been fortunate to visit some of the most stunning places
                in India. Here are some of my favorite pictures. I hope you like
                them! 😌
                <br />
                <br />
                Follow on <a href="instagram.com/kadankapoor">Instagram</a> for
                more such photos.
              </p>
            </div>
          )}
          {imageNumbers
            .filter((_, index) => index % columns === i)
            .map((num) => {
              const imagePath = images[33 - num];
              if (!imagePath) return null;

              return (
                <div key={num} className="image-container">
                  <img
                    src={imagePath}
                    alt={`Gallery image ${num}`}
                    className="gallery-image"
                  />
                  <div
                    className={`location-text ${
                      isMobile ? "always-visible" : ""
                    }`}
                  >
                    <MapPin size='1.2em' weight="regular" />{" "}
                    {locations[num] || `Location ${num}`}
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
