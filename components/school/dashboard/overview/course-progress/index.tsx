import { StaffCourseProgress } from "@/types/school";
import { useMemo } from "react";
import { CourseProgressChart } from "./chart";

type CourseProgressProps = {
  progress: StaffCourseProgress | undefined;
};

export const CourseProgress = ({ progress }: CourseProgressProps) => {
  const legend = useMemo(
    () => [
      {
        count: progress?.totalPending ?? 0,
        label: "Pending",
        color: "#AFCAFC",
      },
      {
        count: progress?.totalInProgress ?? 0,
        label: "In progress",
        color: "#2E6BCE",
      },
      {
        count: progress?.totalCompleted ?? 0,
        label: "Completed",
        color: "#15803d",
      },
    ],
    [progress]
  );
  return (
    <div className="bg-white p-5 md:h-[400px] relative overflow-hidden border border-grey-400 rounded-xl space-y-5">
      <div className="space-y-3">
        <h2 className="font-semibold text-lg">Course Progress</h2>
        <CourseProgressChart progress={progress} />
        <div className="flex items-center absolute bottom-6 w-full inset-x-0 justify-center gap-6">
          {legend.map((i) => (
            <div key={i.label} className="gap-1 flex items-center">
              <div
                style={{ backgroundColor: i.color }}
                className="size-2 rounded-full"
              ></div>
              <p className="font-medium text-base text-grey-500 lowercase">
                {i.count} {i.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
