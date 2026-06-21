import { ProjectCardData } from "./interfaces";

const awaconimg = "/project-imgs/binge-eating/binge.gif";
const loopnote = "/project-imgs/loop-note/loop-note.gif";
const keka = "/project-imgs/continuous rewards/Thumb.webp";
const loopinfo = "/project-imgs/looppanel-insights/insight-thumb.gif";
const wish = "/project-imgs/kekawish/thumb-cr.webp";
const award = "/project-imgs/award program/Thumb-certi-spot.webp";
const kurakaani = "/project-imgs/kurakaani/01.webp";
const loopdata = "/project-imgs/loop-research/loop-research.gif";

export interface ProjectMeta {
  duration: string;
  role: string;
  scope: string;
  impact: string;
}

export type ProjectSummary = ProjectCardData & { meta: ProjectMeta };

/**
 * Edit this list to control which projects appear and in what order.
 * - Add an id to show a project
 * - Remove an id to hide it
 * - Reorder ids to change display order
 */
export const PROJECT_DISPLAY_ORDER: string[] = [
  "6",
  "2",
  "7",
  "1",
  "5",
  "4",
  // "8",
  "3",
];

/** Number of featured projects shown as large cards on the home page. */
export const FEATURED_PROJECT_COUNT = 3;

const projectsById: Record<string, ProjectSummary> = {
  "8": {
    id: "8",
    description: "Removing barriers to help companies adopt Keka for their R&R needs.",
    title: "Strengthening Keka's Reward & Recognition Suite",
    img: award,
    tags: ["Product Design", "Design Strategy"],
    type: "client",
    details: "Keka / 2026",
    meta: {
      duration: "Nov 2025 – Jan 2026",
      role: "Design Strategy & Execution",
      scope: "Enterprise Recognition System",
      impact: "Increased internal operational agility and empowered HR teams with full self-service autonomy.",
    },
  },
  "6": {
    id: "6",
    description: "Created a flexible, points-based recognition system that secured 50+ enterprise clients within 6 months.",
    title: "Designed a day-to-day recognition platform for Keka for companies to manage HRMS and employee recognition in one place",
    img: keka,
    tags: ["Systems Thinking", "Revenue Growth"],
    type: "client",
    details: "Keka / 2024",
    meta: {
      duration: "Jun'24 – Nov'24",
      role: "Design, Research, Execution",
      scope: "B2B Reward & Recognition System",
      impact: "Directly contributed to securing 10+ enterprise accounts.",
    },
    aiSummary:
      "The Continuous Rewards Platform natively bridged fragmented HR and disparate reward systems into a deeply unified ecosystem.\n\nHere are the top highlights:\n• Allowed admins to assign Geo-specific conversion rates, upload custom icons, and apply brand languages like 'donuts'.\n• Automated milestone rewards for birthdays and work anniversaries based on internal Keka payroll data.\n• Introduced highly flexible tracking for cross-border spends and complex point limitations.\n\nUltimately, this massive capability upgrade drove a brand new direct revenue stream and secured over 10 enterprise accounts within just 5 months of launch.",
  },
  "2": {
    id: "2",
    description: "Helped teams take evidence-backed decisions by connecting insights to sources",
    title: "Redesigned the highlights view for UX Researchers to synthesize research data into actionable insights & get stakeholder buy-in",
    img: loopinfo,
    tags: ["Data Analysis", "Research Ops"],
    type: "client",
    details: "Looppanel / Founding Designer",
    meta: {
      duration: "Apr'22 – Jun'22",
      role: "Founding Designer",
      scope: "Qualitative Data Analysis Suite",
      impact: "Significantly improved insight discovery velocity for cross-functional teams.",
    },
  },
  "7": {
    id: "7",
    description: "Scaled weekly engagement from 15k to 100k users by redesigning the workplace celebrations framework.",
    title: "Fixed falling engagement on Keka wall by adding delight to peer to peer wishes",
    img: wish,
    tags: ["Product Design", "Design Strategy"],
    type: "client",
    details: "Keka / 2025",
    meta: {
      duration: "Nov'24 – Jan'25",
      role: "Design & Execution",
      scope: "Enterprise Engagement System",
      impact: "5x increase in employee engagement and 3x adoption growth.",
    },
  },
  "1": {
    id: "1",
    description: "Zoom bot helped consolidate all the research data into a single view for user researchers",
    title: "Designed a note-taking meeting bot for UX Researchers to get transcript, notes, and highlights in one place",
    img: loopnote,
    tags: ["AI & Automation", "Productivity"],
    type: "client",
    details: "Looppanel / Founding Designer",
    meta: {
      duration: "Jan'22 – Mar'22",
      role: "Founding Designer",
      scope: "AI-Powered Research Bot",
      impact: "Reduced synthesis time by 5x through workflow automation.",
    },
  },
  "3": {
    id: "3",
    description: "Developed a comprehensive Design Language System that reduced design-to-dev velocity by 60%.",
    title: "Nimbuzz: Scaling a Super App Design System",
    img: kurakaani,
    tags: ["Design Systems", "Velocity"],
    type: "client",
    details: "Nimbuzz / UI Designer",
    meta: {
      duration: "2021",
      role: "UI & Systems Design",
      scope: "Atomic Design Language System",
      impact: "60% reduction in screen design and handoff time.",
    },
  },
  "5": {
    id: "5",
    description: "Simplified the user experience for new and first time users by creating logical groupings of features",
    title: "Redesigned the information architecture of Looppanel to improve feature discovery and data organization.",
    img: loopdata,
    tags: ["Product", "Design research"],
    type: "client",
    details: "Looppanel / Founding Designer",
    meta: {
      duration: "Jun'22 – Jul'22",
      role: "Product Designer",
      scope: "Information Architecture revamp",
      impact: "Increased discoverability of features and customer satisfaction.",
    },
  },
  "4": {
    id: "4",
    description: "Designed a multi-sensory hardware device to help users regain control over binge-behavior through mindful habit-forming.",
    title: "Mindful Hardware: Tackling Binge Behavior",
    img: awaconimg,
    tags: ["IoT", "Behavioral Design"],
    type: "client",
    details: "Master's Project / NID",
    meta: {
      duration: "Aug'22 – Oct'22",
      role: "Research & Industrial Design",
      scope: "Behavioral Intervention Device",
      impact: "Developed a functional prototype for emotional regulation.",
    },
  },
};

export const projectSummaries: ProjectSummary[] = PROJECT_DISPLAY_ORDER.map((id) => {
  const project = projectsById[id];
  if (!project) {
    console.warn(`ProjectSummaries: unknown project id "${id}" in PROJECT_DISPLAY_ORDER`);
    return null;
  }
  return project;
}).filter((project): project is ProjectSummary => project !== null);

/** Featured / main projects — first N entries from PROJECT_DISPLAY_ORDER. */
export const mainProjectSummaries = projectSummaries.slice(0, FEATURED_PROJECT_COUNT);
