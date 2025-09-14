import { Skeleton } from "./skeleton";

export const ChartSkeleton = () => {
  return (
    <div className="flex items-center justify-center gap-4 pt-4">
      <Skeleton className="flex size-28 items-center justify-center rounded-full">
        <div className="size-16 rounded-full bg-white" />
      </Skeleton>

      <div className="space-y-2">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );
};
