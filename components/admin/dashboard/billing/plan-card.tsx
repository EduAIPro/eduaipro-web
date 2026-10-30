"use client";

import { adminDeletePlanPriceKey } from "@/api/keys";
import { deleteAdminPlanPrice } from "@/api/mutations";
import { ConfirmDialog } from "@/components/school/dashboard/billing/confirm-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { planIdOf } from "@/lib/admin-billing";
import { cn, formatMoney } from "@/lib/utils";
import {
  AdminBillingPlan,
  AdminPlanPrice,
  isAdminBillingError,
} from "@/types/admin/billing";
import { format } from "date-fns";
import { CalendarClockIcon, CheckIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

type PlanCardProps = {
  plan: AdminBillingPlan;
  onChangePrice: (plan: AdminBillingPlan) => void;
  onChanged: () => void;
};

const fmt = (iso: string) => format(new Date(iso), "dd MMM yyyy, HH:mm");

export const PlanCard = ({ plan, onChangePrice, onChanged }: PlanCardProps) => {
  const [removing, setRemoving] = useState<AdminPlanPrice | null>(null);
  const { trigger, isMutating } = useSWRMutation(
    adminDeletePlanPriceKey,
    deleteAdminPlanPrice,
  );

  const upcoming = [...plan.upcoming].sort(
    (a, b) =>
      new Date(a.effectiveAt).getTime() - new Date(b.effectiveAt).getTime(),
  );

  const onRemove = async () => {
    if (!removing) return;
    try {
      await trigger({ planId: planIdOf(plan), priceId: removing.id });
      toast.success("Scheduled price removed");
      onChanged();
    } catch (error) {
      toast.error(
        isAdminBillingError(error)
          ? error.message
          : "Couldn’t remove that price",
      );
    } finally {
      setRemoving(null);
    }
  };

  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-grey-800">{plan.name}</h3>
          {/* <p className="font-mono text-[11px] text-grey-500">{plan.code}</p> */}
        </div>
        <div className="flex flex-wrap justify-end gap-1.5">
          <Badge variant="outline">
            {plan.details.payer === "SCHOOL" ? "School pays" : "Teacher pays"}
          </Badge>
          <Badge
            className={cn(
              "border-transparent",
              plan.isActive
                ? "bg-green-100 text-green-700"
                : "bg-grey-3 text-grey-500",
            )}
          >
            {plan.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </div>

      <p className="text-sm text-grey-500">{plan.details.description}</p>

      <div>
        <p className="text-3xl font-bold text-grey-800">
          {formatMoney(plan.current.amountKobo / 100, plan.current.currency)}
          <span className="text-sm font-normal text-grey-500">
            {" "}
            / {plan.details.payer === "SCHOOL" ? "seat" : "teacher"} ·{" "}
            {plan.details.termMonths} months
          </span>
        </p>
        <p className="text-[11px] text-grey-500">
          In force since {fmt(plan.since)}
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-[10px] border bg-[#FAFBFC] p-3">
          <dt className="text-[10.5px] text-grey-500">Pathways</dt>
          <dd className="font-medium text-grey-800">
            {plan.details.pathways === "ONE" ? "One per seat" : "All five"}
          </dd>
        </div>
        <div className="rounded-[10px] border bg-[#FAFBFC] p-3">
          <dt className="text-[10.5px] text-grey-500">Max enrolments</dt>
          <dd className="font-medium text-grey-800">
            {plan.details.maxEnrollments}
          </dd>
        </div>
      </dl>

      <ul className="space-y-1.5">
        {plan.details.includes.map((line) => (
          <li key={line} className="flex gap-2 text-xs text-grey-500">
            <CheckIcon className="mt-0.5 size-3.5 shrink-0 text-[#1A56DB]" />
            {line}
          </li>
        ))}
      </ul>

      <div className="space-y-2">
        <h4 className="flex items-center gap-1.5 text-xs font-semibold text-grey-800">
          <CalendarClockIcon className="size-3.5" /> Scheduled prices
        </h4>
        {upcoming.length ? (
          <ul className="space-y-2">
            {upcoming.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-semibold text-grey-800">
                    {formatMoney(
                      p.amountKobo / 100,
                      p.currency ?? plan.currency,
                    )}
                  </p>
                  <p className="text-[11px] text-grey-500">
                    from {fmt(p.effectiveAt)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Remove scheduled price from ${fmt(p.effectiveAt)}`}
                  onClick={() => setRemoving(p)}
                >
                  <Trash2Icon className="size-4 text-red-600" />
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-grey-500">No price changes scheduled.</p>
        )}
      </div>

      <Button className="mt-auto" onClick={() => onChangePrice(plan)}>
        Change price
      </Button>

      <ConfirmDialog
        open={!!removing}
        onOpenChange={(v) => !v && setRemoving(null)}
        title="Remove scheduled price?"
        description={
          removing
            ? `The ${formatMoney(removing.amountKobo / 100, plan.currency)} price planned for ${fmt(removing.effectiveAt)} will be cancelled. The current price stays in force.`
            : ""
        }
        confirmLabel="Remove price"
        destructive
        loading={isMutating}
        onConfirm={onRemove}
      />
    </Card>
  );
};
