import React from "react";
import "../styles/ResumeStandalone.scss";
import resumeImage from "../utils/Resume Karan.jpg";
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
        onClick={() => {
          const link = document.createElement("a");
          link.href = "/resume-karan.pdf";
          link.download = "Karan_Kapoor_Resume.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
      />
    </div>
  );
};

export default ResumeStandalone;


