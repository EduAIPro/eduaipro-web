import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import PDFViewer from "../common/PDFViewer";
import QuizPage from "../pdp/quiz/QuizPage";

const CourseMedia: React.FC<{ mediaType: "video" | "reading" | "quiz" }> = ({
  mediaType,
}) => {
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
    <div className="flex flex-col gap-5 w-full h-full rounded-lg">
      {mediaType === "video" ? (
        <ReactPlayer
          ref={playerRef}
          url={
            "https://share.synthesia.io/embeds/videos/748ebb2d-7365-4930-9483-301e17481757"
          }
          controls
          playing={false}
          width="100%"
          height={"100%"}
          style={{
            borderRadius: 20,
            // borderWidth: 4,
            // borderColor: "red",
          }}
        />
      ) : mediaType === "reading" ? (
        <PDFViewer url="https://staging.brydgehq.co/api/document/serve?key=payout_support_docs/c8e27780-b9d2-4fc3-bfdd-630c35628b47.pdf" />
      ) : (
        <QuizPage />
      )}

      {/* <div className="flex items-center gap-5 self-center">
        {/* Previous Button 
        <button
          onClick={handlePrevious}
          disabled={currentVideoIndex === 0}
          className={`${
            currentVideoIndex === 0 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <TbPlayerTrackPrevFilled />
        </button>

        {/* Next Button 
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
      </div> */}
    </div>
  );
};

export default CourseMedia;
