export interface ProjectCardData {
    id: string;
    title: string;
    description:string,
    img: string;
    tags: string[];
  }
  
  export interface ProjectDetail {
    type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'bullet' | 'image';
    content: string | string[] | ImageDetail; // Update to include ImageDetail for images
  }

  export interface ImageDetail {
    url: string;
    caption: string;
  }
  
  // This interface might be used if you ever need to combine summaries with details
  export interface ProjectData extends ProjectCardData {
    details: ProjectDetail[];
  }
  