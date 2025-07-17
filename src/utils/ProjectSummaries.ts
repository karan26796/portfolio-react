import { ProjectCardData } from "./interfaces";
import indieImg from "./project-imgs/thumb-indie.png";
import stagingthumb from "./project-imgs/staging-project/staging.gif";
import pauseimg from "./project-imgs/pause-holiday/pause-thumb.webp";
import awaconimg from "./project-imgs/binge-eating/binge.gif"
import kurakaani from "./project-imgs/kurakaani/thumb.gif"
import loopnote from "./project-imgs/loop-note/loop-note.gif"
import keka from "./project-imgs/continuous rewards/Thumb.webp"
import loopinfo from "./project-imgs/looppanel-insights/insight-thumb.gif"
import wish from "./project-imgs/kekawish/thumb.png"

export const projectSummaries: ProjectCardData[] = [
  {
    id: "7",
    description: 'Boosted feature engagement from 15k users a week to 100k users a week',
    title:
      "Enhancing engagement for day to day workplace celebrations on Keka wall",
    img: wish,
    tags: ["Product design", "Design strategy"],
    type: "client",
  },
  {
    id: "6",
    description: 'Developed a points-based employee recognition system to boost motivation and engagement within Keka.',
    title:
      "Introducing a points based recognition system in Keka for employees",
    img: keka,
    tags: ["Product design", "Design strategy"],
    type: "client",
  },
  {
    id: "1",
    description: "Created a note-taking assistant for Zoom to streamline research and usability testing workflows.",
    title: "Looppanel note-taking sidekick for Zoom",
    img: loopnote,
    tags: ["Product design", "Usability testing"],
    type: "client",
  },
  {
    id: "2",
    description: "Designed tools for researchers to zoom in and out of qualitative data, improving insight discovery.",
    title: "Designing ways to zoom in and out of research data",
    img: loopinfo,
    tags: ["Product design", "UX research"],
    type: "client",
  },
  // {
  //   id: "3",
  //   description: "Converted wireframes into hi-fi designs by creating a scalable component library for the app",
  //   title: "Component library for Nimbuzz Kurakaani — Nepal's superapp",
  //   img: kurakaani,
  //   tags: ["Design system", "Component library"],
  //   type: "client",
  // },
  {
    id: "4",
    description:
      "Boredom is the biggest cause of bingeing. I created a device that can help tackle boredom and give you back the control one's life",
    title: "A mindful device for overcoming binge behavior",
    img: awaconimg,
    tags: ["Design", "Research", "Psychology"],
    type: "client",
  },
  // {
  //   id: "5",
  //   description:
  //     "Found ways to better discoverabilty of features & data organization.",
  //   title: "Product redesign for features discovery & data re-organization.",
  //   img: loopdata,
  //   tags: ["Product", "Design research"],
  //   link: "",
  //   bgcolor: "#f1e8ff",
  //   textcolor: "#7b3dd5",
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
