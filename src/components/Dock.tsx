import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkle } from "@phosphor-icons/react";
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
  tone?: "agent";
  /** Accessible name, when the visible tooltip is not one. */
  ariaLabel?: string;
  /** Which viewports show this. Omitted means both. */
  show?: "mobile" | "desktop";
  /** Opens the divider that closes the pages group. */
  startsGroup?: boolean;
};

const buildItems = (copyEmail: () => void): DockItem[] => [
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
    show: "desktop",
    startsGroup: true,
  },

  // Phones only. On desktop the assistant is the floating button again, which
  // is why nothing here carries it past the divider.
  {
    id: "agent",
    label: "Ask Agent Vinod",
    onSelect: () => window.dispatchEvent(new Event("open-agent-vinod")),
    mark: <Sparkle size={30} weight="fill" />,
    tone: "agent",
    show: "mobile",
  },
];

const Dock: React.FC = () => {
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number | null>(null);
  const dockRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  // Latest pointer position, read once per frame rather than once per event.
  const pointerX = useRef<number | null>(null);
  const frame = useRef<number | null>(null);

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

  const items = useMemo(() => buildItems(copyEmail), [copyEmail]);

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
      const { top } = el.getBoundingClientRect();
      document.documentElement.style.setProperty(
        "--dock-clearance",
        `${Math.round(window.innerHeight - top + 12)}px`
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
    <div className="dock" ref={dockRef} role="navigation" aria-label="Dock">
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
