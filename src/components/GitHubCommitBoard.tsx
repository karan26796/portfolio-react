import React from "react";
import { GithubLogo, ArrowUpRight } from "@phosphor-icons/react";
import "../styles/GitHubCommitBoard.scss";

const USERNAME = "karan26796";

const GitHubCommitBoard: React.FC = () => {
  // Generate deterministic grid items for contribution board visual
  const generateGridSquares = () => {
    const seed = [
      0, 1, 2, 0, 3, 4, 1, 0, 2, 3, 1, 4, 0, 2, 1, 3, 0, 4, 2, 1, 0, 3, 2, 4, 1, 0, 3, 2, 0, 1, 4, 2, 3, 1, 0
    ];
    return seed;
  };

  return (
    <div className="github-commit-board">
      <div className="board-header">
        <div className="board-title-group">
          <GithubLogo size={22} weight="bold" />
          <div className="board-titles">
            <h4>GitHub Activity</h4>
            <span className="handle">@{USERNAME}</span>
          </div>
        </div>
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="external-link"
          title="View GitHub Profile"
        >
          <ArrowUpRight size={18} />
        </a>
      </div>

      <div className="contribution-grid-wrapper">
        <div className="grid-header-label">Recent Contributions</div>
        <div className="contribution-grid">
          {generateGridSquares().map((level, idx) => (
            <div key={idx} className={`grid-square level-${level}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GitHubCommitBoard;
