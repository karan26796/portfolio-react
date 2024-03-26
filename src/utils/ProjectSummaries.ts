import { ProjectCardData } from './interfaces';
import indieImg from '../project-imgs/thumb-indie.png'

export const projectSummaries: ProjectCardData[] = [
  {
    id: "1",
    description:'Discover Premium and Affordable Homegrown brands.',
    title:
      "IndieFinds - Discover Premium and Affordable Homegrown brands",
    img: indieImg,
    tags: ["WEB DEVELOPMENT", "INTERACTION DESIGN"],
    link:"https://indiefinds.vercel.app",
  },
  {
    id: "2",
    description:'Recorded 1 lac notes in 2 months of note-taker launch.',
    title:
      "Looppanel: Creating a Zoom note-taking sidekick(bot) for user interviews",
    img: "https://www.kadankapoor.com/projects/images-loop-note/loop-note.gif",
    tags: ["PRODUCT DESIGN", "USABILITY TESTING"],
    link:"",
  },
  
  {
    id: "3",
    description:'Reduced the time from call recording to insights by ~10hrs',
    title: "Designing ways to zoom in and out of research data",
    img: "https://www.kadankapoor.com/projects/looppanel-insights/insight-thumb.gif",
    tags: ["PRODUCT DESIGN", "UX RESEARCH"],
    link:"",
  },
  {
    id: "4",
    description:'Successfully launched a component library and reduced time to development.',
    title: "Redesigning Nepal&apos;s Superapp by creating a design system",
    img: "https://www.kadankapoor.com/projects/images-kurakaani/thumb.gif",
    tags: ["DESIGN SYSTEM", "COMPONENT LIBRARY"],
    link:"",
  },
  {
    id: "5",
    description:'Increased discoverabilty of features and customer satisfaction.',
    title:"Information Architecture revamp for better discoverabilty of features & data organization",
    img: "https://www.kadankapoor.com/projects/loop-research/loop-research.gif",
    tags: ["PRODUCT", "DESIGN RESEARCH"],
    link:"",
  },
  {
    id: "6",
    description:'Gives you back the control over your life by providing alternate ways to spend your time.',
    title: "AWACON: A mindful device for overcoming binge behavior and boredom",
    img: "https://www.kadankapoor.com/projects/binge-eating/binge.gif",
    tags: ["DESIGN", "RESEARCH", "PSYCHOLOGY"],
    link:"",
  },
];
