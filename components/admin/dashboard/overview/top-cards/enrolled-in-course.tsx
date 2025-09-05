import { TotalEnrolledAggregate } from "@/types/admin";
import { LoaderIcon } from "lucide-react";
import { useMemo } from "react";
// import { useMemo } from "react";

type EnrolledInCourseCardProps = {
  enrolled: TotalEnrolledAggregate | undefined;
  isLoading: boolean;
};

export const EnrolledInCourseCard = ({
  enrolled,
  isLoading,
}: EnrolledInCourseCardProps) => {
  const totalEnrollment = useMemo(
    () => enrolled?.totalEnrolledCount! + enrolled?.totalNotEnrolledCount! ?? 0,
    [enrolled]
  );

  const percentage = useMemo(() => {
    if (totalEnrollment) {
      const percentActive = (
        (enrolled?.totalEnrolledCount! / totalEnrollment) *
        100
      ).toFixed(0);
      const percentInactive = 100 - Number(percentActive);
      return { percentActive, percentInactive };
    } else {
      return { percentInactive: 50, percentActive: 50 };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalEnrollment]);
  return (
    <div className="school_card flex flex-col justify-between space-y-14">
      <div className="space-y-1">
        <p className="text-grey-500 text-base font-medium">
          Enrolled in course
        </p>
        {isLoading ? (
          <LoaderIcon className="animate-spin size-5" />
        ) : (
          <h2 className="text-2xl font-semibold">
            {enrolled?.totalEnrolledCount}
          </h2>
        )}
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1 justify-between">
          <div
            style={{ width: `${percentage.percentActive}%` }}
            className="rounded-full h-1.5 bg-success-600"
          ></div>
          <div
            style={{ width: `${percentage.percentInactive}%` }}
            className="rounded-full h-1.5 bg-success-400"
          ></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="size-2 rounded-full bg-success-600"></div>
            <p>{enrolled?.totalEnrolledCount ?? 0} enrolled</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="size-2 rounded-full bg-success-400"></div>
            <p>{enrolled?.totalNotEnrolledCount ?? 0} not enrolled</p>
          </div>
        </div>
      </div>
    </div>
  );
};
