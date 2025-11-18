import React, { useEffect, useState } from "react";

interface CircularProgressProps {
  progress: number; // 0-100
  size?: number; // diameter in pixels
  strokeWidth?: number;
  className?: string;
  duration?: number; // animation duration in ms
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  className = "",
  duration = 1500,
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // Calculate circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const center = size / 2;

  // Calculate stroke dash offset based on animated progress
  const strokeDashoffset =
    circumference - (animatedProgress / 100) * circumference;

  useEffect(() => {
    // Reset animation when progress prop changes
    setAnimatedProgress(0);

    const startTime = Date.now();
    const startProgress = 0;
    const endProgress = Math.min(Math.max(progress, 0), 100); // Clamp between 0-100

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progressRatio, 3);

      const currentProgress =
        startProgress + (endProgress - startProgress) * easeOut;
      setAnimatedProgress(currentProgress);

      if (progressRatio < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [progress, duration]);

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#D9E3F8"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#0043BE"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-75 ease-out"
        />
      </svg>
    </div>
  );
};
