import { useEffect } from 'react';

interface PageSEOProps {
  title: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export const usePageSEO = ({ title, description, keywords, canonicalUrl, ogImage }: PageSEOProps) => {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);

      // Update OG description
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', description);
      }
    }

    // Update meta keywords
    if (keywords) {
      let metaKw = document.querySelector('meta[name="keywords"]');
      if (!metaKw) {
        metaKw = document.createElement('meta');
        metaKw.setAttribute('name', 'keywords');
        document.head.appendChild(metaKw);
      }
      metaKw.setAttribute('content', keywords);
    }

    // Update canonical link
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', canonicalUrl);
      }
    }

    // Update OG & Twitter Image
    const targetImage = ogImage || 'https://kadankapoor.com/site-thumbnail.webp';
    let ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) {
      ogImg.setAttribute('content', targetImage);
    }
    let twImg = document.querySelector('meta[name="twitter:image"]');
    if (twImg) {
      twImg.setAttribute('content', targetImage);
    }
  }, [title, description, keywords, canonicalUrl, ogImage]);
};

export default usePageSEO;
