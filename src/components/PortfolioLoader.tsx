import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  getActivity,
  readCachedDays,
  LOADER_DAYS,
  DayContribution,
} from "./GitHubCommitBoard";
import "../styles/PortfolioLoader.scss";

/**
 * The opening screen: five weeks of GitHub activity filling in square by
 * square, then handing over to the page.
 *
 * The grid is the same one the footer draws, animated — the loader is made of
 * something true about the site rather than being a spinner borrowed from
 * anywhere.
 */

/** Shown once a visit. A loader on the fourth page view is a toll booth. */
const SESSION_KEY = "portfolio-loader-shown";

/**
 * The floor and the ceiling on how long it stays.
 *
 * The floor stops a fast load producing a flash of something that reads as a
 * glitch; the ceiling stops a slow network holding the page hostage behind an
 * animation. Between them the loader leaves when the work is actually done —
 * which is what a loader is for.
 */
const MIN_MS = 650;
const MAX_MS = 1800;
/** How long the grid takes to fill, and the gap between one square and the next. */
const SQUARE_STAGGER_MS = 14;
const FADE_MS = 520;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const PortfolioLoader: React.FC = () => {
  /* Decided once, before the first paint: reading sessionStorage in an effect
     would mount the loader and then rip it away again on a repeat visit,
     which is a worse flash than the one it exists to avoid. */
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(SESSION_KEY) === null;
    } catch {
      // Private browsing, or storage blocked. Showing it is the safe failure.
      return true;
    }
  });
  const [leaving, setLeaving] = useState(false);
  /* Seeded from the last visit, so the squares are coloured from the first
     frame rather than filling in grey and hoping the network beats the
     handover. This visit's fetch replaces them if it lands in time, and
     updates the store either way. */
  const [days, setDays] = useState<DayContribution[] | null>(() => readCachedDays());
  const startedAt = useRef(Date.now());

  /* Real activity if it arrives in time, and the grid regardless if it does
     not: the loader must never wait on a third-party API to let the site in.
     Until the fetch lands the squares animate at level 0, and colour in behind
     the fill if it beats the handover. */
  useEffect(() => {
    if (!visible) return;
    let alive = true;
    getActivity()
      .then((activity) => alive && setDays(activity.days))
      .catch(() => {
        /* The grid still runs; it just stays empty. */
      });
    return () => {
      alive = false;
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    let timer: number | undefined;
    let cancelled = false;

    const leave = () => {
      if (cancelled) return;
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* Nothing to do — the loader simply shows again next navigation. */
      }
      setLeaving(true);
      timer = window.setTimeout(() => !cancelled && setVisible(false), FADE_MS);
    };

    const elapsed = () => Date.now() - startedAt.current;
    const leaveWhenReady = () => {
      const wait = Math.max(0, MIN_MS - elapsed());
      timer = window.setTimeout(leave, wait);
    };

    /* Gated on the fonts, because they are what actually makes the page look
       finished — text reflowing from a fallback face is the jump the loader is
       covering. The ceiling runs alongside and wins if that never settles. */
    const ceiling = window.setTimeout(leave, MAX_MS);
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (fonts?.ready) fonts.ready.then(leaveWhenReady).catch(leaveWhenReady);
    else leaveWhenReady();

    return () => {
      cancelled = true;
      window.clearTimeout(ceiling);
      if (timer) window.clearTimeout(timer);
    };
  }, [visible]);

  // The page behind must not scroll under the overlay.
  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  const squares = useMemo(
    () =>
      Array.from({ length: LOADER_DAYS }, (_, i) => ({
        level: days?.[i]?.level ?? 0,
        // Filled column by column, left to right, the way the graph reads.
        delay: i * SQUARE_STAGGER_MS,
      })),
    [days]
  );

  if (!visible) return null;

  const still = prefersReducedMotion();

  return (
    <div
      className={`portfolio-loader${leaving ? " is-leaving" : ""}${still ? " is-still" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="portfolio-loader__inner">
        <div className="portfolio-loader__grid">
          {squares.map((square, i) => (
            <span
              key={i}
              className={`portfolio-loader__square level-${square.level}`}
              style={{ animationDelay: `${square.delay}ms` }}
            />
          ))}
        </div>
        <p className="portfolio-loader__caption">Karan Kapoor</p>
      </div>
    </div>
  );
};

export default PortfolioLoader;
