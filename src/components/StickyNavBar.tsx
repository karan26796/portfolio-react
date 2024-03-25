// StickyNavBar.tsx
import React, { useState, useEffect } from "react";
import "../styles/StickyNavBar.scss"; // Ensure you have the corresponding CSS file
// import logo from "../logo.svg"; // Update the path to your logo
import { Link } from "react-router-dom";

const StickyNavBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollTop = 0;

  useEffect(() => {
    const handleScroll = () => {
      let currentScrollPos = window.pageYOffset;
      if (currentScrollPos < lastScrollTop) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      lastScrollTop = currentScrollPos <= 0 ? 0 : currentScrollPos; // For Mobile or negative scrolling
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container-nav">
      <nav className={`navbar ${isVisible ? "active" : ""}`}>
        <Link className='a-header' to="/page1">Page 1</Link>
        {/* <img src={logo} alt="Logo" style={{ height: "50px", width:"50px"}} /> */}
        <Link className='a-header' to="/page2">Page 2</Link>
      </nav>
    </div>
  );
};

export default StickyNavBar;
