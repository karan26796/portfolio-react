import React, { useEffect, useRef } from "react";
import { Sparkle, ArrowBendUpRight } from "@phosphor-icons/react";
import "../styles/AgentPromptCard.scss";

/**
 * A question on offer. The string form uses one text for both jobs; the pair
 * form lets the pill read short and first-person while still sending the
 * phrasing the knowledge base actually answers.
 */
export type AgentPromptQuestion = string | { label: string; ask: string };

export interface AgentPromptCardProps {
  /** The FAQ entries this summary distils. Only their answers are used. */
  faqs: { question: string; answer: string }[];
  /** Questions offered as pills. Each opens the chat already asking it. */
  questions: AgentPromptQuestion[];
  title?: string;
  /** Text introducing the pills. */
  prompt?: string;
  /** How many summary lines to show. */
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

/**
 * The plain text of an answer.
 *
 * Answers may be HTML. The accordion these were written for rendered them with
 * dangerouslySetInnerHTML, so authors used lists and <strong> freely — see the
 * <faq> block at the end of public/projects/Project8.md. This summary is plain
 * text, so the markup has to come out rather than be printed as a literal
 * "<ul><li><strong>", which is exactly what it did.
 */
const toPlainText = (answer: string): string => {
  const stripped = answer.replace(/<[^>]*>/g, " ");
  // Entities are decoded by handing the string to a textarea and reading its
  // value back. A textarea's content model is plain text, so nothing in there
  // can become an element or fire a handler on the way through — which
  // assigning to innerHTML on, say, a div would allow.
  const decoder = document.createElement("textarea");
  decoder.innerHTML = stripped;
  return decoder.value.replace(/\s+/g, " ").trim();
};

/**
 * The opening sentence of an answer.
 *
 * Drawn from the FAQ answers rather than written separately, so the summary can
 * never claim something the page below it does not say. Abbreviations are the
 * catch — "e.g." and the like would split a sentence in the wrong place — so
 * the break has to be a full stop followed by a capital.
 */
const openingSentence = (answer: string): string => {
  const trimmed = toPlainText(answer);
  const match = trimmed.match(/^(.+?[.!?])\s+[A-Z]/);
  const sentence = (match ? match[1] : trimmed).trim();
  return sentence.replace(/[.]$/, "");
};

const AgentPromptCard: React.FC<AgentPromptCardProps> = ({
  faqs,
  questions,
  title = "A quick summary",
  prompt = "You might ask",
  points = 3,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
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

  const summary = faqs.slice(0, points).map((faq) => openingSentence(faq.answer));
  if (summary.length === 0) return null;

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

      <ul className="agent-summary__points">
        {summary.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

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
