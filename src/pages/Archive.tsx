import React, { useState, useEffect } from "react";
import communityFiles from "../utils/communityFiles";
import "../styles/Archive.scss";
import Experiments from "../components/Experiments";
import HorizontalCarouselWall from "../components/HorizontalCarouselWall";

const Archive: React.FC = () => {
  const [columns, setColumns] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

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

  const getTransform = (index: number): string => {
    const yOffset = index % 2 === 0 ? -10 : 10;
    const rotation = index % 2 === 0 ? -2 : 2;
    return `translateY(${yOffset}px) rotate(${rotation}deg)`;
  };

  const getColumns = () => {
    let cols = [];
    for (let i = 0; i < columns; i++) {
      cols.push(
        <div key={i} className="column">
          {communityFiles
            .filter((_, index) => index % columns === i)
            .map((file, index) => (
              <a
                key={index}
                className="community-file-card"
                href={file.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  // transform: getTransform(index),
                  // transition: 'transform 0.3s ease-out'
                }}
              >
                <img src={file.url} alt={`Community file ${index + 1}`} />
                <div className="community-content">
                  <h6 style={{ color: "var(--primary-text)", margin: "0" }}>
                    {file.name}
                  </h6>
                  <h5>{file.downloads}</h5>
                </div>
              </a>
            ))}
        </div>
      );
    }
    return cols;
  };

  return (
    <div className="archive-container">
      <HorizontalCarouselWall
        projects={['frontrow', 'vector', 'pause']}
        direction="left"
        speed={0.1}
      />
      <Experiments />
      <h1>Figma community resources</h1>
      <div
        className="community-files-grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "1.25em",
        }}
      >
        {getColumns()}
      </div>
      <HorizontalCarouselWall
        projects={['aiguire','banner','qohoo', 'vdoAi']}
        direction="right"
        speed={0.1}
      />
    </div>
  );
};

export default Archive;