import React from "react";
import "../styles/ResumeStandalone.scss";
import resumeImage from "../utils/Resume Karan.webp";
import Button from "../components/Buttons";

const ResumeStandalone: React.FC = () => {
  return (
    <div className="resume-standalone">
      <img className="resume-image" src={resumeImage} alt="Resume of Karan" />
      <Button
        text="Download Resume"
        iconName="DownloadSimple"
        withIcon={true}
        iconDirection="left"
        withText={true}
        size="m"
        variant="primary"
        weight="regular"
        onClick={async () => {
          const res = await fetch("/resume-karan.pdf");
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "Karan_Kapoor_Resume.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        }}
      />
    </div>
  );
};

export default ResumeStandalone;
