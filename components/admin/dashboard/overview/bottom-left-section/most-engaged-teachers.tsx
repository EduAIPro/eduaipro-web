import { getTopTeachersKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import { EmptyState } from "@/components/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { GetTopTeachers } from "@/types/admin";
import useSWR from "swr";

export const MostEngagedTeachers = () => {
  const { data, isLoading } = useSWR<GetTopTeachers>(
    getTopTeachersKey,
    generalFetcher
  );

  return (
    <div className="school_card space-y-5">
      <p className="text-grey-500 text-base font-medium">
        Most Engaged Teachers
      </p>
      <ul className="space-y-3">
        {isLoading ? (
          new Array(10).fill("").map((_, i) => <Loader key={i} />)
        ) : data?.length ? (
          data.map((t, i) => (
            <li key={t.id} className="flex items-center gap-5">
              <div className="size-8 flex items-center justify-center bg-grey-400/30 rounded-full">
                <h2 className="font-semibold text-grey-500 text-base">
                  0{i + 1}
                </h2>
              </div>
              <div>
                <h3 className="font-semibold text-sm">
                  {t.user.firstName} {t.user.lastName}
                </h3>
                <p className="font-medium text-grey-500 text-sm">
                  {t.school.institutionName}
                </p>
              </div>
            </li>
          ))
        ) : (
          <EmptyState />
        )}
      </ul>
    </div>
  );
};

const Loader = () => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <Skeleton className="size-12 rounded-full shrink-0" />
      <div className="w-full space-y-1">
        <Skeleton className="w-3/4 h-3 rounded-full" />
        <Skeleton className="w-1/2 h-3 rounded-full" />
      </div>
    </div>
  );
};
