// src/data/images.ts
import colretechImg from "../utils/experiments/colretech.webp";
import colretechGif from "../utils/experiments/branding-colretech.gif";
import img1 from "../utils/experiments/img-1.webp";
import gif1 from "../utils/experiments/1.gif";
import img2 from "../utils/experiments/img-2.webp";
import gif2 from "../utils/experiments/2.gif";
import img3 from "../utils/experiments/img-3.webp";
import gif3 from "../utils/experiments/3.gif";
import img4 from "../utils/experiments/img-4.webp";
import gif4 from "../utils/experiments/4.gif";
import colorWheelImg from "../utils/experiments/color-wheel.webp";
import colorWheelGif from "../utils/experiments/color-wheel.gif";
import vedicSquareImg from "../utils/experiments/vedic-square.webp";
import vedicSquareGif from "../utils/experiments/vedic-square.gif";
import colorPickerGif from "../utils/experiments/ColorPicker.gif";
import colorPickerImg from "../utils/experiments/ColorPicker.jpg";

export interface Experiment {
  urlImg: string;
  urlGif: string;
}

const experiments: Experiment[] = [
  {
    urlImg: colretechImg,
    urlGif: colretechGif,
  },
  {
    urlImg: colorPickerImg,
    urlGif: colorPickerGif,
  },
  {
    urlImg: colorWheelImg,
    urlGif: colorWheelGif,
  },
  {
    urlImg: img1,
    urlGif: gif1,
  },
  // {
  //   urlImg: img2,
  //   urlGif: gif2,
  // },
  // {
  //   urlImg: img3,
  //   urlGif: gif3,
  // },
  // {
  //   urlImg: img4,
  //   urlGif: gif4,
  // },
  
];

export default experiments;