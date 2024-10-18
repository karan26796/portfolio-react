import { log } from "console";
import { ImageItem } from "./communityFiles";

import obvious from "./logos/obvious.webp";
import loop from "./logos/looppanel.webp";
import indiana from "./logos/indiana.webp";
import shaadi from "./logos/shaadi.webp";
import frontrow from "./logos/frontrow.webp";
import qoohoo from "./logos/qoohoo.webp";
import medianet from "./logos/media-net.webp";
import pyxis from "./logos/pixis.webp";
import keka from "./logos/keka-logo.webp";

export interface Logo {
  url: string;
}

const logos: Logo[] = [
  {
    url: keka,
  },
  {
    url: obvious,
  },
  {
    url: loop,
  },
  {
    url: indiana,
  },
  // {
  //   url: shaadi,
  // },
  {
    url: frontrow,
  },
  // {
  //   url: iitm,
  //   link: "",
  // },
  // {
  //   url: qoohoo,
  //   link: "",
  // },
  // {
  //   url: zuddl,
  //   link: "",
  // },
  // {
  //   url: medianet,
  //   link: "",
  // },
  // {
  //   url: pyxis,
  //   link: "",
  // },

];

export default logos;