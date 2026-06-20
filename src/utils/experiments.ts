import gif1 from "../utils/experiments/1.gif";
import gif2 from "../utils/experiments/2.gif";
import gif3 from "../utils/experiments/3.gif";
import gif4 from "../utils/experiments/4.gif";
import gif5 from "../utils/experiments/ColorPicker.gif";
import gif6 from "../utils/experiments/branding-colretech.gif";
import gif7 from "../utils/experiments/vedic-square.gif";
import gif8 from "../utils/experiments/color-wheel.gif";

export interface Experiment {
  urlGif: string;
}

const experiments: Experiment[] = [
  { urlGif: gif1 },
  { urlGif: gif2 },
  { urlGif: gif5 },
  { urlGif: gif6 },
  { urlGif: gif3 },
  // { urlGif: gif7 },
  { urlGif: gif4 },
  // { urlGif: gif8 },
];

export default experiments;
