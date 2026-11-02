"use client";

import { getSchoolStaffsKey } from "@/api/keys";
import { fetchPaginatedData } from "@/api/queries";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useCheckoutReturn, { POLL_INTERVAL_MS } from "@/hooks/use-checkout-return";
import useSchoolAccess from "@/hooks/use-school-access";
import useSchoolSeats from "@/hooks/use-school-seats";
import useSchoolTransactions from "@/hooks/use-school-transactions";
import { Seat } from "@/types/school/billing";
import { SchoolStaffsData } from "@/types/school/teachers";
import { isFreshPending } from "@/lib/billing-dates";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { AssignSeatModal } from "./assign-seat-modal";
import { BuySeatsModal } from "./buy-seats-modal";
import { PurchasesList } from "./purchases-list";
import { SeatPaywall } from "./seat-paywall";
import { SeatsTable } from "./seats-table";
import { SummaryCards } from "./summary-cards";
import { TransactionsTable } from "./transactions-table";

export const SchoolBilling = () => {
  const [buyOpen, setBuyOpen] = useState(false);
  const [assignSeat, setAssignSeat] = useState<Seat | null>(null);
  const [polling, setPolling] = useState(false);

  const { access, isLoading: accessLoading } = useSchoolAccess();
  const { seats, isLoading, forbidden, isError, refetch } = useSchoolSeats({
    refreshInterval: polling ? POLL_INTERVAL_MS : 0,
  });
  const { transactions, refetch: refetchTransactions } = useSchoolTransactions(1, "");
  const { data: staffData } = useSWR<SchoolStaffsData>(
    [getSchoolStaffsKey, 1],
    fetchPaginatedData,
  );

  const checkout = useCheckoutReturn(transactions?.items);
  useEffect(() => setPolling(checkout.polling), [checkout.polling]);
  useEffect(() => {
    if (!checkout.polling) return;
    const id = setInterval(refetchTransactions, POLL_INTERVAL_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkout.polling]);

  // A returning checkout must keep showing its status even though the school
  // is still UNPAID until the webhook lands.
  if (access?.state === "UNPAID" && checkout.phase === "idle") {
    return <SeatPaywall />;
  }

  const pendingPayment = transactions?.items.find(
    (t) =>
      t.status === "PENDING" &&
      t.channel !== "INVOICE" &&
      isFreshPending(t.createdAt),
  );

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
            We haven’t received your payment yet. Bank transfers can take a few
            minutes. You can leave this page; your seats appear automatically
            once the payment arrives.
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

      {pendingPayment && checkout.phase === "idle" ? (
        <div role="status" className="flex items-center gap-3 rounded-xl border bg-amber-50 p-3.5 text-sm">
          <Loader2Icon className="size-4 shrink-0 animate-spin text-amber-700" />
          <span className="flex-1">
            Payment pending. If you paid by bank transfer, your seats appear
            automatically once the money arrives.
          </span>
        </div>
      ) : null}

      {isLoading || accessLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      ) : seats ? (
        <>
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
