// src/data/images.ts
import evolve from "./resources/evolve.webp";
import figmashort from "./resources/figma-shortcuts.webp";
import bggradients from "./resources/gradients.gif";
import learnplay from "./resources/learn-play.webp";
import proto from "./resources/prototypes.webp";
import twitter from "./resources/twitter.webp";

export interface ImageItem {
  url: string;
  link: string | "null";
}

const communityFiles: ImageItem[] = [
  {
    url: bggradients,
    link: "https://www.figma.com/community/file/1076867776880340874/animated-gradient-backgrounds-for-presentations",
  },
  {
    url: evolve,
    link: "https://www.figma.com/community/file/897091186704896395/evolve-component-library-karan-kapoor",
  },
  {
    url: figmashort,
    link: "https://www.youtube.com/watch?v=Rf-cg42id78&pp=ygUPa2FyYW4ga2Fwb29yIHV4",
  },
  {
    url: learnplay,
    link: "https://www.youtube.com/watch?v=LCHQ9MApBGA",
  },
  {
    url: proto,
    link: "https://www.figma.com/community/file/905774038894769917/animation-prototype-playground",
  },
  {
    url: twitter,
    link: "https://www.figma.com/community/file/997477366354506560/twitter-in-auto-layout",
  },

  // Add more images as needed
];

export default communityFiles;
