import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/RightSidebar.scss";
import GitHubCommitBoard from "./GitHubCommitBoard";

const RightSidebar: React.FC = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/project/')) {
    return null;
  }

  return (
    <aside className="sidebar-right">
      <GitHubCommitBoard />
      {/* <p className="sidebar-right-footnote">Made with ❤️ in react. Hosted on vercel</p> */}
    </aside>
  );
};

export default RightSidebar;
