import ChartIcon from "@/components/svgs/school/chart.svg";

type CompletionRateCardProps = {};

export const CompletionRateCard = ({}: CompletionRateCardProps) => {
  return (
    <div className="bg-white rounded-xl p-5 relative border hover:scale-[1.02] duration-300 border-grey-400 flex flex-col justify-between space-y-14">
      <div className="space-y-1">
        <p className="text-grey-500 text-base font-medium">
          Course Completion Rate
        </p>
        <h2 className="text-2xl font-semibold">75%</h2>
      </div>
      <div>
        <p className="text-base font-medium text-grey-500">
          <span className="text-primary">+2.5%</span> vs last month
        </p>
      </div>
      <div className="absolute right-8 bottom-0">
        <ChartIcon width="100%" height={160} />
      </div>
    </div>
  );
};
