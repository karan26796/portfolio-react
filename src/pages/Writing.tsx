import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import ScrollReveal from "../components/ScrollReveal";
import usePageSEO from "../utils/usePageSEO";
import { useSectionAccent } from "../utils/useSectionAccent";
import { writings } from "../utils/writings";
import "../styles/hero.scss";
import "../styles/Writing.scss";

// The same wash the home and training pages use, taken from whichever note is
// most on screen. The notes cycle through the home page's section colours so
// the page's tint keeps moving as you read down it.
const INTRO_ACCENT = "rgba(112, 0, 255, 0.07)";
const NOTE_ACCENTS = [
  "rgba(255, 138, 0, 0.09)",
  "rgba(0, 128, 128, 0.09)",
  "rgba(48, 164, 108, 0.13)",
  "rgba(0, 33, 54, 0.10)",
  "rgba(112, 0, 255, 0.07)",
];

/**
 * Which note is being read, and whether the notes are on screen at all.
 *
 * The note being read is the last one whose top has passed a line 40% of the
 * way down the viewport — where the eye actually sits, rather than the top
 * edge, which would hand over to the next note before the current one is
 * finished.
 */
const useActiveNote = (listRef: React.RefObject<HTMLOListElement>) => {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const list = listRef.current;
      if (!list) return;
      const line = window.innerHeight * 0.4;
      const notes = Array.from(list.children) as HTMLElement[];

      let current = 0;
      notes.forEach((note, i) => {
        if (note.getBoundingClientRect().top <= line) current = i;
      });
      setActive(current);

      // Only alongside the notes: it has nothing to point at over the
      // masthead or the footer.
      const box = list.getBoundingClientRect();
      setVisible(box.top < window.innerHeight * 0.6 && box.bottom > line);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [listRef]);

  return { active, visible };
};

/**
 * One line per note down the left edge, the note being read drawn longer.
 * Each line is also a way to jump straight to its note.
 */
const WritingIndex: React.FC<{ active: number; visible: boolean }> = ({ active, visible }) => (
  <nav
    className={`writing-index${visible ? " is-visible" : ""}`}
    aria-label="Notes"
  >
    <ol>
      {writings.map((note, i) => (
        <li key={note.id}>
          <a
            href={`#${note.id}`}
            className={`writing-index__line${i === active ? " is-active" : ""}`}
            aria-current={i === active ? "true" : undefined}
            aria-label={note.title}
            title={note.title}
            tabIndex={visible ? undefined : -1}
            onClick={(e) => {
              // Scrolled here rather than left to the hash: App resets the
              // scroll to the top on every hashchange.
              e.preventDefault();
              document.getElementById(note.id)?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </li>
      ))}
    </ol>
  </nav>
);

const Writing: React.FC = () => {
  usePageSEO({
    title: "Writing | Karan Kapoor",
    description:
      "Short notes from Karan Kapoor on designing B2B SaaS products — users, adoption, AI, and the care that good design starts with.",
    canonicalUrl: "https://kadankapoor.com/writing",
  });

  useSectionAccent(INTRO_ACCENT);

  const listRef = useRef<HTMLOListElement>(null);
  const { active, visible: indexVisible } = useActiveNote(listRef);

  return (
    <div className="writing-page">
      {/* The same masthead as the home and training pages — title, a grey line
          at the same size, then the paragraph. The type comes from hero.scss. */}
      <header className="writing-hero" data-accent={INTRO_ACCENT}>
        <div className="hero-text-content">
          <ScrollReveal delay={0}>
            <h1 className="hero-name">Writing</h1>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <p className="intro-paragraph">
              Short notes on things I've learned designing B2B products — mostly
              about the people on the other side of the screen.
            </p>
          </ScrollReveal>
        </div>
      </header>

      <WritingIndex active={active} visible={indexVisible} />

      <ol className="writing-list" ref={listRef}>
        {writings.map((note, i) => (
          <li
            key={note.id}
            id={note.id}
            className="writing-note"
            data-accent={NOTE_ACCENTS[i % NOTE_ACCENTS.length]}
          >
            <ScrollReveal>
              <article>
                <span className="writing-note__number">
                  {String(note.number).padStart(2, "0")}
                </span>
                <h3 className="writing-note__title">{note.title}</h3>
                <div className="writing-note__body">
                  <ReactMarkdown>{note.body}</ReactMarkdown>
                </div>
                {note.media && (
                  <figure className="writing-note__figure">
                    {note.media.type === "video" ? (
                      <video
                        src={note.media.src}
                        aria-label={note.media.alt}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <img src={note.media.src} alt={note.media.alt} loading="lazy" />
                    )}
                  </figure>
                )}
                {note.tags && note.tags.length > 0 && (
                  <ul className="writing-note__tags" aria-label="Topics">
                    {note.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                )}
              </article>
            </ScrollReveal>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Writing;
