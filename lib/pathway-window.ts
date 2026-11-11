import { Enrollment } from "@/types/enrollment";
import { Subscription } from "@/types/billing";
import { addMonths, differenceInCalendarDays, format } from "date-fns";

export type WindowTone = "neutral" | "info" | "warn" | "locked";

export type WindowInfo = {
  tone: WindowTone;
  label: string;
  detail: string;
  /** the pathway’s content is closed */
  closed: boolean;
  /** a paid plan would reopen it */
  cta: "upgrade" | "renew" | null;
};

/** Free teachers have 6 months after finishing to claim a certificate. */
export const CLAIM_MONTHS = 6;

export const claimDeadline = (completedAt: string | null) =>
  completedAt ? addMonths(new Date(completedAt), CLAIM_MONTHS) : null;

/**
 * What a pathway card should say about its 6-month window. The server job
 * runs hourly, so a deadline in the past is “closing”, not yet closed; the
 * 402 from the content routes is the real signal.
 */
export const windowInfo = (
  enrollment: Enrollment,
  plan: Pick<Subscription, "plan" | "endsAt"> | null,
): WindowInfo | null => {
  if (enrollment.status.toLowerCase() === "completed") return null;
  const isPro = plan?.plan === "PRO";

  switch (enrollment.window) {
    case "EXPIRED":
      return {
        tone: "locked",
        label: "Closed",
        detail:
          "Your 6 months ended. Your progress is saved; upgrade to pick up where you left off.",
        closed: true,
        cta: "upgrade",
      };
    case "LOCKED":
      return {
        tone: "locked",
        label: "Closed",
        detail:
          "This pathway has closed. Renew your plan to reopen it. Your progress is saved.",
        closed: true,
        cta: "renew",
      };
    case "EXTENDED": {
      const left = enrollment.deadlineAt
        ? differenceInCalendarDays(new Date(enrollment.deadlineAt), new Date())
        : null;
      return {
        tone: left !== null && left < 30 ? "warn" : "info",
        label: left !== null && left < 30 ? "Last chance" : "Extended",
        detail: `Extended to ${enrollment.deadlineAt ? format(enrollment.deadlineAt, "do MMM, yyyy") : "-"}`,
        closed: false,
        cta: null,
      };
    }
    case "OPEN":
    default: {
      if (!enrollment.clockStartedAt) {
        return {
          tone: "neutral",
          label: "Not started",
          detail: "Your 6 months start when you open the first unit.",
          closed: false,
          cta: null,
        };
      }
      const deadline = enrollment.deadlineAt
        ? format(enrollment.deadlineAt, "do MMM, yyyy")
        : "";
      const left = enrollment.deadlineAt
        ? differenceInCalendarDays(new Date(enrollment.deadlineAt), new Date())
        : null;
      const closing = left !== null && left <= 30;
      return {
        tone: closing ? "warn" : "info",
        label: closing ? "Closing soon" : "In window",
        detail:
          isPro && plan?.endsAt
            ? `Finish by ${deadline} to be certified until ${format(plan.endsAt, "do MMM, yyyy")}`
            : `Finish by ${deadline}`,
        closed: false,
        cta: null,
      };
    }
  }
};

export const TONE_STYLE: Record<WindowTone, { color: string; bg: string }> = {
  neutral: { color: "#6B7280", bg: "#F3F4F6" },
  info: { color: "#1A56DB", bg: "#EFF6FF" },
  warn: { color: "#B45309", bg: "#FEF3C7" },
  locked: { color: "#B91C1C", bg: "#FEE2E2" },
};
