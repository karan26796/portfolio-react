import React, { useEffect, useRef, useState } from "react";

/* ============================================================
   AWARD PROGRAMS — CASE STUDY PAGE
   Drop-in page component for Karan's React portfolio.
   - All copy is final-draft quality; edit freely.
   - Every screenshot slot is a <Slot/> placeholder that tells
     you exactly which Figma frame to export into it.
   - The two loop diagrams and the two-path diagram are real
     SVGs (no export needed).
   ============================================================ */

const T = {
  paper: "#FBFBFD",
  ink: "#17142B",
  inkSoft: "#4A4562",
  purple: "#5B3DF5",
  purpleDeep: "#2A1D6E",
  purpleSoft: "#EFEBFF",
  line: "#E4E2EE",
  dotted: "#A6A3B8",
  amber: "#9A6410",
  amberBg: "#FCF3DF",
  blue: "#2E6FE8",
  blueBg: "#E7EFFD",
  green: "#1E8E5A",
  greenBg: "#E3F5EC",
};

/* ---------- status chip (mirrors the product's badge language) ---------- */
function Chip({ tone = "amber", children }) {
  const map = {
    amber: { c: T.amber, bg: T.amberBg },
    blue: { c: T.blue, bg: T.blueBg },
    green: { c: T.green, bg: T.greenBg },
    purple: { c: T.purple, bg: T.purpleSoft },
    grey: { c: T.inkSoft, bg: "#EFEEF5" },
  };
  const s = map[tone];
  return (
    <span className="chip" style={{ color: s.c, background: s.bg }}>
      {children}
    </span>
  );
}

/* ---------- image placeholder slot ---------- */
function Slot({ label, pull, ratio = "16/9", note }) {
  return (
    <figure className="slot" style={{ aspectRatio: ratio }}>
      <div className="slot-inner">
        <span className="slot-label">IMAGE · {label}</span>
        <span className="slot-pull">{pull}</span>
        {note && <span className="slot-note">{note}</span>}
      </div>
    </figure>
  );
}

/* ---------- reveal-on-scroll wrapper ---------- */
function Reveal({ children, as: Tag = "div", className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}

/* ---------- lifecycle loop diagram ---------- */
function LoopDiagram({ broken = true, size = 340 }) {
  const stages = [
    { name: "Set up", online: true },
    { name: "Nominate", online: true },
    { name: "Justify", online: !broken },
    { name: "Review", online: !broken },
    { name: "Decide", online: !broken },
    { name: "Announce", online: true },
  ];
  const r = size * 0.36;
  const cx = size / 2;
  const cy = size / 2;
  const gap = 14; // degrees of gap between segments
  const seg = 60 - gap;

  const arc = (startDeg) => {
    const a0 = ((startDeg - 90) * Math.PI) / 180;
    const a1 = ((startDeg + seg - 90) * Math.PI) / 180;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    return `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  };
  const labelPos = (startDeg) => {
    const mid = ((startDeg + seg / 2 - 90) * Math.PI) / 180;
    return {
      x: cx + (r + 34) * Math.cos(mid),
      y: cy + (r + 34) * Math.sin(mid),
    };
  };

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      style={{ maxWidth: size, display: "block", margin: "0 auto" }}
      role="img"
      aria-label={
        broken
          ? "Award lifecycle loop with the justify, review, and decide stages leaking offline"
          : "Award lifecycle loop, fully closed on the platform"
      }
    >
      {stages.map((s, i) => {
        const start = i * 60 + gap / 2;
        const lp = labelPos(start);
        return (
          <g key={s.name}>
            <path
              d={arc(start)}
              fill="none"
              stroke={s.online ? T.purple : T.dotted}
              strokeWidth={s.online ? 7 : 4}
              strokeLinecap="round"
              strokeDasharray={s.online ? "none" : "3 9"}
            />
            <text
              x={lp.x}
              y={lp.y}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                font: `600 12px 'IBM Plex Mono', monospace`,
                fill: s.online ? T.purpleDeep : T.dotted,
              }}
            >
              {s.name}
            </text>
            {!s.online && (
              <text
                x={lp.x}
                y={lp.y + 16}
                textAnchor="middle"
                style={{ font: `400 10px 'IBM Plex Mono', monospace`, fill: T.dotted }}
              >
                offline
              </text>
            )}
          </g>
        );
      })}
      <text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        style={{ font: `600 13px 'IBM Plex Mono', monospace`, fill: broken ? T.inkSoft : T.green }}
      >
        {broken ? "THE LOOP," : "THE LOOP,"}
      </text>
      <text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        style={{ font: `600 13px 'IBM Plex Mono', monospace`, fill: broken ? T.inkSoft : T.green }}
      >
        {broken ? "BROKEN" : "CLOSED"}
      </text>
    </svg>
  );
}

/* ---------- two-path boundary diagram ---------- */
function TwoPathDiagram() {
  return (
    <svg viewBox="0 0 460 190" width="100%" style={{ maxWidth: 460, display: "block", margin: "0 auto" }} role="img" aria-label="Two winner decision paths, both ending in a recorded outcome">
      <g style={{ font: `500 12px 'IBM Plex Mono', monospace` }}>
        <rect x="10" y="20" width="190" height="44" rx="8" fill={T.purpleSoft} />
        <text x="105" y="46" textAnchor="middle" fill={T.purpleDeep}>Winner already known</text>
        <rect x="10" y="120" width="190" height="44" rx="8" fill="#EFEEF5" />
        <text x="105" y="140" textAnchor="middle" fill={T.inkSoft}>Winner debated</text>
        <text x="105" y="156" textAnchor="middle" fill={T.dotted}>(in a room — that's fine)</text>
        <path d="M 200 42 C 260 42 260 88 300 92" fill="none" stroke={T.purple} strokeWidth="2.5" />
        <path d="M 200 142 C 260 142 260 96 300 92" fill="none" stroke={T.dotted} strokeWidth="2.5" strokeDasharray="3 7" />
        <rect x="300" y="70" width="150" height="44" rx="8" fill={T.ink} />
        <text x="375" y="96" textAnchor="middle" fill="#fff">Outcome recorded</text>
      </g>
    </svg>
  );
}

/* ---------- role workspace tabs ---------- */
function RoleTabs() {
  const roles = [
    {
      key: "Nominator",
      line: "Sees an evaluation form and their submitted nominees — nothing else.",
      slot: {
        label: "NOMINATOR WORKSPACE",
        pull: "Figma → Admin flow → Section 2 → Nominator column → “Evaluation form” or “Nominee added” state",
      },
    },
    {
      key: "Reviewer",
      line: "Sees nominations awaiting their judgment, with approve, decline, and send-back actions.",
      slot: {
        label: "N-LEVEL REVIEWER WORKSPACE",
        pull: "Figma → Admin flow → Section 2 → N-level Nominator/Reviewer column → “Initial state”",
      },
    },
    {
      key: "Panelist",
      line: "Sees the full evidence trail per nominee, and selects winners.",
      slot: {
        label: "PANELIST WORKSPACE",
        pull: "Figma → Admin flow → Section 2 → Panelist column",
      },
    },
  ];
  const [active, setActive] = useState(0);
  const r = roles[active];
  return (
    <div className="roletabs">
      <div className="roletabs-bar" role="tablist" aria-label="Role workspaces">
        {roles.map((role, i) => (
          <button
            key={role.key}
            role="tab"
            aria-selected={i === active}
            className={`roletab ${i === active ? "active" : ""}`}
            onClick={() => setActive(i)}
          >
            {role.key}
          </button>
        ))}
      </div>
      <p className="roletabs-line">{r.line}</p>
      <Slot label={r.slot.label} pull={r.slot.pull} ratio="16/10" />
    </div>
  );
}

/* ---------- section shell ---------- */
function Section({ chip, chipTone = "purple", title, wide = false, children }) {
  return (
    <Reveal as="section" className={`section ${wide ? "wide" : ""}`}>
      {chip && (
        <div className="eyebrow">
          <Chip tone={chipTone}>{chip}</Chip>
        </div>
      )}
      {title && <h2 className="h2">{title}</h2>}
      {children}
    </Reveal>
  );
}

/* ============================================================ */

export default function AwardProgramsCaseStudy() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <main className="cs">
      <style>{`
        .cs {
          --paper: ${T.paper}; --ink: ${T.ink}; --ink-soft: ${T.inkSoft};
          --purple: ${T.purple}; --purple-deep: ${T.purpleDeep};
          --purple-soft: ${T.purpleSoft}; --line: ${T.line}; --dotted: ${T.dotted};
          background: var(--paper); color: var(--ink);
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 17px; line-height: 1.65;
          -webkit-font-smoothing: antialiased;
        }
        .cs * { box-sizing: border-box; margin: 0; }

        /* ---- hero ---- */
        .hero {
          background: var(--purple-deep); color: #fff;
          padding: clamp(72px, 12vw, 140px) 24px clamp(56px, 9vw, 110px);
          position: relative; overflow: hidden;
        }
        .hero-in { max-width: 1060px; margin: 0 auto; position: relative; z-index: 1; }
        .hero-kicker {
          font: 500 13px 'IBM Plex Mono', monospace; letter-spacing: .14em;
          color: #B9A9FF; text-transform: uppercase; margin-bottom: 22px;
        }
        .hero h1 {
          font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700;
          font-size: clamp(40px, 7vw, 84px); line-height: 1.02;
          letter-spacing: -0.02em; max-width: 13ch;
        }
        .hero h1 em { font-style: normal; color: #B9A9FF; }
        .hero-sub {
          margin-top: 26px; max-width: 56ch; font-size: clamp(17px, 2vw, 20px);
          color: #D8D2F2; line-height: 1.6;
        }
        .hero-loop {
          position: absolute; right: -60px; top: 50%; transform: translateY(-50%);
          width: min(46vw, 520px); opacity: .35; pointer-events: none;
        }
        .hero-loop circle { fill: none; stroke: #8F79FF; stroke-width: 3; }
        .hero-loop .dash { stroke-dasharray: 6 14; animation: spin 40s linear infinite; transform-origin: center; }
        @media (prefers-reduced-motion: reduce) { .hero-loop .dash { animation: none; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .meta {
          display: flex; flex-wrap: wrap; gap: 28px 48px; margin-top: 54px;
          padding-top: 28px; border-top: 1px solid rgba(255,255,255,.18);
        }
        .meta dt { font: 500 11px 'IBM Plex Mono', monospace; letter-spacing: .12em; color: #9E8FE0; text-transform: uppercase; margin-bottom: 6px; }
        .meta dd { font-size: 15px; color: #ECE8FB; }

        /* ---- sections ---- */
        .section { max-width: 720px; margin: 0 auto; padding: clamp(56px, 8vw, 96px) 24px 0; }
        .section.wide { max-width: 1060px; }
        .eyebrow { margin-bottom: 18px; }
        .chip {
          display: inline-block; font: 600 12px 'IBM Plex Mono', monospace;
          letter-spacing: .06em; padding: 5px 12px; border-radius: 999px;
        }
        .h2 {
          font-family: 'Bricolage Grotesque', sans-serif; font-weight: 600;
          font-size: clamp(26px, 3.6vw, 38px); line-height: 1.15;
          letter-spacing: -0.015em; margin-bottom: 22px; max-width: 24ch;
        }
        .section p { color: var(--ink-soft); margin-bottom: 18px; max-width: 66ch; }
        .section p strong { color: var(--ink); font-weight: 600; }
        .lead { font-size: 19px; color: var(--ink); }

        .pull {
          border-left: 3px solid var(--purple); padding: 6px 0 6px 24px;
          margin: 34px 0; font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(21px, 2.6vw, 27px); font-weight: 600; line-height: 1.3;
          color: var(--purple-deep); max-width: 26ch;
        }

        /* ---- placeholder slots ---- */
        .slot {
          width: 100%; border: 2px dashed var(--purple); border-radius: 14px;
          background: repeating-linear-gradient(-45deg, #F5F3FC, #F5F3FC 14px, #F0EDFA 14px, #F0EDFA 28px);
          display: grid; place-items: center; margin: 28px 0; padding: 20px;
        }
        .slot-inner { text-align: center; background: #fff; border-radius: 10px; padding: 18px 26px; max-width: 92%; box-shadow: 0 1px 4px rgba(23,20,43,.06); }
        .slot-label { display: block; font: 600 13px 'IBM Plex Mono', monospace; letter-spacing: .12em; color: var(--purple-deep); }
        .slot-pull { display: block; margin-top: 8px; font-size: 13.5px; color: var(--ink-soft); }
        .slot-note { display: block; margin-top: 6px; font: 400 12px 'IBM Plex Mono', monospace; color: var(--dotted); }

        /* ---- grids ---- */
        .split { display: grid; grid-template-columns: 1.05fr .95fr; gap: 48px; align-items: center; }
        .twoup { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 30px; }
        .tile { border: 1px solid var(--line); border-radius: 14px; padding: 26px 22px; background: #fff; }
        .tile .num { font: 600 12px 'IBM Plex Mono', monospace; color: var(--purple); letter-spacing: .1em; }
        .tile h3 { font-family: 'Bricolage Grotesque', sans-serif; font-size: 19px; font-weight: 600; margin: 12px 0 8px; }
        .tile p { font-size: 14.5px; margin: 0; }
        @media (max-width: 860px) {
          .split, .twoup, .tiles { grid-template-columns: 1fr; }
          .hero-loop { display: none; }
        }

        /* ---- filmstrip ---- */
        .strip { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; gap: 12px; align-items: center; margin: 28px 0; }
        .strip .arrow { font: 600 20px 'IBM Plex Mono', monospace; color: var(--purple); }
        .strip .slot { margin: 0; }
        @media (max-width: 860px) { .strip { grid-template-columns: 1fr; } .strip .arrow { transform: rotate(90deg); justify-self: center; } }

        /* ---- captioned sequence ---- */
        .seq { display: grid; gap: 8px; margin-top: 10px; }
        .seq figcaption { font: 500 14px 'IBM Plex Mono', monospace; color: var(--ink-soft); margin: -14px 0 26px 4px; }

        /* ---- role tabs ---- */
        .roletabs { margin-top: 26px; }
        .roletabs-bar { display: inline-flex; gap: 6px; background: #EFEEF5; padding: 6px; border-radius: 12px; }
        .roletab {
          font: 600 14px 'Inter', sans-serif; color: var(--ink-soft);
          border: 0; background: transparent; padding: 9px 20px; border-radius: 8px; cursor: pointer;
        }
        .roletab.active { background: #fff; color: var(--purple-deep); box-shadow: 0 1px 4px rgba(23,20,43,.12); }
        .roletab:focus-visible { outline: 2px solid var(--purple); outline-offset: 2px; }
        .roletabs-line { margin-top: 18px; color: var(--ink-soft); }

        /* ---- quiet boundary section ---- */
        .quiet { background: #fff; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); margin-top: clamp(56px, 8vw, 96px); padding-bottom: clamp(56px, 8vw, 96px); }
        .quiet .section { padding-top: clamp(56px, 8vw, 96px); }

        /* ---- results ---- */
        .timeline { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin: 30px 0 8px; }
        .timeline .t-arrow { color: var(--dotted); font: 600 15px 'IBM Plex Mono', monospace; }

        /* ---- reflection / footer ---- */
        .footer { text-align: center; padding: clamp(72px, 10vw, 120px) 24px; }
        .footer .loopline { font: 500 13px 'IBM Plex Mono', monospace; letter-spacing: .14em; color: var(--purple); text-transform: uppercase; }
        .footer h2 { font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(24px, 3.4vw, 34px); font-weight: 600; margin-top: 14px; }

        /* ---- reveal ---- */
        .reveal { opacity: 0; transform: translateY(16px); transition: opacity .6s ease, transform .6s ease; }
        .reveal.in { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) { .reveal { opacity: 1; transform: none; transition: none; } }
      `}</style>

      {/* ================= HERO ================= */}
      <header className="hero">
        <svg className="hero-loop" viewBox="0 0 400 400" aria-hidden="true">
          <circle className="dash" cx="200" cy="200" r="160" />
          <circle cx="200" cy="200" r="120" opacity=".4" />
        </svg>
        <div className="hero-in">
          <p className="hero-kicker">Keka HR · Rewards &amp; Recognition · 2025–26</p>
          <h1>
            Closing <em>the loop</em> on award programs
          </h1>
          <p className="hero-sub">
            Companies announced their awards on Keka — but decided them over email, spreadsheets,
            and meeting rooms. I revamped the Award Programs module from one rigid nomination flow
            into a configurable program lifecycle that companies of every size can run end to end.
          </p>
          <dl className="meta">
            <div><dt>Role</dt><dd>Senior Product Designer — end-to-end</dd></div>
            <div><dt>Scope</dt><dd>Admin setup · Nomination · N-level review · Winner selection</dd></div>
            <div><dt>Team</dt><dd>1 designer · PM · engineering pod</dd></div>
            <div><dt>Platform</dt><dd>Keka HR — Engage / Rewards</dd></div>
          </dl>
        </div>
      </header>

      {/* Hero screenshot */}
      <Section wide>
        <Slot
          label="FULL-BLEED HERO SCREEN"
          pull="Export: HR-1617 program detail (or HR-1614 landing) in a browser-chrome mockup, 16:9"
          note="Same chrome + shadow treatment for every screen on this page"
          ratio="16/9"
        />
      </Section>

      {/* ================= CONTEXT ================= */}
      <Section chip="Context" chipTone="grey" title="A feature that existed — and a process that didn't">
        <p className="lead">
          Award Programs is how companies on Keka run rewards and recognition: quarterly awards,
          annual awards, launch-specific awards — whatever cadence they choose.
        </p>
        <p>
          The module wasn't new. Screens existed, companies used them. This was a <strong>revamp</strong>,
          which meant the real work started with diagnosis: if the feature works, why does the
          process keep leaving the platform?
        </p>
        <Slot
          label="INLINE STRIP · ~50% width"
          pull="Export: crop of the three program cards from HR-1614 (“Nominations pending” badges visible)"
          ratio="21/6"
        />
      </Section>

      {/* ================= PROBLEM ================= */}
      <Section wide chip="Problem" chipTone="amber" title="The award got announced on Keka. It didn't get decided there.">
        <div className="split">
          <div>
            <p>
              The old module supported exactly one shape of program: <strong>nominations were
              mandatory</strong>, <strong>nominators were a blunt program-level setting</strong>, and
              nominations went <strong>straight to panelists</strong> with no review in between.
            </p>
            <p>
              If a company's process matched that shape — great. For most, it didn't. So the
              justification, the reviews, and the decision leaked into email threads, spreadsheets,
              and meeting rooms. The platform hosted a fraction of the process and none of the judgment.
            </p>
            <div className="pull">Companies weren't missing the feature. They were missing the loop.</div>
          </div>
          <LoopDiagram broken />
        </div>
      </Section>

      {/* ================= INSIGHT ================= */}
      <Section wide chip="Insight" chipTone="purple" title="There is no “one” award process">
        <p>
          Talking to customers and CS surfaced the actual diagnosis: award processes vary along
          three independent axes. The old design had hard-coded one position on each.
        </p>
        <div className="tiles">
          <div className="tile">
            <span className="num">AXIS 1</span>
            <h3>Nominations are optional</h3>
            <p>Sometimes leadership already knows the winner. Forcing a nomination ceremony on them wasn't rigor — it was friction.</p>
          </div>
          <div className="tile">
            <span className="num">AXIS 2</span>
            <h3>Nominators are role-scoped</h3>
            <p>Organizations think in roles — reporting managers, skip-levels, department heads — not a flat program-level list.</p>
          </div>
          <div className="tile">
            <span className="num">AXIS 3</span>
            <h3>Review scales 0 → N</h3>
            <p>A 200-person company goes straight to a panel. A 5,000-person company wants a chain of reviews first.</p>
          </div>
        </div>
      </Section>

      {/* ================= DECISION 1 ================= */}
      <Section wide chip="Decision 01" chipTone="purple" title="Branch the wizard — don't bloat it">
        <p>
          Program creation is now a three-step wizard — <strong>Basic details → Nomination
          workflow → Review details</strong> — and it forks on one question:
          <strong> do you want nominations at all?</strong> Answer no, and the setup ends in a
          minute; panelists pick winners directly. Answer yes, and the nominator and review
          sections reveal themselves.
        </p>
        <p>
          Configurability usually costs comprehension. Progressive disclosure was the tradeoff
          management: complexity only appears when the choice that creates it is made.
        </p>
        <div className="twoup">
          <Slot
            label="WIZARD · NO NOMINATIONS"
            pull="Export: “No nominations required” modal variant (short)"
            ratio="3/4"
          />
          <Slot
            label="WIZARD · NOMINATIONS + REVIEW"
            pull="Export: “Nominations required” variant — roles + review section visible. Highlight the Yes/No radio as the fork."
            ratio="3/4"
          />
        </div>
        <Slot
          label="ANNOTATED CROP · ~70% width"
          pull="Export: nominator-roles section (Reporting manager · L2 · Dotted line · Dept head · HR admin) with pins ①②③"
          ratio="21/8"
        />
      </Section>

      {/* ================= DECISION 2 ================= */}
      <Section wide chip="Decision 02" chipTone="purple" title="A name on a list is not a case">
        <p>
          The connective tissue of the whole system is the <strong>nomination questionnaire</strong>.
          While setting up an award category, admins attach structured questions every nominator
          must answer about their nominee.
        </p>
        <p>
          It isn't a form-builder feature — it's what makes downstream judgment possible. A
          level-two reviewer can't evaluate a bare name. A panelist can't compare bare names.
          The questionnaire turns every nomination into evidence, and one setup decision ends up
          serving three personas.
        </p>
        <div className="strip">
          <Slot label="AWARD DETAILS" pull="Export: category modal step 1" ratio="3/4" />
          <span className="arrow" aria-hidden="true">→</span>
          <Slot label="ADD CATEGORY" pull="Export: category modal step 2" ratio="3/4" />
          <span className="arrow" aria-hidden="true">→</span>
          <Slot label="QUESTIONNAIRE" pull="Export: nomination questionnaire builder" ratio="3/4" />
        </div>
      </Section>

      {/* ================= DECISION 3 ================= */}
      <Section chip="Decision 03" chipTone="purple" title="Reviews that survive contact with reality">
        <p>
          Larger companies wanted scrutiny between nomination and decision — a single HR check, or
          a full chain: reporting manager, skip-level, department head. The wizard supports
          <strong> zero, one, or N review levels</strong>. But the interesting design work was in
          how a review chain behaves when a reviewer <em>isn't convinced</em>.
        </p>
        <div className="seq">
          <figure>
            <Slot label="REVIEWER · INITIAL STATE" pull="Export: Section 2 → N-level Reviewer → Initial state" ratio="16/10" />
            <figcaption>A skip-level reviewer isn't convinced by a nomination…</figcaption>
          </figure>
          <figure>
            <Slot label="REVIEWER · DECLINE" pull="Export: Section 2 → Decline nomination modal" ratio="16/10" />
            <figcaption>…they can decline it outright, with a reason on the record…</figcaption>
          </figure>
          <figure>
            <Slot label="REVIEWER · SEND BACK" pull="Export: Section 2 → Update answers state" ratio="16/10" />
            <figcaption>…or send it back to the nominator for stronger answers.</figcaption>
          </figure>
        </div>
        <p>
          That back-and-forth used to be invisible email. Now it's an auditable trail the program
          admin can see.
        </p>
      </Section>

      {/* ================= ROLES ================= */}
      <Section wide chip="System" chipTone="blue" title="Same program, three lenses">
        <p>
          Every role gets a workspace shaped around its one job — not a shared screen with
          conditional buttons.
        </p>
        <RoleTabs />
      </Section>

      {/* ================= BOUNDARY ================= */}
      <div className="quiet">
        <Section chip="The boundary" chipTone="grey" title="What we deliberately left offline">
          <p>
            Winner decisions happen two ways: either the winner is already known, or people sit in
            a room and debate. We didn't try to force the room onto the platform.
          </p>
          <div className="pull">Digitize the record, not the ritual.</div>
          <p>
            Closing the loop never meant putting 100% of the activity online. It meant
            <strong> zero loss of information</strong>: the nominations, the evidence, the review
            trail, and the final decision live on Keka. The human conversation stays human.
          </p>
          <TwoPathDiagram />
        </Section>
      </div>

      {/* ================= RESULT ================= */}
      <Section wide chip="Result" chipTone="green" title="A program is now a lifecycle, not a form">
        <div className="split">
          <div>
            <p>
              Before, admins configured a thing. Now they run a process they can see: created,
              dates set, nominations open, reviews in progress, winners selected, certificates
              issued.
            </p>
            <div className="timeline" aria-label="Program lifecycle states">
              <Chip tone="grey">Draft</Chip><span className="t-arrow">→</span>
              <Chip tone="amber">Nominations pending</Chip><span className="t-arrow">→</span>
              <Chip tone="purple">In review</Chip><span className="t-arrow">→</span>
              <Chip tone="blue">Winner selection</Chip><span className="t-arrow">→</span>
              <Chip tone="green">Winners announced</Chip>
            </div>
            <p style={{ marginTop: 22 }}>
              {/* Replace with real numbers if you have them; delete if not. */}
              <strong>[Metric slot]</strong> — programs completed end-to-end on platform, drop in
              related support tickets, or adoption by company size.
            </p>
          </div>
          <LoopDiagram broken={false} />
        </div>
        <Slot
          label="LIFECYCLE TIMELINE STRIP"
          pull="Export: program-states row thumbnails pinned along a horizontal line, ending with the winner certificate"
          ratio="21/6"
        />
      </Section>

      {/* ================= REFLECTION ================= */}
      <Section chip="Reflection" chipTone="grey" title="What this project taught me">
        <p>
          Revamps are diagnosis work. The feature functioned; the model was wrong. The shift that
          mattered wasn't any single screen — it was moving the module from
          <strong> prescribing a process to modeling the company's actual process</strong>.
        </p>
        <p>
          Next, I'd instrument the review chain: where nominations stall tells you where the
          organizational process itself has friction — which is a product opportunity beyond R&amp;R.
        </p>
      </Section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <p className="loopline">Loop closed</p>
        <h2>Next case study →</h2>
      </footer>
    </main>
  );
}
