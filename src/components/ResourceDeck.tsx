import React, { useEffect, useRef, useState } from "react";
import {
  FigmaLogo,
  YoutubeLogo,
  ArrowUpRight,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import resources, { Resource } from "../utils/resources";
import { cardDressingClass, tiltFor } from "../utils/tileDressing";
import "../styles/canvasCard.scss";
import "../styles/ResourceDeck.scss";

/**
 * Figma community files and videos, fanned out as a deck.
 *
 * A row of cards held at slight angles and overlapping, with the one under the
 * pointer straightening and coming forward.
 *
 * No titles anywhere: the thumbnail is the thing, and each card says only what
 * it is and how many people took it. The names are still carried on the links
 * themselves, so anything reading the page aloud announces them — they are
 * simply not drawn.
 */

interface ResourceDeckProps {
  title?: string;
  /** Overrides the default list — used by the tests and nothing else yet. */
  items?: Resource[];
}

/* The card's own width, and the widest the whole fan may be, both in em so
   they scale with the section's type. Kept here rather than in the stylesheet
   because the overlap between cards is worked out from them. */
const CARD_EM = 19;
const MAX_DECK_EM = 54;
/** The least two cards may overlap, however few there are. */
const MIN_OVERLAP_EM = 3.2;

/* Below this the fan gives way to the narrow arrangement — matched to the
   breakpoint in the stylesheet, which is the other half of the same decision. */
const NARROW_QUERY = "(max-width: 900px)";

/**
 * What the cards do on a narrow screen — the one switch for the whole
 * arrangement.
 *
 * 'scatter' lays them out the way the experiments stage lays out its tiles a
 * few hundred pixels above: a scattered grid of tilted cards at unequal widths
 * and vertical offsets, all of them on screen at once, scrolled past rather
 * than moved through. The two sections stand on one dotted board, so a phone
 * seeing a mosaic and then a single card with arrows read as two unrelated
 * blocks that happened to be adjacent.
 *
 * 'pile' is the original: the cards stacked one behind another, dealt by
 * tapping or swiping, with an arrow pair and a count beneath. It brings its
 * own machinery with it — autoplay, the swipe, a front card, the nav — all of
 * which this switch turns off together, because every piece of it is gated on
 * `stacked` below.
 *
 * Both are fully implemented, here and in ResourceDeck.scss. Flip this one
 * value to change back; nothing else needs touching.
 */
const NARROW_LAYOUT: 'scatter' | 'pile' = 'scatter';

/**
 * Where each card sits in the scatter, by index.
 *
 * Six columns and hand-placed, exactly as GRID_SCATTER is on the experiments
 * stage — the point is that the two read as the same arrangement, and a rule
 * that packed them automatically would not look hand-arranged. `offset` (px)
 * drops a card below the top of its row, applied as a margin so the row grows
 * to contain it and no card can ever be pushed over its neighbour. Cycles for
 * decks longer than the table. */
const SCATTER = [
  { row: 1, col: 1, span: 5, offset: 0 },
  { row: 2, col: 2, span: 5, offset: 22 },
  { row: 3, col: 1, span: 4, offset: 0 },
];

/** How many cards show either side of the one in front. */
const SIDE_CARDS = 1;

/** How far a drag has to travel before it counts as moving the deck on. */
const SWIPE_PX = 40;

/** How long each card holds the front while the deck turns itself over. */
const AUTOPLAY_MS = 4500;

/**
 * How far each card sits over the one before it.
 *
 * Derived from the number of cards rather than fixed, so the fan stays inside
 * its container as the deck grows. Three cards barely overlap; add the videos
 * and they close up into a proper deck with only a sliver of each showing,
 * which is the shape this was drawn from. A fixed overlap would simply have
 * run the row off the side of the page.
 */
function overlapEm(count: number): number {
  if (count < 2) return 0;
  return Math.max(MIN_OVERLAP_EM, (count * CARD_EM - MAX_DECK_EM) / (count - 1));
}

const KIND_LABEL: Record<Resource["kind"], string> = {
  figma: "Figma community",
  youtube: "YouTube",
};

/**
 * Whether the screen is too narrow for the fan.
 *
 * A fan needs hover to pull a card out of it, and a phone has none, so below
 * this width the cards take one of the two arrangements NARROW_LAYOUT chooses
 * between. Which one they take is the stylesheet's business; this exists
 * because a tap means something different in each, and only the component can
 * decide that.
 */
function useIsNarrow(): boolean {
  const [narrow, setNarrow] = useState(
    () => typeof window !== "undefined" && window.matchMedia?.(NARROW_QUERY).matches
  );

  useEffect(() => {
    const query = window.matchMedia?.(NARROW_QUERY);
    if (!query) return;
    const update = () => setNarrow(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return narrow;
}

const ResourceDeck: React.FC<ResourceDeckProps> = ({ title = "Downloaded 25k+ times", items }) => {
  const deck = items ?? resources;
  const narrow = useIsNarrow();
  /* Every piece of the pile's behaviour hangs off `stacked`, so leaving it
     false is the whole of turning the pile off: no autoplay, no swipe, no
     front card, no arrows. */
  const stacked = narrow && NARROW_LAYOUT === 'pile';
  const scattered = narrow && NARROW_LAYOUT === 'scatter';

  /**
   * Which card is in front. Only meaningful while stacked, but kept whatever
   * the width so rotating a phone mid-deck does not send it back to the start.
   */
  const [frontIndex, setFrontIndex] = useState(0);

  /**
   * Where a card sits relative to the one in front: negative to its left,
   * positive to its right.
   *
   * Wrapped, so the deck has no ends — the card before the first is the last
   * one, which is what lets you keep swiping in either direction rather than
   * hitting a wall.
   */
  const offsetFor = (index: number) => {
    const count = deck.length;
    let offset = index - frontIndex;
    if (offset > count / 2) offset -= count;
    if (offset < -count / 2) offset += count;
    return offset;
  };

  const step = (delta: number) =>
    setFrontIndex((current) => (current + delta + deck.length) % deck.length);

  /* Where a drag began, and whether the one just finished was long enough to
     count. The flag is what stops a swipe that ends on the front card from
     also being read as a tap on it and opening the link. */
  const dragRef = useRef<{ x: number; id: number } | null>(null);
  const swipedRef = useRef(false);

  const sectionRef = useRef<HTMLElement>(null);
  /**
   * Whether the deck is still turning itself over.
   *
   * Given up for good the moment the reader touches it — by swipe, tap, dot or
   * focus. Something that moves on its own and then keeps moving after you
   * have taken hold of it is fighting you, and the card you were reaching for
   * will not be there when your finger lands.
   */
  const [autoplay, setAutoplay] = useState(true);
  /**
   * Optimistically true, then corrected by the observer below — which in a
   * real browser reports on its first callback, before any card has turned.
   * Starting false instead would make the whole thing depend on that callback
   * arriving, and there is no reason to.
   */
  const [onScreen, setOnScreen] = useState(true);
  /**
   * Whether the cards have made their entrance.
   *
   * Starts false and is set once, the first time the section is reached — the
   * opposite of `onScreen` above, which is about whether to keep the deck
   * turning. If there is no observer to ask, the cards are simply already
   * there: an entrance that never runs would leave the whole section blank.
   */
  const [entered, setEntered] = useState(
    () => typeof IntersectionObserver === "undefined"
  );

  const stopAutoplay = () => setAutoplay(false);

  // No point turning a deck nobody is looking at.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setOnScreen(entry.isIntersecting);
        // One way only: once the cards are in, they stay in. Replaying the
        // entrance every time the section scrolls back past would turn a
        // flourish into a tic.
        if (entry.isIntersecting) setEntered(true);
      },
      { threshold: 0.25 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Only stacked: the fan shows every card at once, so it has no front card
    // to turn over.
    if (!stacked || !autoplay || !onScreen) return;
    // Motion nobody asked for is exactly what this setting is about.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(
      () => setFrontIndex((current) => (current + 1) % deck.length),
      AUTOPLAY_MS
    );
    return () => window.clearInterval(timer);
  }, [stacked, autoplay, onScreen, deck.length]);

  const handlePointerDown = (event: React.PointerEvent) => {
    if (!stacked) return;
    stopAutoplay();
    dragRef.current = { x: event.clientX, id: event.pointerId };
    swipedRef.current = false;
  };

  const handlePointerUp = (event: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!stacked || !drag || drag.id !== event.pointerId) return;
    dragRef.current = null;

    const travelled = event.clientX - drag.x;
    if (Math.abs(travelled) < SWIPE_PX) return;

    swipedRef.current = true;
    // Dragging left pulls the next card in from the right, the way a physical
    // deck moves under a thumb.
    step(travelled < 0 ? 1 : -1);
  };
  /**
   * Which card is in play — by pointer or by keyboard focus, equally.
   *
   * Only used to lift that card above its neighbours. The straightening is
   * CSS, but a card cannot raise its own stacking order above a later sibling
   * from a :hover rule, which is why the index is tracked here.
   */
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (deck.length === 0) return null;

  return (
    <section
      className={`resource-deck${entered ? " has-entered" : ""}`}
      aria-label={title}
      ref={sectionRef}
    >
      <header className="resource-deck__head">
        <h2 className="resource-deck__title">{title}</h2>
      </header>

      <ul
        className={`resource-deck__row${stacked ? " is-stacked" : ""}${
          scattered ? " is-scattered" : ""
        }`}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          dragRef.current = null;
        }}
        style={
          {
            "--card-w": `${CARD_EM}em`,
            "--overlap": `${overlapEm(deck.length).toFixed(2)}em`,
          } as React.CSSProperties
        }
      >
        {deck.map((item, index) => {
          /* Fanned symmetrically about the middle of the deck: the leftmost
             card leans one way, the rightmost the other, and the tilt is
             carried in a custom property so the hover state can cancel it
             without having to know which card it is. */
          /* Scattered, the tilt comes from the same cycle the experiments
             tiles use, so the two arrangements lean alike — and never at zero,
             which the fan's symmetric spread gives its middle card and which
             reads as one card hung straight by mistake. */
          const tilt = scattered
            ? tiltFor(index)
            : (index - (deck.length - 1) / 2) * 4.5;
          const place = SCATTER[index % SCATTER.length];
          /* Where this card sits in the deck: 0 is the one in front, the one
             a tap would follow. Anything further out than the cards peeking
             either side is held back, so a long deck does not become a
             smear of edges. */
          const offset = offsetFor(index);
          const distance = Math.abs(offset);
          const buried = stacked && distance > SIDE_CARDS;

          return (
            <li
              key={item.href}
              className={`resource-deck__slot${activeIndex === index ? " is-active" : ""}${buried ? " is-buried" : ""
                }`}
              style={
                {
                  "--tilt": `${tilt}deg`,
                  "--slot": index,
                  "--offset": offset,
                  // Staggered by position in the row, so the cards arrive one
                  // after another rather than as a single block.
                  "--enter-delay": `${index * 80}ms`,
                  // Passed separately because the transforms need the distance
                  // without its sign, and CSS abs() is too new to rely on.
                  "--distance": distance,
                  "--m-row": place.row,
                  "--m-col-start": place.col,
                  "--m-col-span": place.span,
                  "--m-offset": `${place.offset}px`,
                } as React.CSSProperties
              }
            >
              <a
                /* Dressed like everything else on the board it stands on —
                   see utils/tileDressing. */
                className={`resource-deck__card ${cardDressingClass()}`}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.title} — ${KIND_LABEL[item.kind]}, ${item.meta}`}
                onPointerEnter={() => setActiveIndex(index)}
                onPointerLeave={() => setActiveIndex((i) => (i === index ? null : i))}
                onFocus={() => {
                  stopAutoplay();
                  setActiveIndex(index);
                  // Focus has to reveal what it lands on, or tabbing through the
                  // deck moves an invisible outline around behind the front card.
                  if (stacked && offset !== 0) setFrontIndex(index);
                }}
                onBlur={() => setActiveIndex((i) => (i === index ? null : i))}
                onClick={(event) => {
                  stopAutoplay();
                  // A swipe that ends on a card is not a tap on it.
                  if (swipedRef.current) {
                    event.preventDefault();
                    swipedRef.current = false;
                    return;
                  }

                  /* In the deck, only the front card is the one on offer. A tap
                     on either of the ones peeking past it means "let me see
                     that one", which leaves the front card's tap free to do the
                     obvious thing and open it. */
                  if (stacked && offset !== 0) {
                    event.preventDefault();
                    setFrontIndex(index);
                  }
                }}
              >
                <span className="resource-deck__media">
                  <img src={item.thumbnail} alt="" loading="lazy" decoding="async" />
                </span>

                <span className="resource-deck__foot">
                  <span className="resource-deck__kind">
                    {item.kind === "figma" ? (
                      <FigmaLogo size={14} weight="bold" />
                    ) : (
                      <YoutubeLogo size={14} weight="fill" />
                    )}
                    {item.meta}
                  </span>
                  <ArrowUpRight size={14} weight="bold" className="resource-deck__go" />
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      {/* Only on the pile. The dots that were here said which card was up but
          took a precise tap on a 7px target to use; a pair of arrows is the
          thing people reach for, and the count keeps what the dots said about
          how many there are. */}
      {stacked && deck.length > 1 && (
        <div className="resource-deck__nav">
          <button
            type="button"
            className="resource-deck__nav-button"
            onClick={() => {
              stopAutoplay();
              step(-1);
            }}
            aria-label="Previous"
          >
            <CaretLeft size={13} weight="bold" />
          </button>

          {/* Polite, not announced: the cards themselves are the content, and
              a live count read out on every arrow press would be noise. */}
          <span className="resource-deck__nav-count" aria-hidden="true">
            {frontIndex + 1} / {deck.length}
          </span>

          <button
            type="button"
            className="resource-deck__nav-button"
            onClick={() => {
              stopAutoplay();
              step(1);
            }}
            aria-label="Next"
          >
            <CaretRight size={13} weight="bold" />
          </button>
        </div>
      )}
    </section>
  );
};

export default ResourceDeck;
