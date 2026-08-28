import React from "react";
import { Link, useLocation } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import GitHubCommitBoard from "./GitHubCommitBoard";
import "../styles/Footer.scss";

// The marquee mixes in Figma Training + Travel photos, so showing it again
// at the bottom of those same pages is redundant — only show it elsewhere.
const MARQUEE_HIDDEN_ROUTES = ["/figma-training", "/gallery"];

interface MarqueeImage {
  src: string;
  height: number;
  caption: string;
}

const MARQUEE_IMAGES: MarqueeImage[] = [
  { src: "/gallery/1.webp", height: 260, caption: "Tabo, Himachal" },
  { src: "/figma-training/training9.webp", height: 340, caption: "Figma Config '24, IIT Delhi" },
  { src: "/gallery/33.webp", height: 220, caption: "Switzerland" },
  { src: "/figma-training/training2.webp", height: 300, caption: "Indiana University, US" },
  { src: "/gallery/21.webp", height: 260, caption: "Doodhpathri, Kashmir" },
  { src: "/figma-training/training11.webp", height: 340, caption: "Figma Config '25, Microsoft Noida" },
  { src: "/gallery/38.webp", height: 220, caption: "Eiffel Tower" },
  { src: "/figma-training/training15.webp", height: 300, caption: "R&D Meetup, Mumbai" },
  { src: "/gallery/20.webp", height: 260, caption: "Bir, Himachal" },
  { src: "/figma-training/training14.webp", height: 340, caption: "Friends of Figma, Hyderabad" },
];

const Footer: React.FC = () => {
  const location = useLocation();
  const showMarquee = !MARQUEE_HIDDEN_ROUTES.includes(location.pathname);

  return (
    <ScrollReveal className="footer-container" variant="fade">
      {showMarquee && (
        <div className="footer-marquee" aria-hidden="true">
          <div className="footer-marquee-track">
            {[...MARQUEE_IMAGES, ...MARQUEE_IMAGES].map((img, i) => (
              <div className="footer-marquee-item" key={i} style={{ height: img.height }}>
                <span className="footer-marquee-caption">{img.caption}</span>
                <img src={img.src} alt={img.caption} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="footer-bottom">
        <div className="footer-profile" id="contact">
          <div className="footer-profile-header">
            <img src="/gallery/profile.webp" alt="" className="footer-profile-avatar" />
            <div className="footer-profile-text">
              <span className="footer-profile-name">Karan Kapoor</span>
              <span className="footer-profile-handle">@karan26796</span>
            </div>
          </div>
          <GitHubCommitBoard compact />
        </div>

        <div className="footer-link-groups">
          <div className="footer-link-column">
            <h6>Explore</h6>
            <Link to="/home">Home</Link>
            <Link to="/gallery">Travel</Link>
            <Link to="/figma-training">Figma Training</Link>
            {/* <Link to="/archive">Archive</Link> */}
            {/* <Link to="/about">About</Link> */}
          </div>
          <div className="footer-link-column">
            <h6>Connect</h6>
            {/* <a href="/resume-view">Resume</a> */}
            <a href="https://calendly.com/notkarankapoor/30min" target="_blank" rel="noopener noreferrer">
              Schedule a chat
            </a>
            <a href="https://www.linkedin.com/in/karankapoorux/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://x.com/kadankapoor" target="_blank" rel="noopener noreferrer">
              X / Twitter
            </a>
          </div>
        </div>
      </div>

      {/* Content only — the reference sets this in a handwriting face, which
          isn't in this site's type system. It uses the footer's own styling. */}
      <p className="footer-availability">
        I'm currently open to new roles. If the work above resonates,{" "}
        <a
          href="https://www.linkedin.com/in/karankapoorux/"
          target="_blank"
          rel="noopener noreferrer"
        >
          get in touch
        </a>
        !
      </p>

      <p className="footer-attribution">Made with ❤️ in React. Hosted on Vercel.</p>
    </ScrollReveal>
  );
};

export default Footer;
