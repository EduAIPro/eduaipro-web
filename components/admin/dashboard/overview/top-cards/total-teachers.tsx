import { TotalTeachersAggregate } from "@/types/admin";
import { LoaderIcon } from "lucide-react";
import { useMemo } from "react";

type TotalTeachersCardProps = {
  teachers: TotalTeachersAggregate | undefined;
  isLoading: boolean;
};

export const TotalTeachersCard = ({
  teachers,
  isLoading,
}: TotalTeachersCardProps) => {
  const totalTeachers = useMemo(
    () =>
      teachers
        ? teachers?.activeTeachersCount + teachers?.inactiveTeachersCount
        : 0,
    [teachers]
  );

  const percentage = useMemo(() => {
    if (totalTeachers) {
      const percentActive = (
        (teachers?.activeTeachersCount! / totalTeachers) *
        100
      ).toFixed(0);
      const percentInactive = 100 - Number(percentActive);
      return { percentActive, percentInactive };
    } else {
      return { percentInactive: 50, percentActive: 50 };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalTeachers]);

  return (
    <div className="school_card flex flex-col justify-between space-y-14">
      <div className="space-y-1">
        <p className="text-grey-500 text-base font-medium">Total Teachers</p>
        {isLoading ? (
          <LoaderIcon className="animate-spin size-5" />
        ) : (
          <h2 className="text-2xl font-semibold">{totalTeachers}</h2>
        )}
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1 justify-between">
          <div
            style={{ width: `${percentage.percentActive}%` }}
            className="rounded-full h-1.5 bg-primary-260"
          ></div>
          <div
            style={{ width: `${percentage.percentInactive}%` }}
            className="rounded-full h-1.5 bg-primary-250"
          ></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="size-2 rounded-full bg-primary-260"></div>
            <p>{teachers?.activeTeachersCount ?? 0} active</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="size-2 rounded-full bg-primary-250"></div>
            <p>{teachers?.inactiveTeachersCount ?? 0} inactive</p>
          </div>
        </div>
      </div>
    </div>
  );
};
