import React, { useEffect, useId, useRef, useState } from "react";
import { Sparkle, ArrowBendUpRight, CaretDown } from "@phosphor-icons/react";
import "../styles/AgentPromptCard.scss";

/**
 * A question on offer. The string form uses one text for both jobs; the pair
 * form lets the pill read short and first-person while still sending the
 * phrasing the knowledge base actually answers.
 */
export type AgentPromptQuestion = string | { label: string; ask: string };

export interface AgentPromptCardProps {
  /** The questions and answers this section shows. */
  faqs: { question: string; answer: string }[];
  /** Questions offered as pills. Each opens the chat already asking it. */
  questions: AgentPromptQuestion[];
  title?: string;
  /** Text introducing the pills. */
  prompt?: string;
  /** How many entries to show. Defaults to all of them. */
  points?: number;
}

/**
 * Announced while this section is on screen, so the assistant's floating
 * button can stand down: the section offers the same thing, with better
 * questions, and the button would be sitting on top of it.
 *
 * An event rather than a prop or a shared store — the button lives in
 * AISummarizer, mounted at the app shell, with no relationship to this card.
 * It is the same channel `open-agent-vinod` already travels on.
 */
export const AGENT_PROMPT_VISIBILITY = "agent-prompt:visible";

/**
 * Asked by a button that has just mounted, answered by the card with whatever
 * it last reported. Without it the handover only works in one direction: an
 * IntersectionObserver fires on *change*, so a button appearing while the card
 * is already on screen would never be told, and closing a case study — which
 * mounts a fresh button over a home page that never moved — did exactly that.
 */
export const AGENT_PROMPT_QUERY = "agent-prompt:query";

/**
 * A case study is a fixed overlay, and the home page stays mounted behind it
 * so that closing one returns you to where you were. The card is down there
 * too, geometrically on screen — and an IntersectionObserver measures geometry,
 * not whether anything is painted on top. Reporting itself visible from under
 * there hid the case study's own button, which is the only way to the
 * assistant while one is open.
 */
const isCovered = (section: Element) => {
  const overlay = document.querySelector(".reader-mode-overlay");
  // An overlay that *contains* this card is the card's own page, not something
  // on top of it — a case study renders one of these itself.
  return Boolean(overlay) && !overlay!.contains(section);
};

/** Opens the assistant, optionally with the question already asked. */
const askAgent = (question?: string) =>
  window.dispatchEvent(
    new CustomEvent("open-agent-vinod", { detail: question ? { question } : undefined })
  );

const AgentPromptCard: React.FC<AgentPromptCardProps> = ({
  faqs,
  questions,
  title = "FAQ",
  prompt = "You might ask",
  points = faqs.length,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  /**
   * Which answer is showing. One at a time: the questions are short and the
   * answers are not, and four open at once is the wall of text this section
   * exists to avoid.
   *
   * The first one starts open. A column of four shut boxes gives no sign of
   * what is inside them, and the opening answer both shows the shape of what a
   * row contains and makes it obvious the rows open at all.
   */
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const panelId = useId();
  /** Last raw intersection, so a late-mounting button can be answered. */
  const onScreen = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const announce = (visible: boolean) =>
      window.dispatchEvent(
        new CustomEvent(AGENT_PROMPT_VISIBILITY, { detail: { visible } })
      );
    // Only one card is ever uncovered at a time, and a covered one can only
    // ever report false, so the two never fight over the answer.
    const report = () => announce(onScreen.current && !isCovered(section));

    const observer = new IntersectionObserver(([entry]) => {
      onScreen.current = entry.isIntersecting;
      report();
    },
      // A slim negative inset, so the handover happens once the section is
      // properly in view rather than the instant its first pixel appears.
      { rootMargin: "-12% 0px -12% 0px" }
    );
    observer.observe(section);

    window.addEventListener(AGENT_PROMPT_QUERY, report);

    return () => {
      observer.disconnect();
      window.removeEventListener(AGENT_PROMPT_QUERY, report);
      // Leaving the page takes the section with it, and the button has to come
      // back — without this it stayed hidden for the rest of the session.
      announce(false);
    };
  }, []);

  const entries = faqs.slice(0, points);
  if (entries.length === 0) return null;

  return (
    <section className="agent-summary" ref={sectionRef} aria-label="Ask Agent Vinod">
      <h3 className="agent-summary__title">
        <Sparkle
          className="agent-summary__mark"
          size="1.05em"
          weight="fill"
          aria-hidden="true"
        />
        {title}
      </h3>

      {/* The questions, each opening onto its answer.
          Rows rather than a list: a question you can see the shape of is
          easier to scan than a paragraph you have to read to skip, and the
          answers are only a click away rather than all on the page at once.

          Answers may carry markup — they were authored for an accordion that
          rendered HTML, and several use lists and <strong>. See the <faq>
          block at the end of public/projects/Project8.md. */}
      <div className="agent-summary__faqs">
        {entries.map((faq, index) => {
          const isOpen = openIndex === index;
          const id = `${panelId}-${index}`;

          return (
            <div
              className={`agent-faq${isOpen ? " is-open" : ""}`}
              key={faq.question}
            >
              {/* The button lives inside a heading rather than being one.
                  It sits under the section's own h3, so the questions are h4s,
                  and wrapping rather than replacing keeps the whole row a
                  single control — a heading that is itself a button is not
                  reachable by heading navigation. */}
              <h4 className="agent-faq__heading">
              <button
                type="button"
                className="agent-faq__question"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="agent-faq__label">{faq.question}</span>
                {/* The chevron sits in a disc of its own, so the control has a
                    target and a resting shape even though the row it belongs
                    to has no surface. It turns over rather than swapping for a
                    second glyph. */}
                <span className="agent-faq__toggle" aria-hidden="true">
                  <CaretDown size="1em" weight="bold" />
                </span>
              </button>
              </h4>

              <div
                id={id}
                className="agent-faq__panel"
                role="region"
                // Closed, it is out of the reading order and the tab order —
                // otherwise any link inside an answer is reachable behind a
                // row that says it is shut.
                aria-hidden={!isOpen}
                {...(!isOpen ? { inert: "" as unknown as boolean } : {})}
              >
                {/* Two elements, not one. The outer is the clipping frame
                    and carries no padding of its own — see __answer in
                    AgentPromptCard.scss for why that matters — and the inner
                    one holds the copy and its spacing.

                    A paragraph, except where the answer brings its own block
                    markup: several of these are authored as lists (see the
                    <faq> block in public/projects/Project8.md), and a <ul>
                    inside a <p> is invalid — the parser closes the paragraph
                    before it, which would put the list outside the element
                    that carries the answer's spacing. */}
                <div className="agent-faq__answer">
                  {/<(ul|ol|p|div|h[1-6]|blockquote|table)\b/i.test(faq.answer) ? (
                    <div
                      className="agent-faq__answer-body"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  ) : (
                    <p
                      className="agent-faq__answer-body"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* One wrapping row rather than a scrolling rail: every question is worth
          the same, and half of them parked off the right edge meant the ones
          that happened to be first got asked. The lead-in is part of the row so
          it reads as a sentence running into the pills — which is also why the
          whole row goes when there are no questions, rather than leaving
          "You might ask" hanging on its own. */}
      {questions.length > 0 && (
      <div className="agent-summary__ask">
        <span className="agent-summary__lead">{prompt}</span>
        {questions.map((item) => {
          const label = typeof item === "string" ? item : item.label;
          const ask = typeof item === "string" ? item : item.ask;
          return (
            <button
              key={label}
              type="button"
              className="agent-summary__pill"
              onClick={() => askAgent(ask)}
              aria-label={`Ask Agent Vinod: ${ask}`}
            >
              <ArrowBendUpRight size="1em" aria-hidden="true" />
              {/* The label carries the gradient, so it needs an element of its
                  own to clip it to — background-clip on the button itself
                  would take the pill's fill with it. */}
              <span className="agent-summary__pill-label">{label}</span>
            </button>
          );
        })}
      </div>
      )}
    </section>
  );
};

export default AgentPromptCard;
