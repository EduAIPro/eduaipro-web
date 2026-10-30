"use client";

import { clearCheckout, readCheckout } from "@/lib/school-checkout";
import { invalidateRoster } from "@/lib/school-invalidate";
import { SchoolSeatsData, SchoolTransaction } from "@/types/school/billing";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 60_000;

export type CheckoutPhase = "idle" | "confirming" | "timeout" | "failed";

/**
 * Handles the return from Paystack (?checkout=return). Seats only exist once
 * the payment is confirmed server-side, so the caller polls GET /seats while
 * `phase === "confirming"` and passes the latest data and transactions in.
 */
export default function useCheckoutReturn(
  seats: SchoolSeatsData | null,
  transactions: SchoolTransaction[] | undefined,
) {
  const router = useRouter();
  const params = useSearchParams();
  const returning = params.get("checkout") === "return";
  const [phase, setPhase] = useState<CheckoutPhase>("idle");
  const [failureReason, setFailureReason] = useState<string | null>(null);
  const stored = useRef(readCheckout());
  const started = useRef(false);

  const strip = () => router.replace("/school/billing");

  // start
  useEffect(() => {
    if (!returning || started.current) return;
    started.current = true;
    stored.current = readCheckout();
    if (!stored.current) {
      strip();
      return;
    }
    setPhase("confirming");
    const t = setTimeout(
      () => setPhase((p) => (p === "confirming" ? "timeout" : p)),
      POLL_TIMEOUT_MS,
    );
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [returning]);

  // success
  useEffect(() => {
    const s = stored.current;
    if (!s || (phase !== "confirming" && phase !== "timeout")) return;
    const purchase = seats?.purchases.find((p) => p.id === s.seatPurchaseId);
    if (purchase?.status === "ACTIVE") {
      toast.success("Seats added");
      clearCheckout();
      invalidateRoster();
      setPhase("idle");
      strip();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seats, phase]);

  // failure
  useEffect(() => {
    const s = stored.current;
    if (!s || phase === "idle" || !transactions) return;
    const tx = transactions.find((t) => t.reference === s.reference);
    if (tx?.status === "FAILED") {
      setFailureReason(tx.failureReason ?? "The payment did not go through.");
      setPhase("failed");
    }
  }, [transactions, phase]);

  const dismiss = () => {
    clearCheckout();
    setPhase("idle");
    setFailureReason(null);
    strip();
  };

  return { phase, failureReason, polling: phase === "confirming", dismiss };
}
