import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../styles/ResumePopup.scss";
import Button from "../components/Buttons";
import resumeImage from "../utils/Resume Karan.webp";

interface ResumePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumePopup: React.FC<ResumePopupProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [contentClass, setContentClass] = useState("");

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setContentClass("slide-in"), 10);
    } else {
      setContentClass("slide-out");
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div
      className={`resume-popup-overlay ${isOpen ? "fade-in" : "fade-out"}`}
      onClick={onClose}
    >
      <div
        className={`resume-popup-content ${contentClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="resume-popup-actions">
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
          <Button
            text="Close"
            iconName="X"
            withIcon={true}
            iconDirection="left"
            withText={false}
            size="m"
            variant="tertiary"
            weight="regular"
            onClick={onClose}
          />
        </div>
        <div className="resume-popup-image-viewer">
          <img className="resume-image" src={resumeImage} alt="Resume of Karan" />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ResumePopup;
