type TeachersCardProps = {};

export const TeachersCard = ({}: TeachersCardProps) => {
  return (
    <div className="bg-white rounded-xl p-5 border hover:scale-[1.02] duration-300 border-grey-400 flex flex-col justify-between space-y-14">
      <div className="space-y-1">
        <p className="text-grey-500 text-base font-medium">Teachers</p>
        <h2 className="text-2xl font-semibold">80</h2>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1 justify-between">
          <div className="rounded-full h-1.5 w-2/3 bg-[#008000]"></div>
          <div className="rounded-full h-1.5 w-1/3 bg-[#FEA41F]"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="size-2 rounded-full bg-[#008000]"></div>
            <p>65 active</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="size-2 rounded-full bg-[#FEA41F]"></div>
            <p>25 inactive</p>
          </div>
        </div>
      </div>
    </div>
  );
};
