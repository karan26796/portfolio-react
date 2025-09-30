import React from "react";
import "../styles/Footer.scss";

const Footer: React.FC = () => {
  const handleSocialMediaClick = (url: string) => {
    window.open(url, "_blank"); // Opens the URL in a new tab
  };

  return (
    <div className="footer-container">
      <h5>Made with ❤️ in react. Hosted on vercel</h5>
    </div >
  );
};

export default Footer;
