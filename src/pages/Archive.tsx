import React, { useState, useEffect } from "react";
import communityFiles from "../utils/communityFiles";
import "../styles/Archive.scss";
import Experiments from "../components/Experiments";
import HorizontalCarouselWall from "../components/HorizontalCarouselWall";
import StackedCard from "../components/StackedCards";

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
        setColumns(2);
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
          {communityFiles
            .filter((_, index) => index % columns === i)
            .map((file, index) => (
              <StackedCard key={index} file={file} index={index} />
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