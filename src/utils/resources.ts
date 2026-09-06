import communityFiles from "./communityFiles";

export type ResourceKind = "figma" | "youtube";

export interface Resource {
  kind: ResourceKind;
  /** Shown in the label above the deck. */
  title: string;
  /** The one number worth stating — downloads, or views. */
  meta: string;
  href: string;
  thumbnail: string;
}

/**
 * The file's own name, read out of its Figma URL.
 *
 * communityFiles has no title field — its `name` holds a download count, the
 * same as `downloads` — and inventing titles would put words in the files'
 * mouths. The slug is the name Figma itself publishes them under.
 */
function titleFromFigmaUrl(url: string): string {
  const slug = url.split("/").filter(Boolean).pop() || "";
  const words = slug.replace(/-/g, " ").trim();
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : "Figma community file";
}

const figmaResources: Resource[] = communityFiles.map((file) => ({
  kind: "figma",
  title: titleFromFigmaUrl(file.link),
  meta: file.downloads,
  href: file.link,
  thumbnail: file.url,
}));

/**
 * Builds a video entry from its id — the bit after `watch?v=` or `youtu.be/`.
 *
 * The thumbnail comes from YouTube's own still for that video, so adding one
 * is a single line and no image needs downloading into the repo.
 */
export const youtubeVideo = (id: string, title: string, meta: string): Resource => ({
  kind: "youtube",
  title,
  meta,
  href: `https://www.youtube.com/watch?v=${id}`,
  thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
});

/**
 * The videos. Empty until the ids are filled in — nothing here is guessable,
 * and a made-up link is worse than a shorter deck.
 *
 *   youtubeVideo("dQw4w9WgXcQ", "Auto Layout, properly", "12k views"),
 */
export const youtubeVideos: Resource[] = [];

/* Interleaved rather than grouped, so the deck reads as one row of things
   worth having rather than two lists that happen to sit together. */
const resources: Resource[] = [...figmaResources, ...youtubeVideos];

export default resources;
