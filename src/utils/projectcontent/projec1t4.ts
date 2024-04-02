// ProjectData.ts// ProjectData.ts
import img1 from "../project-imgs/binge-eating/1.webp";
import img2 from "../project-imgs/binge-eating/2.webp";
import img3 from "../project-imgs/binge-eating/3.webp";
import img4 from "../project-imgs/binge-eating/4.webp";
import img5 from "../project-imgs/binge-eating/5.webp";
import img6 from "../project-imgs/binge-eating/6.webp";
import img7 from "../project-imgs/binge-eating/7.webp";
import img8 from "../project-imgs/binge-eating/8.webp";
import img9 from "../project-imgs/binge-eating/9.webp";
import img10 from "../project-imgs/binge-eating/boree.webp";
import img11 from "../project-imgs/binge-eating/thumb.webp";

import {
  BodyElement,
  BulletElement,
  CustomElement,
  FigureElement,
  HeaderElement,
  ImageText,
  IntroElement,
  ParagraphElement,
} from "../interfaces";

// Define the type for the array of elements
// Dummy data for a project
type ProjectElement =
  | HeaderElement
  | BulletElement
  | FigureElement
  | CustomElement
  | BodyElement
  | ParagraphElement
  | ImageText
  | IntroElement;

// Dummy data for a project
const project2: ProjectElement[] = [];

export default project2;
