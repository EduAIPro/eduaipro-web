import { TotalAdminsAggregate } from "@/types/admin";
import { LoaderIcon } from "lucide-react";
import { useMemo } from "react";

type TotalAdminsCardProps = {
  admins: TotalAdminsAggregate | undefined;
  isLoading: boolean;
};

export const TotalAdminsCard = ({
  isLoading,
  admins,
}: TotalAdminsCardProps) => {
  const totalAdmins = useMemo(
    () => admins?.activeAdminsCount! + admins?.inactiveAdminsCount! ?? 0,
    [admins]
  );

  const percentage = useMemo(() => {
    if (totalAdmins) {
      const percentActive = (
        (admins?.activeAdminsCount! / totalAdmins) *
        100
      ).toFixed(0);
      const percentInactive = 100 - Number(percentActive);
      return { percentActive, percentInactive };
    } else {
      return { percentInactive: 50, percentActive: 50 };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalAdmins]);
  return (
    <div className="school_card flex flex-col justify-between space-y-14">
      <div className="space-y-1">
        <p className="text-grey-500 text-base font-medium">Total Admins</p>
        {isLoading ? (
          <LoaderIcon className="animate-spin size-5" />
        ) : (
          <h2 className="text-2xl font-semibold">{totalAdmins}</h2>
        )}
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1 justify-between">
          <div
            style={{ width: `${percentage.percentActive}%` }}
            className="rounded-full h-1.5 bg-purple-800"
          ></div>
          <div
            style={{ width: `${percentage.percentInactive}%` }}
            className="rounded-full h-1.5 bg-purple-600"
          ></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="size-2 rounded-full bg-purple-800"></div>
            <p>{admins?.activeAdminsCount ?? 0} active</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="size-2 rounded-full bg-purple-600"></div>

            <p>{admins?.inactiveAdminsCount ?? 0} inactive</p>
          </div>
        </div>
      </div>
    </div>
  );
};
