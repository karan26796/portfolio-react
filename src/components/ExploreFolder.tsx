import React from "react";
import { Link } from "react-router-dom";
import "../styles/ExploreFolder.scss";

interface ExploreItem {
  to: string;
  image: string;
  title: string;
}

const ITEMS: ExploreItem[] = [
  { to: "/gallery", image: "/gallery/1.webp", title: "Travel Diaries" },
  { to: "/figma-training", image: "/figma-training/training9.webp", title: "Figma Training" },
  { to: "/archive", image: "/project-imgs/interconnect/interconnect-thumb.webp", title: "The Archive" },
];

const ExploreFolder: React.FC = () => {
  return (
    <div className="explore-folder">
      <div className="explore-folder-stack">
        {ITEMS.map((item, i) => (
          <Link to={item.to} className="explore-folder-item" key={item.to} aria-label={`Open ${item.title}`}>
            <div className="explore-folder-item-media">
              <img src={item.image} alt="" />
            </div>
            <span className="explore-folder-item-title">{item.title}</span>
          </Link>
        ))}
      </div>

      <div className="explore-folder-body">
        <div className="explore-folder-label">More to explore</div>
      </div>
    </div>
  );
};

export default ExploreFolder;
