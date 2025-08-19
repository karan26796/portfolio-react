import React from "react";
import "../styles/ResumeStandalone.scss";

const ResumeStandalone: React.FC = () => {
  return (
    <div className="resume-standalone">
      <iframe
        title="Resume"
        src="/resume-july-2025.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
      />
    </div>
  );
};

export default ResumeStandalone;


