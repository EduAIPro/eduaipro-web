import { getOverdueRenewalsKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import { SchoolOverdueRenewals } from "@/types/school";
import { isBefore, isValid, parseISO, startOfDay, startOfToday } from "date-fns";
import useSWR from "swr";
import { OverdueItem } from "./table";

import EmptyIcon from "@/components/svgs/school/empty-table.svg";
import { Skeleton } from "@/components/ui/skeleton";

type OverdueRenewalsProps = {};

export const OverdueRenewals = ({}: OverdueRenewalsProps) => {
  const { data, isLoading } = useSWR<SchoolOverdueRenewals>(
    getOverdueRenewalsKey,
    generalFetcher
  );
  const today = startOfToday();
  const rows = (data?.data ?? [])
    .map((item) => {
      const dueDate = item.expiresAt
        ? startOfDay(parseISO(item.expiresAt))
        : new Date(NaN);
      return {
        item,
        dueDate,
        isOverdue: isValid(dueDate) && isBefore(dueDate, today),
      };
    })
    .sort(
      (a, b) =>
        Number(isValid(b.dueDate)) - Number(isValid(a.dueDate)) ||
        Number(b.isOverdue) - Number(a.isOverdue) ||
        (isValid(a.dueDate) ? a.dueDate.getTime() - b.dueDate.getTime() : 0)
    );
  return (
    <div className="bg-white p-5 border border-grey-400 rounded-xl space-y-5 h-full">
      <div className="space-y-6 h-full">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Renewals</h2>
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
            {rows.map(({ item, dueDate, isOverdue }) => (
              <OverdueItem
                item={item}
                dueDate={dueDate}
                isOverdue={isOverdue}
                key={item.id}
              />
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
