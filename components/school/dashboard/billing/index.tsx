"use client";

import { getSchoolStaffsKey } from "@/api/keys";
import { fetchPaginatedData } from "@/api/queries";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useCheckoutReturn, { POLL_INTERVAL_MS } from "@/hooks/use-checkout-return";
import useSchoolSeats from "@/hooks/use-school-seats";
import useSchoolTransactions from "@/hooks/use-school-transactions";
import { Seat } from "@/types/school/billing";
import { SchoolStaffsData } from "@/types/school/teachers";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { AssignSeatModal } from "./assign-seat-modal";
import { BuySeatsModal } from "./buy-seats-modal";
import { PaymentFailedBanner } from "./payment-failed-banner";
import { PurchasesList } from "./purchases-list";
import { SeatsTable } from "./seats-table";
import { SummaryCards } from "./summary-cards";
import { TransactionsTable } from "./transactions-table";

export const SchoolBilling = () => {
  const [buyOpen, setBuyOpen] = useState(false);
  const [assignSeat, setAssignSeat] = useState<Seat | null>(null);
  const [polling, setPolling] = useState(false);

  const { seats, isLoading, forbidden, isError, refetch } = useSchoolSeats({
    refreshInterval: polling ? POLL_INTERVAL_MS : 0,
  });
  const { transactions, refetch: refetchTransactions } = useSchoolTransactions(1, "");
  const { data: staffData } = useSWR<SchoolStaffsData>(
    [getSchoolStaffsKey, 1],
    fetchPaginatedData,
  );

  const checkout = useCheckoutReturn(seats, transactions?.items);
  useEffect(() => setPolling(checkout.polling), [checkout.polling]);
  useEffect(() => {
    if (!checkout.polling) return;
    const id = setInterval(refetchTransactions, POLL_INTERVAL_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkout.polling]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold sm:text-3xl sm:font-bold">
          {forbidden ? "Payment history" : "Seats & billing"}
        </h1>
        {!forbidden ? <Button onClick={() => setBuyOpen(true)}>Buy seats</Button> : null}
      </div>

      {checkout.phase === "confirming" ? (
        <div role="status" className="flex items-center gap-3 rounded-xl border bg-blue-50 p-3.5 text-sm">
          <Loader2Icon className="size-4 animate-spin text-[#1A56DB]" />
          Confirming your payment…
        </div>
      ) : null}
      {checkout.phase === "timeout" ? (
        <div role="status" className="flex flex-wrap items-center gap-3 rounded-xl border bg-amber-50 p-3.5 text-sm">
          <span className="flex-1">
            Payment is still processing. Seats will appear once it’s confirmed.
          </span>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Refresh
          </Button>
          <Link href="#payment-history" className="text-xs underline">
            Payment history
          </Link>
        </div>
      ) : null}
      {checkout.phase === "failed" ? (
        <div role="alert" className="flex flex-wrap items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm">
          <span className="flex-1">Payment failed: {checkout.failureReason}</span>
          <Button variant="outline" size="sm" onClick={checkout.dismiss}>
            Dismiss
          </Button>
        </div>
      ) : null}

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      ) : seats ? (
        <>
          <PaymentFailedBanner purchases={seats.purchases} />
          <SummaryCards data={seats} onBuy={() => setBuyOpen(true)} />
          <PurchasesList purchases={seats.purchases} />
          <SeatsTable seats={seats.seats} onAssign={setAssignSeat} />
        </>
      ) : isError && !forbidden ? (
        <p className="rounded-xl border p-6 text-center text-sm text-grey-500">
          Couldn’t load your seats.{" "}
          <button className="underline" onClick={() => refetch()}>
            Retry
          </button>
        </p>
      ) : null}

      <TransactionsTable />

      <BuySeatsModal open={buyOpen} onOpenChange={setBuyOpen} />
      <AssignSeatModal
        open={!!assignSeat}
        onOpenChange={(v) => !v && setAssignSeat(null)}
        seat={assignSeat}
        staff={staffData?.data ?? []}
      />
    </div>
  );
};
