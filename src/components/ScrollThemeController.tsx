import { useEffect } from "react";

/**
 * Flips the site's data-theme from light to dark as the reader scrolls past
 * the project list: light for the intro + projects, dark from the community
 * section onward. Driven by element position rather than IntersectionObserver
 * enter/exit events so it resolves correctly however far the user scrolls or
 * jumps in either direction. Resets to dark (the rest of the site's default)
 * on unmount so navigating away from home doesn't leave other pages light.
 */
const ScrollThemeController: React.FC = () => {
  useEffect(() => {
    const root = document.documentElement;
    let ticking = false;

    const update = () => {
      ticking = false;
      const community = document.querySelector(".community-section");
      if (!community) {
        root.setAttribute("data-theme", "light");
        return;
      }

      const triggerY = window.innerHeight * 0.5;
      const communityTop = community.getBoundingClientRect().top;
      const shouldBeDark = communityTop <= triggerY;

      root.setAttribute("data-theme", shouldBeDark ? "dark" : "light");
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      root.setAttribute("data-theme", "dark");
    };
  }, []);

  return null;
};

export default ScrollThemeController;
