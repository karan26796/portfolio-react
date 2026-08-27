import figma from "./logos/figma.webp";
import notebooklm from "./logos/notebooklm.webp";
import descript from "./logos/descript.webp";
import snowflake from "./logos/snowflake.webp";
import pendo from "./logos/pendo.webp";
import claude from "./logos/claude.webp";
import protopie from "./logos/protopie.webp";
import xcode from "./logos/xcode.webp";

/** Tool name -> logo asset, used by ProjectCard's tool-logos row. */
export const TOOL_LOGOS: Record<string, string> = {
  Figma: figma,
  NotebookLM: notebooklm,
  Descript: descript,
  Snowflake: snowflake,
  Pendo: pendo,
  Claude: claude,
  ProtoPie: protopie,
  Xcode: xcode
};
