import ChartIcon from "@/components/svgs/school/chart.svg";
import { cn } from "@/lib/utils";
import { CourseCompletionRate } from "@/types/school";
import { useMemo } from "react";

type CompletionRateCardProps = {
  data?: CourseCompletionRate[] | undefined;
};

export const CompletionRateCard = ({ data }: CompletionRateCardProps) => {
  const percentageDiff = useMemo(() => {
    if (data && data.length > 1) {
      const lastMonth = data[-2];
      const thisMonth = data[-1];

      return thisMonth.rate - lastMonth.rate;
    }
    return 0;
  }, [data]);
  return (
    <div className="school_card relative flex flex-col justify-between space-y-14 sm:max-h-[200px]">
      <div className="space-y-1">
        <p className="text-grey-500 text-base font-medium">
          Overall Course Completion Rate
        </p>
        <h2 className="text-2xl font-semibold">{data?.[-1]?.rate ?? 0}%</h2>
      </div>
      <div>
        <p
          className={cn(
            "text-base font-medium text-grey-500",
            data && data?.length > 1 ? "" : "hidden"
          )}
        >
          <span
            className={cn(percentageDiff > 0 ? "text-primary" : "text-error")}
          >
            {percentageDiff > 0 ? "+" + percentageDiff : percentageDiff}%
          </span>{" "}
          vs last month
        </p>
      </div>
      <div className="absolute right-8 bottom-0">
        <ChartIcon height={160} />
      </div>
    </div>
  );
};
