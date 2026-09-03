import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { XLogo, FigmaLogo, Sparkle, CaretDown } from "@phosphor-icons/react";
import "../styles/hero.scss";
import "../styles/HeaderWithCarousel.scss";
import ScrollReveal from "./ScrollReveal";
import ResumePopup from "../pages/ResumePopup";
import grabLogo from "../utils/logos/grab.png";
import obviousLogo from "../utils/logos/obvious.webp";
import figmaLogo from "../utils/logos/figma.webp";
import interconnect from "../utils/logos/interconnect.webp";
import nidLogo from "../utils/logos/nid.webp";

const SCRAMBLE_CHARS = "abcdefghijklmnopqrstuvwxyz";

/**
 * A piece of the intro sentence that only exists once it is expanded.
 *
 * Mounted rather than hidden: this is inline copy in the middle of a
 * paragraph, and there is no way to give an inline run zero width without
 * taking it out of the flow entirely — so it arrives when it is wanted and
 * blurs into place. `step` staggers the pieces left to right, so the sentence
 * fills itself in along its own reading order instead of all at once.
 */
const IntroDetail: React.FC<{
  open: boolean;
  step: number;
  children: React.ReactNode;
}> = ({ open, step, children }) => {
  if (!open) return null;
  return (
    <span
      className="intro-detail-part"
      style={{ animationDelay: `${step * 90}ms` }}
    >
      {children}
    </span>
  );
};

interface ScrambleChar {
  char: string;
  settled: boolean;
}

const settledOf = (text: string): ScrambleChar[] =>
  text.split("").map((char) => ({ char, settled: true }));

// A quiet, staggered letter-by-letter reveal — each character flickers
// through a couple of nearby glyphs, then settles left to right with a soft
// blur/opacity transition (no hard character-swap glitch). Respects
// reduced-motion by rendering the final text immediately.
const useScrambleReveal = (
  text: string,
  { delay = 0, stagger = 28, settleAfter = 2 }: { delay?: number; stagger?: number; settleAfter?: number } = {}
): ScrambleChar[] => {
  const [chars, setChars] = useState<ScrambleChar[]>(() => settledOf(text));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setChars(settledOf(text));
      return;
    }

    setChars(
      text.split("").map((char) => ({
        char: char === " " ? " " : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
        settled: char === " ",
      }))
    );

    const tickLength = 50;
    let tick = 0;
    let interval: ReturnType<typeof setInterval>;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        tick++;
        let allSettled = true;

        setChars(
          text.split("").map((char, i) => {
            if (char === " ") return { char, settled: true };
            const settleTick = Math.floor((i * stagger) / tickLength) + settleAfter;
            const isSettled = tick >= settleTick;
            if (!isSettled) allSettled = false;
            return {
              char: isSettled ? char : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
              settled: isSettled,
            };
          })
        );

        if (allSettled) clearInterval(interval);
      }, tickLength);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay, stagger, settleAfter]);

  return chars;
};

const ScrambleText: React.FC<{ text: string; chars: ScrambleChar[] }> = ({ text, chars }) => (
  <span className="scramble-text" role="text" aria-label={text}>
    {chars.map((c, i) => (
      <span key={i} aria-hidden="true" className={`scramble-char${c.settled ? " is-settled" : ""}`}>
        {c.char === " " ? " " : c.char}
      </span>
    ))}
  </span>
);

const HeaderWithCarousel: React.FC = () => {
  // Only the name scrambles now. The role and companies below it read as
  // credentials rather than as a greeting, and settling them letter by letter
  // made a short, plain block feel busier than the reference it follows.
  const nameChars = useScrambleReveal("Karan Kapoor", { delay: 0 });
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  /** Whether the detailed intro behind "Read more" is showing. */
  const [isIntroOpen, setIsIntroOpen] = useState<boolean>(false);

  const closeResume = (): void => {
    setIsResumeOpen(false);
  };

  return (
    <div className="header-container">
      <div className="header-column-one">
        <div className="hero-text-content">
          {/* Name, then role, then the companies as their own row — the
              reference's shape. The intro paragraph below keeps its inline
              badges and hover cards, so nothing is lost from it. */}
          <ScrollReveal delay={0}>
            <h1 className="hero-name">
              <ScrambleText text="Karan Kapoor" chars={nameChars} />
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={60}>
            <p className="hero-role">AI native Designer &amp; Figma Trainer</p>
          </ScrollReveal>

          {/* One sentence, which grows rather than being replaced.
              
              The collapsed and expanded states are the same statement: opening
              it doesn't swap in different copy, it slots the company names into
              the clauses they belong to and adds a closing line. Each inserted
              piece blurs in where it lands, so the sentence reads as filling
              itself out rather than as a second paragraph appearing. */}
          <ScrollReveal delay={200}>
            <p className="intro-summary">
              Currently designing for growth and adoption at{" "}
              <span className="inline-badge">
                <img src="/project-imgs/kekalogo.webp" alt="Keka HR" className="badge-icon" />
                <span>Keka HR</span>
              </span>
              <IntroDetail open={isIntroOpen} step={0}>
                , previously at{" "}
                <span className="inline-badge has-hover-card">
                  <img src="/project-imgs/Looppanel-logo.webp" alt="Looppanel" className="badge-icon" />
                  <span>Looppanel</span>
                  <a
                    href="https://looppanel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="badge-hover-card"
                  >
                    <span className="hover-card-media">
                      <img src="/project-imgs/loop-research/thumb.webp" alt="Looppanel" />
                    </span>
                    <span className="hover-card-body">
                      <span className="hover-card-header">
                        <img src="/project-imgs/Looppanel-logo.webp" alt="" className="hover-card-icon" />
                        <span className="hover-card-titles">
                          <span className="hover-card-title">Looppanel</span>
                          <span className="hover-card-subtitle">looppanel.com</span>
                        </span>
                      </span>
                      <span className="hover-card-desc">AI-powered qualitative user research platform</span>
                    </span>
                  </a>
                </span>
                {" "}and{" "}
                <span className="inline-badge">
                  <img src={grabLogo} alt="Grab" className="badge-icon" />
                  <span>Grab</span>
                </span>
                , through{" "}
                <span className="inline-badge">
                  <img src={obviousLogo} alt="Obvious" className="badge-icon" />
                  <span>Obvious</span>
                </span>
              </IntroDetail>
              . Experienced across research, prototyping, and code, building
              products that fit into people&rsquo;s lives.
              <IntroDetail open={isIntroOpen} step={1}>
                {" "}Studied design at{" "}
                <span className="inline-badge">
                  <img src={nidLogo} alt="NID" className="badge-icon" />
                  <span>NID</span>
                </span>{" "}
                and led{" "}
                <span className="inline-badge has-hover-card">
                  <img src="/project-imgs/figma-logo.webp" alt="Figma" className="badge-icon" />
                  <span>Friends of Figma, Delhi</span>
                  <Link to="/figma-training" className="badge-hover-card">
                    <span className="hover-card-media">
                      <img src="/figma-training/training9.webp" alt="Friends of Figma, Delhi" />
                    </span>
                    <span className="hover-card-body">
                      <span className="hover-card-header">
                        <img src="/project-imgs/figma-logo.webp" alt="" className="hover-card-icon" />
                        <span className="hover-card-titles">
                          <span className="hover-card-title">Friends of Figma, Delhi</span>
                          <span className="hover-card-subtitle">Figma Training Gallery</span>
                        </span>
                      </span>
                      <span className="hover-card-desc">Organized 20+ workshops &amp; events for 5,000+ designers</span>
                    </span>
                  </Link>
                </span>{" "}
                for five years. Now building{" "}
                <span className="inline-badge has-hover-card">
                  <img src={interconnect} alt="Interconnect" className="badge-icon" />
                  <span>Interconnect</span>
                  <a
                    href="https://getinterconnect.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="badge-hover-card"
                  >
                    <span className="hover-card-media">
                      <img src="/project-imgs/interconnect/interconnect-thumb.webp" alt="Interconnect" />
                    </span>
                    <span className="hover-card-body">
                      <span className="hover-card-header">
                        <img src={interconnect} alt="" className="hover-card-icon" />
                        <span className="hover-card-titles">
                          <span className="hover-card-title">Interconnect</span>
                          <span className="hover-card-subtitle">getinterconnect.vercel.app</span>
                        </span>
                      </span>
                      <span className="hover-card-desc">App to connect professionals in gated communities</span>
                    </span>
                  </a>
                </span>
              </IntroDetail>
              {/* Inline, so it reads as the end of the sentence rather than as
                  a control parked underneath it. */}
              <button
                type="button"
                className="intro-toggle"
                aria-expanded={isIntroOpen}
                onClick={() => setIsIntroOpen((open) => !open)}
              >
                {isIntroOpen ? "Read less" : "Read more"}
              </button>
            </p>
          </ScrollReveal>

          {/* <ScrollReveal delay={260}>
            <h3 className="worked-with-line">
              I've collaborated with teams at
              <LogoCarousel align="center" />
            </h3>
          </ScrollReveal> */}
        </div>

        <ResumePopup isOpen={isResumeOpen} onClose={closeResume} />
      </div>
    </div>
  );
};

export default HeaderWithCarousel;
