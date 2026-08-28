import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkle, CaretLeft, CaretRight } from "@phosphor-icons/react";
import homeIcon from "../utils/dock-icons/home.webp";
import figmaTrainingIcon from "../utils/dock-icons/figma-training.webp";
import photosIcon from "../utils/dock-icons/photos.webp";
import mailIcon from "../utils/dock-icons/mail.webp";
import mail from "../utils/dock-icons/mail.webp";
import "../styles/Dock.scss";

/* ── Magnification ───────────────────────────────────────────────────────────
   How much the icon directly under the pointer grows, and how far along the
   dock that growth is felt. AMPLITUDE is held below the point where a grown
   icon would overlap its neighbour at the base gap — the dock keeps a fixed
   width, so an icon that outgrew its slot would collide rather than push. At
   0.38 a peak icon and its neighbour together reach 13.6px into the 14px gap;
   the 0.45 that looked right by eye overlapped them by 4px. */
const AMPLITUDE = 0.38;

// Scrolling must move this far before the dock reacts, so small jitter and
// iOS rubber-banding do not flicker it.
const SCROLL_DELTA = 6;
// Above this the dock always shows — hiding it at the very top of the page
// reads as a glitch rather than as getting out of the way.
const ALWAYS_VISIBLE_ABOVE = 80;
// How close to the end of a case study counts as "the bottom". Generous enough
// to survive momentum and rubber-banding overshooting the last pixel.
const BOTTOM_REVEAL_PX = 48;

const EMAIL = "karan26796@gmail.com";
/** How long the tooltip holds "Email copied" before returning to the address. */
const COPIED_MS = 1800;
const SPREAD_PX = 78;

type DockItem = {
  id: string;
  label: string;
  /** An internal route. Without one the item is a tooltip, or an action. */
  to?: string;
  /** The assistant: the one item that acts in place rather than navigating. */
  onSelect?: () => void;
  /** Square artwork that fills the tile edge to edge. */
  art?: string;
  /** For an item with no artwork yet — the tile itself becomes the icon. */
  mark?: React.ReactNode;
  tone?: "agent" | "control";
  /** Accessible name, when the visible tooltip is not one. */
  ariaLabel?: string;
  /** Which viewports show this. Omitted means both. */
  show?: "mobile" | "desktop";
  /** Opens the divider that closes the pages group. */
  startsGroup?: boolean;
};

/**
 * A case study swaps the dock out for its own controls: back, home, forward.
 * They replace the bar that used to sit inside the reader, so the page itself
 * is nothing but the case study.
 *
 * Prev and next go out as events because the ordering lives in ProjectDetails,
 * which owns the project list — the same channel the assistant already uses.
 */
const buildProjectItems = (): DockItem[] => [
  {
    id: "prev",
    label: "Previous case study",
    onSelect: () => window.dispatchEvent(new Event("project:prev")),
    mark: <CaretLeft size={26} weight="bold" />,
    tone: "control",
  },
  { id: "home", label: "Home", to: "/home", art: homeIcon },
  {
    id: "next",
    label: "Next case study",
    onSelect: () => window.dispatchEvent(new Event("project:next")),
    mark: <CaretRight size={26} weight="bold" />,
    tone: "control",
  },
];

const buildItems = (copyEmail: () => void, agentOnDesktop: boolean): DockItem[] => [
  { id: "work", label: "Work", to: "/home", art: homeIcon },
  { id: "figma-training", label: "Figma training", to: "/figma-training", art: figmaTrainingIcon },
  { id: "travel", label: "Travel", to: "/gallery", art: photosIcon },

  // Hovering shows the address, clicking copies it. No mailto: it would hand
  // the visitor off to whatever mail client the OS decides to open, which on a
  // desktop is often nothing at all.
  {
    id: "mail",
    label: EMAIL,
    ariaLabel: `Copy email address, ${EMAIL}`,
    onSelect: copyEmail,
    art: mailIcon,
    startsGroup: true,
  },

  // Phones always; on desktop only where the floating button would be in the
  // way — over the photo canvas, which owns the whole viewport.
  {
    id: "agent",
    label: "Ask Agent Vinod",
    onSelect: () => window.dispatchEvent(new Event("open-agent-vinod")),
    mark: <Sparkle size={30} weight="fill" />,
    tone: "agent",
    show: agentOnDesktop ? undefined : "mobile",
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
  const dockRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  // Latest pointer position, read once per frame rather than once per event.
  const pointerX = useRef<number | null>(null);
  const frame = useRef<number | null>(null);

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

  const copyEmail = useCallback(() => {
    const confirm = () => {
      setCopied(true);
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

  // The photo canvas fills the viewport, so a floating button sits on top of
  // the photographs. There the assistant moves into the dock instead.
  const agentOnDesktop = location.pathname === "/gallery";
  const onProject = location.pathname.startsWith("/project/");
  // Read inside the scroll handler, which is bound once and would otherwise
  // close over whichever route was current when it was created.
  const onProjectRef = useRef(onProject);
  onProjectRef.current = onProject;
  const items = useMemo(
    () => (onProject ? buildProjectItems() : buildItems(copyEmail, agentOnDesktop)),
    [copyEmail, agentOnDesktop, onProject]
  );

  const isActive = (item: DockItem) =>
    item.to === "/home"
      ? location.pathname === "/home" || location.pathname === "/"
      : item.to === location.pathname;

  // Writes the scale straight onto each node. Going through React state here
  // would re-render the whole dock on every pointer move for a value that only
  // ever feeds a transform.
  const paint = useCallback(() => {
    frame.current = null;
    const x = pointerX.current;

    itemRefs.current.forEach((el) => {
      if (!el) return;
      if (x === null) {
        el.style.setProperty("--dock-scale", "1");
        return;
      }
      // offsetLeft is a layout value, so it ignores the transform we are about
      // to apply. Measuring with getBoundingClientRect instead would feed each
      // frame's scale back into the next frame's distance and make it judder.
      const center = el.offsetLeft + el.offsetWidth / 2;
      const distance = (x - center) / SPREAD_PX;
      el.style.setProperty(
        "--dock-scale",
        (1 + AMPLITUDE * Math.exp(-distance * distance)).toFixed(3)
      );
    });
  }, []);

  const schedule = useCallback(() => {
    if (frame.current === null) frame.current = requestAnimationFrame(paint);
  }, [paint]);

  // Magnification is a pointer affordance: it needs a real cursor, and it is
  // motion someone may have asked the system to spare them.
  const magnifies = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleMove = (e: React.PointerEvent<HTMLUListElement>) => {
    if (!magnifies() || !listRef.current) return;
    pointerX.current = e.clientX - listRef.current.getBoundingClientRect().left;
    schedule();
  };

  const handleLeave = () => {
    pointerX.current = null;
    schedule();
  };

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      if (copyTimer.current !== null) window.clearTimeout(copyTimer.current);
    },
    []
  );

  // Publishes how much room the dock takes along the bottom edge, so the
  // gallery's hint and the assistant button can sit above it. Measured rather
  // than derived in CSS: the earlier arithmetic version — tile plus padding
  // plus offset plus safe area — was 6px short of the rendered height, which
  // was enough for the hint to clip the dock.
  useEffect(() => {
    const publish = () => {
      const el = dockRef.current;
      if (!el) return;
      // offsetHeight and the resolved `bottom` are layout values, so they ignore
      // the transform that slides the dock away. getBoundingClientRect would
      // follow it, and anything sitting above the dock would jump as it hid.
      const bottom = parseFloat(getComputedStyle(el).bottom) || 0;
      document.documentElement.style.setProperty(
        "--dock-clearance",
        `${Math.round(el.offsetHeight + bottom + 12)}px`
      );
    };

    publish();
    const observer = new ResizeObserver(publish);
    if (dockRef.current) observer.observe(dockRef.current);
    window.addEventListener("resize", publish);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", publish);
      document.documentElement.style.removeProperty("--dock-clearance");
    };
  }, []);

  return (
    <div
      className={`dock${hidden ? " is-hidden" : ""}`}
      ref={dockRef}
      role="navigation"
      aria-label="Dock"
    >
      <ul
        className="dock__list"
        ref={listRef}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
      >
        {items.map((item, index) => {
          const active = Boolean(item.to) && isActive(item);
          const justCopied = item.id === "mail" && copied;
          const tile = (
            <>
              <span className={`dock__tile${item.tone ? ` dock__tile--${item.tone}` : ""}`}>
                {item.art ? <img src={item.art} alt="" /> : item.mark}
              </span>
              {/* Not aria-hidden on a tool: the tooltip is the only thing
                  naming it, and a tool is not focusable, so this text is what
                  a screen reader has to go on. */}
              <span className="dock__label" aria-hidden={item.to || item.onSelect ? true : undefined}>
                {justCopied ? "Email copied" : item.label}
              </span>
            </>
          );

          return (
            <li
              key={item.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={[
                "dock__item",
                item.show ? `dock__item--${item.show}-only` : "",
                item.startsGroup ? "dock__item--group-start" : "",
                active ? "is-active" : "",
                justCopied ? "is-copied" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {item.to ? (
                <Link to={item.to} className="dock__button" aria-label={item.label}>
                  {tile}
                </Link>
              ) : item.onSelect ? (
                <button
                  type="button"
                  className="dock__button"
                  onClick={item.onSelect}
                  aria-label={item.ariaLabel ?? item.label}
                >
                  {tile}
                </button>
              ) : (
                <span className="dock__button dock__button--static">{tile}</span>
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
