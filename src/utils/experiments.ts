import gif1 from "../utils/experiments/1.gif";
import gif2 from "../utils/experiments/2.gif";
import gif3 from "../utils/experiments/3.gif";
import gif4 from "../utils/experiments/4.gif";
import colorPickerVideo from "../utils/experiments/color-picker.mp4";
import gif6 from "../utils/experiments/branding-colretech.gif";

export type ExperimentMediaType = "gif" | "video";

export interface Experiment {
  src: string;
  type: ExperimentMediaType;
  caption?: string;
}

const experiments: Experiment[] = [
  { src: colorPickerVideo, type: "video", caption: "DS color picker concept for Figma" },
  { src: gif1, type: "gif", caption: "Shopping app prototype" },
  { src: gif2, type: "gif", caption: "News app prototype" },
  { src: gif4, type: "gif", caption: "Unsplash app concept" },
  { src: gif6, type: "gif", caption: "ColreTech logo design" },
  { src: gif3, type: "gif", caption: "Movie app prototype" },
];

export default experiments;
