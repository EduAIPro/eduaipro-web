import ChartGreyIcon from "@/components/svgs/admin/chart-grey.svg";

type TotalResponseCardProps = {
  value?: number; 
};

export const TotalResponseCard = ({ value }: TotalResponseCardProps) => {
  return (
    <div className="school_card relative w-full max-sm:min-h-[180px] flex flex-col justify-between space-y-14 h-[154px]">
      <div className="space-y-1">
        <p className="text-grey-500 text-base font-medium">Surveys Response</p>
        <h2 className="text-2xl font-semibold">
          {value !== undefined ? value.toLocaleString() : "0"}
        </h2>
      </div>
      <div className="absolute right-0 bottom-0">
        <ChartGreyIcon height={160} />
      </div>
    </div>
  );
};
