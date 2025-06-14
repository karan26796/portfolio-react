// src/data/images.ts
import evolve from "./resources/evolve.webp";
import figmashort from "./resources/figma-shortcuts.webp";
import bggradients from "./resources/gradients.gif";
import proto from "./resources/prototypes.webp";

export interface FigmaFile {
  url: string;
  link: string | "null";
  name: string;
  downloads:string;
}

export interface ImageItem {
  url: string;
  link: string | "null";
}

const communityFiles: FigmaFile[] = [
  {
    url: bggradients,
    link: "https://www.figma.com/community/file/1076867776880340874/animated-gradient-backgrounds-for-presentations",
    name: 'Background gradients for interactive presentations',
    downloads:'13k downloads'
  },
  {
    url: evolve,
    link: "https://www.figma.com/community/file/897091186704896395/evolve-component-library-karan-kapoor",
    name: 'Evolve component library',
    downloads:'3k downloads'
  },
  {
    url: figmashort,
    link: "https://www.youtube.com/watch?v=Rf-cg42id78&pp=ygUPa2FyYW4ga2Fwb29yIHV4",
    name: 'My favorite Figma shorcuts',
    downloads:'YouTube live'
  },
  {
    url: proto,
    link: "https://www.figma.com/community/file/905774038894769917/animation-prototype-playground",
    name: 'Learn Figma prototyping and animation',
    downloads:'4k downloads'
  },
];

export default communityFiles;
