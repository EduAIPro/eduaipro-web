"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useAdminBillingPlans from "@/hooks/use-admin-billing-plans";
import { AdminBillingPlan } from "@/types/admin/billing";
import { useState } from "react";
import { PlanCard } from "./plan-card";
import { SetPriceDialog } from "./set-price-dialog";

export const PlansTab = () => {
  const { plans, isLoading, isError, refetch } = useAdminBillingPlans();
  const [editing, setEditing] = useState<AdminBillingPlan | null>(null);

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-96 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="flex flex-col items-center gap-3 p-10 text-center">
        <p className="text-sm text-grey-500">Couldn’t load the plans.</p>
        <Button variant="outline" onClick={refetch}>
          Try again
        </Button>
      </Card>
    );
  }

  if (!plans.length) {
    return (
      <Card className="p-10 text-center text-sm text-grey-500">
        No plans have been set up yet.
      </Card>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard
            key={plan.code}
            plan={plan}
            onChangePrice={setEditing}
            onChanged={refetch}
          />
        ))}
      </div>
      <SetPriceDialog
        plan={editing}
        onOpenChange={(v) => !v && setEditing(null)}
        onChanged={refetch}
      />
    </>
  );
};
