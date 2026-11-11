"use client";

import { SubscribeModal, SubscribeTarget } from "@/components/dashboard/subscribe-modal";
import {
  BILLING_ERROR_EVENT,
  BillingErrorCode,
  BillingErrorDetail,
} from "@/lib/billing-errors";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const TEACHER_REASON: Partial<Record<BillingErrorCode, SubscribeTarget["reason"]>> = {
  PATHWAY_EXPIRED: "expired",
  PATHWAY_LOCKED: "locked",
  DEMO_UNIT_LOCKED: "demo_locked",
};

/**
 * Pricing v3 402s are raised from many calls (content, quizzes, invites, the
 * school dashboard). api/base.ts announces them once; this component decides
 * what the user sees so no screen has to handle them itself.
 */
export function BillingErrorGate({ audience }: { audience: "teacher" | "school" }) {
  const router = useRouter();
  const [target, setTarget] = useState<SubscribeTarget | null>(null);
  const lastSeen = useRef<{ code: string; at: number } | null>(null);

  useEffect(() => {
    const onError = (e: Event) => {
      const { code } = (e as CustomEvent<BillingErrorDetail>).detail;
      // one request often fans out into several; show each code once
      const now = Date.now();
      if (lastSeen.current?.code === code && now - lastSeen.current.at < 3000) return;
      lastSeen.current = { code, at: now };

      if (audience === "teacher") {
        const reason = TEACHER_REASON[code];
        if (reason) setTarget({ reason });
        return;
      }

      // SCHOOL_READ_ONLY and DEMO_INVITE_LIMIT are shown by the call that
      // failed (and the access banner), so only the paywall redirect is global.
      if (code === "SCHOOL_PAYMENT_REQUIRED") router.push("/school/billing");
    };

    window.addEventListener(BILLING_ERROR_EVENT, onError);
    return () => window.removeEventListener(BILLING_ERROR_EVENT, onError);
  }, [audience, router]);

  if (audience !== "teacher") return null;

  return (
    <SubscribeModal
      target={target}
      onOpenChange={(open) => !open && setTarget(null)}
    />
  );
}
