"use client";
import Typography from "@/components/common/ui/Typography";
import { Button } from "@/components/ui/button";
import useSeatQuote from "@/hooks/use-seat-quote";
import useSubscriptionPlans from "@/hooks/use-subscription-plans";
import { cn, formatKobo } from "@/lib/utils";
import { SeatBand } from "@/types/billing";
import {
  BuildingIcon,
  CheckIcon,
  EyeIcon,
  LandmarkIcon,
  LightbulbIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

const DEFAULT_SEATS = 20;
const FALLBACK_LIMITS = { min: 5, max: 299 };

const INCLUDED = [
  {
    text: "Everything in Personal Pro, for each teacher",
    note: "Teachers choose their own pathway when they accept your invite",
  },
  { text: "School dashboard: staff list, progress and certificates" },
  { text: "Renewals tracker and compliance export" },
];

const STEPS = [
  "Create your school account and verify your email",
  "Choose your seats and pay by card, bank transfer or invoice",
  "Open your dashboard and invite your teachers",
];

const CUSTOM_INCLUDED = [
  {
    text: "One shared pool of seats",
    note: "Hand seats to any school in your network",
  },
  { text: "Network dashboard covering every school" },
  { text: "Onboarding sessions for admins and teachers" },
  { text: "End-of-programme impact report" },
];

const DEMO_LIMITS = [
  "Up to 5 teachers",
  "Unit 1 only",
  "30 days",
  "No card needed",
];

const bandLabel = (b: SeatBand) =>
  b.maxQuantity === null
    ? `${b.minQuantity}+ seats`
    : `${b.minQuantity} – ${b.maxQuantity} seats`;

const mailto = (subject: string) =>
  `mailto:support@eduaipro.ng?subject=${encodeURIComponent(subject)}`;

export default function SchoolPlans() {
  return (
    <section
      id="schools"
      aria-labelledby="schools-heading"
      className="flex flex-col gap-6 scroll-mt-24"
    >
      <div className="text-center space-y-2 md:max-w-[70%] mx-auto">
        <p className="inline-flex items-center gap-2 text-primary text-sm font-medium">
          <BuildingIcon size={16} />
          For schools, colleges and universities
        </p>
        <h2
          id="schools-heading"
          className="font-semibold text-xl md:text-2xl lg:text-3xl tracking-tight"
        >
          Certify your whole staff,
          <br />
          and track every certificate.
        </h2>
      </div>
      <div className="flex flex-col gap-6">
        <SchoolProCard />
        <CustomCard />
        <FreeDemo />
      </div>
    </section>
  );
}

function SchoolProCard() {
  const router = useRouter();
  const { schoolPro } = useSubscriptionPlans();
  const [seats, setSeats] = useState(DEFAULT_SEATS);

  // Prices, band edges and limits are data: they come from the plan and the
  // quote endpoint, never from this file.
  const bands = schoolPro?.current?.bands ?? [];
  const currency = schoolPro?.current?.currency ?? "NGN";
  const { quote, isStale } = useSeatQuote(seats);
  const limits = quote?.limits ?? {
    min: bands[0]?.minQuantity ?? FALLBACK_LIMITS.min,
    max: bands[bands.length - 1]?.maxQuantity ?? FALLBACK_LIMITS.max,
  };
  const clampSeats = (n: number) =>
    Math.max(limits.min, Math.min(limits.max, Math.round(n) || limits.min));

  const showSaving = !!quote && quote.savingKobo > 0;
  const nudge = quote?.nudge ?? null;
  const fill = ((seats - limits.min) / (limits.max - limits.min)) * 100;
  const ticks = [
    limits.min,
    ...bands.slice(1).map((b) => b.minQuantity),
    limits.max,
  ];

  const buy = () => router.push(`/school/billing?seats=${clampSeats(seats)}`);

  return (
    <div
      role="group"
      aria-labelledby="school-pro-name"
      className="rounded-2xl border border-[#D3DCF1] bg-gradient-to-b from-[#EBEFF9] to-[#F6F8FE] p-5 md:p-8 flex flex-col gap-8"
    >
      <div className="space-y-2.5">
        <p className="inline-flex items-center gap-2 text-primary text-sm font-medium">
          <BuildingIcon size={16} />
          Paid by your school
        </p>
        <h3
          id="school-pro-name"
          className="font-bold text-2xl tracking-tight text-gray-800"
        >
          School Pro
        </h3>
        <p className="text-sm font-medium text-grey-11 max-w-[460px]">
          For schools and tertiary institutions that pay for their
          teachers&apos; certification and want to see everyone&apos;s progress
          in one place.
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: what it is and what it costs */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold tracking-tight">
                {bands[0] ? formatKobo(bands[0].unitAmountKobo, currency) : "—"}
              </span>
              <span className="text-sm font-medium text-grey-11">per seat</span>
            </p>
            <p className="text-xs font-medium text-grey-10 mt-1">
              1 seat = 1 teacher · covers{" "}
              <b className="text-grey-11">2 years</b> · from {limits.min} seats
            </p>
          </div>
          <div
            className="grid gap-2"
            aria-label="Price per seat by number of seats"
          >
            {bands.map((b) => (
              <div
                key={b.minQuantity}
                className={cn(
                  "flex items-center justify-between rounded-lg border px-4 py-2.5 text-sm font-medium bg-white/70 transition-all",
                  b.minQuantity === quote?.band.minQuantity
                    ? "border-primary bg-white ring-1 ring-primary text-primary"
                    : "border-[#D3DCF1]",
                )}
              >
                <span>{bandLabel(b)}</span>
                <b className="font-semibold text-gray-800">
                  {formatKobo(b.unitAmountKobo, currency)}
                </b>
              </div>
            ))}
          </div>
        </div>

        {/* Right: seat calculator */}
        <div className="flex flex-col gap-6">
          <div className="rounded-xl h-fit border border-[#D3DCF1] bg-white p-5 flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label htmlFor="seat-num" className="text-sm font-semibold">
                How many teachers are you buying for?
              </label>
              <div className="inline-flex items-center border rounded-lg overflow-hidden">
                <button
                  type="button"
                  aria-label="Remove one seat"
                  onClick={() => setSeats(clampSeats(seats - 1))}
                  className="size-8 grid place-items-center hover:bg-gray-100"
                >
                  <MinusIcon size={16} />
                </button>
                <input
                  id="seat-num"
                  type="number"
                  inputMode="numeric"
                  min={limits.min}
                  max={limits.max}
                  value={Number.isNaN(seats) ? "" : seats}
                  onChange={(e) => setSeats(Number(e.target.value))}
                  onBlur={() => setSeats(clampSeats(seats))}
                  className="w-[72px] h-8 border-x text-center font-semibold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <button
                  type="button"
                  aria-label="Add one seat"
                  onClick={() => setSeats(clampSeats(seats + 1))}
                  className="size-8 grid place-items-center hover:bg-gray-100"
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
                value={clampSeats(seats)}
                onChange={(e) => setSeats(Number(e.target.value))}
                style={{
                  background: `linear-gradient(to right, #0043be ${fill}%, #E3E8F4 ${fill}%)`,
                }}
                className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[#0043be]"
              />
              <div className="relative h-5 mt-2 text-xs font-medium text-grey-10">
                {ticks.map((t, i) => (
                  <span
                    key={t}
                    style={{
                      left: `${((t - limits.min) / (limits.max - limits.min)) * 100}%`,
                    }}
                    className={cn(
                      "absolute",
                      i === ticks.length - 1
                        ? "-translate-x-full"
                        : i > 0 && "-translate-x-1/2",
                    )}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <dl
              className={cn(
                "grid sm:grid-cols-3 gap-2.5 transition-opacity",
                isStale && "opacity-60",
              )}
              aria-live="polite"
            >
              <div className="rounded-lg bg-[#F7F9FD] p-3">
                <dt className="text-xs font-medium text-grey-10">Teachers</dt>
                <dd className="font-semibold text-lg mt-0.5">{seats}</dd>
              </div>
              <div className="rounded-lg bg-[#F7F9FD] p-3">
                <dt className="text-xs font-medium text-grey-10">Per seat</dt>
                <dd className="font-semibold text-lg mt-0.5">
                  {quote ? formatKobo(quote.unitAmountKobo, currency) : "—"}
                </dd>
              </div>
              <div className="rounded-lg bg-primary text-white p-3">
                <dt className="text-xs font-medium text-[#C7D6F5]">
                  Total, 2 years
                </dt>
                <dd className="font-semibold text-lg mt-0.5">
                  {quote ? formatKobo(quote.totalKobo, currency) : "—"}
                </dd>
              </div>
            </dl>

            <Reveal show={showSaving}>
              <p className="text-sm font-semibold text-green-600">
                You save {quote ? formatKobo(quote.savingKobo, currency) : ""}{" "}
                compared with {bands[0] ? formatKobo(bands[0].unitAmountKobo, currency) : "the first band"}{" "}
                per seat
              </p>
            </Reveal>
            <Reveal show={!!nudge}>
              {nudge && (
                <div
                  role="status"
                  className="flex items-start gap-2.5 rounded-lg border border-[#F3E2B8] bg-[#FFF8E6] p-3 text-sm font-medium text-[#6B4700]"
                >
                  <LightbulbIcon size={16} className="shrink-0 mt-0.5" />
                  <span>
                    Add {nudge.addSeats} more seat
                    {nudge.addSeats > 1 ? "s" : ""} and pay{" "}
                    {nudge.savesKobo > 0
                      ? `${formatKobo(nudge.savesKobo, currency)} less`
                      : "the same"}{" "}
                    in total, at {formatKobo(nudge.unitAmountKobo, currency)}{" "}
                    per seat.{" "}
                    <button
                      type="button"
                      onClick={() => setSeats(nudge.quantity)}
                      className="font-bold underline underline-offset-2"
                    >
                      Switch to {nudge.quantity} seats
                    </button>
                  </span>
                </div>
              )}
            </Reveal>
            <p className="text-xs font-medium text-grey-10">
              Buying for {limits.max + 1} or more teachers, or for several
              schools?{" "}
              <a href="#custom" className="text-primary font-semibold">
                See Custom
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Included + steps, side by side */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <p className="text-sm font-semibold text-grey-11 mb-3">
            Included for every seat
          </p>
          <ul className="space-y-3">
            {INCLUDED.map((item) => (
              <CheckItem key={item.text} {...item} />
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-grey-11 mb-3">
            How School Pro works
          </p>
          <ol className="space-y-3" aria-label="How School Pro works">
            {STEPS.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-3 text-sm font-medium text-grey-12"
              >
                <span className="shrink-0 size-6 rounded-full bg-primary text-white text-xs font-bold grid place-items-center">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="flex flex-col items-center md:max-w-1/2 mx-auto gap-3">
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Button
            className="flex-1"
            disabled={!quote || isStale}
            onClick={buy}
          >
            Get {clampSeats(seats)} seats
          </Button>
          <Button
            variant="outline"
            className="sm:w-auto"
            onClick={buy}
          >
            Request an invoice
          </Button>
        </div>
        <Link
          href="#demo"
          className="text-sm font-semibold text-primary underline underline-offset-4"
        >
          Not ready to buy? Try the free school demo
        </Link>
      </div>
    </div>
  );
}

// Eases helper content in and out. The negative margin cancels the parent's
// gap-3 while collapsed so no blank space is left behind.
function Reveal({ show, children }: { show: boolean; children: ReactNode }) {
  return (
    <div
      aria-hidden={!show}
      className={cn(
        "grid transition-all duration-300 ease-out motion-reduce:transition-none",
        show
          ? "grid-rows-[1fr] opacity-100 translate-y-0 mt-0"
          : "grid-rows-[0fr] opacity-0 -translate-y-1 -mt-3 pointer-events-none",
      )}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

function CustomCard() {
  return (
    <div
      role="group"
      id="custom"
      aria-labelledby="custom-name"
      className="rounded-2xl border border-[#F3E2B8] bg-gradient-to-b from-[#FFF8E6] to-[#FFFCF3] p-5 md:p-8 grid lg:grid-cols-2 gap-8 lg:gap-12 scroll-mt-24"
    >
      <div className="flex flex-col gap-6">
        <div className="space-y-2.5">
          <p className="inline-flex items-center gap-2 text-[#8A5A00] text-sm font-medium">
            <LandmarkIcon size={16} />
            For networks and programmes
          </p>
          <h3
            id="custom-name"
            className="font-bold text-2xl tracking-tight text-gray-800"
          >
            Custom
          </h3>
          <p className="text-sm font-medium text-grey-11 max-w-[460px]">
            For school groups, SUBEBs, state ministries and programmes
            certifying 300+ teachers or 5+ schools.
          </p>
        </div>
        <div>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight">
            Priced for your programme
          </p>
          <p className="text-xs font-medium text-grey-10 mt-1">
            Tell us how many teachers and schools, and we&apos;ll send a quote.
          </p>
        </div>
        <Button
          className="w-full sm:w-fit mt-auto bg-[#0F1B3D] border-[#0F1B3D] hover:bg-[#0F1B3D]/90"
          asChild
        >
          <a href={mailto("Custom plan quote")}>Contact us for a quote</a>
        </Button>
      </div>
      <div>
        <p className="text-sm font-semibold text-grey-11 mb-3">
          Everything in School Pro, plus
        </p>
        <ul className="space-y-3">
          {CUSTOM_INCLUDED.map((item) => (
            <CheckItem key={item.text} color="#8A5A00" {...item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function FreeDemo() {
  return (
    <div
      id="demo"
      aria-labelledby="demo-heading"
      className="rounded-2xl border border-dashed border-[#B9C8EA] bg-[#FBFCFF] p-5 md:p-8 grid lg:grid-cols-[1.5fr_1fr_auto] gap-6 lg:gap-8 lg:items-center scroll-mt-24"
    >
      <div className="space-y-2">
        <p className="inline-flex items-center gap-2 text-primary text-sm font-medium">
          <EyeIcon size={16} />
          Free school demo
        </p>
        <h3
          id="demo-heading"
          className="font-semibold text-xl tracking-tight text-gray-800"
        >
          See the school dashboard before you pay.
        </h3>
        <Typography.P weight="medium" fontColor="medium">
          Invite a few teachers and watch their progress come in. They can take
          Unit 1; buy seats to unlock the rest of the pathway and their
          certificates. Their progress carries over when you buy.
        </Typography.P>
      </div>
      <ul className="flex flex-wrap gap-2" aria-label="Demo limits">
        {DEMO_LIMITS.map((limit) => (
          <li
            key={limit}
            className="rounded-full bg-[#EBEFF9] px-3 py-1.5 text-xs font-semibold text-[#0a2a6b]"
          >
            {limit}
          </li>
        ))}
      </ul>
      <Button variant="outline" asChild>
        <Link href="/school/billing">Start a free demo</Link>
      </Button>
    </div>
  );
}

function CheckItem({
  text,
  note,
  color = "#0043be",
}: {
  text: string;
  note?: string;
  color?: string;
}) {
  return (
    <li className="flex items-start gap-2.5 text-sm font-medium text-grey-12">
      <CheckIcon size={16} color={color} className="shrink-0 mt-0.5" />
      <span>
        {text}
        {note && (
          <small className="block text-xs text-grey-10 mt-0.5">{note}</small>
        )}
      </span>
    </li>
  );
}
