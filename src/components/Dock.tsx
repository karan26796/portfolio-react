import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, House } from "@phosphor-icons/react";
import { burstConfetti } from "../utils/confetti";
import "../styles/Dock.scss";

const SCROLL_DELTA = 6;
// Above this the dock always shows — hiding it at the very top of the page
// reads as a glitch rather than as getting out of the way.
const ALWAYS_VISIBLE_ABOVE = 80;
// How close to the end of a case study counts as "the bottom". Generous enough
// to survive momentum and rubber-banding overshooting the last pixel.
const BOTTOM_REVEAL_PX = 48;

const EMAIL = "karan26796@gmail.com";
/** What the tab reads before it is copied — enough to recognise, not to scrape. */
const EMAIL_MASKED = "karan*****@gmail.com";
/** How long the tooltip holds "Email copied" before returning to the address. */
const COPIED_MS = 1800;

type DockItem = {
  id: string;
  /** The pill's text. */
  label: string;
  /** Shown instead of `label` on a phone, where the row has to fit in 375px. */
  shortLabel?: string;
  /** An internal route. Without one the item is an action. */
  to?: string;
  onSelect?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Accessible name, where the visible text is not a good one. */
  ariaLabel?: string;
  /** Which viewports show this. Omitted means both. */
  show?: "mobile" | "desktop";
  /** Pushes this item, and everything after it, to the opposite corner. */
  startsGroup?: boolean;
  icon?: React.ReactNode;
  /** Which side of the text the icon sits on. Matches Buttons.tsx's naming. */
  iconDirection?: "left" | "right";
  /** Shows the icon alone; the label stays for screen readers. */
  iconOnly?: boolean;
};

/**
 * A case study swaps the dock out for its own two controls: out, and onward.
 * Home is an icon in one corner, Next in the other — going back is the one
 * move a reader can always make with the browser, so it does not need a
 * control of its own competing for the corner.
 *
 * Next goes out as an event because the ordering lives in ProjectDetails,
 * which owns the project list — the same channel the assistant already uses.
 */
const buildProjectItems = (): DockItem[] => [
  {
    id: "home",
    label: "Home",
    ariaLabel: "Home",
    to: "/home",
    icon: <House size="1.15em" weight="bold" />,
    iconOnly: true,
  },
  {
    id: "next",
    label: "Next",
    ariaLabel: "Next case study",
    onSelect: () => window.dispatchEvent(new Event("project:next")),
    icon: <ArrowRight size="1em" weight="bold" />,
    // After the word, so the arrow points out of the pill in the direction it
    // takes you rather than back at its own label.
    iconDirection: "right",
    // Sent to the far corner, so the two sit at opposite ends of the measure.
    startsGroup: true,
  },
];

const buildItems = (
  copyEmail: (e: React.MouseEvent<HTMLButtonElement>) => void,
  copied: boolean
): DockItem[] => [
    { id: "work", label: "Work", to: "/home" },
    { id: "figma-training", label: "Figma training", shortLabel: "Figma training", to: "/figma-training" },
    { id: "travel", label: "Travel", to: "/gallery" },

    // Clicking copies the address. No mailto: it would hand the visitor off to
    // whatever mail client the OS decides to open, which on a desktop is often
    // nothing at all. The label carries its own confirmation, since a pill has
    // no room for a tooltip beside it.
    {
      id: "mail",
      label: copied ? "Copied" : EMAIL_MASKED,
      // The masked address is too wide for a phone row of five, so there the tab
      // goes back to reading "Email" — the copy it performs is the same.
      shortLabel: copied ? "Copied" : "Email",
      ariaLabel: `Copy email address, ${EMAIL}`,
      onSelect: copyEmail,
      startsGroup: true,
    },
  ];

const Dock: React.FC = () => {
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const [hidden, setHidden] = useState(false);
  // Which element is being scrolled, and where it was last time we looked.
  const scrollState = useRef<{ y: number; target: EventTarget | null }>({
    y: 0,
    target: null,
  });
  const copyTimer = useRef<number | null>(null);

  useEffect(() => {
    // Not rAF-throttled on purpose: the threshold below already gates how often
    // this can change, and setting a boolean to its current value is a no-op in
    // React. rAF would also stall the dock in a backgrounded tab.
    const handleScroll = (e: Event) => {
      const target = e.target;
      const isDocument =
        target === document ||
        target === document.documentElement ||
        target === document.body;

      // Clamped because iOS reports negative values while overscrolling.
      const y = Math.max(
        0,
        isDocument ? window.scrollY : (target as HTMLElement).scrollTop
      );
      const last = scrollState.current;

      // A different element has taken over the scrolling — opening a case
      // study swaps the window for the reader's own scroller. Comparing a
      // position in one container against another is meaningless, so adopt the
      // new one first.
      if (target !== last.target) {
        const fresh = last.target === null;
        last.target = target;
        // After a route change the baseline is already 0 and the page really
        // does start at the top, so that first scroll can be judged normally.
        // Switching between two live scrollers cannot, so it costs one tick.
        if (!fresh) {
          last.y = y;
          return;
        }
      }

      // Reaching the end of a case study brings the dock back regardless of
      // direction: the reading is done, and what is wanted now is the way
      // onward. Checked before the threshold below so it still fires on the
      // last few pixels of a slow scroll.
      if (onProjectRef.current) {
        const scrollHeight = isDocument
          ? document.documentElement.scrollHeight
          : (target as HTMLElement).scrollHeight;
        const viewport = isDocument
          ? window.innerHeight
          : (target as HTMLElement).clientHeight;

        if (scrollHeight - viewport - y <= BOTTOM_REVEAL_PX) {
          setHidden(false);
          last.y = y;
          return;
        }
      }

      const diff = y - last.y;

      // The baseline only advances once the threshold is cleared, so a slow
      // scroll still accumulates into a direction rather than being swallowed.
      if (Math.abs(diff) < SCROLL_DELTA) return;

      setHidden(y > ALWAYS_VISIBLE_ABOVE && diff > 0);
      last.y = y;
    };

    // Capture phase, on document: scroll events do not bubble, so a listener
    // bound to the window only ever hears the window. A case study scrolls its
    // own element, and that scroll is invisible from up there — which is why
    // the dock neither hid nor came back while reading one.
    document.addEventListener("scroll", handleScroll, {
      capture: true,
      passive: true,
    });
    return () =>
      document.removeEventListener("scroll", handleScroll, { capture: true });
  }, []);

  // Any route change starts at the top, so the dock should be showing — and
  // the baseline belongs to a scroller that may no longer exist.
  useEffect(() => {
    setHidden(false);
    scrollState.current = { y: 0, target: null };
  }, [location.pathname]);

  const copyEmail = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    // Captured now: by the time the clipboard promise settles the event is
    // recycled, and the burst has to come from the tab that was pressed.
    const box = e.currentTarget.getBoundingClientRect();
    const originX = box.left + box.width / 2;
    const originY = box.top + box.height / 2;

    const confirm = () => {
      setCopied(true);
      burstConfetti(originX, originY);
      if (copyTimer.current !== null) window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), COPIED_MS);
    };

    // The async clipboard API needs a secure context, so it is missing over
    // plain http and rejects when the document is not focused. The old
    // execCommand path is the fallback rather than the primary because it is
    // deprecated — but a copy button that silently does nothing is worse.
    const fallback = () => {
      const field = document.createElement("textarea");
      field.value = EMAIL;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      try {
        document.execCommand("copy");
        confirm();
      } finally {
        document.body.removeChild(field);
      }
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(EMAIL).then(confirm, fallback);
    } else {
      fallback();
    }
  }, []);

  // The assistant is not a tab any more, at any width — the floating button
  // carries it everywhere now, including on a phone. Two doors to the same
  // room in one viewport was the reason it was ever conditional.
  const onProject = location.pathname.startsWith("/project/");
  // Read inside the scroll handler, which is bound once and would otherwise
  // close over whichever route was current when it was created.
  const onProjectRef = useRef(onProject);
  onProjectRef.current = onProject;
  const items = useMemo(
    () =>
      onProject ? buildProjectItems() : buildItems(copyEmail, copied),
    [copyEmail, copied, onProject]
  );

  const isActive = (item: DockItem) =>
    item.to === "/home"
      ? location.pathname === "/home" || location.pathname === "/"
      : item.to === location.pathname;

  useEffect(
    () => () => {
      if (copyTimer.current !== null) window.clearTimeout(copyTimer.current);
    },
    []
  );

  return (
    <div
      className={`dock${hidden ? " is-hidden" : ""}`}
      role="navigation"
      aria-label="Dock"
    >
      <ul className="dock__list">
        {items.map((item) => {
          const active = Boolean(item.to) && isActive(item);
          // A pill is its own label, so the text sits in the element rather
          // than in a tooltip beside it. The short form only exists where the
          // row has to fit a phone.
          const iconAfter = item.iconDirection === "right";
          const pill = (
            <>
              {!iconAfter && item.icon}
              <span className="dock__label">{item.label}</span>
              {item.shortLabel && (
                <span className="dock__label dock__label--short">{item.shortLabel}</span>
              )}
              {iconAfter && item.icon}
            </>
          );

          const className = [
            "dock__item",
            item.show ? `dock__item--${item.show}-only` : "",
            item.startsGroup ? "dock__item--group-start" : "",
            item.iconOnly ? "dock__item--icon-only" : "",
            active ? "is-active" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <li key={item.id} className={className}>
              {item.to ? (
                <Link
                  to={item.to}
                  className="dock__button"
                  aria-current={active ? "page" : undefined}
                >
                  {pill}
                </Link>
              ) : (
                <button
                  type="button"
                  className="dock__button"
                  onClick={item.onSelect}
                  aria-label={item.ariaLabel ?? item.label}
                >
                  {pill}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <span className="dock__sr-status" role="status" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
};

export default Dock;
