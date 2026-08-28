import { useEffect } from "react";

/**
 * Publishes `--page-accent` on :root from whichever `[data-accent]` section is
 * most on screen, so the page's top wash takes its colour from what you're
 * currently looking at.
 *
 * Reads the accent off the DOM rather than taking a list of sections as props:
 * the sections are spread across App, ProjectList and the section components,
 * and threading a colour down to each of them would couple all of them to this.
 * A `data-accent` attribute lets a section declare its own colour and stay
 * otherwise unaware.
 *
 * `contentKey` re-runs the query when the page's sections change — the project
 * cards mount after their data loads, so a one-shot query on mount would miss
 * every one of them.
 */
export function useSectionAccent(defaultAccent: string, contentKey: unknown = null) {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-accent]")
    );
    const root = document.documentElement;

    if (sections.length === 0) {
      root.style.setProperty("--page-accent", defaultAccent);
      return;
    }

    // How much of each section is on screen right now. The winner is simply
    // the largest — with tall sections and a short viewport, "most visible"
    // tracks what someone is actually reading better than "first to cross a
    // threshold", which flickers between neighbours at a boundary.
    const visibility = new Map<Element, number>();

    const apply = () => {
      let winner: HTMLElement | null = null;
      let best = 0;

      visibility.forEach((ratio, el) => {
        if (ratio > best) {
          best = ratio;
          winner = el as HTMLElement;
        }
      });

      root.style.setProperty(
        "--page-accent",
        (winner?.dataset.accent || defaultAccent).trim()
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          visibility.set(
            entry.target,
            entry.isIntersecting ? entry.intersectionRatio : 0
          )
        );
        apply();
      },
      // A spread of thresholds rather than one: the ratio needs to update as a
      // section scrolls through, not only as it enters and leaves.
      { threshold: [0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1] }
    );

    sections.forEach((el) => observer.observe(el));
    apply();

    return () => {
      observer.disconnect();
      root.style.removeProperty("--page-accent");
    };
  }, [defaultAccent, contentKey]);
}
