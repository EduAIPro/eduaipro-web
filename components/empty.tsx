import EmptyIcon from "@/components/svgs/school/empty-table.svg";

export const EmptyState = ({ description }: { description?: string }) => {
  return (
    <div className="h-full py-20 flex flex-col justify-center">
      <div className="w-fit mx-auto">
        <EmptyIcon className="w-full h-28" />
      </div>
      <div className="text-center space-y-2">
        <h2 className="font-semibold text-lg sm:text-xl">Nothing here yet!</h2>
        <p className="w-full whitespace-normal break-words text-base font-medium text-grey-11">
          {description ??
            "At this moment, we have no data to display. Everything is up to date!"}
        </p>
      </div>
    </div>
  );
};
