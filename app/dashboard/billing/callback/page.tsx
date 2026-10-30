"use client";

import { getPathwaysKey, getSubscriptionKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import { Button } from "@/components/ui/button";
import { GetPathwaysResponse } from "@/types/enrollment";
import { Subscription } from "@/types/billing";
import { CheckCircle2Icon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

const MAX_ATTEMPTS = 15;
const POLL_INTERVAL_MS = 2000;

type PollState = "polling" | "confirmed" | "timeout";

export default function BillingCallbackPage() {
  return (
    <Suspense>
      <BillingCallbackContent />
    </Suspense>
  );
}

function BillingCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const intent = searchParams.get("intent"); // "enroll" | "certificate"

  const [state, setState] = useState<PollState>("polling");
  const [pollKey, setPollKey] = useState(0);
  const attemptsRef = useRef(0);

  useEffect(() => {
    let cancelled = false;

    const checkEntitlement = async () => {
      try {
        const subscription: Subscription | null = await generalFetcher(
          getSubscriptionKey,
        ).catch(() => null);

        let unlocked = false;

        if (courseId) {
          const pathwaysResponse: GetPathwaysResponse | null =
            await generalFetcher(getPathwaysKey).catch(() => null);
          const target = pathwaysResponse?.pathways?.find(
            (p) => p.id === courseId,
          );
          unlocked = !!(target && (target.enrolled || target.entitled));
        } else {
          unlocked = !!subscription?.canAddPathway;
        }

        if (cancelled) return;

        if (unlocked) {
          setState("confirmed");
          return;
        }

        attemptsRef.current += 1;
        if (attemptsRef.current >= MAX_ATTEMPTS) {
          setState("timeout");
          return;
        }

        setTimeout(checkEntitlement, POLL_INTERVAL_MS);
      } catch {
        if (cancelled) return;
        attemptsRef.current += 1;
        if (attemptsRef.current >= MAX_ATTEMPTS) {
          setState("timeout");
          return;
        }
        setTimeout(checkEntitlement, POLL_INTERVAL_MS);
      }
    };

    checkEntitlement();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, pollKey]);

  useEffect(() => {
    if (state !== "confirmed") return;
    const timer = setTimeout(() => {
      router.replace(
        intent === "certificate" ? "/dashboard/certificates" : "/dashboard/pathways",
      );
    }, 1200);
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
              This usually takes a few seconds. Please don{"'"}t close this
              page.
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
              Subscription active
            </h3>
            <p className="text-[12.5px] text-gray-500 mt-1">
              Taking you back now…
            </p>
          </div>
        </>
      )}

      {state === "timeout" && (
        <>
          <div className="max-w-sm space-y-1">
            <h3 className="text-sm font-bold text-gray-900">
              This is taking longer than expected
            </h3>
            <p className="text-[12.5px] text-gray-500">
              Your payment may still be processing. Refresh to check again, or
              head back to your dashboard — we{"'"}ll unlock everything as
              soon as it{"'"}s confirmed.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                attemptsRef.current = 0;
                setState("polling");
                setPollKey((k) => k + 1);
              }}
            >
              Refresh
            </Button>
            <Link href="/dashboard">
              <Button className="bg-[#1A56DB] hover:bg-[#1A56DB]/90">
                Go to dashboard
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}