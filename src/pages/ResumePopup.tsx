import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Resume from "../components/Resume";
import "../styles/ResumePopup.scss";
import { X } from "@phosphor-icons/react";
import Button from "../components/Buttons";

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
      setTimeout(() => setContentClass("slide-up"), 10);
    } else {
      setContentClass("slide-down");
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`resume-popup-overlay ${isOpen ? "fade-in" : "fade-out"}`}
      onClick={onClose}
    >
      <div
        className={`resume-popup-content ${contentClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* <Link to="#" onClick={onClose} className="close-button">
          <X size={18} weight="bold" />
        </Link> */}
        <Resume />
      </div>
      <Button
          className="close-button"
          text="Submit"
          iconName="X"
          withIcon={true}
          iconDirection="left"
          withText={false}
          size="s"
          variant="primary"
          weight="regular"
          onClick={onClose}
        />
    </div>
  );
};

export default ResumePopup;
