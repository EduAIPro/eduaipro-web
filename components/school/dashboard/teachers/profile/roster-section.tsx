import { Button } from "@/components/ui/button";
import {
  enrollmentsOf,
  hasUncredentialed,
  PLAN_LABEL,
  planOf,
  RosterStaff,
} from "@/lib/school-roster";
import { Seat } from "@/types/school/billing";
import { format } from "date-fns";
import { LockIcon } from "lucide-react";
import { Chip } from "../roster/pathway-chips";

const fmt = (iso: string | null | undefined) =>
  iso ? format(new Date(iso), "dd MMM yyyy") : "—";

type RosterSectionProps = {
  staff: RosterStaff;
  seats: Seat[];
  onAssignSeat: (staff: RosterStaff) => void;
};

/** School-only enrolment record, shown inside the shared profile sheet. */
export const RosterSection = ({ staff, seats, onAssignSeat }: RosterSectionProps) => {
  const enrollments = enrollmentsOf(staff);
  const plan = planOf(staff, seats);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        {[
          ["Phone number", staff.user.phoneNumber],
          ["Date joined", fmt(staff.createdAt)],
          ["Plan", PLAN_LABEL[plan]],
          ["Status", staff.isActive ? "Active" : "Inactive"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-[10px] border bg-[#FAFBFC] p-3">
            <p className="text-[10.5px] text-grey-500">{k}</p>
            <p className="text-sm font-medium text-grey-800">{v}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h2 className="text-base font-medium text-grey-800">Enrolments</h2>
        <div className="overflow-x-auto rounded-[10px] border">
          <table className="w-full text-xs">
            <thead className="bg-grey-3 text-grey-500">
              <tr>
                {["Pathway", "Status", "Progress", "Started", "Completed", "Certificate", "Valid till"].map(
                  (h) => (
                    <th key={h} className="px-3 py-2 text-left font-semibold whitespace-nowrap">
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {enrollments.length ? (
                enrollments.map((e) => {
                  const done = e.status.toLowerCase() === "completed";
                  return (
                    <tr key={e.id} className="border-t">
                      <td className="px-3 py-2 font-semibold text-grey-800">{e.course.title}</td>
                      <td className="px-3 py-2">
                        <Chip kind={done ? "done" : "prog"}>
                          {done ? "Completed" : "In progress"}
                        </Chip>
                      </td>
                      <td className="px-3 py-2">{e.progress}%</td>
                      <td className="px-3 py-2 whitespace-nowrap">{fmt(e.startedAt)}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{fmt(e.completedAt)}</td>
                      <td className="px-3 py-2">
                        {e.certificate?.certificateId ?? (
                          <span className="text-grey-500">Not issued</span>
                        )}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {e.certificate ? fmt(e.certificate.expiresAt) : "—"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-grey-500">
                    No enrolments
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {hasUncredentialed(staff) && plan !== "school" ? (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3.5">
          <LockIcon className="mt-0.5 size-4 shrink-0 text-amber-700" />
          <div className="flex-1">
            <p className="text-xs font-semibold text-grey-800">
              Completed but not credentialed
            </p>
            <p className="text-[11.5px] leading-relaxed text-grey-500">
              This teacher finished a pathway without a certificate being
              issued. Assign a school seat to issue it.
            </p>
          </div>
          <Button size="sm" onClick={() => onAssignSeat(staff)}>
            Assign seat
          </Button>
        </div>
      ) : null}
    </div>
  );
};
