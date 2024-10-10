import React, { useState, useEffect } from 'react';
import Resume from '../components/Resume'; // Assuming your existing Resume component is in this file
import '../styles/ResumePopup.scss'

interface ResumePopupProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  const ResumePopup: React.FC<ResumePopupProps> = ({ isOpen, onClose }) => {
    const [animationClass, setAnimationClass] = useState('');
  
    useEffect(() => {
      if (isOpen) {
        setAnimationClass('slide-up');
      } else {
        setAnimationClass('slide-down');
      }
    }, [isOpen]);
  
    if (!isOpen && animationClass !== 'slide-up') return null;
  
    return (
      <div className={`resume-popup-overlay ${animationClass}`} onClick={onClose}>
        <div className="resume-popup-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>×</button>
          <Resume />
        </div>
      </div>
    );
  };
  
  export default ResumePopup;