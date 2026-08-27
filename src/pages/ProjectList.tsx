import React, { FC, useEffect, useRef, useState } from 'react';
import '../styles/ProjectList.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { ProjectCardData } from '../utils/interfaces';
import ProjectScrollIndicator from '../components/ProjectScrollIndicator';
import { getDominantPastelColor } from '../utils/dominantColor';

interface ProjectListProps {
  projectData: ProjectCardData[];
  cardComponent: FC<{
    data: ProjectCardData;
    variant: 'small' | 'large';
    onClick?: () => void;
    buttonType?: 'button' | 'static' | 'none';
    showDivider?: boolean;
    enableTilt?: boolean;
  }>;
}

const COMPANY_TENURES: Record<string, string> = {
  "Keka HR": "Mar 2024 – Present",
  "Keka": "Mar 2024 – Present",
  "Looppanel": "2022 - 2023",
  "Side Projects": "2025 - Present",
  "Nimbuzz": "2021",
  "NID": "2017 – 2019",
};

const COMPANY_LOGOS: Record<string, string> = {
  "Keka": "/project-imgs/kekalogo.webp",
  "Keka HR": "/project-imgs/kekalogo.webp",
  "Looppanel": "/project-imgs/Looppanel-logo.webp",
};

// `year` is pre-formatted as "Company / 2026" in the project data (not
// just a bare year, despite the field name) — this pulls just the year part.
const yearOnly = (project: ProjectCardData) => project.year?.split('/').pop()?.trim() || project.year || '';

// How much scroll (as a fraction of one viewport height) each card holds
// still for while its indicator dot fills — not how long the push itself
// takes, which is a fixed-duration CSS transition, not scroll-linked.
const HOLD_VH_PER_CARD = 60;

// How long the push takes to move one card-width. On a fast scroll that
// skips several cards at once, the total transition duration scales with
// the distance (see `transitionDuration` below) so each card still passes
// at this same unhurried pace instead of covering more ground in the same
// fixed time.
const PUSH_SECONDS_PER_STEP = 0.75;

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

// Paper colours for the handwritten story notes, cycled by project order so
// no two adjacent notes share one.
const NOTE_COLORS = ["#FDF3C7", "#fff7a2ff", "#fffdcdff", "#D9E8FB", "#E8DEFB", "#FDE2CF"];

type Rgb = [number, number, number];

const parseColor = (input: string): Rgb | null => {
  const value = input.trim();
  const hex = value.replace(/^#/, "");
  // 3- or 4-digit shorthand; a 4th digit is alpha, which the page background
  // has no use for, so it's ignored.
  if (/^[0-9a-f]{3,4}$/i.test(hex)) {
    return [0, 1, 2].map((i) => parseInt(hex[i] + hex[i], 16)) as Rgb;
  }
  // 6- or 8-digit; trailing pair is alpha and is likewise ignored.
  if (/^[0-9a-f]{6}(?:[0-9a-f]{2})?$/i.test(hex)) {
    return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)) as Rgb;
  }
  const nums = value.match(/-?[\d.]+/g);
  if (nums && nums.length >= 3) return nums.slice(0, 3).map(Number) as Rgb;
  return null;
};

const mixRgb = (from: Rgb, to: Rgb, t: number): Rgb =>
  [0, 1, 2].map((i) => from[i] + (to[i] - from[i]) * t) as Rgb;

const ProjectList: React.FC<ProjectListProps> = ({ projectData, cardComponent: ProjectCard }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const prevActiveIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isSectionPinned, setIsSectionPinned] = useState(false);
  const [colorRamp, setColorRamp] = useState(0);
  const [bgColors, setBgColors] = useState<Record<string, string>>({});

  const handleCardClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  // Sample each thumbnail's dominant color once, up front, so this section's
  // background can tint toward a pastel version of whichever card is active.
  useEffect(() => {
    let cancelled = false;

    projectData.forEach((project) => {
      getDominantPastelColor(project.img).then((color) => {
        if (cancelled) return;
        setBgColors((prev) => ({ ...prev, [project.id]: color }));
      });
    });

    return () => {
      cancelled = true;
    };
  }, [projectData]);

  // One sticky "stage" holds every card stacked on top of each other; each
  // card's transform offset (which slot it sits in) is driven by how many
  // hold-segments of scroll have passed. Crossing into the next segment
  // changes `activeIndex`, and the resulting transform change is picked up
  // by a fixed-duration CSS transition — so the push always takes the same
  // short time regardless of how much further the reader scrolls, instead
  // of needing an extra viewport-height of scroll to play out.
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const segmentPx = (window.innerHeight * HOLD_VH_PER_CARD) / 100;
      if (segmentPx <= 0) return;

      const rect = el.getBoundingClientRect();
      const scrolledIntoContainer = -rect.top;
      // Clamping only the floored index (not the raw value itself) lets the
      // fractional part keep growing naturally through the last segment —
      // clamping the raw value first would pin it to exactly `idx`, making
      // `rawIndex - idx` always 0 for the last card.
      const rawIndex = Math.max(0, scrolledIntoContainer / segmentPx);
      const idx = Math.min(projectData.length - 1, Math.floor(rawIndex));
      const frac = rawIndex - idx;

      setActiveIndex(idx);
      setHoldProgress(Math.max(0, Math.min(1, frac)));
      // The indicator should only be visible while the sticky stage is
      // actually pinned on screen — not before the section is reached, and
      // not once it has released into whatever follows (e.g. Testimonials).
      setIsSectionPinned(rect.top <= 0 && rect.bottom > 0);

      // Ramp the color wash in as the section approaches and out as it
      // leaves, so it arrives/departs gradually instead of snapping on at
      // the section edges (which reads as a hard seam).
      const vh = window.innerHeight;
      // Fade-in ramp is half a viewport, and deliberately does NOT start at
      // the section's top edge — at the very top of the page the section is
      // already partly on screen, and starting there would tint the hero on
      // first paint.
      const fadeInRamp = vh * 0.5;
      const fadeIn = clamp01((fadeInRamp - rect.top) / fadeInRamp);
      // Fade-out spans the section's trailing buffer — the same stretch
      // where the pinned stage slides away and the following section slides
      // in — so the wash is fully transparent by the time that section owns
      // the viewport, rather than sitting over it.
      const fadeOut = clamp01(rect.bottom / vh);
      setColorRamp(Math.min(fadeIn, fadeOut));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [projectData.length]);

  // Track the previous active index (after paint) so the next render can
  // measure how many cards this transition needs to cover.
  useEffect(() => {
    prevActiveIndexRef.current = activeIndex;
  }, [activeIndex]);

  // THE page colour. themes.scss defines `--bg-color` in terms of
  // `--page-bg-active`, so every surface on the site that paints
  // `--bg-color` shifts together and the whole page is always exactly one
  // colour — no section left behind, no seams.
  //
  // The target is the theme's own background (`--bg-base`) interpolated
  // toward the active project's colour by the scroll ramp. It's eased here
  // in JS rather than with CSS `transition`s: a transition would have to be
  // added to every consuming section, and any section missing one (or with
  // different timing) would visibly lag behind the rest. Easing the single
  // variable means all consumers read the same value on the same frame.
  useEffect(() => {
    const root = document.documentElement;
    const base = parseColor(getComputedStyle(root).getPropertyValue("--bg-base")) || [255, 255, 255];

    const colorAt = (i: number): Rgb | null => {
      const project = projectData[i];
      if (!project) return null;
      const raw = project.bgColor || bgColors[project.id];
      return raw && raw !== "transparent" ? parseColor(raw) : null;
    };

    // This page stays mounted underneath an open case study (see AppShell),
    // so pause the tint while that overlay is up — otherwise the project
    // colour would bleed into the reader view via `--bg-color`.
    const current = location.pathname.startsWith("/project/") ? null : colorAt(activeIndex);
    if (!current) {
      root.style.removeProperty("--page-bg-active");
      return;
    }

    // Blend into the next project's colour over the tail of this project's
    // hold, so the colour eases across the handover instead of stepping the
    // moment the active index changes.
    const BLEND_FROM = 0.85;
    const next = colorAt(activeIndex + 1);
    const projectColor =
      next && holdProgress > BLEND_FROM
        ? mixRgb(current, next, (holdProgress - BLEND_FROM) / (1 - BLEND_FROM))
        : current;

    // Then the section ramp: base colour at the section's edges, full
    // project colour once it owns the viewport.
    const [r, g, b] = mixRgb(base, projectColor, colorRamp);
    root.style.setProperty(
      "--page-bg-active",
      `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
    );
  }, [activeIndex, holdProgress, colorRamp, bgColors, projectData, location.pathname]);

  useEffect(() => () => {
    document.documentElement.style.removeProperty("--page-bg-active");
  }, []);

  const stepsToCover = Math.max(1, Math.abs(activeIndex - prevActiveIndexRef.current));
  const pushTransitionDuration = `${PUSH_SECONDS_PER_STEP * stepsToCover}s`;

  // The sticky stage only releases once the container's remaining height
  // drops below the stage's own 100vh — so the container needs one extra
  // 100vh of buffer past the total hold time, or the release starts mid-way
  // through the last card's hold phase and gets carried up over whatever
  // section follows (e.g. Testimonials) instead of handing off cleanly.
  const containerHeight = `${HOLD_VH_PER_CARD * projectData.length + 100}vh`;

  const companyOf = (project?: ProjectCardData) =>
    project
      ? project.company || (project.year ? project.year.split('/')[0].trim() : 'Featured Projects')
      : null;

  return (
    <div className="project-parent" ref={containerRef} style={{ height: containerHeight }}>
      <div className="project-stage">
        {projectData.map((project, index) => {
          const offset = index - activeIndex;
          const companyName = companyOf(project);
          // Tenure only shows on the first project under each company.
          const isFirstForCompany = index === 0 || companyName !== companyOf(projectData[index - 1]);

          return (
            <div
              key={project.id}
              className="project-stage-card"
              style={{ transform: `translateY(${offset * 100}%)`, transitionDuration: pushTransitionDuration }}
            >
              <div className="project-stage-card__inner">
                {/* Sits in the card's normal flow, so it scrolls and pushes
                    along with the card's content rather than holding its own
                    position at the top of the stage. */}
                {companyName && (
                  <div className="project-stage-card__header">
                    <div className="project-stage-card__header-info">
                      {COMPANY_LOGOS[companyName] && (
                        <img
                          src={COMPANY_LOGOS[companyName]}
                          alt={`${companyName} logo`}
                          className="project-stage-card__logo"
                        />
                      )}
                      <span className="project-stage-card__company">{companyName}</span>
                      <span className="project-stage-card__year-inline">{yearOnly(project)}</span>
                    </div>
                    {isFirstForCompany && COMPANY_TENURES[companyName] && (
                      <span className="project-stage-card__tenure">{COMPANY_TENURES[companyName]}</span>
                    )}
                  </div>
                )}

                <div className="project-card-row">
                  <ProjectCard
                    data={project}
                    variant="large"
                    buttonType="button"
                    onClick={
                      project.id === '10' || project.id === '11'
                        ? undefined
                        : () => handleCardClick(project.id)
                    }
                    showDivider={false}
                  />
                  {project.story && (
                    <div
                      // `is-active` drives the unfurl. It requires the section
                      // to actually be on screen, not just a matching index —
                      // `activeIndex` is 0 from mount, so keying off it alone
                      // played the first note's animation at page load, before
                      // the project list had been scrolled to.
                      className={`project-story-note-wrap${index % 2 === 0 ? " is-left" : " is-right"}${isSectionPinned && index === activeIndex ? " is-active" : ""}`}
                      style={{
                        ["--note-bg" as string]: NOTE_COLORS[index % NOTE_COLORS.length],
                        // Hold the unfurl until this card has finished its push.
                        ["--note-unfurl-delay" as string]: pushTransitionDuration,
                      } as React.CSSProperties}
                    >
                      <div className="project-story-note">{project.story}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ProjectScrollIndicator
        activeIndex={activeIndex}
        progress={holdProgress}
        total={projectData.length}
        visible={isSectionPinned}
      />
    </div>
  );
};

export default ProjectList;
