import { useEffect, useMemo, useRef, useState } from "react";
import "../styles/Gallery.scss";
import { MapPin } from "@phosphor-icons/react";
import ScrollReveal from "../components/ScrollReveal";

export interface Region {
  id: string;
  name: string;
  images: number[];
}

interface JustifiedRow {
  rowHeight: number;
  items: { num: number; width: number }[];
}

export const LOCATIONS: Record<number, string> = {
  1: "Tabo, Himachal",
  2: "Chandratal lake, Himachal",
  3: "Langza, Spiti Valley",
  4: "Serolsar lake trek, Himachal",
  5: "Dhanushkodi, Rameswaram",
  6: "Parashar lake trek, Himachal",
  7: "Munnar, Kerala",
  8: "Singapore Zoo",
  9: "Kaza, Spiti Valley",
  10: "Humayun's Tomb, Delhi",
  12: "Tabo, Himachal",
  13: "Kashmir",
  14: "Bir, Himachal",
  15: "Doodhpathri, Kashmir",
  16: "Key Monastery, Spiti",
  17: "Shanti stupa, Leh",
  18: "Indian Astronomical Observatory, Hanle, Ladakh",
  19: "Bir, Himachal",
  20: "Bir, Himachal",
  21: "Doodhpathri, Kashmir",
  22: "Hanle, Ladakh",
  23: "Lamayuru moonland, Ladakh",
  24: "Leh, Ladakh",
  25: "Surajtal, Himachal",
  26: "Srinagar, Kashmir",
  27: "Pahalgam, Kashmir",
  28: "Hanle, Ladakh",
  29: "Tso Moriri, Ladakh",
  30: "en route Umling La, Ladakh",
  31: "Doodhpathri, Kashmir",
  32: "Kashmir",
  33: "Switzerland",
  34: "Zurich, Switzerland",
  35: "Rhine Falls, Switzerland",
  36: "Mount Titlis, Switzerland",
  37: "Interlaken, Switzerland",
  38: "Eiffel Tower",
  39: "Opera House, Paris",
  40: "Paris",
  41: "Zurich, Switzerland",
  42: "Spiti Valley, Himachal",
  43: "Langza, Spiti Valley",
};

// Real pixel dimensions of each /gallery/{n}.webp file, used to lay out rows
// without ever cropping or stretching a photo off its native aspect ratio.
export const ASPECT_RATIOS: Record<number, number> = {
  1: 1920 / 1280,
  2: 1280 / 1930,
  3: 1280 / 1920,
  4: 1280 / 1920,
  5: 1280 / 1925,
  6: 1931 / 1280,
  7: 2095 / 1280,
  8: 1338 / 943,
  9: 1280 / 1920,
  10: 1920 / 1280,
  12: 1920 / 1280,
  13: 882 / 588,
  14: 882 / 587,
  15: 882 / 593,
  16: 2458 / 3072,
  17: 882 / 593,
  18: 882 / 588,
  19: 882 / 674,
  20: 882 / 662,
  21: 1796 / 1152,
  22: 1796 / 1154,
  23: 1796 / 1154,
  24: 1796 / 1154,
  25: 1796 / 1154,
  26: 1796 / 1154,
  27: 1796 / 1154,
  28: 1796 / 1154,
  29: 1796 / 1154,
  30: 1796 / 1154,
  31: 1796 / 1154,
  32: 1796 / 1154,
  33: 1859 / 2048,
  34: 2048 / 1638,
  35: 2048 / 1638,
  36: 2048 / 1638,
  37: 2048 / 1638,
  38: 2048 / 1638,
  39: 1638 / 2048,
  40: 2048 / 1638,
  41: 2128 / 1638,
  42: 1200 / 857,
  43: 1200 / 675,
};

// Curated groupings by region — kept as an explicit list rather than derived
// from the location strings, since a few spots (e.g. "Shanti stupa, Leh")
// don't literally contain their region's name. Note: image 11 doesn't exist
// on disk, so it's excluded rather than 404ing.
export const REGIONS: Region[] = [
  { id: "himachal", name: "Himachal & Spiti", images: [1, 2, 3, 4, 6, 9, 12, 16, 14, 19, 20, 25, 42, 43] },
  { id: "kashmir", name: "Kashmir", images: [13, 15, 21, 26, 27, 31, 32] },
  { id: "ladakh", name: "Ladakh", images: [17, 18, 22, 23, 24, 28, 29, 30] },
  { id: "switzerland", name: "Switzerland", images: [33, 34, 35, 36, 37, 41] },
  { id: "paris", name: "Paris", images: [38, 39, 40] },
  { id: "elsewhere", name: "Elsewhere", images: [5, 7, 8, 10] },
];

const GAP = 8;
const MAX_ROW_HEIGHT_FACTOR = 1.5;

const isWide = (num: number) => (ASPECT_RATIOS[num] || 1.5) >= 1;

// Groups a region's photos two or three at a time: two wide (landscape)
// photos together, or one wide with two tall (portrait) photos — never a
// mix of just one wide and one tall, and never four+ in a row. Order within
// each region's own `images` list (see REGIONS below) is preserved inside
// each type, so wides stay in their original relative order among
// themselves, and same for talls.
function groupByShape(images: number[]): number[][] {
  const wides = images.filter(isWide);
  const talls = images.filter((n) => !isWide(n));
  const groups: number[][] = [];
  let wi = 0;
  let ti = 0;

  while (wi < wides.length || ti < talls.length) {
    const wRemaining = wides.length - wi;
    const tRemaining = talls.length - ti;

    if (tRemaining >= 2 && wRemaining >= 1) {
      groups.push([wides[wi++], talls[ti++], talls[ti++]]);
    } else if (wRemaining >= 2) {
      groups.push([wides[wi++], wides[wi++]]);
    } else {
      // Leftovers that don't fit either pattern (e.g. one wide and one
      // tall left over) just share a final row together.
      const leftover: number[] = [];
      if (wi < wides.length) leftover.push(wides[wi++]);
      if (ti < talls.length) leftover.push(talls[ti++]);
      groups.push(leftover);
    }
  }

  return groups;
}

// Sizes one pre-built group of photos (see groupByShape) to a single shared
// row height, scaled so the row's total width lands exactly on the
// container width — no row, including a region's last one, falls short and
// leaves a gap. Only width varies with each photo's own aspect ratio.
// On mobile, `oneImagePerRow` skips the wide+tall pairing entirely — two or
// three photos squeezed side by side on a narrow phone screen would each
// end up too small to actually look at, so each photo gets its own full
// width row (and its natural aspect ratio, since there's nothing to justify
// it against) instead.
function computeGroupedRows(
  images: number[],
  containerWidth: number,
  targetHeight: number,
  oneImagePerRow = false
): JustifiedRow[] {
  if (containerWidth <= 0) return [];

  const maxRowHeight = targetHeight * MAX_ROW_HEIGHT_FACTOR;
  const groups = oneImagePerRow ? images.map((n) => [n]) : groupByShape(images);

  return groups.map((group) => {
    const aspectSum = group.reduce((sum, n) => sum + (ASPECT_RATIOS[n] || 1.5), 0);
    const rawHeight = (containerWidth - (group.length - 1) * GAP) / aspectSum;
    // Single-photo mobile rows always fill the full width, however tall
    // that makes them — capping the height there would shrink the photo
    // back off the edges and reopen the gap this whole scheme avoids.
    const height = oneImagePerRow ? rawHeight : Math.min(rawHeight, maxRowHeight);
    return {
      rowHeight: height,
      items: group.map((n) => ({ num: n, width: (ASPECT_RATIOS[n] || 1.5) * height })),
    };
  });
}

const getGalleryImageUrl = (num: number) => `/gallery/${num}.webp`;

const Gallery = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 750);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    // Measure synchronously up front — don't rely solely on ResizeObserver's
    // first callback, which can lag behind the initial paint.
    setCanvasWidth(el.getBoundingClientRect().width);

    const observer = new ResizeObserver((entries) => {
      setCanvasWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Big rows on purpose — large photos read as an experience to look
  // through rather than a dense wall of thumbnails.
  const targetRowHeight = isMobile ? 220 : 420;

  const regionRows = useMemo(
    () => REGIONS.map((region) => computeGroupedRows(region.images, canvasWidth, targetRowHeight, isMobile)),
    [canvasWidth, targetRowHeight, isMobile]
  );

  return (
    <div className="gallery-parent">
      <ScrollReveal className="gallery-content">
        <h1>Photo gallery</h1>
        <p>
          I have been fortunate to visit some of the most stunning places
          in India, and recently abroad. Here are some of my favorite pictures. I hope you like
          them! 😌
        </p>
      </ScrollReveal>

      <div className="gallery-canvas" ref={canvasRef}>
        {REGIONS.map((region, regionIndex) => (
          <div key={region.id} className="gallery-region">
            <h2 className="gallery-region-title">{region.name}</h2>
            <div className="gallery-justified">
              {regionRows[regionIndex].map((row, rowIndex) => (
                <div className="gallery-row" key={rowIndex} style={{ height: row.rowHeight }}>
                  {row.items.map(({ num, width }) => (
                    <ScrollReveal
                      key={num}
                      className="gallery-tile"
                      variant="fade"
                      style={{ width, height: row.rowHeight }}
                    >
                      <img
                        src={getGalleryImageUrl(num)}
                        alt={LOCATIONS[num] || region.name}
                        className="gallery-image"
                        loading="lazy"
                      />
                      <div className={`location-text${isMobile ? " always-visible" : ""}`}>
                        <MapPin size={16} /> {LOCATIONS[num] || region.name}
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
