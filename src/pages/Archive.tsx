import React, { useState, useEffect } from "react";
import communityFiles from "../utils/communityFiles";
import "../styles/Archive.scss";
import Experiments from "../components/Experiments";
import StackedCard from "../components/StackedCards";
import ScrollReveal, { scrollRevealStagger } from "../components/ScrollReveal";

const Archive: React.FC = () => {
  const [columns, setColumns] = useState(2);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      if (width < 750) {
        setColumns(1);
      } else {
        setColumns(2);
      }
    };

    window.addEventListener("resize", updateLayout);
    updateLayout();

    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const getColumns = () => {
    const cols = [];
    for (let i = 0; i < columns; i++) {
      cols.push(
        <div key={i} className="column">
          {communityFiles
            .map((file, fileIndex) => ({ file, fileIndex }))
            .filter(({ fileIndex }) => fileIndex % columns === i)
            .map(({ file, fileIndex }) => (
              <ScrollReveal key={fileIndex} delay={scrollRevealStagger(fileIndex, 70)}>
                <StackedCard file={file} index={fileIndex} />
              </ScrollReveal>
            ))}
        </div>
      );
    }
    return cols;
  };

  return (
    <div className="archive-container">
      {/* Design Experiments Section */}
      <section className="craft-section">
        <div className="craft-sidebar">
          <ScrollReveal>
            <h2>Experiments</h2>
            <p>Concepts and visual designs that have helped me level up as a designer.</p>
          </ScrollReveal>
        </div>
        <div className="craft-content">
          <Experiments />
        </div>
      </section>

      {/* Figma Community Files Section */}
      <section className="craft-section">
        <div className="craft-sidebar">
          <ScrollReveal>
            <h2>Figma community</h2>
          </ScrollReveal>
        </div>
        <div className="craft-content">
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
        </div>
      </section>
    </div>
  );
};

export default Archive;
