import React from "react";
import "../styles/RightSidebar.scss";
import GitHubCommitBoard from "./GitHubCommitBoard";

const RightSidebar: React.FC = () => {
  return (
    <aside className="sidebar-right">
      <GitHubCommitBoard />
      {/* <p className="sidebar-right-footnote">Made with ❤️ in react. Hosted on vercel</p> */}
    </aside>
  );
};

export default RightSidebar;
