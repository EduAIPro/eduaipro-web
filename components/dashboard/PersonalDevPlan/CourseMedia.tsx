import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";

const CourseMedia: React.FC = () => {
  const [videos] = useState<string[]>([
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/movie.mp4",
  ]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const playerRef = useRef<ReactPlayer>(null);

  // Navigate to the next video
  const handleNext = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  // Navigate to the previous video
  const handlePrevious = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full h-full p-2 border light_shadow rounded-md">
      <ReactPlayer
        ref={playerRef}
        url={videos[currentVideoIndex]}
        controls
        playing
        width="100%"
        height={"80%"}
      />

      <div className="flex items-center gap-5 self-center">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentVideoIndex === 0}
          className={`${
            currentVideoIndex === 0 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <TbPlayerTrackPrevFilled />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentVideoIndex === videos.length - 1}
          className={`${
            currentVideoIndex === videos.length - 1
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          <TbPlayerTrackNextFilled />
        </button>
      </div>
    </div>
  );
};

export default CourseMedia;
