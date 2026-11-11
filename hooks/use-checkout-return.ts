"use client";

import { schoolAccessKey, schoolDemoKey } from "@/api/keys";
import { failureCopy } from "@/lib/billing-dates";
import { clearCheckout, readCheckout } from "@/lib/school-checkout";
import { invalidateRoster, invalidateSeats } from "@/lib/school-invalidate";
import { SchoolTransaction } from "@/types/school/billing";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mutate } from "swr";
import { toast } from "sonner";

export const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 120_000;

export type CheckoutPhase = "idle" | "confirming" | "timeout" | "failed";

/**
 * Handles the return from Paystack (?checkout=return). Access is granted by a
 * server webhook, not by the browser landing here, and bank transfers can take
 * minutes. The payment’s own transaction row is the source of truth, so the
 * caller polls the transactions list while `phase === "confirming"`.
 */
export default function useCheckoutReturn(
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

  // resolve from the transaction row
  useEffect(() => {
    const s = stored.current;
    if (!s || phase === "idle" || phase === "failed" || !transactions) return;
    const tx = transactions.find((t) => t.reference === s.reference);
    if (tx?.status === "SUCCESS") {
      toast.success("Payment confirmed");
      clearCheckout();
      invalidateSeats();
      invalidateRoster();
      mutate(schoolAccessKey);
      mutate(schoolDemoKey);
      setPhase("idle");
      strip();
    } else if (tx?.status === "FAILED") {
      setFailureReason(failureCopy(tx.failureReason, tx.reference));
      setPhase("failed");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions, phase]);

  const dismiss = () => {
    clearCheckout();
    setPhase("idle");
    setFailureReason(null);
    strip();
  };

  return { phase, failureReason, polling: phase === "confirming", dismiss };
}
