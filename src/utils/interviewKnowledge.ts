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

export function findInterviewAnswer(userInput: string, projectContext?: string, pageType: 'home' | 'project' = 'project'): string {
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

  for (const item of INTERVIEW_QA) {
    let score = 0;
    const qLower = item.question.toLowerCase();

    // Direct question phrase match
    if (query.length > 5 && qLower.includes(query)) {
      score += 10;
    }

    // Keyword matches
    for (const kw of item.keywords) {
      if (query.includes(kw)) {
        score += 2;
        if (query === kw) score += 3;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && maxScore >= 2) {
    return `### ${bestMatch.question}\n\n${bestMatch.answer}`;
  }

  // Fallback answer structured from interview-questions.md
  return `### About Karan Kapoor\n\n- **Role**: Senior Product Designer at **Keka HR** (2.2M+ users)\n- **Experience**: 7 years across B2B SaaS, HR Tech, and UX Research Tools\n- **Education**: Master's in Design (**NID Ahmedabad**) + B.Tech Engineering\n- **Tools**: Figma (Trainer), Claude, Google AI Studio, Framer, React/TypeScript\n- **Location**: Hyderabad, India (Open to Remote, Hybrid & Relocation)\n\n*Feel free to ask about his design process, engineering handoff, accessibility, or specific project case studies!*`;
}
