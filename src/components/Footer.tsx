import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, ReadCvLogo } from "@phosphor-icons/react";
import '../styles/Footer.scss';
import ResumePopup from '../pages/ResumePopup'; // Import the new ResumePopup component

const Footer: React.FC = () => {
    const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  
    const toggleResume = (): void => {
      setIsResumeOpen(!isResumeOpen);
    };
  
    const closeResume = (): void => {
      setIsResumeOpen(false);
    };
  
    return (
      <>
        <div className="footer-container">
          <div className="links">
            <button className="a-footer" onClick={toggleResume}>
              <ReadCvLogo size={28} weight="duotone" />
              Resume
            </button>
            <Link className="a-footer" to="/gallery">
              <User size={28} weight="duotone" /> About Me
            </Link>
          </div>
        </div>
        <ResumePopup isOpen={isResumeOpen} onClose={closeResume} />
      </>
    );
  };
  
  export default Footer;