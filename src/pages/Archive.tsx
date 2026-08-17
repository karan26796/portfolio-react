import React from "react";
import "../styles/Archive.scss";
import Experiments from "../components/Experiments";
import CommunityDeck from "../components/CommunityDeck";

export const ExperimentsSection: React.FC = () => (
  <div className="experiments-section-container">
    <Experiments />
  </div>
);

export const CommunityFilesSection: React.FC = () => (
  <div className="community-deck-container">
    <CommunityDeck />
  </div>
);

const Archive: React.FC = () => {
  return (
    <div className="archive-container">
      <ExperimentsSection />
      <CommunityFilesSection />
    </div>
  );
};

export default Archive;
