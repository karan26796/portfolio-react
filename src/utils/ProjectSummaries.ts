import { ProjectCardData } from "./interfaces";
import indieImg from "./project-imgs/thumb-indie.png";
import stagingthumb from "./project-imgs/staging-project/staging.gif";
import pauseimg from "./project-imgs/pause-holiday/pause-thumb.webp";
import awaconimg from "./project-imgs/binge-eating/binge.gif"
import kurakaani from "./project-imgs/kurakaani/thumb.gif"
import loopnote from "./project-imgs/loop-note/loop-note.gif"
import loopdata from "./project-imgs/loop-research/loop-research.gif"
import loopinfo from "./project-imgs/looppanel-insights/insight-thumb.gif"

export const projectSummaries: ProjectCardData[] = [
  // {
  //   id: "1",
  //   description:'Discover Premium and Affordable Homegrown brands',
  //   title:
  //     "IndieFinds",
  //   img: indieImg,
  //   tags: ["WEB DEVELOPMENT", "INTERACTION DESIGN"],
  //   link:"https://indiefinds.vercel.app",
  //   bgcolor:"#e0fff2",
  //   textcolor:"#00482b"
  // },
  {
    id: "1",
    description: "Zoom note-taking sidekick for user interviews",
    title: "Looppanel note-taking sidekick for Zoom",
    img: loopnote,
    tags: ["Product design", "Usability testing"],
    link: "",
    bgcolor: "#ddecff",
    textcolor: "#1b73e8",
  },

  {
    id: "2",
    description: "Designing ways to zoom in and out of research data",
    title: "Designing ways to zoom in and out of research data",
    img: loopinfo,
    tags: ["Product design", "UX research"],
    link: "",
    bgcolor: "#ddebff",
    textcolor: "#1a445a",
  },
  {
    id: "3",
    description:
      "Found ways to better discoverabilty of features & data organization.",
    title: "Product redesign for features discovery & data re-organization.",
    img: loopdata,
    tags: ["Product", "Design research"],
    link: "",
    bgcolor: "#f1e8ff",
    textcolor: "#7b3dd5",
  },
  {
    id: "4",
    description: "Redesigned Nepal's Superapp by creating a design system",
    title: "Component library for Nimbuzz Kurakaani — Nepal's superapp",
    img: kurakaani,
    tags: ["Design system", "Component library"],
    link: "",
    bgcolor: "#ffeee2",
    textcolor: "#e05d00",
  },
  // {
  //   id: "5",
  //   description:
  //     "A mindful device for overcoming binge behavior when you're bored",
  //   title: "A mindful device for overcoming binge behavior",
  //   img: awaconimg,
  //   tags: ["Design", "Research", "Psychology"],
  //   link: "",
  //   bgcolor: "#efefef",
  //   textcolor: "#000000",
  // },
  // {
  //   id: "6",
  //   description:
  //     "Pause — Leave tracking tool",
  //   title: "Pause — Leave tracking tool",
  //   img: pauseimg,
  //   tags: ["Product design", "SAAS" ,"Enterprise software"],
  //   link: "",
  //   bgcolor: "#efefef",
  //   textcolor: "#000000",
  // },
  // {
  //   id: "7",
  //   description:
  //     "Commentary on social media surveillance",
  //   title: "Commentary on social media surveillance",
  //   img: stagingthumb,
  //   tags: ["Experiential design", "Installations"],
  //   link: "",
  //   bgcolor: "#efefef",
  //   textcolor: "#000000",
  // },
];
