import React from "react";
import ScrollReveal from "./ScrollReveal";
import "../styles/Footer.scss";

const Footer: React.FC = () => {

  return (
    <ScrollReveal className="footer-container" variant="fade">
      <h5>Made with ❤️ in react. Hosted on vercel</h5>
    </ScrollReveal>
  );
};

export default Footer;
