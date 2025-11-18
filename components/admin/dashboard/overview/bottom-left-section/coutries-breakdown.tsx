import { getCountryDistributionKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import { EmptyState } from "@/components/empty";
import { cn } from "@/lib/utils";
import { GetCountryDistribution } from "@/types/admin";
import { Skeleton } from "@radix-ui/themes";
import useSWR from "swr";

export const CountriesBreakdown = () => {
  const { data, isLoading } = useSWR<GetCountryDistribution>(
    getCountryDistributionKey,
    generalFetcher
  );

  return (
    <div className="school_card space-y-5 h-full">
      <p className="text-grey-500 text-base font-medium">Countries breakdown</p>
      <ul className="space-y-3">
        {isLoading ? (
          new Array(10).fill("").map((_, i) => <Loader key={i} />)
        ) : data?.length ? (
          data.map((c, i) => (
            <li key={i}>
              <p className="font-medium text-grey-800">
                {c.country?.name} ({c.schoolCount})
              </p>
              <div className="flex items-center justify-between gap-3">
                <div className="relative w-[220px] h-2 bg-grey-400/40 rounded-full">
                  <div
                    style={{
                      width: `${c.percentage}%`,
                    }}
                    className={cn(
                      "absolute h-full rounded-full bg-success-600"
                    )}
                  ></div>
                </div>
                <h3 className="font-semibold text-grey-500">{c.percentage}%</h3>
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
    <div className="flex items-center justify-between gap-3 mb-4">
      <div className="w-full space-y-1">
        <Skeleton className="w-1/2 h-3 rounded-full" />
        <Skeleton className="w-3/4 h-3 rounded-full" />
      </div>
      <Skeleton className="size-3 rounded-full shrink-0" />
    </div>
  );
};
