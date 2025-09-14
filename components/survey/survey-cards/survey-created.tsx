import ChartGreyIcon from "@/components/svgs/admin/chart-grey.svg";

type TotalSurveysCardProps = {
  value: number | undefined;
};

export const TotalSurveysCard = ({ value }: TotalSurveysCardProps) => {
  return (
    <div className="school_card relative w-full max-sm:min-h-[180px] flex flex-col justify-between space-y-14 h-[154px]">
      <div className="space-y-1">
        <p className="text-grey-500 text-base font-medium">Surveys Created</p>
        <h2 className="text-2xl font-semibold">{value ?? 0}</h2>
      </div>
      <div className="absolute right-0 bottom-0">
        <ChartGreyIcon height={160} />
      </div>
    </div>
  );
};
