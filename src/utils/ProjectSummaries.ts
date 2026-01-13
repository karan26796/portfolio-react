import { ProjectCardData } from "./interfaces";

import indieImg from "./project-imgs/thumb-indie.png";
import stagingthumb from "./project-imgs/staging-project/staging.gif";
import pauseimg from "./project-imgs/pause-holiday/pause-thumb.webp";
import awaconimg from "./project-imgs/binge-eating/binge.gif"
import kurakaani from "./project-imgs/kurakaani/thumb.gif"
import loopnote from "./project-imgs/loop-note/loop-note.gif"
import keka from "./project-imgs/continuous rewards/Thumb.webp"
import loopinfo from "./project-imgs/looppanel-insights/insight-thumb.gif"
import wish from "./project-imgs/kekawish/thumb-cr.webp"
import award from "./project-imgs/award program/Thumb-certi-spot.webp"

export interface ProjectMeta {
  duration: string;
  role: string;
  scope: string;
  impact: string;
}

export const projectSummaries: Array<ProjectCardData & { meta: ProjectMeta }> = [
  {
    id: "8",
    description: 'Strengthened the core Rewards & Recognition offering by introducing Ad-hoc rewards and certificates to accomodate company branding.',
    title: "Enabling companies to reward employees flexibly while maintaining brand identity",
    img: award,
    tags: ["Product Design", "Design Strategy"],
    type: "client",
    details: "Keka / 2025",
    specialStatus: "Publishing in 4 days",
    meta: {
      duration: "Nov 2024 – Jan 2025",
      role: "Design Strategy & Execution",
      scope: "Enterprise Recognition System",
      impact: "Increased internal operational agility and empowered HR teams with full self-service autonomy."
    }
  },
  {
    id: "6",
    description: 'Designed a flexible, points-based recognition system that secured 10+ enterprise clients within 5 months.',
    title: "Building a Continuous Rewards Ecosystem",
    img: keka,
    tags: ["Systems Thinking", "Revenue Growth"],
    type: "client",
    details: "Keka / 2024",
    meta: {
      duration: "Jun 2024 – Nov 2024",
      role: "Lead Product Designer",
      scope: "B2B Reward & Recognition System",
      impact: "Directly contributed to securing 10+ enterprise accounts."
    }
  },
  {
    id: "7",
    description: 'Scaled weekly engagement from 15k to 100k users by redesigning the workplace celebrations framework.',
    title: "Revolutionizing Workplace Celebrations at Keka",
    img: wish,
    tags: ["Product Design", "Design Strategy"],
    type: "client",
    details: "Keka / 2025",
    meta: {
      duration: "Nov 2024 – Jan 2025",
      role: "Design Strategy & Execution",
      scope: "Enterprise Engagement System",
      impact: "5x increase in employee engagement and 3x adoption growth."
    }
  },
  {
    id: "1",
    description: "Designed a Zoom-integrated note-taker that reduced research time-to-insights by 5x.",
    title: "Accelerating Research Workflows at Looppanel",
    img: loopnote,
    tags: ["AI & Automation", "Productivity"],
    type: "client",
    details: "Looppanel / Founding Designer",
    meta: {
      duration: "Jan 2022 – Mar 2022",
      role: "Founding Designer",
      scope: "AI-Powered Research Bot",
      impact: "Reduced synthesis time by 5x through workflow automation."
    }
  },
  {
    id: "2",
    description: "Architected qualitative data analysis tools to streamline insight discovery for global research teams.",
    title: "Looppanel: Data to Insight Pipeline",
    img: loopinfo,
    tags: ["Data Analysis", "Research Ops"],
    type: "client",
    details: "Looppanel / Founding Designer",
    meta: {
      duration: "Apr 2022 – Jun 2022",
      role: "Founding Designer",
      scope: "Qualitative Data Analysis Suite",
      impact: "Significantly improved insight discovery velocity for cross-functional teams."
    }
  },
  {
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
      impact: "60% reduction in screen design and handoff time."
    }
  },
  {
    id: "4",
    description: "Designed a multi-sensory hardware device to help users regain control over binge-behavior through mindful habit-forming.",
    title: "Mindful Hardware: Tackling Binge Behavior",
    img: awaconimg,
    tags: ["IoT", "Behavioral Design"],
    type: "client",
    details: "Master's Project / NID",
    meta: {
      duration: "Aug 2022 – Oct 2022",
      role: "Research & Industrial Design",
      scope: "Behavioral Intervention Device",
      impact: "Developed a functional prototype for emotional regulation."
    }
  },
];
