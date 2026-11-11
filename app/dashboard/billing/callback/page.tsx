"use client";

import {
  getEnrollmentsKey,
  getPathwaysKey,
  getSubscriptionKey,
  transactionsKey,
} from "@/api/keys";
import api from "@/api/base";
import { Button } from "@/components/ui/button";
import { failureCopy } from "@/lib/billing-dates";
import { clearTeacherCheckout, readTeacherCheckout } from "@/lib/school-checkout";
import { Transaction } from "@/types/billing";
import { CheckCircle2Icon, Loader2Icon, XCircleIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSWRConfig } from "swr";

const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 120_000;

type PollState = "polling" | "confirmed" | "failed" | "pending";

export default function BillingCallbackPage() {
  return (
    <Suspense>
      <BillingCallbackContent />
    </Suspense>
  );
}

function BillingCallbackContent() {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const searchParams = useSearchParams();
  const intent = searchParams.get("intent"); // "enroll" | "certificate"
  // Paystack returns ?trxref=<ref>&reference=<ref>
  const reference =
    searchParams.get("reference") ??
    searchParams.get("trxref") ??
    readTeacherCheckout()?.reference ??
    null;

  const [state, setState] = useState<PollState>("polling");
  const [failure, setFailure] = useState<string | null>(null);
  const [pollKey, setPollKey] = useState(0);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    startedAt.current = Date.now();

    const check = async () => {
      let tx: Transaction | undefined;
      try {
        const res = await api.get(transactionsKey, { params: { limit: 10 } });
        tx = (res.data.data?.items as Transaction[] | undefined)?.find(
          (t) => t.reference === reference,
        );
      } catch {
        // keep polling; a blip should not read as a failed payment
      }
      if (cancelled) return;

      if (tx?.status === "SUCCESS") {
        clearTeacherCheckout();
        await Promise.all([
          mutate(getSubscriptionKey),
          mutate(getPathwaysKey),
          mutate(getEnrollmentsKey),
        ]);
        if (!cancelled) setState("confirmed");
        return;
      }
      if (tx?.status === "FAILED") {
        clearTeacherCheckout();
        setFailure(failureCopy(tx.failureReason, tx.reference));
        setState("failed");
        return;
      }
      // PENDING, or not listed yet: bank transfers can take minutes, so keep
      // going until the timeout and then say so without calling it a failure.
      if (Date.now() - startedAt.current >= POLL_TIMEOUT_MS) {
        setState("pending");
        return;
      }
      timer = setTimeout(check, POLL_INTERVAL_MS);
    };

    if (!reference) {
      setState("pending");
      return;
    }
    setState("polling");
    check();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference, pollKey]);

  useEffect(() => {
    if (state !== "confirmed") return;
    const timer = setTimeout(() => {
      router.replace(
        intent === "certificate"
          ? "/dashboard/certificates"
          : intent === "enroll"
            ? "/dashboard/pathways"
            : "/dashboard/profile",
      );
    }, 1500);
    return () => clearTimeout(timer);
  }, [state, intent, router]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      {state === "polling" && (
        <>
          <Loader2Icon size={32} className="animate-spin text-[#1A56DB]" />
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              Confirming your payment…
            </h3>
            <p className="text-[12.5px] text-gray-500 mt-1 max-w-sm">
              Card payments usually confirm in a few seconds. Bank transfers
              can take a few minutes.
            </p>
          </div>
        </>
      )}

      {state === "confirmed" && (
        <>
          <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
            <CheckCircle2Icon size={28} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              Payment confirmed
            </h3>
            <p className="text-[12.5px] text-gray-500 mt-1 max-w-sm">
              {intent === "certificate"
                ? "Your certificate is being prepared and will appear shortly."
                : "Taking you back now…"}
            </p>
          </div>
        </>
      )}

      {state === "failed" && (
        <>
          <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
            <XCircleIcon size={28} />
          </div>
          <div className="max-w-sm space-y-1">
            <h3 className="text-sm font-bold text-gray-900">
              {failure}
            </h3>
          </div>
          <Link href="/dashboard/profile">
            <Button className="bg-[#1A56DB] hover:bg-[#1A56DB]/90">
              Back to my account
            </Button>
          </Link>
        </>
      )}

      {state === "pending" && (
        <>
          <div className="max-w-md space-y-1">
            <h3 className="text-sm font-bold text-gray-900">
              We haven{"'"}t received your payment yet
            </h3>
            <p className="text-[12.5px] text-gray-500">
              Bank transfers can take a few minutes. You can leave this page;
              your plan will activate automatically once the payment arrives.
              Check your billing page later.
            </p>
          </div>
          <div className="flex gap-2">
            {reference ? (
              <Button
                variant="outline"
                onClick={() => setPollKey((k) => k + 1)}
              >
                Check again
              </Button>
            ) : null}
            <Link href="/dashboard/profile">
              <Button className="bg-[#1A56DB] hover:bg-[#1A56DB]/90">
                Go to billing
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
