"use client";
import { getAllPlans } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import { pricingData } from "@/components/common/data";
import Pill from "@/components/common/ui/Pill";
import Typography from "@/components/common/ui/Typography";
import { EmptyState } from "@/components/empty";
import CallToAction from "@/components/landing-page/CallToAction";
import Footer from "@/components/navigation/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { formatMoney } from "@/lib/utils";
import { BillingPlan } from "@/types/billing";
import { generateKey } from "@/utils/key";
import { Button } from "@radix-ui/themes";
import { CheckIcon, GraduationCapIcon, School2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { BsPatchCheckFill } from "react-icons/bs";
import useSWR from "swr";

export default function PricingPageClient() {
  const router = useRouter();
  const { data, isLoading } = useSWR<BillingPlan[]>(
    getAllPlans,
    generalFetcher,
  );

  return (
    <>
      <section className="max-w-full max-lg:px-5 pt-28 sm:pt-40 lg:max-w-[70%] xl:max-w-[60%] mx-auto flex flex-col gap-7 md:gap-14 animate-fade-in-up">
        <div className="text-center md:max-w-[50%] mx-auto flex flex-col gap-3">
          {/* <Pill text="Packages" pillBg="#F1F5FF" /> */}
          <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
            Pricing for teachers and schools
          </h1>
          <Typography.P weight="medium" fontColor="medium">
            Every plan includes certificates. Teachers can buy their own plan,
            and schools buy a seat for each teacher they assign.
          </Typography.P>
        </div>
        <ul className="grid md:grid-cols-3 gap-4 divide-x w-full border rounded-lg">
          {isLoading ? (
            new Array(3).fill("").map((_, i) => <PlanColumnSkeleton key={i} />)
          ) : data ? (
            data.map((plan, i) => {
              const payer = plan.details?.payer.toLowerCase().includes("school")
                ? "your school"
                : "you";

              const Icon = payer === "you" ? GraduationCapIcon : School2Icon;
              const interval =
                payer === "you"
                  ? "every two years"
                  : "per seat, every two years";

              const pathways =
                plan.details.pathways === "ALL"
                  ? "Every pathway"
                  : "One pathway";
              return (
                <li
                  key={i}
                  className="px-6 py-8 space-y-6 flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2">
                        <Icon size={16} color="#0043be" />
                        <p className="text-primary text-sm font-medium">
                          Paid by {payer}
                        </p>
                      </div>
                      <h2 className="font-bold text-xl tracking-tight text-gray-800">
                        {plan.name}
                      </h2>
                      <p className="font-medium text-sm text-grey-11">
                        {plan.details.description}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-3xl font-semibold">
                        {formatMoney(
                          plan.current.amountKobo / 100,
                          plan.current.currency,
                        )}
                      </h2>
                      <p className="text-grey-10 text-xs font-medium">
                        {interval}
                      </p>
                    </div>
                    <div className="border-y divide-y">
                      <div className="flex items-center justify-between py-2">
                        <p className="text-grey-10 text-sm font-medium">
                          Pathways
                        </p>
                        <p className="text-grey-12 text-sm font-medium">
                          {pathways}
                        </p>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <p className="text-grey-10 text-sm font-medium">
                          Enrollments
                        </p>
                        <p className="text-grey-12 text-sm font-medium">
                          Up to {plan.details.maxEnrollments}
                        </p>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <p className="text-grey-10 text-sm font-medium">Term</p>
                        <p className="text-grey-12 text-sm font-medium">
                          up to {plan.details.termMonths} months
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {plan.details.includes.map((feature, i) => (
                        <li
                          key={i + feature.slice(0, 2)}
                          className="flex items-start gap-2"
                        >
                          <div className="shrink-0">
                            <CheckIcon size={16} color="#0043be" />
                          </div>
                          <p className="text-sm font-medium text-grey-11">
                            {feature}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => {
                      if (payer === "you") {
                        router.push("/dashboard/profile");
                      } else {
                        router.push("/school/settings?tab=billing");
                      }
                    }}
                  >
                    Get {payer === "you" ? "started" : "seats"}
                  </Button>
                </li>
              );
            })
          ) : (
            <EmptyState description="We couldn't load the data you're looking for. Please try again later" />
          )}
        </ul>
      </section>
      <CallToAction />
      <Footer />
    </>
  );
}

// window.open("mailto:support@eduaipro.ng", "_blank");
function PlanColumnSkeleton() {
  return (
    <div className="flex flex-col bg-white p-7 sm:p-8">
      {/* payer label */}
      <Skeleton className="h-4 w-32" />

      {/* name + description */}
      <Skeleton className="mt-4 h-7 w-40" />
      <div className="mt-2 min-h-[3rem] space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      {/* price */}
      <Skeleton className="mt-6 h-12 w-44" />
      <Skeleton className="mt-2 h-4 w-28" />

      {/* pathways / enrollments / term rows */}
      <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="flex justify-between py-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>

      {/* includes */}
      <div className="mt-6 flex-1 space-y-3">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="mt-1 h-4 w-4 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>

      {/* button */}
      <Skeleton className="mt-8 h-11 w-full rounded-lg" />
    </div>
  );
}
