export interface ProjectCardData {
  id: string;
  title: string;
  description: string,
  img: string;
  tags: string[];
  link: string;
}

export interface ProjectDetail {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'bullet' | 'image' | 'img-container';
  content: string | string[] | ImageDetail | ImageContainer; // Update to include ImageDetail for images
}

export interface ImageDetail {
  url: string;
  caption: string;
}

export interface ImageContainer {
  title: string | null;
  header: string | null;
  body: string | null;
  bullet: string[] | null;
  quote: string | null;
  img: ImageDetail[];
}

// This interface might be used if you ever need to combine summaries with details
export interface ProjectData extends ProjectCardData {
  details: ProjectDetail[];
}
