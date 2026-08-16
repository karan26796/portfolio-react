import React from "react";
import communityFiles from "../utils/communityFiles";
import "../styles/Archive.scss";
import Experiments from "../components/Experiments";
import StackedCard from "../components/StackedCards";
import HorizontalCarouselSection from "../components/HorizontalCarouselSection";

export const ExperimentsSection: React.FC = () => (
  <div className="experiments-section-container">
    <Experiments />
  </div>
);

export const CommunityFilesSection: React.FC = () => {
  return (
    <HorizontalCarouselSection
      title="Figma community"
      subtitle=""
      className="figma-community-carousel-section"
    >
      {communityFiles.map((file, index) => (
        <div key={index}>
          <StackedCard file={file} index={index} />
        </div>
      ))}
    </HorizontalCarouselSection>
  );
};

const Archive: React.FC = () => {
  return (
    <div className="archive-container">
      <ExperimentsSection />
      <CommunityFilesSection />
    </div>
  );
};

export default Archive;
