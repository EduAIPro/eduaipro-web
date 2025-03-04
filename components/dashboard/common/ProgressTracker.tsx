"use client";
import Typography from "@/components/common/ui/Typography";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const ProgressTracker = () => {
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Configuration
  const size = 55;
  const strokeWidth = 4;
  const targetProgress = 75; // Change this value to set your target percentage
  const animationDuration = 2000; // Duration in milliseconds
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Handle animation
  useEffect(() => {
    if (!isAnimating) return;

    const startTime = Date.now();

    const animateProgress = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const nextProgress = Math.min(
        (elapsed / animationDuration) * targetProgress,
        targetProgress
      );

      setProgress(nextProgress);

      if (nextProgress < targetProgress) {
        requestAnimationFrame(animateProgress);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animateProgress);

    return () => setIsAnimating(false);
  }, [isAnimating, targetProgress]);

  return (
    <div className="flex items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e6e6e6"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle with animation */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#4f46e5"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Medal in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Percentage text */}
            <div className="absolute bottom-1 inset-x-0 flex justify-center mb-2">
              <div className="">
                <p className="text-lg font-black text-grey-9/80">
                  {Math.round(progress)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            className="flex items-center gap-2  bg-transparent border-none cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Typography.P fontColor="grey" weight="medium">
              Your progress
            </Typography.P>
            <ChevronDown
              size={20}
              className={` transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        </PopoverTrigger>

        <PopoverContent
          className="bg-white p-3 border border-grey-5/50 rounded-lg shadow-lg shadow-black/10"
          align="center"
        >
          <div className="relative">
            {/* Triangle pointer */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-[9px] h-[9px] bg-white border-t border-l border-grey-5/50 rotate-45"></div>

            <div className="space-y-2">
              <Typography.H4 size="small" weight="medium">
                15 of 25 complete.
              </Typography.H4>
              <p className="text-grey-9 text-sm">
                Finish course to get your certificate
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ProgressTracker;
