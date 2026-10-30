import { Enrollment } from "@/types/enrollment";
import { Seat } from "@/types/school/billing";
import { SchoolStaff } from "@/types/school/teachers";

export type RosterStaff = Omit<SchoolStaff, "school">;

export const staffName = (s: RosterStaff) =>
  `${s.user.firstName} ${s.user.lastName}`;

export const isCompleted = (e: Enrollment) =>
  e.status.toLowerCase() === "completed";

export const enrollmentsOf = (s: RosterStaff) => s.enrollments ?? [];

export const certificatesOf = (s: RosterStaff) =>
  enrollmentsOf(s).flatMap((e) =>
    e.certificate ? [{ enrollment: e, cert: e.certificate }] : [],
  );

/** Active enrolment only; never averaged across pathways. */
export const activeEnrollment = (s: RosterStaff) => {
  const list = enrollmentsOf(s);
  return list.find((e) => e.isActive) ?? list.find((e) => !isCompleted(e));
};

export const earliestExpiry = (s: RosterStaff) => {
  const dates = certificatesOf(s)
    .map((c) => c.cert.expiresAt)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  return dates[0] ?? null;
};

export const daysUntil = (iso: string, now = new Date()) =>
  Math.ceil((new Date(iso).getTime() - now.getTime()) / 86_400_000);

/** True when a pathway is complete but no certificate was issued. */
export const hasUncredentialed = (s: RosterStaff) =>
  enrollmentsOf(s).some((e) => isCompleted(e) && !e.certificate);

export const hasSchoolSeat = (s: RosterStaff, seats: Seat[] = []) => {
  if (s.seat) return s.seat.state === "ASSIGNED" || s.seat.state === "CONSUMED";
  const email = s.user.email.toLowerCase();
  return seats.some(
    (seat) =>
      (seat.state === "ASSIGNED" || seat.state === "CONSUMED") &&
      seat.staff?.email.toLowerCase() === email,
  );
};

export type PlanKind = "free" | "pro" | "school";

export const planOf = (s: RosterStaff, seats: Seat[] = []): PlanKind => {
  if (hasSchoolSeat(s, seats) || s.plan === "SCHOOL_SEAT") return "school";
  if (s.plan === "PRO") return "pro";
  return "free";
};

export const PLAN_LABEL: Record<PlanKind, string> = {
  free: "Free",
  pro: "EduAI Pro",
  school: "School seat",
};

export const rosterStats = (staff: RosterStaff[], now = new Date()) => {
  const enrolments = staff.reduce((n, s) => n + enrollmentsOf(s).length, 0);
  const multi = staff.filter((s) => enrollmentsOf(s).length > 1).length;
  const certs = staff.flatMap((s) =>
    certificatesOf(s).map((c) => ({ staff: s, ...c })),
  );
  const renewals = certs
    .filter((c) => daysUntil(c.cert.expiresAt, now) < 90)
    .sort(
      (a, b) =>
        new Date(a.cert.expiresAt).getTime() -
        new Date(b.cert.expiresAt).getTime(),
    );

  return {
    teachers: staff.length,
    enrolments,
    multi,
    certificates: certs.length,
    renewals,
  };
};

const csvCell = (v: string | number | null | undefined) => {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
};

/** One row per enrolment. */
export const buildRosterCsv = (staff: RosterStaff[]) => {
  const header = [
    "Teacher",
    "Email",
    "Pathway",
    "Status",
    "Progress %",
    "Certificate no.",
    "Valid till",
  ];
  const rows = staff.flatMap((s) =>
    enrollmentsOf(s).map((e) => [
      staffName(s),
      s.user.email,
      e.course.title,
      e.status,
      e.progress,
      e.certificate?.certificateId ?? "",
      e.certificate?.expiresAt ?? "",
    ]),
  );
  return [header, ...rows].map((r) => r.map(csvCell).join(",")).join("\n");
};

export const downloadCsv = (filename: string, content: string) => {
  const url = URL.createObjectURL(new Blob([content], { type: "text/csv" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
