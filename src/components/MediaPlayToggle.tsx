import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import "../styles/MediaPlayToggle.scss";

/** True for a GIF URL, with or without a query string or hash after it. */
export const isGifSrc = (src?: string) =>
  typeof src === "string" && /\.gif($|[?#])/i.test(src);

type Box = { left: number; top: number; width: number; height: number };

/**
 * Draws the image into the canvas as the browser shows it — honouring the
 * img's object-fit, so a cropped card thumbnail freezes on the same crop.
 */
const drawFrame = (canvas: HTMLCanvasElement, img: HTMLImageElement, box: Box) => {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(box.width * dpr);
  canvas.height = Math.round(box.height * dpr);
  const ctx = canvas.getContext("2d");
  if (!ctx || !img.naturalWidth || !img.naturalHeight) return;
  ctx.scale(dpr, dpr);

  const fit = getComputedStyle(img).objectFit;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  let dw = box.width;
  let dh = box.height;
  if (fit === "cover" || fit === "contain") {
    const scale =
      fit === "cover"
        ? Math.max(box.width / iw, box.height / ih)
        : Math.min(box.width / iw, box.height / ih);
    dw = iw * scale;
    dh = ih * scale;
  }
  ctx.drawImage(img, (box.width - dw) / 2, (box.height - dh) / 2, dw, dh);
};

interface MediaPlayToggleProps {
  mediaRef: React.RefObject<HTMLVideoElement | HTMLImageElement>;
}

/**
 * A pause/play button pinned to the bottom-left of a video or GIF. Rendered
 * as a sibling of the media, inside the same parent, and placed from the
 * media's own layout box so it lands on the media's corner even when the
 * parent is larger (a caption under it, padding around it).
 *
 * A video is paused directly. A GIF can't be, so pausing paints its current
 * frame onto a canvas laid over it, and playing removes the canvas again.
 */
const MediaPlayToggle: React.FC<MediaPlayToggleProps> = ({ mediaRef }) => {
  const [paused, setPaused] = useState(false);
  const [box, setBox] = useState<Box | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // The button and canvas are positioned against the media's parent, so it
  // has to be a containing block. Only set when it isn't one already.
  useLayoutEffect(() => {
    const parent = mediaRef.current?.parentElement;
    if (parent && getComputedStyle(parent).position === "static") {
      parent.style.position = "relative";
    }
  }, [mediaRef]);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;
    const measure = () =>
      setBox({
        left: media.offsetLeft,
        top: media.offsetTop,
        width: media.offsetWidth,
        height: media.offsetHeight,
      });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(media);
    if (media.parentElement) ro.observe(media.parentElement);

    // Keep the icon honest if something else pauses or plays the video.
    if (media instanceof HTMLVideoElement) {
      const sync = () => setPaused(media.paused);
      media.addEventListener("play", sync);
      media.addEventListener("pause", sync);
      return () => {
        ro.disconnect();
        media.removeEventListener("play", sync);
        media.removeEventListener("pause", sync);
      };
    }
    return () => ro.disconnect();
  }, [mediaRef]);

  // Redraw the frozen GIF frame whenever the media changes size.
  useEffect(() => {
    const media = mediaRef.current;
    if (paused && box && media instanceof HTMLImageElement && canvasRef.current) {
      drawFrame(canvasRef.current, media, box);
    }
  }, [paused, box, mediaRef]);

  const toggle = useCallback(
    (e: React.MouseEvent) => {
      // Media often sits inside a link or a clickable card.
      e.preventDefault();
      e.stopPropagation();
      const media = mediaRef.current;
      if (!media) return;
      if (media instanceof HTMLVideoElement) {
        if (media.paused) media.play().catch(() => {});
        else media.pause();
      } else {
        setPaused((p) => !p);
      }
    },
    [mediaRef]
  );

  if (!box || !box.width || !box.height) return null;
  const isGif = mediaRef.current instanceof HTMLImageElement;

  return (
    <>
      {isGif && paused && (
        <canvas
          ref={canvasRef}
          className="media-play-toggle__freeze"
          aria-hidden="true"
          style={{ left: box.left, top: box.top, width: box.width, height: box.height }}
        />
      )}
      <button
        type="button"
        className={`media-play-toggle${paused ? " is-paused" : ""}`}
        style={{ left: box.left + 12, top: box.top + box.height - 12 }}
        onClick={toggle}
        // Keeps drag-to-move stages from picking the press up as a drag.
        onPointerDown={(e) => e.stopPropagation()}
        aria-label={paused ? "Play" : "Pause"}
        aria-pressed={paused}
      >
        {paused ? (
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        )}
      </button>
    </>
  );
};

export default MediaPlayToggle;

type VideoProps = React.VideoHTMLAttributes<HTMLVideoElement>;

/** A <video> with the pause/play toggle beside it. Adds no wrapper element. */
export const PausableVideo = React.forwardRef<HTMLVideoElement, VideoProps>(
  (props, forwardedRef) => {
    const ref = useRef<HTMLVideoElement>(null);
    React.useImperativeHandle(forwardedRef, () => ref.current as HTMLVideoElement);
    return (
      <>
        <video ref={ref} {...props} />
        <MediaPlayToggle mediaRef={ref} />
      </>
    );
  }
);
PausableVideo.displayName = "PausableVideo";

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;

/** An <img> that gets the pause/play toggle when it's a GIF. Adds no wrapper. */
export const PausableImage: React.FC<ImgProps> = (props) => {
  const ref = useRef<HTMLImageElement>(null);
  return (
    <>
      <img ref={ref} {...props} />
      {isGifSrc(props.src) && <MediaPlayToggle mediaRef={ref} />}
    </>
  );
};
