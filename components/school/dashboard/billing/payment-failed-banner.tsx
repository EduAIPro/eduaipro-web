import { SeatPurchase } from "@/types/school/billing";
import { format } from "date-fns";
import { AlertTriangleIcon } from "lucide-react";

export const PaymentFailedBanner = ({ purchases }: { purchases: SeatPurchase[] }) => {
  const failing = purchases.find((p) => p.graceEndsAt);
  if (!failing?.graceEndsAt) return null;
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3.5"
    >
      <AlertTriangleIcon className="mt-0.5 size-4 shrink-0 text-amber-700" />
      <div>
        <p className="text-xs font-semibold text-grey-800">
          Payment failed: seats stay active until{" "}
          {format(new Date(failing.graceEndsAt), "dd MMM yyyy")}
        </p>
        {failing.card ? (
          <p className="text-[11.5px] text-grey-500">
            The renewal charge to your {failing.card.brand} card ending{" "}
            {failing.card.last4} did not go through.
          </p>
        ) : null}
      </div>
    </div>
  );
};
