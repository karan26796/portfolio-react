import { ProjectCardData } from './interfaces';
import indieImg from './project-imgs/thumb-indie.png'

export const projectSummaries: ProjectCardData[] = [
  {
    id: "1",
    description:'Discover Premium and Affordable Homegrown brands',
    title:
      "IndieFinds",
    img: indieImg,
    tags: ["WEB DEVELOPMENT", "INTERACTION DESIGN"],
    link:"https://indiefinds.vercel.app",
    bgcolor:"#e0fff2",
    textcolor:"#00482b"
  },
  {
    id: "2",
    description:'Zoom note-taking sidekick for user interviews',
    title:
      "Looppanel Notetaking Bot",
    img: "https://www.kadankapoor.com/projects/images-loop-note/loop-note.gif",
    tags: ["PRODUCT DESIGN", "USABILITY TESTING"],
    link:"",
    bgcolor:"#ddecff",
    textcolor:"#1b73e8"
  },
  
  {
    id: "3",
    description:'Designing ways to zoom in and out of research data',
    title: "Data to Analysis",
    img: "https://www.kadankapoor.com/projects/looppanel-insights/insight-thumb.gif",
    tags: ["PRODUCT DESIGN", "UX RESEARCH"],
    link:"",
    bgcolor:"#ddebff",
    textcolor:"#1a445a"
  },
  {
    id: "4",
    description:"Redesigned Nepal's Superapp by creating a design system",
    title: "Component library",
    img: "https://www.kadankapoor.com/projects/images-kurakaani/thumb.gif",
    tags: ["DESIGN SYSTEM", "COMPONENT LIBRARY"],
    link:"",
    bgcolor:"#ffeee2",
    textcolor:"#e05d00"
  },
  {
    id: "5",
    description:'Found ways to better discoverabilty of features & data organization.',
    title:"Information Architecture revamp",
    img: "https://www.kadankapoor.com/projects/loop-research/loop-research.gif",
    tags: ["PRODUCT", "DESIGN RESEARCH"],
    link:"",
    bgcolor:"#f1e8ff",
    textcolor:"#7b3dd5"
  },
  {
    id: "6",
    description:"A mindful device for overcoming binge behavior when you're bored",
    title: "AWACON",
    img: "https://www.kadankapoor.com/projects/binge-eating/binge.gif",
    tags: ["DESIGN", "RESEARCH", "PSYCHOLOGY"],
    link:"",
    bgcolor:"#efefef",
    textcolor:"#000000"
  },
];
