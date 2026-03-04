import React from "react";
import "../styles/ResumeStandalone.scss";
import resumeImage from "../utils/Resume Karan.webp";
import Button from "../components/Buttons";

const ResumeStandalone: React.FC = () => {
  return (
    <div className="resume-standalone">
      <img className="resume-image" src={resumeImage} alt="Resume of Karan" />
      <a href="/resume-karan.pdf" download="Karan_Kapoor_Resume.pdf">
        <Button
          text="Download Resume"
          iconName="DownloadSimple"
          withIcon={true}
          iconDirection="left"
          withText={true}
          size="m"
          variant="primary"
          weight="regular"
        />
      </a>
    </div>
  );
};

export default ResumeStandalone;
