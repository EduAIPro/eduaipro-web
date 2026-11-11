"use client";

import { format } from "date-fns";
import { schoolDemoKey } from "@/api/keys";
import { startSchoolDemo } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useSchoolDemo from "@/hooks/use-school-demo";
import useSchoolSeats from "@/hooks/use-school-seats";
import { schoolBillingMessage } from "@/lib/school-billing-errors";
import { invalidateSeats } from "@/lib/school-invalidate";
import { getSchoolInfo, schoolAccessKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import { PAYWALL_HINT } from "@/components/school/layout/access-gate";
import { RetrieveSchoolInfoResponse } from "@/types/school/auth";
import useSWR from "swr";
import { EyeIcon, LockIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { mutate } from "swr";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { SeatPurchaseFlow } from "./seat-purchase-flow";

const DEMO_LIMITS = [
  "Up to 5 teachers",
  "Unit 1 only",
  "30 days",
  "No card needed",
];

/**
 * Schools are pay-first: until the school has bought seats or started the free
 * demo, this is the only thing the dashboard shows.
 */
export const SeatPaywall = () => {
  const router = useRouter();
  // The pricing page sends the seat count the visitor chose.
  const requested = Number(useSearchParams().get("seats"));
  const { demo, isLoading: demoLoading } = useSchoolDemo();
  const { data: school } = useSWR<RetrieveSchoolInfoResponse>(
    getSchoolInfo,
    generalFetcher,
  );
  const { seats } = useSchoolSeats();
  const openInvoices =
    seats?.purchases.filter((p) => p.status === "PENDING" && p.invoiceNumber) ??
    [];
  const { trigger, isMutating } = useSWRMutation(
    schoolDemoKey,
    startSchoolDemo,
  );

  const onStartDemo = async () => {
    try {
      await trigger();
      await Promise.all([mutate(schoolAccessKey), mutate(schoolDemoKey)]);
      toast.success("Your free demo has started");
      router.push("/school");
    } catch (error) {
      toast.error(schoolBillingMessage(error));
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <p className="text-sm font-semibold text-primary">
        Welcome{school?.institutionName ? `, ${school.institutionName}` : ""}.
        One last step before your dashboard.
      </p>
      <div
        role="status"
        className="flex items-center gap-2.5 rounded-xl border border-blue-200 bg-blue-50 p-3.5 text-sm font-medium text-[#0a2a6b]"
      >
        <LockIcon className="size-4 shrink-0" />
        {PAYWALL_HINT}
      </div>
      <div>
        <h1 className="text-2xl font-semibold sm:text-3xl sm:font-bold">
          Choose your seats
        </h1>
        <p className="mt-1 text-sm text-grey-500">
          Buy a seat for each teacher you want to certify. One seat covers all
          five pathways for 24 months, paid once by card or bank transfer.
        </p>
      </div>

      {openInvoices.length ? (
        <Card
          className="space-y-1 border-amber-200 bg-amber-50 p-4"
          role="status"
        >
          <p className="text-sm font-semibold text-amber-900">
            Awaiting payment
          </p>
          {openInvoices.map((p) => (
            <p key={p.id} className="text-xs text-amber-900">
              Invoice {p.invoiceNumber}: {p.quantity} seats
              {p.invoiceRequestedAt
                ? `, requested ${format(new Date(p.invoiceRequestedAt), "do MMM, yyyy")}`
                : ""}
              . Your seats appear here once our team confirms the payment.
            </p>
          ))}
        </Card>
      ) : null}

      <Card className="p-5 md:p-6">
        <SeatPurchaseFlow
          initialQuantity={
            Number.isInteger(requested) && requested > 0 ? requested : undefined
          }
          onInvoiceDone={invalidateSeats}
        />
      </Card>

      {!demoLoading && !demo ? (
        <Card className="flex flex-col gap-4 border-dashed p-5 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-primary">
              <EyeIcon size={16} />
              Not ready to buy?
            </p>
            <h3 className="text-base font-semibold text-grey-800">
              Try the free school demo
            </h3>
            <ul className="flex flex-wrap gap-2" aria-label="Demo limits">
              {DEMO_LIMITS.map((l) => (
                <li
                  key={l}
                  className="rounded-full bg-[#EBEFF9] px-3 py-1 text-xs font-semibold text-[#0a2a6b]"
                >
                  {l}
                </li>
              ))}
            </ul>
            <p className="text-xs text-grey-500">
              Teachers keep their progress when you buy seats.
            </p>
          </div>
          <Button variant="outline" loading={isMutating} onClick={onStartDemo}>
            Start a free demo
          </Button>
        </Card>
      ) : null}
    </div>
  );
};
