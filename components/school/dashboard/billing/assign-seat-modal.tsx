"use client";

import { assignSchoolSeatKey } from "@/api/keys";
import { assignSchoolSeat } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { schoolBillingMessage } from "@/lib/school-billing-errors";
import { invalidateSeatsAndRoster } from "@/lib/school-invalidate";
import { RosterStaff, staffName } from "@/lib/school-roster";
import { Seat } from "@/types/school/billing";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

type AssignSeatModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  seat: Seat | null;
  staff: RosterStaff[];
  staffId?: string | null;
};

export const AssignSeatModal = ({
  open,
  onOpenChange,
  seat,
  staff,
  staffId,
}: AssignSeatModalProps) => {
  const [selectedStaff, setSelectedStaff] = useState<string>("");

  const { trigger, isMutating } = useSWRMutation(
    assignSchoolSeatKey,
    assignSchoolSeat,
  );

  useEffect(() => {
    if (!open) return;
    setSelectedStaff(staffId ?? "");
  }, [open, staffId]);

  const canSubmit = !!seat && !!selectedStaff && !isMutating;

  const onSubmit = async () => {
    if (!seat || !selectedStaff) return;
    try {
      const res = await trigger({ seatId: seat.id, staffId: selectedStaff });
      toast.success(
        res.certificatesQueued > 0
          ? `Seat assigned. ${res.certificatesQueued} certificate(s) are being issued.`
          : "Seat assigned.",
      );
      invalidateSeatsAndRoster();
      onOpenChange(false);
    } catch (error) {
      toast.error(schoolBillingMessage(error));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Assign seat</DialogTitle>
          <DialogDescription>
            A seat covers all five pathways and includes certificates. The
            teacher chooses their own pathway, and any closed pathway reopens.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Teacher</Label>
            <Select value={selectedStaff} onValueChange={setSelectedStaff}>
              <SelectTrigger>
                <SelectValue placeholder="Select a teacher" />
              </SelectTrigger>
              <SelectContent>
                {staff.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {staffName(s)} · {s.user.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button disabled={!canSubmit} loading={isMutating} onClick={onSubmit}>
            Assign seat
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
