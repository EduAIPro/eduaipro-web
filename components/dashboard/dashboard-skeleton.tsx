import { Skeleton } from "../ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <Skeleton className="w-1/2 h-6 rounded-md bg-grey-400/40" />
        <div className="flex items-center gap-6">
          {new Array(3).fill("").map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="w-32 h-3 rounded-md bg-grey-400/40" />
              <Skeleton className="w-16 h-3 rounded-md bg-grey-400/40" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex md:items-center gap-6 max-md:flex-col">
        <div className="md:w-2/3 space-y-6">
          <Skeleton className="w-full rounded-xl h-[80vh] bg-grey-400/40" />
          <div className="flex items-center overflow-x-auto gap-5">
            {new Array(7).fill("").map((_, i) => (
              <Skeleton
                key={i}
                className="w-32 h-16 rounded-md bg-grey-400/40"
              />
            ))}
          </div>
        </div>
        <div className="md:w-1/3 h-[calc(80vh+88px)]">
          <Skeleton className="w-full h-full rounded-xl bg-grey-400/40" />
        </div>
      </div>
    </div>
  );
}
