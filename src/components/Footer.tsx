import React from "react";
import { LinkedinLogo, XLogo } from "@phosphor-icons/react";
import ScrollReveal from "./ScrollReveal";
import "../styles/Footer.scss";

const Footer: React.FC = () => {
  return (
    <ScrollReveal className="footer-container" variant="fade">
      <div className="footer-badges-row">
        <a
          href="https://x.com/kadankapoor"
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-user-badge twitter-badge"
        >
          <div className="avatar-wrapper twitter-icon-bg">
            <XLogo size={16} weight="bold" />
          </div>
          <span className="handle">@kadankapoor</span>
        </a>

        <a
          href="https://www.linkedin.com/in/karankapoorux/"
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-user-badge linkedin-badge"
        >
          <div className="avatar-wrapper linkedin-icon-bg">
            <LinkedinLogo size={16} weight="bold" />
          </div>
          <span className="handle">in/karankapoorux</span>
        </a>
      </div>

      <h5>Made with ❤️ in react. Hosted on vercel</h5>
    </ScrollReveal>
  );
};

export default Footer;
