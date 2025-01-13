import Typography from "@/components/common/ui/Typography";
import { CldVideoPlayer } from "next-cloudinary";
import {
  Pause,
  Play,
  PlayCircle,
  VolumeCross,
  VolumeHigh,
} from "iconsax-react";
import Image from "next/image";
import React, { useState, useRef } from "react";

interface MediaPlayerProps {
  course: {
    title: string;
    image: string;
    previewUrl: string; // URL to the preview video
  };
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ course }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);

    if (videoRef.current) {
      console.log("video ref exists");
      if (isPlaying) {
        console.log("is playing, about to pause");
        videoRef.current.pause();
      } else {
        console.log("is not playing, about to play");

        videoRef.current.play();
      }
      console.log("is playing state updated");

      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  return (
    <div className="relative w-full h-full rounded-lg">
      {/* <video src=""></video> */}
      {/* Video Element */}
      {/* {isPlaying ? ( */}
      {/* <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover rounded-l-lg"
        src={"youtu.be/8ILww0tUSxw"}
        muted={isMuted}
        loop
        playsInline
        onEnded={() => setIsPlaying(false)}
      ></video> */}
      {/* ) : ( */}
      {/* // <CldVideoPlayer */}
      {/* //   id="sea-turtle"
        //   width="1920"
        //   height="1080"
        //   src="samples/sea-turtle"
        //   colors={{
        //     base: "#0f0",
        //     text: "#000",
        //     accent: "#fff",
        //   }}
        // /> */}
      <Image
        className="h-full w-full max-md:rounded-t-lg md:rounded-l-lg"
        height={200}
        width={200}
        src={course.image}
        alt={course.title}
      />
      {/* //   )} */}

      {/* Overlay Controls */}
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center max-md:rounded-t-lg md:rounded-l-lg">
        {/* Play/Pause Button */}
        <button
          className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
          onClick={handlePlayPause}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white fill-primary" />
          ) : (
            <Play className="w-6 h-6 text-white fill-primary" />
          )}
        </button>

        {/* Title */}
        <div className="mt-2 text-white text-sm font-medium text-center px-2">
          <Typography.P fontColor="white" className="line-clamp-2">
            {course.title}
          </Typography.P>
        </div>

        {/* Controls */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-xs">
          <button
            className="flex items-center space-x-2 hover:text-primary transition-colors"
            onClick={handleMuteToggle}
          >
            {isMuted ? (
              <VolumeCross className="w-4 h-4" />
            ) : (
              <VolumeHigh className="w-4 h-4" />
            )}
            <Typography.P fontColor="white" size="xsmall">
              Preview Available
            </Typography.P>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;
