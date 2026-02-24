import React, { useRef, useState } from 'react';
import '../styles/CustomVideo.scss';

interface CustomVideoProps {
    src?: string;
    caption?: string;
}

const CustomVideo: React.FC<CustomVideoProps> = ({ src, caption }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <figure className="custom-video-figure">
            <div className="video-container">
                <video
                    ref={videoRef}
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onClick={togglePlay}
                    className="custom-video-element"
                />
                <button
                    className="play-pause-btn"
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                    {isPlaying ? (
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </button>
            </div>
            {caption && <figcaption>{caption}</figcaption>}
        </figure>
    );
};

export default CustomVideo;
