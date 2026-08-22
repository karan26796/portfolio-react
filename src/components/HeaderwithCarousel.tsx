import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { XLogo, FigmaLogo, Sparkle } from "@phosphor-icons/react";
import "../styles/HeaderWithCarousel.scss";
import ScrollReveal from "./ScrollReveal";
import ResumePopup from "../pages/ResumePopup";
import grabLogo from "../utils/logos/grab.png";
import obviousLogo from "../utils/logos/obvious.webp";
import figmaLogo from "../utils/logos/figma.webp";
import interconnect from "../utils/logos/interconnect.webp";

const SCRAMBLE_CHARS = "abcdefghijklmnopqrstuvwxyz";

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
  const greetingChars = useScrambleReveal("Hey, my name is", { delay: 0 });
  const nameChars = useScrambleReveal("Karan", { delay: 350 });
  const roleChars = useScrambleReveal("Designer at", { delay: 550 });
  const trainerChars = useScrambleReveal("& Figma trainer", { delay: 700 });
  const companyChars = useScrambleReveal("Keka HR", { delay: 1150 });
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  const closeResume = (): void => {
    setIsResumeOpen(false);
  };

  return (
    <div className="header-container">
      <div className="header-column-one">
        <div className="header-text-content">
          <ScrollReveal delay={0}>
            <h1 className="serif-line">
              <ScrambleText text="Hey, my name is" chars={greetingChars} />{" "}
              <span className="inline-icon-chip avatar-chip">
                <img src="/gallery/profile.webp" alt="Karan Kapoor" />
              </span>{" "}
              <ScrambleText text="Karan" chars={nameChars} />
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1 className="serif-line muted-line">
              <ScrambleText text="Designer at" chars={roleChars} />{" "}
              <span className="inline-icon-chip light-chip">
                <img src="/project-imgs/kekalogo.webp" alt="Keka HR" />
              </span>{" "}
              <a
                className="underline-link"
                href="https://www.keka.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ScrambleText text="Keka HR" chars={companyChars} />
              </a>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1 className="serif-line muted-line">
              <ScrambleText text="& " chars={trainerChars.slice(0, 2)} />{" "}
              <span className="inline-icon-chip light-chip">
                <img src={figmaLogo} alt="Figma" />
              </span>
              <ScrambleText text="Figma trainer" chars={trainerChars.slice(2)} />{" "}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <h3 className="intro-paragraph">
              I'm an AI-native product design leader working across product strategy, user research, 0→1, design systems, and scaling complex products. Currently leading employee rewards and helpdesk at Keka for 5,000+ employee organizations. Previously a founding designer at{" "}
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
                    <span className="hover-card-desc">AI-powered qualitative user research &amp; time-to-insights platform</span>
                  </span>
                </a>
              </span>, consultant for{" "}
              <span className="inline-badge">
                <img src={grabLogo} alt="Grab" className="badge-icon" />
                <span>Grab</span>
              </span>{" "}
              through{" "}
              <span className="inline-badge">
                <img src={obviousLogo} alt="Obvious" className="badge-icon" />
                <span>Obvious</span>
              </span>, and lead of{" "}
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
              for 5 years. Building{" "}
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
                    <span className="hover-card-desc">Platform to connect teams and streamline workplace communication</span>
                  </span>
                </a>
              </span>.
            </h3>
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
