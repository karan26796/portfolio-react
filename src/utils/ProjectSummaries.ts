import { ProjectCardData } from './interfaces';
import indieImg from './project-imgs/thumb-indie.png'

export const projectSummaries: ProjectCardData[] = [
  {
    id: "1",
    description:'Discover Premium and Affordable Homegrown brands.',
    title:
      "IndieFinds",
    img: indieImg,
    tags: ["WEB DEVELOPMENT", "INTERACTION DESIGN"],
    link:"https://indiefinds.vercel.app",
  },
  {
    id: "2",
    description:'Zoom note-taking sidekick for user interviews',
    title:
      "Looppanel Notetaking Bot",
    img: "https://www.kadankapoor.com/projects/images-loop-note/loop-note.gif",
    tags: ["PRODUCT DESIGN", "USABILITY TESTING"],
    link:"",
  },
  
  {
    id: "3",
    description:'Designing ways to zoom in and out of research data',
    title: "Data to Analysis",
    img: "https://www.kadankapoor.com/projects/looppanel-insights/insight-thumb.gif",
    tags: ["PRODUCT DESIGN", "UX RESEARCH"],
    link:"",
  },
  {
    id: "4",
    description:'Redesigned Nepal&apos;s Superapp by creating a design system',
    title: "Nepal's superapp's design library",
    img: "https://www.kadankapoor.com/projects/images-kurakaani/thumb.gif",
    tags: ["DESIGN SYSTEM", "COMPONENT LIBRARY"],
    link:"",
  },
  {
    id: "5",
    description:'Found ways to better discoverabilty of features & data organization.',
    title:"Information Architecture revamp",
    img: "https://www.kadankapoor.com/projects/loop-research/loop-research.gif",
    tags: ["PRODUCT", "DESIGN RESEARCH"],
    link:"",
  },
  {
    id: "6",
    description:': A mindful device for overcoming binge behavior when you&aposre bored',
    title: "AWACON",
    img: "https://www.kadankapoor.com/projects/binge-eating/binge.gif",
    tags: ["DESIGN", "RESEARCH", "PSYCHOLOGY"],
    link:"",
  },
];
