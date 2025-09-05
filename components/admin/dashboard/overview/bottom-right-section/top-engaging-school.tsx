import { getTopSchoolsKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import { EmptyState } from "@/components/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { GetTopSchools } from "@/types/admin";
import useSWR from "swr";

const colors = ["#F1F6FF", "#FFF7E8", "#E9FFE6", "#FFEBF9", "#FFE7EB"];

export const TopEngagingSchool = () => {
  const { data, isLoading } = useSWR<GetTopSchools>(
    getTopSchoolsKey,
    generalFetcher
  );
  return (
    <div className="md:col-span-2 school_card space-y-5">
      <p className="text-grey-500 text-base font-medium">Top Engaging School</p>
      <ul className="space-y-3">
        {isLoading ? (
          new Array(5)
            .fill("")
            .map((_, i) => (
              <Skeleton key={i} className="h-10 rounded-lg w-full" />
            ))
        ) : data?.length ? (
          data.map((s, i) => (
            <li
              key={i}
              style={{
                backgroundColor: colors[i],
              }}
              className={cn(
                "w-full rounded-lg py-2.5 px-4 flex items-center justify-between"
              )}
            >
              <div className="flex items-center gap-5">
                <p className="text-grey-500 text-lg font-semibold">0{i + 1}</p>
                <h2 className="text-base font-semibold text-grey-800">
                  {s.institutionName}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-primary font-medium">
                  {s.engagementScore.toFixed(2)}%
                </p>
                <p className="text-grey-500 text-sm">Engagement score</p>
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
