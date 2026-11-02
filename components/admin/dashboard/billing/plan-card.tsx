"use client";

import { adminDeletePlanPriceKey } from "@/api/keys";
import { deleteAdminPlanPrice } from "@/api/mutations";
import { ConfirmDialog } from "@/components/school/dashboard/billing/confirm-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { bandLabel, isBandedPlan, planIdOf } from "@/lib/admin-billing";
import { cn, formatKobo } from "@/lib/utils";
import {
  AdminBillingPlan,
  AdminPlanPrice,
  isAdminBillingError,
} from "@/types/admin/billing";
import { SeatBand } from "@/types/billing";
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

const fmt = (iso: string) => format(new Date(iso), "do MMM, yyyy, HH:mm");

const BandList = ({
  bands,
  currency,
}: {
  bands: SeatBand[];
  currency: string;
}) => (
  <ul className="divide-y rounded-lg border">
    {bands.map((b) => (
      <li
        key={b.minQuantity}
        className="flex items-center justify-between px-3 py-2 text-sm"
      >
        <span className="text-grey-500">{bandLabel(b)}</span>
        <span className="font-semibold text-grey-800">
          {formatKobo(b.unitAmountKobo, currency)}
          <span className="text-[11px] font-normal text-grey-500"> / seat</span>
        </span>
      </li>
    ))}
  </ul>
);

export const PlanCard = ({ plan, onChangePrice, onChanged }: PlanCardProps) => {
  const [removing, setRemoving] = useState<AdminPlanPrice | null>(null);
  const { trigger, isMutating } = useSWRMutation(
    adminDeletePlanPriceKey,
    deleteAdminPlanPrice,
  );

  const banded = isBandedPlan(plan);
  const current = plan.current;
  const details = plan.details;

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

  const upcomingSummary = (p: AdminPlanPrice) =>
    p.bands?.length
      ? p.bands
          .map(
            (b) =>
              `${bandLabel(b)}: ${formatKobo(b.unitAmountKobo, plan.currency)}`,
          )
          .join(" · ")
      : formatKobo(p.amountKobo, p.currency ?? plan.currency);

  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-grey-800">{plan.name}</h3>
        </div>
        <div className="flex flex-wrap justify-end gap-1.5">
          <Badge variant="outline">
            {details?.payer === "SCHOOL" ? "School pays" : "Teacher pays"}
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

      {details ? (
        <p className="text-sm text-grey-500">{details.description}</p>
      ) : null}

      {current ? (
        <div className="space-y-2">
          {banded && current.bands?.length ? (
            <BandList bands={current.bands} currency={current.currency} />
          ) : (
            <p className="text-3xl font-bold text-grey-800">
              {formatKobo(current.amountKobo, current.currency)}
              <span className="text-sm font-normal text-grey-500">
                {" "}
                / teacher · {details?.termMonths ?? 24} months
              </span>
            </p>
          )}
          {plan.since ? (
            <p className="text-[11px] text-grey-500">
              In force since {fmt(plan.since)}
              {banded ? ` · ${details?.termMonths ?? 24} months per seat` : ""}
            </p>
          ) : null}
        </div>
      ) : (
        <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
          No price is set for this plan yet, so it can’t be bought.
        </p>
      )}

      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-[10px] border bg-[#FAFBFC] p-3">
          <dt className="text-[10.5px] text-grey-500">Pathways</dt>
          <dd className="font-medium text-grey-800">All five</dd>
        </div>
        <div className="rounded-[10px] border bg-[#FAFBFC] p-3">
          <dt className="text-[10.5px] text-grey-500">Max enrolments</dt>
          <dd className="font-medium text-grey-800">
            {details?.maxEnrollments ?? 5}
          </dd>
        </div>
      </dl>

      {details?.includes?.length ? (
        <ul className="space-y-1.5">
          {details.includes.map((line) => (
            <li key={line} className="flex gap-2 text-xs text-grey-500">
              <CheckIcon className="mt-0.5 size-3.5 shrink-0 text-[#1A56DB]" />
              {line}
            </li>
          ))}
        </ul>
      ) : null}

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
                    {upcomingSummary(p)}
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
            ? `The price planned for ${fmt(removing.effectiveAt)} (${upcomingSummary(removing)}) will be cancelled. The current price stays in force.`
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
