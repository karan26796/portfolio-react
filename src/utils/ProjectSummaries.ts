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

export interface ProjectMeta {
  duration: string;
  role: string;
  scope: string;
  impact: string;
}

export const projectSummaries: Array<ProjectCardData & { meta: ProjectMeta }> = [
  {
    id: "7",
    description: 'Boosted feature engagement from 15k users a week to 100k users a week',
    title: "Enhancing engagement for day to day workplace celebrations on Keka wall",
    img: wish,
    tags: ["Product design", "Design strategy"],
    type: "client",
    details: "Keka/2025",
    meta: {
      duration: "Nov 2024 – Jan 2025",
      role: "Design, Strategy",
      scope: "Feature engagement for workplace celebrations",
      impact: "Increased weekly engagement from 15k to 100k users"
    }
  },
  {
    id: "6",
    description: 'Developed a points-based employee recognition system to boost motivation and engagement within Keka.',
    title: "Introducing a points based system through Continuous rewards in Keka for employees",
    img: keka,
    tags: ["Design", "Research", "Strategy"],
    type: "client",
    details: "Keka/2024",
    meta: {
      duration: "Jun 2024 – Nov 2024",
      role: "Design, Research, Stakeholder Alignment",
      scope: "Integrating a points-based recognition system within Keka",
      impact: "Secured 10 clients for mid and small sized businesses in India"
    }
  },
  {
    id: "1",
    description: "Created a note-taking assistant to insights pipeline for user interviews.",
    title: "From Zoom bot to interview insights",
    img: loopnote,
    tags: ["Design", "Research"],
    type: "client",
    details: "Looppanel/2022",
    meta: {
      duration: "Jan 2022 – Mar 2022",
      role: "Design, Research, Testing",
      scope: "Note-taking assistant for Zoom",
      impact: "Streamlined research workflows for user researchers and usability testers"
    }
  },
  {
    id: "2",
    description: "Designed tools for researchers to zoom in and out of qualitative data to get research buy in using project summaries.",
    title: "Interviews to project summaries",
    img: loopinfo,
    tags: ["Design", "Research"],
    type: "client",
    details: "Looppanel/2022",
    meta: {
      duration: "Apr 2022 – Jun 2022",
      role: "Research, Design, Testing",
      scope: "Qualitative data analysis tools",
      impact: "Improved insight discovery for research teams"
    }
  },
  {
    id: "4",
    description: "Boredom is the biggest cause of bingeing. I created a device that can help tackle boredom and give one back control of their life",
    title: "A mindful device for overcoming binge behavior",
    img: awaconimg,
    tags: ["Design", "Research", "Psychology"],
    type: "client",
    details: "Master's project/2022",
    meta: {
      duration: "Aug 2022 – Oct 2022",
      role: "Research, Design, Prototyping",
      scope: "Device to tackle boredom and binge behavior",
      impact: "Helped users regain control over their habits"
    }
  },
];
