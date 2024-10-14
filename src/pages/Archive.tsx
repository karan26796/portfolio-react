import React, { useState, useEffect } from "react";
import communityFiles from "../utils/communityFiles";
import '../styles/Archive.scss'
import Experiments from '../components/Experiments'

const Archive: React.FC = () => {
  const [columns, setColumns] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

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
          {communityFiles
            .filter((_, index) => index % columns === i)
            .map((file, index) => (
              <a key={index} className="community-file-card" href={file.link} target="_blank" rel="noopener noreferrer">
                <img src={file.url} alt={`Community file ${index + 1}`} />
                <div className="community-content">
                  <h4>{file.name}</h4>
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
      <Experiments/>
      <h1>Figma community resources</h1>
      <div 
        className="community-files-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: '1.25em'
        }}
      >
        {getColumns()}
      </div>
    </div>
  );
};

export default Archive;