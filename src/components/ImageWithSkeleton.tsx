import React, { useState, useEffect, useRef } from "react";
import "../styles/ImageWithSkeleton.scss";

export interface ImageWithSkeletonProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  skeletonClassName?: string;
  skeletonAspectRatio?: string;
}

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
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIsLoaded(false);
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

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
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${className} ${isLoaded ? "img-loaded" : "img-loading"}`}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          ...style,
        }}
        {...props}
      />
    </div>
  );
};

export default ImageWithSkeleton;
