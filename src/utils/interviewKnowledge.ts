export interface QAItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords: string[];
}

export const INTERVIEW_QA: QAItem[] = [
  {
    id: "about-experience",
    category: "About Karan",
    question: "What's your work experience?",
    answer: "I have **7 years of experience** across B2B and B2C startups including **Keka HR, Obvious, Looppanel, and Aphelia**.",
    keywords: ["experience", "years", "work", "history", "background", "startups", "b2b", "b2c", "companies"]
  },
  {
    id: "about-education",
    category: "About Karan",
    question: "What are your educational qualifications?",
    answer: "I hold a **Master's in Design (M.Des)** from **NID (National Institute of Design), Ahmedabad** and a **B.Tech** from **Bharati Vidyapeeth's College of Engineering, Delhi**.",
    keywords: ["education", "qualification", "degree", "nid", "ahmedabad", "btech", "college", "university", "study", "studied", "master", "bachelor"]
  },
  {
    id: "about-role",
    category: "About Karan",
    question: "What's your current role?",
    answer: "I'm a **Senior Product Designer at Keka HR**, owning the product strategy for **Rewards, Recognition, HR Helpdesk, and Survey tools** for over **2.2M+ active users**.",
    keywords: ["current role", "job", "position", "keka", "title", "present", "now", "doing", "responsibilities"]
  },
  {
    id: "about-location",
    category: "About Karan",
    question: "Where are you based, and are you available?",
    answer: "I'm based in **Hyderabad, India**. I'm open to **remote, hybrid, or relocation** depending on the opportunity and I'm available for new roles.",
    keywords: ["location", "located", "hyderabad", "india", "relocation", "relocate", "available", "availability", "notice"]
  },
  {
    id: "design-process",
    category: "Design Process & Craft",
    question: "What's your end-to-end design process?",
    answer: "My process changes with the project:\n- **For major initiatives**: I start with deep research — competitor analysis, customer calls, stakeholder alignment — and design from there.\n- **For smaller projects**: I prototype fast with AI assistance to align stakeholders early, then test with users.\n- **Either way**: I want to understand the problem deeply, ship fast, and iterate.",
    keywords: ["process", "end to end", "workflow", "methodology", "approach", "how do you design", "steps"]
  },
  {
    id: "design-tools",
    category: "Design Process & Craft",
    question: "What design tools are you most proficient in?",
    answer: "I'm proficient in:\n- **Figma** (Certified Figma Trainer)\n- **Claude + Google AI Studio** (for AI-assisted research & rapid prototyping)\n- **Framer** (interactive demos & sites)\n- **Gamma** (presentations)\n- **Antigravity / Xcode** (vibe-coded front-ends)",
    keywords: ["tools", "tooling", "figma", "software", "stack", "claude", "framer", "xcode", "antigravity", "gamma", "proficient", "skills"]
  },
  {
    id: "design-disagreements",
    category: "Design Process & Craft",
    question: "How do you handle disagreements with PMs or engineers?",
    answer: "I back positions with **data — customer verbatims, usage metrics, or a quick tangible prototype**. This shifts conversations from *'opinion vs opinion'* to *'what does the customer actually need'*. Bringing real user quotes into the room usually resolves alignment issues.",
    keywords: ["disagreement", "disagreements", "conflict", "pm", "product manager", "engineers", "developers", "pushback", "align", "alignment"]
  },
  {
    id: "design-success-metrics",
    category: "Design Process & Craft",
    question: "How do you measure design success after launch?",
    answer: "I agree the success criteria before I start:\n- **Qualitative**: Support ticket volume, CS calls, sales feedback.\n- **Quantitative**: Feature adoption, retention, engagement metrics.\n- **Silence as a signal**: I watch what *stops* getting raised — quiet on a feature that used to be painful tells me a lot.",
    keywords: ["measure", "metrics", "success", "kpi", "launch", "outcomes", "results", "impact", "data"]
  },
  {
    id: "design-challenging-project",
    category: "Design Process & Craft",
    question: "Which project was the most challenging?",
    answer: "Revamping the **Awards Program at Keka**, and **Looppanel's Highlights View** — bulk tagging and AI summaries of qualitative research notes, under severe technical constraints. I had to think from first principles about how researchers actually synthesise data.",
    keywords: ["challenging", "hardest", "difficult", "tough", "awards program", "looppanel", "complex", "challenge"]
  },
  {
    id: "design-data-example",
    category: "Design Process & Craft",
    question: "Can you give an example of using data to drive a decision?",
    answer: "When engagement on the Keka Wall was falling, I dug into usage trends and benchmarked competitors, then added a dedicated **'Wish' CTA**. It lifted overall platform engagement **5×**.",
    keywords: ["data driven", "example of data", "decision", "keka wall", "wish", "boosted", "5x", "metrics example"]
  },
  {
    id: "career-roles",
    category: "Roles & Career",
    question: "What roles are you looking for?",
    answer: "I'm looking for **Lead Product Designer, Staff Product Designer, or Design Manager** roles, ideally in companies building complex **B2B SaaS or enterprise software**.",
    keywords: ["looking for", "roles", "target role", "position", "seeking", "lead", "staff", "manager", "b2b saas"]
  },
  {
    id: "career-remote",
    category: "Roles & Career",
    question: "Are you open to remote work?",
    answer: "Yes! I'm very comfortable with **remote-first** setups and has years of experience working effectively across distributed teams and time zones.",
    keywords: ["remote", "remote work", "work from home", "wfh", "hybrid", "distributed"]
  },
  {
    id: "career-management",
    category: "Roles & Career",
    question: "Do you manage or mentor other designers?",
    answer: "Yes. At Keka, I have **mentored junior and mid-level designers**, led critique sessions, and shaped design culture. I'm open to Lead or Player-Coach roles.",
    keywords: ["manage", "management", "mentor", "mentoring", "coaching", "junior", "lead", "leadership"]
  },
  {
    id: "career-industries",
    category: "Roles & Career",
    question: "What industries have you worked in?",
    answer: "I have worked across **HR Tech** (Keka HR), **UX Research Tools** (Looppanel), and **Consumer & EdTech Apps** (Obvious, Grab, Guesthouser, FrontRow).",
    keywords: ["industries", "domain", "sectors", "hr tech", "research tools", "edtech", "consumer"]
  },
  {
    id: "collab-engineers",
    category: "Collaboration & Leadership",
    question: "How do you work with engineers?",
    answer: "I work closely with developers by shipping **detailed Figma specs annotated with edge cases, empty states, and component tokens**. I provide async Loom walkthroughs and conducts co-creation sessions early in the sprint.",
    keywords: ["engineers", "developers", "engineering", "devs", "technical", "co-creation", "dev mode"]
  },
  {
    id: "collab-stakeholders",
    category: "Collaboration & Leadership",
    question: "How do you approach stakeholder buy-in?",
    answer: "I make my decisions visible early — **lightweight interactive prototypes and annotated explorations** that invite pushback in Figma, before anything is written in code.",
    keywords: ["stakeholder", "buy-in", "buy in", "executives", "alignment", "presentation"]
  },
  {
    id: "collab-ambiguity",
    category: "Collaboration & Leadership",
    question: "How do you handle ambiguous briefs?",
    answer: "By asking **'What does success look like in 6 months?'** first and mapping backward. I thrive in ambiguity as long as there is a clear underlying signal of what is broken.",
    keywords: ["ambiguous", "ambiguity", "unclear", "brief", "0 to 1", "fuzzy"]
  },
  {
    id: "delivery-handoff",
    category: "Handoff, Systems & Delivery",
    question: "What does your design handoff process look like?",
    answer: "I treat handoff as continuous rather than a moment:\n- **Figma organisation**: I annotate edge cases, loading and error states alongside the flows.\n- **Code Connect & Dev Mode**: I keep specs and design tokens ready for engineers.\n- **Looms and build channels**: I record async walkthroughs and stay in Slack so questions get answered the same day.",
    keywords: ["handoff", "hand-off", "delivery", "spec", "specs", "loom", "dev mode", "tokens"]
  },
  {
    id: "delivery-systems",
    category: "Handoff, Systems & Delivery",
    question: "How do you work with design systems?",
    answer: "I thoroughly audits existing design tokens and components to maximize reuse. When a new pattern is required, I propose and documents it systematically for the team.",
    keywords: ["design system", "design systems", "components", "library", "tokens", "storybook", "ds"]
  },
  {
    id: "delivery-accessibility",
    category: "Handoff, Systems & Delivery",
    question: "How do you approach accessibility (a11y)?",
    answer: "I build it in at the design stage rather than auditing it later — I check contrast ratios, visible focus indicators, and alt-text specs in Figma before handoff.",
    keywords: ["accessibility", "a11y", "contrast", "wcag", "inclusive", "screen reader"]
  },
  {
    id: "delivery-feedback",
    category: "Handoff, Systems & Delivery",
    question: "What does your feedback or critique process look like?",
    answer: "I focus on understanding the underlying problem and project goals first before providing constructive, evidence-backed feedback.",
    keywords: ["feedback", "critique", "reviews", "crit", "reviewing"]
  },
  {
    id: "delivery-onboarding",
    category: "Handoff, Systems & Delivery",
    question: "How do you onboard onto a new team or codebase?",
    answer: "I audit the existing user flows, read the documentation, and explore the problem space before I propose any changes.",
    keywords: ["onboard", "onboarding", "new team", "new codebase", "joining"]
  },
  {
    id: "delivery-prioritization",
    category: "Handoff, Systems & Delivery",
    question: "How do you prioritize your design backlog?",
    answer: "I get clear on the core user problem first, avoid assuming, and spend my time where the impact is highest.",
    keywords: ["prioritize", "backlog", "prioritization", "roadmap", "triage"]
  },
  {
    id: "delivery-mistake",
    category: "Handoff, Systems & Delivery",
    question: "What's a mistake you've learned from?",
    answer: "Designing for the screen alone, without accounting for the user's real physical and operational context. I've learned to go and look at where the work actually happens.",
    keywords: ["mistake", "learned", "learning", "failure", "lesson"]
  },
  {
    id: "delivery-culture",
    category: "Handoff, Systems & Delivery",
    question: "What's your ideal team or company culture?",
    answer: "I do my best work on teams that treat design as an equal strategic partner, rather than an execution or cosmetic layer at the end.",
    keywords: ["culture", "ideal team", "environment", "partner", "company culture"]
  },
  {
    id: "delivery-mentoring",
    category: "Handoff, Systems & Delivery",
    question: "How do you mentor other designers?",
    answer: "Through paired critique — I'd rather ask the questions that let a designer find the gap in their own reasoning than hand them my answer.",
    keywords: ["mentoring", "mentor", "paired critique", "coaching designers"]
  },
  {
    id: "contact-info",
    category: "Contact",
    question: "How can I contact you?",
    answer: "The best way to reach me is **[linkedin.com/in/karankapoorux](https://www.linkedin.com/in/karankapoorux)** — I check it daily. There's also a contact form on this site.",
    keywords: ["contact", "email", "reach", "linkedin", "message", "touch", "get in touch", "connect"]
  },
  {
    id: "resume-download",
    category: "Contact",
    question: "Is your resume available?",
    answer: "Yes! my resume is downloadable from my portfolio at **[kadankapoor.com/resume](https://kadankapoor.com/resume)** or via the 'View Resume' button in the menu.",
    keywords: ["resume", "cv", "download resume", "download cv", "pdf"]
  }
];

/**
 * Whole-word match, tolerating the common plural and tense endings.
 *
 * Plain `query.includes(kw)` matched any substring, so the keyword "work" fired
 * on "workshop" — which is how "What do you cover in a Figma workshop?" came
 * back with the work-experience answer. A bare \b...\b would fix that but then
 * stop "work" matching "worked", so the endings are allowed explicitly.
 */
const matchesWord = (query: string, keyword: string): boolean => {
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}(?:s|es|ed|ing)?\\b`).test(query);
};

/**
 * Training answers, kept separate from the portfolio ones: this page draws
 * someone weighing up a workshop, not a hiring manager.
 *
 * Everything factual here is on the page already. Where a question needs
 * something only Karan can commit to — length, format, cost, availability —
 * the answer says what is true, asks for what it needs, and does not invent a
 * number. See docs/figma-training-qa.md; these get replaced as he fills it in.
 */
const TRAINING_QA: QAItem[] = [
  {
    id: "training-for-team",
    category: "Training",
    question: "Can you run a session for my team?",
    answer: "Yes, definitely. You can reach out over **[LinkedIn](https://www.linkedin.com/in/karankapoorux)** or **[karan26796@gmail.com](mailto:karan26796@gmail.com)** and we can work out a session as per your requirements.",
    keywords: ["my team", "our team", "your team", "run a session", "run a workshop", "hire", "book", "booking", "corporate", "company", "available", "availability", "engage", "conduct", "get in touch", "reach out"]
  },
  {
    id: "training-duration",
    category: "Training",
    question: "How long is a typical session?",
    answer: "Each session is catered to the unique requirement of the person or team. Ideally a training session lasts **4 hrs, spread across two days**, divided equally between theoretical and hands-on sections.",
    keywords: ["how long", "duration", "hours", "length", "half day", "full day", "days", "time commitment", "how many hours", "session length"]
  },
  {
    id: "training-formats",
    category: "Training",
    question: "What formats do you offer?",
    answer: "I offer **in-person, online, and 1:1 sessions** for individuals and teams.",
    keywords: ["format", "formats", "online", "in person", "remote", "virtual", "onsite", "cohort", "one on one", "1:1", "recorded", "workshop format"]
  },
  {
    id: "training-cost",
    category: "Training",
    question: "What does it cost?",
    answer: "Cost depends on topics, duration, and the size of the organization.\n\nTell me what you have in mind over **[LinkedIn](https://www.linkedin.com/in/karankapoorux)** or **[karan26796@gmail.com](mailto:karan26796@gmail.com)** and I'll send a quote.",
    keywords: ["cost", "costs", "price", "pricing", "fee", "fees", "charge", "charges", "rate", "rates", "budget", "quote", "how much"]
  },
  {
    id: "training-prerequisites",
    category: "Training",
    question: "What do people need to know beforehand?",
    answer: "The sessions cover everything from basics to advanced topics, so **no prior knowledge is required**.",
    keywords: ["prerequisite", "prerequisites", "prior knowledge", "beforehand", "prepare", "preparation", "requirement", "requirements", "laptop", "license", "experience needed", "need to know", "complete beginner"]
  },
  {
    id: "training-coverage",
    category: "Training",
    question: "What do you cover in a Figma workshop?",
    answer: "My expertise is in creating **scalable design systems**, making people at least **40% faster** in day-to-day Figma usage (Auto Layout basics to advanced, hidden shortcuts and so on), and **AI-native workflows** for designers.",
    keywords: ["cover", "covered", "curriculum", "syllabus", "topics", "agenda", "content", "modules", "teach", "what do you teach", "learn", "prototyping", "variables", "shortcuts", "faster"]
  },
  {
    id: "training-systems",
    category: "Training",
    question: "Do you teach Auto Layout and design systems?",
    answer: "I'm a pro at **Auto Layout** and **design systems**, and have built scalable systems at multiple companies.",
    keywords: ["auto layout", "autolayout", "design system", "design systems", "design token", "design tokens", "components", "variants", "libraries", "advanced"]
  },
  {
    id: "training-audience",
    category: "Training",
    question: "Who are these sessions for?",
    answer: "The sessions are for **students** studying design, pursuing an MBA, or looking for a job right after graduation. Also for **professionals and companies** looking to level up their team's Figma skills.",
    keywords: ["who are these for", "who is it for", "audience", "suitable", "beginner", "beginners", "students", "student", "mba", "graduates", "professionals", "who should attend"]
  },
  {
    id: "training-non-designers",
    category: "Training",
    question: "Have you taught non-designers, like PMs?",
    answer: "Yes — I teach **PMs, founders, marketers**, and professionals across roles. My sessions are designed to be accessible and practical for people from all backgrounds.",
    keywords: ["pms", "pm", "product managers", "non designer", "non designers", "engineers", "developers", "founders", "marketers", "across roles", "non technical"]
  },
  {
    id: "training-ai",
    category: "Training",
    question: "Do you cover AI in the design workflow?",
    answer: "Yes — I cover everything through the lens of AI, and I help designers become **AI-native**.",
    keywords: ["ai", "artificial intelligence", "design to development", "design to code", "dev mode", "mcp", "automation", "ai native", "vibe coding", "cursor", "claude"]
  },
  {
    id: "training-where",
    category: "Training",
    question: "Where have you taught?",
    answer: "**IIM Ahmedabad, IIM Sambalpur, IIT Madras, Indiana University, FLAME University, Shaadi.com** and **Zuddl** — across India and the US.",
    keywords: ["where have you taught", "where taught", "which institutions", "clients", "colleges", "universities", "iim", "iit", "flame", "indiana", "zuddl", "shaadi", "places", "worked with"]
  },
  {
    id: "training-scale",
    category: "Training",
    question: "How many people have you trained?",
    answer: "Close to **10,000 people** in the last 5 years.",
    keywords: ["how many", "number of people", "how many people", "trained", "scale", "reach", "attendees", "count"]
  },
  {
    id: "training-community",
    category: "Training",
    question: "Tell me about the Figma community work",
    answer: "I led the **Friends of Figma (FoF) chapter for Delhi** for close to 5 years, and ran more than **20 events** during my tenure.",
    keywords: ["community", "friends of figma", "fof", "delhi", "meetup", "meetups", "config", "events", "chapter", "organiser", "organizer"]
  },
  {
    // Still unanswered in docs/figma-training-qa.md — this points at the
    // testimonials already on the page rather than inventing quotes.
    id: "training-feedback",
    category: "Training",
    question: "What do people say afterwards?",
    answer: "There are testimonials further down this page from people who've been through the sessions — worth a scroll rather than me paraphrasing them.",
    keywords: ["what do people say", "feedback", "testimonial", "testimonials", "reviews", "say afterwards", "worth it", "references", "reference"]
  }
];

const TRAINING_FALLBACK = `Happy to answer that — ask me about what a workshop covers, who it suits, where I've taught, or getting one set up for your team.

If it's something specific to your group, **[LinkedIn](https://www.linkedin.com/in/karankapoorux)** is the quickest way to reach me.`;

export function findInterviewAnswer(userInput: string, projectContext?: string, pageType: 'home' | 'project' | 'training' = 'project'): string {
  const query = userInput.toLowerCase().trim();

  // 1. Check project summary / case study requests (only meaningful on a project page)
  if (pageType === 'project' && (query.includes("summarize") || query.includes("summary") || query.includes("case study"))) {
    if (projectContext && projectContext.length > 50) {
      const lines = projectContext
        .split("\n")
        .map(l => l.trim())
        .filter(l => l.length > 20 && !l.startsWith("#") && !l.startsWith("!["))
        .slice(0, 3);
      const overview = lines.join(" ") || "Redesigned complex B2B SaaS workflows into intuitive enterprise systems.";
      return `### Case Study Summary\n\n- **Overview**: ${overview.slice(0, 240)}...\n- **Key Solution**: Governed workflow automation and scalable component patterns.\n- **Impact**: High enterprise adoption, reduced task friction, and unblocked sales evaluation pipelines.`;
    }
  }

  // 2. Match against interview QA items using keyword relevance scoring
  let bestMatch: QAItem | null = null;
  let maxScore = 0;

  const pool = pageType === "training" ? [...TRAINING_QA, ...INTERVIEW_QA] : INTERVIEW_QA;

  for (const item of pool) {
    let score = 0;
    const qLower = item.question.toLowerCase();

    // Direct question phrase match
    if (query.length > 5 && qLower.includes(query)) {
      score += 10;
    }

    // Keyword matches
    for (const kw of item.keywords) {
      if (!matchesWord(query, kw)) continue;
      // A phrase is far more discriminating than a single word, so it counts
      // for more. Single words keep their original weight: the false matches
      // came from substring bleed, not from the scoring, and raising the bar
      // here instead only cost real matches.
      score += kw.includes(" ") ? 4 : 2;
      if (query === kw) score += 3;
    }

    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }

  // On the training page a portfolio entry is almost always the wrong answer,
  // so a lone keyword brushing against one should not win — but a training
  // entry matching at all should. Hence the threshold applies only when the
  // best match came from the portfolio set.
  const fromTraining = bestMatch !== null && TRAINING_QA.includes(bestMatch);
  const threshold = pageType === "training" && !fromTraining ? 6 : 2;

  if (bestMatch && maxScore >= threshold) {
    return `### ${bestMatch.question}\n\n${bestMatch.answer}`;
  }

  if (pageType === "training") {
    return TRAINING_FALLBACK;
  }

  // Fallback answer structured from interview-questions.md
  return `### About Karan Kapoor\n\n- **Role**: Senior Product Designer at **Keka HR** (2.2M+ users)\n- **Experience**: 7 years across B2B SaaS, HR Tech, and UX Research Tools\n- **Education**: Master's in Design (**NID Ahmedabad**) + B.Tech Engineering\n- **Tools**: Figma (Trainer), Claude, Google AI Studio, Framer, React/TypeScript\n- **Location**: Hyderabad, India (Open to Remote, Hybrid & Relocation)\n\n*Feel free to ask about his design process, engineering handoff, accessibility, or specific project case studies!*`;
}
