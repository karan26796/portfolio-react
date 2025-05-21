// SubscriptPortfolio.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import projectContent from "./Keka.md?raw"; // ✅ Use ?raw if using Vite

const Project6: React.FC = () => {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown>{projectContent}</ReactMarkdown>
    </div>
  );
};

export default Project6;
