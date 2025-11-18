import { Skeleton } from "@/components/ui/skeleton";

export const CourseLoader = () => {
  return (
    <>
      {new Array(6).fill("").map((_, i) => (
        <CourseSkeleton key={i} />
      ))}
    </>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="border border-primary-150 rounded-xl p-2.5 space-y-4 flex flex-col justify-between">
      <div className="space-y-4">
        {/* Image skeleton */}
        <Skeleton className="w-full h-[250px] rounded-xl" />

        {/* Title and description skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-7 w-3/4" />
          <div className="space-y-1">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
          </div>
        </div>

        {/* Badge list skeleton */}
        <ul className="flex items-center flex-wrap gap-2.5">
          <li className="rounded-full flex items-center gap-2 bg-primary-100 px-2 py-1">
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className="h-6 w-16" />
          </li>
          <li className="rounded-full flex items-center gap-2 bg-primary-100 px-2 py-1">
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </li>
          <li className="rounded-full flex items-center gap-2 bg-primary-100 px-2 py-1">
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className="h-6 w-20" />
          </li>
        </ul>
      </div>

      {/* Button skeleton */}
      <Skeleton className="w-full h-10 rounded-md" />
    </div>
  );
};
