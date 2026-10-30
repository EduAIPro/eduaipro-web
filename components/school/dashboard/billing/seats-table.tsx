"use client";

import { releaseSchoolSeatKey } from "@/api/keys";
import { releaseSchoolSeat } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SimpleTooltip } from "@/components/ui/simple-tooltip";
import useSchoolPathways from "@/hooks/use-school-pathways";
import { schoolBillingMessage } from "@/lib/school-billing-errors";
import { invalidateSeatsAndRoster } from "@/lib/school-invalidate";
import { cn } from "@/lib/utils";
import { Seat, SeatState } from "@/types/school/billing";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { ConfirmDialog } from "./confirm-dialog";

const STATE_STYLE: Record<SeatState, string> = {
  AVAILABLE: "bg-green-100 text-green-700",
  ASSIGNED: "bg-blue-100 text-[#1A56DB]",
  CONSUMED: "bg-grey-3 text-grey-500",
};

type SeatsTableProps = {
  seats: Seat[];
  onAssign: (seat: Seat) => void;
};

export const SeatsTable = ({ seats, onAssign }: SeatsTableProps) => {
  const [releasing, setReleasing] = useState<Seat | null>(null);
  const { nameOf } = useSchoolPathways();
  const { trigger, isMutating } = useSWRMutation(
    releaseSchoolSeatKey,
    releaseSchoolSeat,
  );

  const onRelease = async () => {
    if (!releasing) return;
    try {
      await trigger({ seatId: releasing.id });
      toast.success("Seat released");
      invalidateSeatsAndRoster(0);
      setReleasing(null);
    } catch (error) {
      toast.error(schoolBillingMessage(error));
      setReleasing(null);
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="border-b p-4">
        <h3 className="text-sm font-bold text-grey-800">Seats</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-grey-3 text-xs text-grey-500">
            <tr>
              {["Tier", "Pathway", "Assigned to", "Term ends", "State", ""].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left font-semibold whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {seats.length ? (
              seats.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="px-4 py-2.5 font-medium">
                    {s.tier === "BASIC" ? "Basic" : "Pro"}
                  </td>
                  <td className="px-4 py-2.5 text-grey-500">
                    {s.tier === "BASIC" ? (nameOf(s.courseId) ?? "—") : "All pathways"}
                  </td>
                  <td className="px-4 py-2.5">
                    {s.staff ? (
                      <>
                        <p className="font-medium text-grey-800">{s.staff.name}</p>
                        <p className="text-xs text-grey-500">{s.staff.email}</p>
                      </>
                    ) : (
                      <span className="text-grey-500">—</span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap text-grey-500">
                    {format(new Date(s.termEndsAt), "dd MMM yyyy")}
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold capitalize",
                        STATE_STYLE[s.state],
                      )}
                    >
                      {s.state.toLowerCase()}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    {s.state === "AVAILABLE" ? (
                      <Button size="sm" onClick={() => onAssign(s)}>
                        Assign
                      </Button>
                    ) : s.state === "ASSIGNED" ? (
                      <Button variant="outline" size="sm" onClick={() => setReleasing(s)}>
                        Release
                      </Button>
                    ) : (
                      <SimpleTooltip content="Locked until the term ends because this teacher earned a certificate">
                        <span className="text-xs text-grey-500">Locked</span>
                      </SimpleTooltip>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-6 text-center text-xs text-grey-500">
                  No seats yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ConfirmDialog
        open={!!releasing}
        onOpenChange={(v) => !v && setReleasing(null)}
        title="Release this seat?"
        description={`${releasing?.staff?.name ?? "This teacher"} will lose this seat and it returns to your available pool.`}
        confirmLabel="Release seat"
        destructive
        loading={isMutating}
        onConfirm={onRelease}
      />
    </Card>
  );
};
