import React, { useState, useEffect, useRef } from "react";
import "../styles/ImageWithSkeleton.scss";

export interface ImageWithSkeletonProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  skeletonClassName?: string;
  skeletonAspectRatio?: string;
}

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov)$/i;

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  className = "",
  containerClassName = "",
  containerStyle,
  skeletonClassName = "",
  skeletonAspectRatio,
  onLoad,
  onError,
  style,
  ...props
}) => {
  const isVideo = typeof src === "string" && VIDEO_EXTENSIONS.test(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // The autoplay attribute alone doesn't reliably kick in for a <video>
  // mounted dynamically inside a card grid — calling play() explicitly once
  // it's ready is the robust path. play() can reject (e.g. if the element
  // unmounts mid-request); that's expected and safe to ignore.
  const handleVideoReady = () => {
    setIsLoaded(true);
    videoRef.current?.play().catch(() => {});
  };

  useEffect(() => {
    setIsLoaded(false);
    if (!isVideo && imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src, isVideo]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(e);
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onError) {
      onError(e);
    }
  };

  const mergedContainerStyle: React.CSSProperties = {
    ...(skeletonAspectRatio && !isLoaded ? { aspectRatio: skeletonAspectRatio } : {}),
    ...containerStyle,
  };

  const mediaStyle: React.CSSProperties = {
    opacity: isLoaded ? 1 : 0,
    transition: "opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
    ...style,
  };

  return (
    <div
      className={`image-skeleton-wrapper ${!isLoaded ? "is-skeleton-active" : "is-skeleton-complete"} ${containerClassName}`}
      style={mergedContainerStyle}
    >
      {!isLoaded && (
        <div
          className={`image-skeleton-pulse ${skeletonClassName}`}
          aria-hidden="true"
        />
      )}
      {isVideo ? (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`${className} ${isLoaded ? "img-loaded" : "img-loading"}`}
          onLoadedData={handleVideoReady}
          onCanPlay={handleVideoReady}
          onError={() => setIsLoaded(true)}
          style={mediaStyle}
        />
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`${className} ${isLoaded ? "img-loaded" : "img-loading"}`}
          onLoad={handleLoad}
          onError={handleError}
          style={mediaStyle}
          {...props}
        />
      )}
    </div>
  );
};

export default ImageWithSkeleton;
