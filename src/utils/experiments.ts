import gif1 from "../utils/experiments/1.gif";
import gif2 from "../utils/experiments/2.gif";
import gif3 from "../utils/experiments/3.gif";
import gif4 from "../utils/experiments/4.gif";
import colorPickerVideo from "../utils/experiments/color-picker.mp4";
import gif6 from "../utils/experiments/branding-colretech.gif";
import gif7 from "../utils/experiments/vedic-square.gif";
import gif8 from "../utils/experiments/color-wheel.gif";

export type ExperimentMediaType = "gif" | "video";

export interface Experiment {
  src: string;
  type: ExperimentMediaType;
  caption?: string;
}

const experiments: Experiment[] = [
  { src: gif1, type: "gif", caption: "Shopping app prototype" },
  { src: gif2, type: "gif", caption: "News app prototype" },
  { src: colorPickerVideo, type: "video", caption: "Figma color picker concept" },
  { src: gif6, type: "gif", caption: "ColreTech logo design" },
  { src: gif3, type: "gif", caption: "Movie app prototype" },
  // { src: gif7, type: "gif" },
  { src: gif4, type: "gif", caption: "Unsplash app concept" },
  // { src: gif8, type: "gif", caption: "Experiment 8" },
];

export default experiments;
