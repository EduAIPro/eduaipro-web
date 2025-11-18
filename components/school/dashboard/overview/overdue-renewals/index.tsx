import { getOverdueRenewalsKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import { SchoolOverdueRenewals } from "@/types/school";
import Link from "next/link";
import useSWR from "swr";
import { OverdueItem } from "./table";

import EmptyIcon from "@/components/svgs/school/empty-table.svg";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type OverdueRenewalsProps = {};

export const OverdueRenewals = ({}: OverdueRenewalsProps) => {
  const { data, isLoading } = useSWR<SchoolOverdueRenewals>(
    getOverdueRenewalsKey,
    generalFetcher
  );
  return (
    <div className="bg-white p-5 border border-grey-400 rounded-xl space-y-5 h-full">
      <div className="space-y-6 h-full">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Overdue Renewals</h2>
          <Link href="/school">
            <p
              className={cn(
                "underline text-primary-300 font-medium",
                !data?.data?.length ? "hidden" : ""
              )}
            >
              View all
            </p>
          </Link>
        </div>
        {isLoading ? (
          <div className="space-y-4">
            {new Array(8).fill("").map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="space-y-2 w-1/2">
                  <Skeleton className="h-3 rounded-md w-full" />
                  <Skeleton className="h-3 rounded-md w-1/2" />
                  <Skeleton className="" />
                </div>
                <div className="w-1/2 flex justify-end">
                  <Skeleton className="h-3 rounded-md w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : data?.data.length ? (
          <div className="space-y-4">
            {data?.data.map((item) => (
              <OverdueItem item={item} key={item.id} />
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col justify-center">
            <div className="w-fit mx-auto">
              <EmptyIcon className="w-full h-28" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="font-semibold text-lg sm:text-xl">
                Nothing here yet!
              </h2>
              <p className="w-full whitespace-normal break-words text-base font-medium text-grey-11">
                At this moment, we have no overdue renewals to display.
                Everything is up to date!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
