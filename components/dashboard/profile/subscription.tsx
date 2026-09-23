"use client";

import {
  cancelSubscriptionKey,
  getSubscriptionKey,
  resumeSubscriptionKey,
} from "@/api/keys";
import { cancelSubscription, resumeSubscription } from "@/api/mutations";
import {
  SubscribeModal,
  SubscribeTarget,
} from "@/components/dashboard/subscribe-modal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import useSubscription from "@/hooks/use-subscription";
import { isSchoolSeat } from "@/types/billing";
import { format } from "date-fns";
import {
  BadgeCheckIcon,
  CalendarClockIcon,
  ClockAlertIcon,
  CreditCardIcon,
  SchoolIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

export const SubscriptionCard = () => {
  const { subscription, isLoading, mutate } = useSubscription();
  const [upgradeTarget, setUpgradeTarget] = useState<SubscribeTarget | null>(
    null,
  );
  const [confirmingCancel, setConfirmingCancel] = useState(false);

  const { trigger: triggerCancel, isMutating: isCancelling } = useSWRMutation(
    cancelSubscriptionKey,
    cancelSubscription,
  );
  const { trigger: triggerResume, isMutating: isResuming } = useSWRMutation(
    resumeSubscriptionKey,
    resumeSubscription,
  );

  const handleCancel = async () => {
    try {
      const updated = await triggerCancel();
      mutate(updated, { revalidate: false });
      setConfirmingCancel(false);
      toast.success(
        "Your subscription will end on its next renewal date. You'll keep access until then.",
      );
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleResume = async () => {
    try {
      const updated = await triggerResume();
      mutate(updated, { revalidate: false });
      toast.success("Your subscription will continue to renew as normal.");
    } catch (error) {
      toast.error(error as string);
    }
  };

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
  const seat = isSchoolSeat(subscription);

  const planPill = seat
    ? { label: "Provided by your school", color: "#6D28D9", bg: "#EDE9FE" }
    : isPro
      ? { label: "EduAI Pro", color: "#1A56DB", bg: "#EFF6FF" }
      : { label: "Free plan", color: "#6B7280", bg: "#F3F4F6" };

  const rows = [
    {
      title: "Certificate issuance",
      value: subscription?.canIssueCertificate
        ? "Included"
        : "Needs a subscription",
      icon: <BadgeCheckIcon size={15} />,
      color: subscription?.canIssueCertificate ? "#16A34A" : "#B45309",
      bg: subscription?.canIssueCertificate ? "#DCFCE7" : "#FEF3C7",
    },
    {
      title: "Additional pathways",
      value: subscription?.canAddPathway
        ? "All five included"
        : "Needs a subscription",
      icon: <ShieldCheckIcon size={15} />,
      color: subscription?.canAddPathway ? "#16A34A" : "#B45309",
      bg: subscription?.canAddPathway ? "#DCFCE7" : "#FEF3C7",
    },
    ...(isPro && subscription?.renewsAt && !subscription.cancelAtPeriodEnd
      ? [
          {
            title: "Renews on",
            value: format(new Date(subscription.renewsAt), "dd MMM yyyy"),
            icon: <CalendarClockIcon size={15} />,
            color: "#1A56DB",
            bg: "#EFF6FF",
          },
        ]
      : []),
    ...(isPro && subscription?.cancelAtPeriodEnd && subscription?.renewsAt
      ? [
          {
            title: "Cancels on",
            value: format(new Date(subscription.renewsAt), "dd MMM yyyy"),
            icon: <ClockAlertIcon size={15} />,
            color: "#B45309",
            bg: "#FEF3C7",
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
            {seat ? <SchoolIcon size={16} /> : <CreditCardIcon size={16} />}
          </div>
          <h3 className="font-bold text-grey-800 md:text-lg">Subscription</h3>
        </div>
        <span
          className="inline-flex items-center gap-1 text-[11px] font-semibold rounded-full px-2.5 py-1"
          style={{ color: planPill.color, background: planPill.bg }}
        >
          {planPill.label}
        </span>
      </div>

      <ul className="space-y-1">
        {rows.map((row) => (
          <li
            key={row.title}
            className="flex items-center gap-3 py-2.5 border-b border-grey-3 last:border-b-0"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: row.bg, color: row.color }}
            >
              {row.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium text-grey-500">
                {row.title}
              </p>
              <p className="text-grey-800 font-semibold text-sm truncate">
                {row.value}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <p className="text-[10.5px] text-gray-400 leading-relaxed">
        Certificates already issued stay valid until their printed expiry date,
        whether or not the subscription is renewed.
      </p>

      {seat ? (
        <p className="text-[11.5px] text-gray-500">
          Managed by your school administrator.
        </p>
      ) : !isPro ? (
        <Button
          className="w-full bg-[#1A56DB] hover:bg-[#1A56DB]/90"
          onClick={() => setUpgradeTarget({ reason: "general" })}
        >
          Subscribe
        </Button>
      ) : subscription?.cancelAtPeriodEnd ? (
        <Button
          className="w-full bg-[#1A56DB] hover:bg-[#1A56DB]/90"
          loading={isResuming}
          onClick={handleResume}
        >
          Resume subscription
        </Button>
      ) : (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setConfirmingCancel(true)}
        >
          Cancel subscription
        </Button>
      )}

      <SubscribeModal
        target={upgradeTarget}
        onOpenChange={(open) => !open && setUpgradeTarget(null)}
      />

      <Dialog open={confirmingCancel} onOpenChange={setConfirmingCancel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel your subscription?</DialogTitle>
            <DialogDescription>
              You{"'"}ll keep certificate issuance and access to every pathway
              until{" "}
              {subscription?.renewsAt
                ? format(new Date(subscription.renewsAt), "dd MMM yyyy")
                : "your next renewal date"}
              . Certificates already issued stay valid regardless.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmingCancel(false)}
            >
              Keep subscription
            </Button>
            <Button
              variant="destructive"
              loading={isCancelling}
              onClick={handleCancel}
            >
              Cancel subscription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
