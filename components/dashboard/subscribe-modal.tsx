"use client";

import { subscribeKey } from "@/api/keys";
import { subscribeCheckout } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useSubscription from "@/hooks/use-subscription";
import useSubscriptionPlans from "@/hooks/use-subscription-plans";
import { extendedEnd } from "@/lib/billing-dates";
import { format } from "date-fns";
import { saveTeacherCheckout } from "@/lib/school-checkout";
import { formatKobo } from "@/lib/utils";
import { isSchoolProvided } from "@/types/billing";
import { capitalizeAll } from "@/utils/text";
import { ShieldCheckIcon } from "lucide-react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

export type SubscribeModalReason =
  | "add_pathway"
  | "issue_certificate"
  | "general"
  | "expired"
  | "locked"
  | "demo_locked";

export type SubscribeTarget = {
  courseId?: string;
  title?: string;
  reason: SubscribeModalReason;
};

type SubscribeModalProps = {
  target: SubscribeTarget | null;
  onOpenChange: (open: boolean) => void;
};

const COPY: Record<
  SubscribeTarget["reason"],
  { title: string; button: string }
> = {
  general: { title: "Get Personal Pro", button: "Get Personal Pro" },
  add_pathway: {
    title: "Personal Pro adds every pathway",
    button: "Get Personal Pro and start",
  },
  issue_certificate: {
    title: "Upgrade to claim your certificate",
    button: "Upgrade and claim certificate",
  },
  expired: {
    title: "Your 6 months have ended",
    button: "Upgrade to pick up where you left off",
  },
  locked: { title: "This pathway has closed", button: "Renew your plan" },
  demo_locked: {
    title: "Unit 2 is outside your school’s demo",
    button: "Get Personal Pro",
  },
};

export function SubscribeModal({ target, onOpenChange }: SubscribeModalProps) {
  const { personalPro } = useSubscriptionPlans();
  const { subscription } = useSubscription(!!target);

  const { trigger, isMutating } = useSWRMutation(
    subscribeKey,
    subscribeCheckout,
  );

  const schoolOnly = isSchoolProvided(subscription);
  const hasPersonal = !!subscription?.sources.includes("PERSONAL");
  const price = personalPro?.current ?? null;
  const termMonths = personalPro?.details?.termMonths ?? 24;

  const handleSubscribe = async () => {
    if (!target) return;
    try {
      const params = new URLSearchParams();
      if (target.courseId) params.set("courseId", target.courseId);
      if (target.reason === "issue_certificate")
        params.set("intent", "certificate");
      else if (target.reason === "add_pathway") params.set("intent", "enroll");
      const query = params.toString();

      const res = await trigger({
        callbackUrl: `${window.location.origin}/dashboard/billing/callback${query ? `?${query}` : ""}`,
        ...(target.courseId && { courseId: target.courseId }),
      });

      saveTeacherCheckout({ reference: res.reference });
      window.location.href = res.authorizationUrl;
    } catch (error) {
      toast.error(error as string);
    }
  };

  const title = capitalizeAll(
    target?.title?.replaceAll("_", " ").toLowerCase() ?? "",
  );
  const description = !target
    ? ""
    : target.reason === "issue_certificate"
      ? `You completed "${title}". Personal Pro issues the accredited certificate as soon as your payment is confirmed.`
      : target.reason === "add_pathway"
        ? `Personal Pro lets you enrol in "${title}" and every other CPD pathway, with certificates included when you finish.`
        : target.reason === "expired"
          ? "Your 6 months on this pathway have ended. Your progress is saved; upgrade to pick up where you left off."
          : target.reason === "locked"
            ? "This pathway has closed. Renew your plan to reopen it with a fresh 6 months. Your progress is saved."
            : target.reason === "demo_locked"
              ? "Your school is trialling EduAI Pro. Ask your school to activate your seat, or get a Personal Pro subscription plan."
              : "Personal Pro unlocks accredited certificates and all five CPD pathways.";

  const copy = target ? COPY[target.reason] : COPY.general;

  return (
    <Dialog open={!!target} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#1A56DB] mb-2">
            <ShieldCheckIcon size={20} />
          </div>
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {schoolOnly ? (
          <p className="text-sm text-gray-500 leading-relaxed">
            Your plan is provided by your school
            {subscription?.endsAt
              ? ` until ${format(new Date(subscription.endsAt), "do MMM, yyyy")}`
              : ""}
            . Ask your school administrator to renew the seats.
          </p>
        ) : price ? (
          <div className="space-y-1.5 text-sm text-gray-500 leading-relaxed">
            <p>
              {hasPersonal ? "Adds " : ""}
              <strong>{termMonths} months</strong> of{" "}
              <strong>Personal Pro</strong> for{" "}
              <strong>{formatKobo(price.amountKobo, price.currency)}</strong>,
              paid once by card or bank transfer. Nothing renews by itself.
            </p>
            {hasPersonal && subscription?.endsAt ? (
              <p>
                Your plan would run until{" "}
                <strong>
                  {format(
                    extendedEnd(subscription.endsAt, termMonths),
                    "do MMM, yyyy",
                  )}
                </strong>
                .
              </p>
            ) : null}
          </div>
        ) : null}

        <p className="text-xs text-gray-500 leading-relaxed">
          A certificate is valid until your plan ends. Certificates already
          issued stay valid after that.
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {schoolOnly ? "Close" : "Not now"}
          </Button>
          {schoolOnly ? null : (
            <Button
              className="bg-[#1A56DB] hover:bg-[#1A56DB]/90"
              loading={isMutating}
              disabled={!price || isMutating}
              onClick={handleSubscribe}
            >
              {hasPersonal ? "Add 24 months" : copy.button}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
