"use client";
import { Button } from "@/components/ui/button";
import useSubscriptionPlans from "@/hooks/use-subscription-plans";
import { cn, formatKobo } from "@/lib/utils";
import { GraduationCapIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Fact = { label: string; value: string; strong?: boolean; muted?: boolean };

const FREE_FACTS: Fact[] = [
  { label: "Pathways", value: "1" },
  { label: "Certificate", value: "Locked until you upgrade", muted: true },
  { label: "Certificate valid", value: "—", muted: true },
  { label: "Time to finish", value: "6 months" },
  { label: "Refresher", value: "—", muted: true },
];

const PRO_FACTS: Fact[] = [
  { label: "Pathways", value: "All 5", strong: true },
  { label: "Certificate", value: "Issued automatically", strong: true },
  { label: "Certificate valid", value: "Until your plan ends" },
  { label: "Time to finish", value: "6 months + one extension" },
  { label: "Refresher", value: "Included while your plan is active" },
];

export default function TeacherPlans() {
  const router = useRouter();
  const { personalPro } = useSubscriptionPlans();
  const price = personalPro?.current ?? null;
  const termMonths = personalPro?.details?.termMonths ?? 24;

  return (
    <section
      id="teachers"
      aria-labelledby="teachers-heading"
      className="flex flex-col gap-6 scroll-mt-24"
    >
      <div className="text-center space-y-2 md:max-w-[70%] mx-auto">
        <p className="inline-flex items-center gap-2 text-primary text-sm font-medium">
          <GraduationCapIcon size={16} />
          For teachers, mentors and teaching assistants
        </p>
        <h2
          id="teachers-heading"
          className="font-semibold text-xl md:text-2xl lg:text-3xl tracking-tight"
        >
          Earn your accredited certificate.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Free */}
        <div
          role="group"
          aria-labelledby="free-name"
          className="rounded-2xl border border-grey-4 bg-grey-2 p-5 md:p-8 flex flex-col gap-6"
        >
          <div className="space-y-2.5">
            <p className="text-grey-11 text-sm font-medium">
              No payment needed
            </p>
            <h3
              id="free-name"
              className="font-bold text-2xl tracking-tight text-gray-800"
            >
              Free
            </h3>
            <p className="text-sm font-medium text-grey-11 max-w-[420px]">
              Start one pathway at no cost. Upgrade any time to unlock your
              certificate.
            </p>
          </div>
          <PriceBlock amount="₦0" unit="forever" note="No card required" />
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/register?type=teacher")}
          >
            Start learning free
          </Button>
          <Facts facts={FREE_FACTS} />
          <p className="mt-auto text-sm font-medium text-grey-11">
            If time runs out, your progress is saved. Upgrade to pick up where
            you left off.
          </p>
        </div>

        {/* Personal Pro */}
        <div
          role="group"
          aria-labelledby="pro-name"
          className="relative rounded-2xl border border-primary-150 bg-gradient-to-b from-accent-100 to-primary-100 p-5 md:p-8 flex flex-col gap-6"
        >
          <span className="absolute top-5 right-5 md:top-7 md:right-7 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white">
            Best for teachers
          </span>
          <div className="space-y-2.5">
            <p className="inline-flex items-center gap-2 text-primary text-sm font-medium">
              <GraduationCapIcon size={16} />
              Paid by you
            </p>
            <h3
              id="pro-name"
              className="font-bold text-2xl tracking-tight text-gray-800"
            >
              Personal Pro
            </h3>
            <p className="text-sm font-medium text-grey-11 max-w-[420px]">
              Accredited certificates, and the freedom to train across every
              pathway.
            </p>
          </div>
          <PriceBlock
            amount={price ? formatKobo(price.amountKobo, price.currency) : "—"}
            unit={`for ${termMonths / 12} years`}
            note={
              <>
                {price ? (
                  <>
                    About{" "}
                    <b className="text-grey-11">
                      {formatKobo(
                        Math.round(price.amountKobo / termMonths),
                        price.currency,
                      )}{" "}
                      a month
                    </b>{" "}
                    ·{" "}
                  </>
                ) : null}
                paid once · card or bank transfer · nothing renews by itself
              </>
            }
          />
          <Button
            className="w-full"
            disabled={!price}
            onClick={() => router.push("/dashboard/profile")}
          >
            Get Personal Pro
          </Button>
          <Facts facts={PRO_FACTS} tone="blue" />
          <p className="mt-auto text-sm font-medium text-grey-11">
            Primary · Secondary · Higher Education · Teaching Assistants ·
            Mentors.{" "}
            <Link
              href="#sooner"
              className="font-semibold text-primary whitespace-nowrap"
            >
              Finish sooner, stay certified longer →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

function PriceBlock({
  amount,
  unit,
  note,
}: {
  amount: string;
  unit: string;
  note: React.ReactNode;
}) {
  return (
    <div>
      <p className="flex items-baseline gap-2">
        <span className="text-4xl font-semibold tracking-tight">{amount}</span>
        <span className="text-sm font-medium text-grey-11">{unit}</span>
      </p>
      <p className="text-xs font-medium text-grey-10 mt-1">{note}</p>
    </div>
  );
}

function Facts({
  facts,
  tone = "grey",
}: {
  facts: Fact[];
  tone?: "grey" | "blue";
}) {
  return (
    <dl
      className={cn(
        "border-t divide-y",
        tone === "blue"
          ? "border-primary-150 divide-primary-150"
          : "border-grey-4 divide-grey-4",
      )}
    >
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="flex items-center justify-between gap-4 py-2.5 text-sm font-medium md:min-h-[60px]"
        >
          <dt className="shrink-0 text-grey-10">{fact.label}</dt>
          <dd
            className={cn(
              "text-right",
              fact.muted ? "text-grey-10" : "text-grey-12",
              fact.strong && "font-semibold text-primary",
            )}
          >
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
