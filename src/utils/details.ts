import gif1 from "./experiments/1.gif";
import gif2 from "./experiments/2.gif";
import gif3 from "./experiments/3.gif";
import gif4 from "./experiments/4.gif";
import colorPickerVideo from "./experiments/color-picker.mp4";
import colretechGif from "./experiments/branding-colretech.gif";

/**
 * Small design details — one interaction, one decision, one piece of craft per
 * card. Newest first: the array order is the "Latest first" order, so a new
 * detail goes at the top.
 *
 * The filter pills are built from the categories that actually appear here, so
 * a new category needs no other change.
 */
export type DetailCategory =
  | "Design"
  | "Interactivity"
  | "Motion"
  | "Copywriting"
  | "Branding";

export interface DesignDetail {
  id: string;
  category: DetailCategory;
  title: string;
  /** One or two lines on why it matters. Optional — some details speak for themselves. */
  description?: string;
  media: {
    type: "image" | "video";
    src: string;
    alt: string;
  };
}

export const details: DesignDetail[] = [
  {
    id: "reuse-existing-tags",
    category: "Design",
    title: "Reuse Existing Tags",
    description:
      "Showing a project's tags on the call screen, so five near-duplicates collapse into one.",
    media: {
      type: "image",
      src: "/writing/project-tags.png",
      alt: "Five near-duplicate tags about slow loading collapse into two: Slow Load Time and Onboarding Challenge.",
    },
  },
  {
    id: "ds-color-picker",
    category: "Interactivity",
    title: "Design System Colour Picker",
    description: "Picking from the system's tokens, not from the whole spectrum.",
    media: {
      type: "video",
      src: colorPickerVideo,
      alt: "A Figma colour picker concept that snaps to design-system colour tokens.",
    },
  },
  {
    id: "shopping-app",
    category: "Motion",
    title: "Shopping App Transitions",
    media: { type: "image", src: gif1, alt: "Shopping app prototype with animated transitions." },
  },
  {
    id: "unsplash-concept",
    category: "Interactivity",
    title: "Unsplash App Concept",
    media: { type: "image", src: gif4, alt: "An Unsplash app concept being browsed." },
  },
  {
    id: "news-app",
    category: "Motion",
    title: "News App Prototype",
    media: { type: "image", src: gif2, alt: "News app prototype with animated navigation." },
  },
  {
    id: "colretech-logo",
    category: "Branding",
    title: "ColreTech Logo",
    media: { type: "image", src: colretechGif, alt: "The ColreTech logo animating into place." },
  },
  {
    id: "movie-app",
    category: "Motion",
    title: "Movie App Prototype",
    media: { type: "image", src: gif3, alt: "Movie app prototype with animated transitions." },
  },
];
