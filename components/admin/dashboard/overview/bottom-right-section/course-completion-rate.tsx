import ChartIcon from "@/components/svgs/school/chart.svg";
import { CourseCompletionRateAggregate } from "@/types/admin";
import { LoaderIcon } from "lucide-react";

type CompletionRateCardProps = {
  data: CourseCompletionRateAggregate | undefined;
  isLoading: boolean;
};

export const CompletionRateCard = ({
  data,
  isLoading,
}: CompletionRateCardProps) => {
  return (
    <div className="school_card relative flex flex-col justify-between space-y-14 max-lg:min-h-[180px] sm:max-h-[200px]">
      <div className="space-y-1">
        <p className="text-grey-500 text-base font-medium">
          Overall Course Completion Rate
        </p>
        {isLoading ? (
          <LoaderIcon className="animate-spin size-5" />
        ) : (
          <h2 className="text-2xl font-semibold">
            {data?.averageCompletionRate ?? 0}%
          </h2>
        )}
      </div>
      <div className="absolute right-8 bottom-0">
        <ChartIcon height={160} />
      </div>
    </div>
  );
};
