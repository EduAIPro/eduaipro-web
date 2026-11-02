"use client";

import {
  SubscribeModal,
  SubscribeTarget,
} from "@/components/dashboard/subscribe-modal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useSubscription from "@/hooks/use-subscription";
import useTransactions from "@/hooks/use-transactions";
import { daysUntil, isFreshPending } from "@/lib/billing-dates";
import { format } from "date-fns";
import { isDemoTeacher, isSchoolProvided } from "@/types/billing";
import {
  BadgeCheckIcon,
  CalendarClockIcon,
  CreditCardIcon,
  Loader2Icon,
  SchoolIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { useState } from "react";

export const SubscriptionCard = () => {
  const { subscription, isLoading } = useSubscription();
  const { transactions } = useTransactions({ limit: 10 });
  const [upgradeTarget, setUpgradeTarget] = useState<SubscribeTarget | null>(
    null,
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
    );
  }

  const plan = subscription?.plan ?? "FREE";
  const isPro = plan === "PRO";
  const schoolOnly = isSchoolProvided(subscription);
  const demo = isDemoTeacher(subscription);
  const hasPersonal = !!subscription?.sources.includes("PERSONAL");
  const endsIn = daysUntil(subscription?.endsAt);
  const endingSoon = isPro && endsIn !== null && endsIn <= 90;
  const pending = transactions?.items.find(
    (t) => t.status === "PENDING" && isFreshPending(t.createdAt),
  );

  const planPill = schoolOnly
    ? { label: "Provided by your school", color: "#6D28D9", bg: "#EDE9FE" }
    : isPro
      ? { label: "Personal Pro", color: "#1A56DB", bg: "#EFF6FF" }
      : { label: "Free plan", color: "#6B7280", bg: "#F3F4F6" };

  const rows = [
    {
      title: "Certificate issuance",
      value: subscription?.canIssueCertificate
        ? "Included"
        : "Locked until you upgrade",
      icon: <BadgeCheckIcon size={15} />,
      ok: !!subscription?.canIssueCertificate,
    },
    {
      title: "Pathways",
      value: subscription?.canAddPathway
        ? "All five included"
        : demo
          ? "Unit 1 only while your school trials EduAI Pro"
          : "1 pathway",
      icon: <ShieldCheckIcon size={15} />,
      ok: !!subscription?.canAddPathway,
    },
    ...(isPro && subscription?.endsAt
      ? [
          {
            title: schoolOnly ? "Provided until" : "Pro until",
            value: format(new Date(subscription.endsAt), "do MMM, yyyy"),
            icon: <CalendarClockIcon size={15} />,
            ok: true,
            info: true,
          },
        ]
      : []),
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{
              color: isPro ? "#1A56DB" : "#6B7280",
              background: isPro ? "#EFF6FF" : "#F3F4F6",
            }}
          >
            {schoolOnly ? (
              <SchoolIcon size={16} />
            ) : (
              <CreditCardIcon size={16} />
            )}
          </div>
          <h3 className="font-bold text-grey-800 md:text-lg">Plan</h3>
        </div>
        <span
          className="inline-flex items-center gap-1 text-[11px] font-semibold rounded-full px-2.5 py-1"
          style={{ color: planPill.color, background: planPill.bg }}
        >
          {planPill.label}
        </span>
      </div>

      <ul className="space-y-1">
        {rows.map((row) => {
          const color =
            "info" in row ? "#1A56DB" : row.ok ? "#16A34A" : "#B45309";
          const bg = "info" in row ? "#EFF6FF" : row.ok ? "#DCFCE7" : "#FEF3C7";
          return (
            <li
              key={row.title}
              className="flex items-center gap-3 py-2.5 border-b border-grey-3 last:border-b-0"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: bg, color }}
              >
                {row.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-grey-500">
                  {row.title}
                </p>
                <p className="text-grey-800 font-semibold text-sm">
                  {row.value}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      {pending ? (
        <div
          role="status"
          className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-800"
        >
          <Loader2Icon size={14} className="mt-0.5 shrink-0 animate-spin" />
          <span>
            Payment pending. Bank transfers can take a few minutes; your plan
            activates by itself once the money arrives.
          </span>
        </div>
      ) : null}

      {endingSoon && !schoolOnly ? (
        <p className="rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
          Your plan ends on{" "}
          {subscription?.endsAt
            ? format(new Date(subscription.endsAt), "do MMM, yyyy")
            : "—"}
          . Add 24 months any time and the new term starts where this one ends.
        </p>
      ) : null}

      <p className="text-xs text-gray-500 leading-relaxed">
        A certificate is valid until your plan ends, so finishing sooner keeps
        it valid for longer. Certificates already issued stay valid after that.
      </p>

      {schoolOnly ? (
        <p className="text-[11.5px] text-gray-500">
          Managed by your school administrator.
        </p>
      ) : subscription?.enforced === false ? null : (
        <Button
          className="w-full bg-[#1A56DB] hover:bg-[#1A56DB]/90"
          onClick={() => setUpgradeTarget({ reason: "general" })}
        >
          {hasPersonal ? "Add 24 months" : "Get Personal Pro"}
        </Button>
      )}

      <SubscribeModal
        target={upgradeTarget}
        onOpenChange={(open) => !open && setUpgradeTarget(null)}
      />
    </div>
  );
};
