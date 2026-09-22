import ChartIcon from "@/components/svgs/school/chart.svg";
import { cn } from "@/lib/utils";
import { CourseCompletionRate, StaffCourseProgress } from "@/types/school";
import { useMemo } from "react";

type CompletionRateCardProps = {
  progress: StaffCourseProgress | undefined;
  data: CourseCompletionRate[] | undefined;
};

export const CompletionRateCard = ({
  progress,
  data,
}: CompletionRateCardProps) => {
  const percentage = useMemo(() => {
    if (!progress) return 0;
    const totalStaff =
      progress.totalCompleted + progress.totalInProgress + progress.totalPending;
    return totalStaff
      ? Math.round((progress.totalCompleted / totalStaff) * 100)
      : 0;
  }, [progress]);

  const percentageDiff = useMemo(() => {
    if (data && data.length > 1) {
      const lastMonth = data.at(-2);
      const thisMonth = data.at(-1);

      if (lastMonth && thisMonth) {
        return thisMonth.rate - lastMonth.rate;
      }
    }
    return null;
  }, [data]);
  return (
    <div className="school_card relative flex flex-col justify-between space-y-14">
      <div className="space-y-1">
        <p className="text-grey-500 text-base font-medium">
          Course Completion Rate
        </p>
        <h2 className="text-2xl font-semibold">{percentage}%</h2>
      </div>
      <div>
        <p
          className={cn(
            "text-base font-medium text-grey-500",
            data && data?.length > 1 ? "" : "hidden"
          )}
        >
          {percentageDiff === null ? (
            "—"
          ) : (
            <>
              <span
                className={cn(
                  percentageDiff > 0
                    ? "text-primary"
                    : percentageDiff < 0
                      ? "text-error"
                      : "text-grey-500"
                )}
              >
                {percentageDiff > 0 ? "+" + percentageDiff : percentageDiff}%
              </span>{" "}
              vs last month
            </>
          )}
        </p>
      </div>
      <div className="absolute right-8 bottom-0">
        <ChartIcon width="100%" height={160} />
      </div>
    </div>
  );
};
