import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import GitHubCommitBoard from "./GitHubCommitBoard";
import "../styles/Footer.scss";

// The marquee mixes in Figma Training + Travel photos, so showing it again
// at the bottom of those same pages is redundant — only show it elsewhere.
const MARQUEE_HIDDEN_ROUTES = ["/figma-training", "/gallery"];

interface MarqueeImage {
  src: string;
  /** Rendered height in CSS px. */
  height: number;
  /** Rendered width at that height — the source aspect ratio, baked in. */
  width: number;
  caption: string;
}

/**
 * Served from /marquee rather than the originals in /gallery and
 * /figma-training: those are full-resolution because the gallery canvas zooms
 * into them, and at 220–340px tall here that was 4.4MB of image for a strip
 * nobody has scrolled to yet. These copies are 2x the rendered height — enough
 * for a retina screen — and come to 469KB.
 */
const MARQUEE_IMAGES: MarqueeImage[] = [
  { src: "/marquee/tabo.webp", height: 260, width: 390, caption: "Tabo, Himachal" },
  { src: "/marquee/config24.webp", height: 340, width: 432, caption: "Figma Config '24, IIT Delhi" },
  { src: "/marquee/switzerland.webp", height: 220, width: 200, caption: "Switzerland" },
  { src: "/marquee/indiana.webp", height: 300, width: 330, caption: "Indiana University, US" },
  { src: "/marquee/doodhpathri.webp", height: 260, width: 405, caption: "Doodhpathri, Kashmir" },
  { src: "/marquee/config25.webp", height: 340, width: 453, caption: "Figma Config '25, Microsoft Noida" },
  { src: "/marquee/eiffel.webp", height: 220, width: 275, caption: "Eiffel Tower" },
  { src: "/marquee/mumbai.webp", height: 300, width: 369, caption: "R&D Meetup, Mumbai" },
  { src: "/marquee/bir.webp", height: 260, width: 346, caption: "Bir, Himachal" },
  { src: "/marquee/hyderabad.webp", height: 340, width: 371, caption: "Friends of Figma, Hyderabad" },
];

/**
 * One frame of the strip. It holds its own width from the start, so the track
 * has its full length before a single image arrives — the images are
 * `width: auto`, so without this every frame was zero-wide until it loaded and
 * the whole strip snapped outwards as they came in.
 */
const MarqueeFrame: React.FC<{ image: MarqueeImage }> = ({ image }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`footer-marquee-item${loaded ? " is-loaded" : ""}`}
      style={{ height: image.height, width: image.width }}
    >
      {!loaded && <span className="footer-marquee-skeleton" aria-hidden="true" />}
      <span className="footer-marquee-caption">{image.caption}</span>
      <img
        src={image.src}
        alt={image.caption}
        width={image.width}
        height={image.height}
        // The strip sits below the fold on every page that shows it, so it
        // should cost nothing until someone scrolls that far.
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </div>
  );
};

const Footer: React.FC = () => {
  const location = useLocation();
  const showMarquee = !MARQUEE_HIDDEN_ROUTES.includes(location.pathname);

  return (
    <ScrollReveal className="footer-container" variant="fade">
      {showMarquee && (
        <div className="footer-marquee" aria-hidden="true">
          <div className="footer-marquee-track">
            {[...MARQUEE_IMAGES, ...MARQUEE_IMAGES].map((img, i) => (
              <MarqueeFrame image={img} key={i} />
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
          <p className="footer-availability">
            I'm currently open to new roles,{" "}
            <a
              href="https://www.linkedin.com/in/karankapoorux/"
              target="_blank"
              rel="noopener noreferrer"
            >
              get in touch
            </a>
            !
          </p>
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
        Made with ❤️ in React. Hosted on Vercel
      </p>
    </ScrollReveal>
  );
};

export default Footer;
