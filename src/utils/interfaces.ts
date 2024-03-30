export interface ProjectCardData {
  id: string;
  title: string;
  description: string,
  img: string;
  tags: string[];
  link: string;
}

export type BodyElement = HeaderElement | BulletElement | ParagraphElement;

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
  image: FigureElement | null;
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
