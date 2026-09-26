import React, { useEffect, useMemo, useRef, useState } from "react";
import { SortAscending, SortDescending } from "@phosphor-icons/react";
import ScrollReveal from "../components/ScrollReveal";
import usePageSEO from "../utils/usePageSEO";
import { useSectionAccent } from "../utils/useSectionAccent";
import { details, DesignDetail } from "../utils/details";
import "../styles/Details.scss";

const DETAILS_ACCENT = "rgba(0, 128, 128, 0.09)";

/** Columns at each width. Kept in step with the breakpoints in Details.scss. */
const columnsFor = (width: number) => (width <= 640 ? 1 : width <= 1024 ? 2 : 3);

const useColumnCount = () => {
  const [count, setCount] = useState(() => columnsFor(window.innerWidth));
  useEffect(() => {
    const onResize = () => setCount(columnsFor(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return count;
};

const DetailMedia: React.FC<{ media: DesignDetail["media"] }> = ({ media }) =>
  media.type === "video" ? (
    <video
      src={media.src}
      aria-label={media.alt}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  ) : (
    <img src={media.src} alt={media.alt} loading="lazy" />
  );

const DetailCard: React.FC<{ detail: DesignDetail }> = ({ detail }) => (
  <ScrollReveal>
    <article className="detail-card" id={detail.id}>
      <div className="detail-card__media">
        <DetailMedia media={detail.media} />
      </div>
      <div className="detail-card__text">
        <span className="detail-card__category">{detail.category}</span>
        <h3 className="detail-card__title">{detail.title}</h3>
        {detail.description && (
          <p className="detail-card__description">{detail.description}</p>
        )}
      </div>
    </article>
  </ScrollReveal>
);

const Details: React.FC = () => {
  usePageSEO({
    title: "Details | Karan Kapoor",
    description:
      "Small design details by Karan Kapoor — interactions, motion, and the decisions behind them.",
    canonicalUrl: "https://kadankapoor.com/details",
  });

  useSectionAccent(DETAILS_ACCENT);

  const [active, setActive] = useState<string | null>(null);
  const [latestFirst, setLatestFirst] = useState(true);
  const columnCount = useColumnCount();

  // Whether the filter row has reached its sticky position. Its blur layer
  // only belongs there — resting in the page, it would blur the intro above
  // it. A zero-height marker sits just above the row: at rest the two keep a
  // fixed distance apart, and once the row sticks the marker scrolls on
  // without it. Measured rather than observed at a fixed offset because the
  // sticky offset itself moves as the tab bar hides and returns.
  const stickMarker = useRef<HTMLDivElement>(null);
  const toolbar = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    let frame = 0;
    let resting: number | null = null;
    const measure = () => {
      frame = 0;
      const marker = stickMarker.current;
      const bar = toolbar.current;
      if (!marker || !bar) return;
      const gap = bar.getBoundingClientRect().top - marker.getBoundingClientRect().top;
      if (resting === null || window.scrollY === 0) resting = gap;
      setStuck(gap > resting + 1);
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
  }, []);

  // Only the categories that have something in them, in the order they first
  // appear — a pill that filters to nothing is a dead end.
  const categories = useMemo(
    () => Array.from(new Set(details.map((d) => d.category))),
    []
  );

  const visible = useMemo(() => {
    const filtered = active ? details.filter((d) => d.category === active) : details;
    return latestFirst ? filtered : [...filtered].reverse();
  }, [active, latestFirst]);

  // Dealt out left to right rather than flowed down each column, so the newest
  // details sit across the top row instead of all stacking in the first column.
  const columns = useMemo(() => {
    const cols: DesignDetail[][] = Array.from({ length: columnCount }, () => []);
    visible.forEach((d, i) => cols[i % columnCount].push(d));
    return cols;
  }, [visible, columnCount]);

  return (
    <div className="details-page">
      <header className="details-intro" data-accent={DETAILS_ACCENT}>
        <ScrollReveal>
          <h2>Details</h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p>
            The small things — an interaction, a transition, a line of copy —
            that make a product feel considered.
          </p>
        </ScrollReveal>
      </header>

      <div ref={stickMarker} aria-hidden="true" />
      <div ref={toolbar} className={`details-toolbar${stuck ? " is-stuck" : ""}`}>
        <div className="details-toolbar__filters" role="group" aria-label="Filter by category">
          <button
            type="button"
            className="details-pill"
            aria-pressed={active === null}
            onClick={() => setActive(null)}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className="details-pill"
              aria-pressed={active === category}
              // Pressing the active pill again clears it, which is what people
              // try first when they want everything back.
              onClick={() => setActive(active === category ? null : category)}
            >
              {category}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="details-pill details-pill--sort"
          onClick={() => setLatestFirst((v) => !v)}
        >
          {latestFirst ? (
            <SortDescending size="1.1em" weight="bold" />
          ) : (
            <SortAscending size="1.1em" weight="bold" />
          )}
          {latestFirst ? "Latest first" : "Oldest first"}
        </button>
      </div>

      <div className="details-grid" data-accent={DETAILS_ACCENT}>
        {columns.map((col, i) => (
          <div className="details-grid__column" key={i}>
            {col.map((detail) => (
              <DetailCard key={detail.id} detail={detail} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
