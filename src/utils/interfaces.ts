export interface ProjectCardData {
  id: string;
  title: string;
  newdesc: string;
  description: string,
  img: string;
  tags: string[];
}

export type BodyElement = HeaderElement | BulletElement | ParagraphElement;
export type ProjectElement = HeaderElement | BulletElement | FigureElement | CustomElement | ParagraphElement | ImageText | IntroElement;

export interface ProjectCardData {
  id: string;
  img: string;
  images?: string[];
  title: string;
  year: string;
  description: string;
  tags: string[];
  type: "personal" | "client" | "other";
  url?: string;
  specialStatus?: string; // Add this line to resolve the error
  company?: string;
  aiSummary?: string;
  accentColor?: string;
  tools?: string[];
  /** Short scrollytelling one-liner shown as a side note, e.g. "The time I worked without a PM." */
  story?: string;
  /** Short label like "Keka HR / 2026", shown above the card title. */
  details?: string;
  /**
   * Explicit page-wash color shown while this project is the active card in
   * the scrolling project list. Set this to hand-pick the color; when it's
   * omitted the color is derived from the thumbnail's dominant tone instead.
   */
  bgColor?: string;
}

export interface IntroElement {
  type: 'intro';
  text: HeaderElement;
  desc: ParagraphElement;
}

export interface HeaderElement {
  type: 'header';
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface ParagraphElement {
  type: 'p';
  text: string;
}

export interface BulletElement {
  type: 'bullet';
  text: string[];
}

export interface FigureElement {
  type: 'figure';
  image: string; // Image URL or base64 string
  caption: string;
}

export interface ImageText {
  type: 'imgtext'
  body: BodyElement[];
  image: FigureElement[];
}

export interface CustomElement {
  type: 'custom';
  content: React.ReactNode;
}


// This interface might be used if you ever need to combine summaries with details
// export interface ProjectData extends ProjectCardData {
//   details: ProjectDetail[];
// }
// export interface ProjectDetail {
//   type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'bullet' | 'image' | 'img-container';
//   content: string | string[]; // Update to include ImageDetail for images
// }
