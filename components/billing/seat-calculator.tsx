"use client";

import useSeatQuote from "@/hooks/use-seat-quote";
import useSubscriptionPlans from "@/hooks/use-subscription-plans";
import { cn, formatKobo } from "@/lib/utils";
import { SeatQuote } from "@/types/billing";
import { LightbulbIcon, MinusIcon, PlusIcon } from "lucide-react";

const DEFAULT_LIMITS = { min: 5, max: 299 };
const mailto = (subject: string) =>
  `mailto:support@eduaipro.ng?subject=${encodeURIComponent(subject)}`;

type SeatCalculatorProps = {
  quantity: number;
  onQuantityChange: (n: number) => void;
  /** the quote for `quantity`, from useSeatQuote */
  quote: SeatQuote | null;
  stale?: boolean;
  limits?: { min: number; max: number };
};

/**
 * Slider + number box + the priced tiles. Everything priced comes from the
 * quote endpoint; nothing here knows a rate or a band edge.
 */
export function SeatCalculator({
  quantity,
  onQuantityChange,
  quote,
  stale,
  limits = quote?.limits ?? DEFAULT_LIMITS,
}: SeatCalculatorProps) {
  // Band edges are data from the School Pro plan, never typed in here.
  const { schoolPro } = useSubscriptionPlans();
  const dropAt = (schoolPro?.current?.bands ?? [])
    .slice(1)
    .map((b) => b.minQuantity)
    .filter((n) => n > limits.min && n <= limits.max);
  const clamp = (n: number) =>
    Math.max(limits.min, Math.min(limits.max, Math.round(n) || limits.min));
  const fill = ((quantity - limits.min) / (limits.max - limits.min)) * 100;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label htmlFor="seat-qty" className="text-sm font-semibold">
          How many teachers are you buying for?
        </label>
        <div className="inline-flex items-center overflow-hidden rounded-lg border">
          <button
            type="button"
            aria-label="Remove one seat"
            onClick={() => onQuantityChange(clamp(quantity - 1))}
            className="grid size-8 place-items-center hover:bg-gray-100"
          >
            <MinusIcon size={16} />
          </button>
          <input
            id="seat-qty"
            type="number"
            inputMode="numeric"
            min={limits.min}
            max={limits.max}
            value={Number.isNaN(quantity) ? "" : quantity}
            onChange={(e) => onQuantityChange(Number(e.target.value))}
            onBlur={() => onQuantityChange(clamp(quantity))}
            className="h-8 w-[72px] border-x text-center font-semibold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            type="button"
            aria-label="Add one seat"
            onClick={() => onQuantityChange(clamp(quantity + 1))}
            className="grid size-8 place-items-center hover:bg-gray-100"
          >
            <PlusIcon size={16} />
          </button>
        </div>
      </div>

      <div>
        <input
          type="range"
          aria-label="Number of seats"
          min={limits.min}
          max={limits.max}
          value={Math.min(
            Math.max(quantity || limits.min, limits.min),
            limits.max,
          )}
          onChange={(e) => onQuantityChange(Number(e.target.value))}
          style={{
            background: `linear-gradient(to right, #0043be ${fill}%, #E3E8F4 ${fill}%)`,
          }}
          className="h-2 w-full cursor-pointer appearance-none rounded-full accent-[#0043be]"
        />
        <div className="mt-1 flex justify-between text-xs font-medium text-grey-500">
          <span>{limits.min}</span>
          <span>{limits.max}</span>
        </div>
        {dropAt.length ? (
          <p className="mt-2 text-xs font-medium text-grey-500">
            Price drops at {dropAt.join(" and ")} seats
          </p>
        ) : null}
      </div>

      <dl
        className={cn(
          "grid gap-2.5 transition-opacity sm:grid-cols-3",
          stale && "opacity-60",
        )}
        aria-live="polite"
      >
        <div className="rounded-lg bg-[#F7F9FD] p-3">
          <dt className="text-xs font-medium text-grey-500">Teachers</dt>
          <dd className="mt-0.5 text-lg font-semibold">
            {quote?.quantity ?? "—"}
          </dd>
        </div>
        <div className="rounded-lg bg-[#F7F9FD] p-3">
          <dt className="text-xs font-medium text-grey-500">Price per seat</dt>
          <dd className="mt-0.5 text-lg font-semibold">
            {quote ? formatKobo(quote.unitAmountKobo, quote.currency) : "—"}
          </dd>
        </div>
        <div className="rounded-lg bg-primary p-3 text-white">
          <dt className="text-xs font-medium text-[#C7D6F5]">
            Total for 2 years
          </dt>
          <dd className="mt-0.5 text-lg font-semibold">
            {quote ? formatKobo(quote.totalKobo, quote.currency) : "—"}
          </dd>
        </div>
      </dl>

      {quote && quote.savingKobo > 0 ? (
        <p className="text-sm font-semibold text-green-600">
          You save {formatKobo(quote.savingKobo, quote.currency)} compared with{" "}
          the first band’s rate
        </p>
      ) : null}

      {quote?.nudge ? (
        <div
          role="status"
          className="flex items-start gap-2.5 rounded-lg border border-[#F3E2B8] bg-[#FFF8E6] p-3 text-sm font-medium text-[#6B4700]"
        >
          <LightbulbIcon size={16} className="mt-0.5 shrink-0" />
          <span>
            Add {quote.nudge.addSeats} more seat
            {quote.nudge.addSeats > 1 ? "s" : ""} and pay{" "}
            {quote.nudge.savesKobo > 0
              ? `${formatKobo(quote.nudge.savesKobo, quote.currency)} less`
              : "the same"}{" "}
            in total, at{" "}
            {formatKobo(quote.nudge.unitAmountKobo, quote.currency)} per seat.{" "}
            <button
              type="button"
              onClick={() => onQuantityChange(quote.nudge!.quantity)}
              className="font-bold underline underline-offset-2"
            >
              Switch to {quote.nudge.quantity} seats
            </button>
          </span>
        </div>
      ) : null}

      <p className="text-xs font-medium text-grey-500">
        Buying for {limits.max + 1} or more teachers, or for several schools?{" "}
        <a
          href={mailto("Custom plan quote")}
          className="font-semibold text-primary"
        >
          Contact us for a Custom quote
        </a>
      </p>
    </div>
  );
}

export { useSeatQuote };
