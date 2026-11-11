"use client";

import { BillingErrorGate } from "@/components/billing/billing-error-gate";
import { Button } from "@/components/ui/button";
import useSchoolAccess from "@/hooks/use-school-access";
import useSchoolDemo from "@/hooks/use-school-demo";
import { daysUntil } from "@/lib/billing-dates";
import { AlertTriangleIcon, EyeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { toast } from "sonner";

// The owner must always be able to pay, and to reach settings and support.
export const OPEN_PATHS = [
  "/school/billing",
  "/school/settings",
  "/school/support",
];

export const PAYWALL_HINT =
  "Choose your seats or start a free demo to open your dashboard";

/**
 * Schools are pay-first. An UNPAID school only sees the seat paywall; a school
 * on a demo or whose seats ended gets a banner explaining what it can do.
 */
export function SchoolAccessGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const path = usePathname();
  const { access } = useSchoolAccess();
  const { demo } = useSchoolDemo(access?.state === "DEMO");

  const unpaid = access?.state === "UNPAID";
  const open = OPEN_PATHS.some((p) => path.startsWith(p));

  useEffect(() => {
    if (unpaid && !open) {
      // say why the page changed, so it doesn’t feel like something broke
      toast.info(PAYWALL_HINT, { id: "school-paywall" });
      router.replace("/school/billing");
    }
  }, [unpaid, open, router]);

  // don’t flash gated pages while we redirect
  if (unpaid && !open) return null;

  const daysLeft = daysUntil(access?.demo?.endsAt ?? demo?.endsAt);

  return (
    <>
      {access?.state === "DEMO" ? (
        <div
          role="status"
          className="mb-5 flex flex-wrap items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 p-3.5 text-sm text-[#0a2a6b]"
        >
          <EyeIcon className="size-4 shrink-0" />
          <span className="flex-1">
            Free demo: {daysLeft !== null ? Math.max(daysLeft, 0) : "—"} day
            {daysLeft === 1 ? "" : "s"} left.{" "}
            {demo
              ? `${demo.invitesRemaining} of ${demo.maxInvites} teacher invites left.`
              : ""}{" "}
            Teachers can take Unit 1 only.
          </span>
          {path.startsWith("/school/billing") ? null : (
            <Button asChild size="sm">
              <Link href="/school/billing">Choose seats</Link>
            </Button>
          )}
        </div>
      ) : null}

      {access?.state === "READ_ONLY" ? (
        <div
          role="alert"
          className="mb-5 flex flex-wrap items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-sm text-amber-900"
        >
          <AlertTriangleIcon className="size-4 shrink-0" />
          <span className="flex-1">
            Your school’s seats or demo have ended, so the dashboard is
            read-only. Renew seats to make changes. Your teachers’ progress is
            kept.
          </span>
          {path.startsWith("/school/billing") ? null : (
            <Button asChild size="sm">
              <Link href="/school/billing">Renew seats</Link>
            </Button>
          )}
        </div>
      ) : null}

      {children}
      <BillingErrorGate audience="school" />
    </>
  );
}
