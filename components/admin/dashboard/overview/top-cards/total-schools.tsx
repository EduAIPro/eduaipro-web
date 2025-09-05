import ChartGreyIcon from "@/components/svgs/admin/chart-grey.svg";
import { LoaderIcon } from "lucide-react";

type TotalSchoolsCardProps = {
  value: number | undefined;
  isLoading: boolean;
};

export const TotalSchoolsCard = ({
  value,
  isLoading,
}: TotalSchoolsCardProps) => {
  return (
    <div className="school_card relative w-full max-sm:min-h-[180px] flex flex-col justify-between space-y-14">
      <div className="space-y-1">
        <p className="text-grey-500 text-base font-medium">Total Schools</p>
        {isLoading ? (
          <LoaderIcon className="animate-spin size-5" />
        ) : (
          <h2 className="text-2xl font-semibold">{value ?? 0}</h2>
        )}
      </div>
      <div className="absolute right-0 bottom-0">
        <ChartGreyIcon height={160} />
      </div>
    </div>
  );
};
