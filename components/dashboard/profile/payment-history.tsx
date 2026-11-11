"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useTransactions from "@/hooks/use-transactions";
import { channelLabel, failureCopy, isFreshPending } from "@/lib/billing-dates";
import { format } from "date-fns";
import { cn, formatKobo } from "@/lib/utils";
import { ReceiptIcon } from "lucide-react";
import { useState } from "react";

const LIMIT = 5;

const STATUS_STYLE: Record<string, string> = {
  SUCCESS: "bg-green-100 text-green-700",
  PENDING: "bg-amber-100 text-amber-700",
  FAILED: "bg-red-100 text-red-700",
};

export const PaymentHistoryCard = () => {
  const [page, setPage] = useState(1);
  const { transactions, isLoading, isError, refetch } = useTransactions({
    page,
    limit: LIMIT,
  });
  const totalPages = Math.max(1, Math.ceil((transactions?.total ?? 0) / LIMIT));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[#1A56DB] bg-[#EFF6FF]">
          <ReceiptIcon size={16} />
        </div>
        <h3 className="font-bold text-grey-800 md:text-lg">Payment history</h3>
      </div>

      {isLoading ? (
        <Skeleton className="h-16 w-full" />
      ) : isError ? (
        <p className="text-xs text-gray-500">
          Couldn’t load your payments.{" "}
          <button className="underline" onClick={refetch}>
            Retry
          </button>
        </p>
      ) : transactions?.items.length ? (
        <ul className="divide-y divide-grey-3">
          {transactions.items.map((t) => {
            const stale =
              t.status === "PENDING" && !isFreshPending(t.createdAt);
            return (
              <li
                key={t.id}
                className="flex flex-wrap items-center gap-x-4 gap-y-1 py-3"
              >
                <div className="min-w-32 flex-1">
                  <p className="text-sm font-semibold text-grey-800">
                    {formatKobo(t.amountKobo, t.currency)}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {channelLabel(t.channel)} ·{" "}
                    {format(
                      new Date(t.paidAt ?? t.createdAt),
                      "do MMM, yyyy, HH:mm",
                    )}
                  </p>
                  {t.status === "FAILED" ? (
                    <p className="text-[11px] text-red-600">
                      {failureCopy(t.failureReason, t.reference)}
                    </p>
                  ) : null}
                  {t.status === "PENDING" && !stale ? (
                    <p className="text-[11px] text-amber-700">
                      Payment pending. It will apply automatically when it
                      arrives.
                    </p>
                  ) : null}
                </div>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold capitalize",
                    STATUS_STYLE[t.status] ?? "bg-grey-3 text-grey-500",
                  )}
                >
                  {t.status.toLowerCase()}
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-xs text-gray-500">No payments yet.</p>
      )}

      {totalPages > 1 ? (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <span className="text-xs text-gray-500">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      ) : null}
    </div>
  );
};
