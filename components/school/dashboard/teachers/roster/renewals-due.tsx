import { Card } from "@/components/ui/card";
import { daysUntil, rosterStats, staffName } from "@/lib/school-roster";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ClockIcon } from "lucide-react";

type Stats = ReturnType<typeof rosterStats>;

export const RenewalsDue = ({ renewals }: { renewals: Stats["renewals"] }) => (
  <Card className="overflow-hidden">
    <div className="flex items-center gap-3 border-b p-4">
      <div className="flex size-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
        <ClockIcon className="size-5" />
      </div>
      <div>
        <h3 className="text-sm font-bold text-grey-800">Renewals due</h3>
        <p className="text-[11px] text-grey-500">
          Listed per certificate, not per teacher. One teacher can hold several
          with different expiry dates.
        </p>
      </div>
    </div>
    {renewals.length ? (
      <ul>
        {renewals.map(({ staff, enrollment, cert }) => {
          const days = daysUntil(cert.expiresAt);
          return (
            <li
              key={cert.id}
              className="flex items-center gap-3 border-b px-4 py-3 last:border-b-0"
            >
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold whitespace-nowrap",
                  days < 30 ? "bg-red-100 text-red-700" : "bg-grey-3 text-grey-500",
                )}
              >
                {days < 0 ? "Expired" : `${days} days`}
              </span>
              <div className="flex-1 min-w-0">
                <p className="truncate text-[12.5px] font-semibold text-grey-800">
                  {staffName(staff)}
                </p>
                <p className="truncate text-[11px] text-grey-500">
                  {enrollment.course.title} · {cert.certificateId}
                </p>
              </div>
              <span className="whitespace-nowrap text-xs text-grey-500">
                Valid till {format(new Date(cert.expiresAt), "dd MMM yyyy")}
              </span>
            </li>
          );
        })}
      </ul>
    ) : (
      <p className="p-6 text-center text-xs text-grey-500">
        Nothing expiring in the next 90 days
      </p>
    )}
  </Card>
);
