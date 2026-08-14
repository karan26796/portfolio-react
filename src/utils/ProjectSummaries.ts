import { ProjectCardData } from "./interfaces";

const awaconimg = "/project-imgs/binge-eating/binge.gif";

//looppanel notetaker
const loopnote = "/project-imgs/loop-note/loop-note.gif";
const final = "/project-imgs/loop-note/final-design.webp";
const questions = "/project-imgs/loop-note/editor-question.webp";


//continuous rewards
const keka = "/project-imgs/continuous rewards/Thumb-2.webp";
const transactions = "/project-imgs/continuous rewards/employee-transaction-thumb.webp";
const milestone = "/project-imgs/continuous rewards/employee milestone data-thumb.webp";

const loopinfo = "/project-imgs/looppanel-insights/insight-thumb.gif";
const wish = "/project-imgs/kekawish/thumb-cr.webp";
const award = "/project-imgs/award program/Thumb-certi-spot.webp";
const awardPrograms = "/project-imgs/award program/Thumb-certi-spot.webp";
const kurakaani = "/project-imgs/kurakaani/01.webp";
const loopdata = "/project-imgs/loop-research/loop-research.gif";

//interconnect
const interconnect = "/project-imgs/interconnect/interconnect-thumb.webp";
const referral = "/project-imgs/interconnect/referral.webp";
const holidayCalendar = "/project-imgs/holiday-calendar/thumb.webp";

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
  "9",
  "6",
  "1",
  // "7",
  "10",
  "2",
  // "5",
  "11",
  // "10",
];

/** Number of featured projects shown as large cards on the home page. */
export const FEATURED_PROJECT_COUNT = 4;

const projectsById: Record<string, ProjectSummary> = {
  "10": {
    id: "10",
    company: "Side Projects",
    newdesc: "Developed & designed an app to help people in gated communities get referrals for open jobs",
    description: "Developed & designed an app to help people in gated communities post jobs and get referrals",
    title: "Interconnect : Professional networking for gated societies",
    img: interconnect,
    images: [interconnect, referral],
    year: "Personal project / 2026",
    tags: ["Project"],
    type: "client",
    details: "Interconnect : Professional networking for gated societies",
    meta: {
      duration: "2026",
      role: "Designer",
      scope: "Scope",
      impact: "Impact",
    },
  },
  "11": {
    id: "11",
    company: "Keka HR",
    newdesc: "Redesigned Keka's holiday calendar for global teams to flexibly assign custom groups to a leave instead of an entire calendar",
    description: "Redesigned Keka's holiday calendar framework to support multi-location enterprise teams and regional holiday lists.",
    title: "Redesigned Keka's Holiday Calendar for Multi-Location Enterprise Teams",
    img: holidayCalendar,
    // images: [holidayCalendar, "/project-imgs/award-programs/open-nominations-dates.webp"],
    year: "Keka HR / 2025",
    tags: ["Product Design", "Enterprise UX"],
    type: "client",
    details: "Moved holiday calendar from audience first approach to a leave first approach",
    meta: {
      duration: "2025",
      role: "Design Strategy & Execution",
      scope: "Enterprise Holiday & Leave System",
      impact: "Streamlined regional holiday setup and automated leave logic across enterprise accounts.",
    },
  },
  "9": {
    id: "9",
    company: "Keka HR",
    newdesc: "Rebuilt Keka's award programs into a governed nomination workflow to unblock enterprise deals.",
    description: "Rebuilt Keka's award programs into a governed nomination workflow to unblock enterprise deals.",
    title: "Keka Award Programs: From Gift Catalog to Governed Workflow",
    img: awardPrograms,
    images: [
      "/project-imgs/award-programs/thumb.webp",
      "/project-imgs/award-programs/nominee list.webp",
      "/project-imgs/award-programs/Category creation.webp",
      "/project-imgs/award-programs/nominations required.webp",
      "/project-imgs/award-programs/nominations workflow.webp",
    ],
    year: "2025-26",
    tags: ["Product Design", "Enterprise UX"],
    type: "client",
    details: "Redesigning Keka's awards platform for customizability & enterprise readiness",
    meta: {
      duration: "Feb – Apr 2026",
      role: "Design Strategy & Execution",
      scope: "Enterprise Award Programs",
      impact: "Unblocked enterprise deals stalled at evaluation; beta programs reached announcement phase for the first time.",
    },
  },
  "8": {
    id: "8",
    company: "Keka HR",
    newdesc: "Removing barriers to help companies adopt Keka for their R&R needs.",
    description: "Removing barriers to help companies adopt Keka for their R&R needs.",
    title: "Strengthening Keka's Reward & Recognition Suite",
    img: award,
    images: [award, keka],
    year: "Keka HR / 2026",
    tags: ["Product Design", "Design Strategy"],
    type: "client",
    details: "Peer to Peer celebrations",
    meta: {
      duration: "Nov 2025 – Jan 2026",
      role: "Design Strategy & Execution",
      scope: "Enterprise Recognition System",
      impact: "Increased internal operational agility and empowered HR teams with full self-service autonomy.",
    },
  },
  "6": {
    id: "6",
    company: "Keka HR",
    newdesc: "Designed a unified Continuous Rewards platform natively integrated into Keka's HRMS, driving a new revenue stream and securing 10+ enterprise accounts.",
    description: "Solved the problem of companies using two platforms for their HRMS and rewards, leading to fragmentation and added cost.",
    title: "Designed a day-to-day recognition platform for Keka to strengthen it's position in the market",
    img: keka,
    images: [keka, transactions, milestone],
    year: "Keka HR / 2024",
    tags: ["Systems Thinking", "Revenue Growth"],
    type: "client",
    details: "Employee rewards baked directly into an HR tool",
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
    company: "Looppanel",
    newdesc: "Helped teams take evidence-backed decisions by connecting insights to sources",
    description: "Helped teams take evidence-backed decisions by connecting insights to sources",
    title: "Redesigned the highlights view for UX Researchers to synthesize research data into actionable insights & get stakeholder buy-in",
    img: loopinfo,
    // images: [loopinfo, loopnote],
    year: "Looppanel / 2022",
    tags: ["Data Analysis", "Research Ops"],
    type: "client",
    details: "Interview highlights view",
    meta: {
      duration: "Apr'22 – Jun'22",
      role: "Founding Designer",
      scope: "Qualitative Data Analysis Suite",
      impact: "Significantly improved insight discovery velocity for cross-functional teams.",
    },
  },
  "7": {
    id: "7",
    company: "Keka HR",
    newdesc: "Scaled weekly engagement from 15k to 100k users by adding delight when people wish each other.",
    description: "Scaled weekly engagement from 15k to 100k users by redesigning the workplace celebrations framework.",
    title: "Revived falling engagement on HR platform wall by adding delight when people wish each other on special days",
    img: wish,
    // images: [wish, keka],
    year: "Keka HR / 2025",
    tags: ["Product Design", "Design Strategy"],
    type: "client",
    details: "5x'ed the engagement for Peer to Peer celebrations",
    meta: {
      duration: "Nov'24 – Jan'25",
      role: "Design & Execution",
      scope: "Enterprise Engagement System",
      impact: "5x increase in employee engagement and 3x adoption growth.",
    },
  },
  "1": {
    id: "1",
    company: "Looppanel",
    newdesc: "Zoom bot helped consolidate all the research data into a single view for user researchers",
    description: "Zoom bot helped consolidate all the research data into a single view for user researchers",
    title: "Designed a note-taking meeting bot for UX Researchers to get transcript, notes, and highlights in one place",
    img: loopnote,
    // images: [loopnote, final, questions],
    year: "Looppanel / 2022",
    tags: ["AI & Automation", "Productivity"],
    type: "client",
    details: "Looppanel's zoom bot",
    meta: {
      duration: "Jan'22 – Mar'22",
      role: "Founding Designer",
      scope: "AI-Powered Research Bot",
      impact: "Reduced synthesis time by 5x through workflow automation.",
    },
  },
  "3": {
    id: "3",
    company: "Nimbuzz",
    newdesc: "Developed a comprehensive Design Language System that reduced design-to-dev velocity by 60%.",
    description: "Developed a comprehensive Design Language System that reduced design-to-dev velocity by 60%.",
    title: "Nimbuzz: Scaling a Super App Design System",
    img: kurakaani,
    images: [kurakaani, interconnect],
    year: "2025-26",
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
    company: "Looppanel",
    newdesc: "Simplified the user experience for new and first time users by creating logical groupings of features",
    description: "Simplified the user experience for new and first time users by creating logical groupings of features",
    title: "Redesigned the information architecture of Looppanel to improve feature discovery and data organization.",
    img: loopdata,
    // images: [loopdata, loopnote, loopinfo],
    year: "2025-26",
    tags: ["Product", "Design research"],
    type: "client",
    details: "Information architecture revamp",
    meta: {
      duration: "Jun'22 – Jul'22",
      role: "Product Designer",
      scope: "Information Architecture revamp",
      impact: "Increased discoverability of features and customer satisfaction.",
    },
  },
  "4": {
    id: "4",
    company: "NID",
    newdesc: "Designed a multi-sensory hardware device to help users regain control over binge-behavior through mindful habit-forming.",
    description: "Designed a multi-sensory hardware device to help users regain control over binge-behavior through mindful habit-forming.",
    title: "Mindful Hardware: Tackling Binge Behavior",
    img: awaconimg,
    year: "2025-26",
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
