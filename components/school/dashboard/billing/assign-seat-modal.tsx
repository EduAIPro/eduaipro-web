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
import useSchoolPathways from "@/hooks/use-school-pathways";
import {
  isSchoolBillingError,
  schoolBillingMessage,
} from "@/lib/school-billing-errors";
import { invalidateSeatsAndRoster } from "@/lib/school-invalidate";
import {
  activeEnrollment,
  enrollmentsOf,
  RosterStaff,
  staffName,
} from "@/lib/school-roster";
import { Seat } from "@/types/school/billing";
import { useEffect, useMemo, useState } from "react";
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
  const [courseId, setCourseId] = useState<string>("");
  const [pathwayRequired, setPathwayRequired] = useState(false);
  const { pathways } = useSchoolPathways();

  const { trigger, isMutating } = useSWRMutation(
    assignSchoolSeatKey,
    assignSchoolSeat,
  );

  const teacher = staff.find((s) => s.id === selectedStaff);
  const isBasic = seat?.tier === "BASIC";

  // Pathway options: the full list when available, else the teacher's own.
  const options = useMemo(() => {
    if (pathways.length) return pathways;
    return enrollmentsOf(teacher ?? ({} as RosterStaff)).map((e) => ({
      id: e.course.id,
      title: e.course.title,
    }));
  }, [pathways, teacher]);

  useEffect(() => {
    if (!open) return;
    setSelectedStaff(staffId ?? "");
    setPathwayRequired(false);
  }, [open, staffId]);

  useEffect(() => {
    // default to the teacher's active pathway
    setCourseId(teacher ? (activeEnrollment(teacher)?.course.id ?? "") : "");
  }, [teacher]);

  const canSubmit =
    !!seat && !!selectedStaff && !isMutating && (!pathwayRequired || !!courseId);

  const onSubmit = async () => {
    if (!seat || !selectedStaff) return;
    try {
      const res = await trigger({
        seatId: seat.id,
        staffId: selectedStaff,
        ...(isBasic && courseId ? { courseId } : {}),
      });
      toast.success(
        `Seat assigned. ${res.certificatesQueued} certificate(s) are being issued.`,
      );
      invalidateSeatsAndRoster();
      onOpenChange(false);
    } catch (error) {
      if (isSchoolBillingError(error) && error.status === 400) {
        setPathwayRequired(true);
      }
      toast.error(schoolBillingMessage(error));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Assign seat</DialogTitle>
          <DialogDescription>
            {isBasic
              ? "A Basic seat covers one pathway and includes the certificate."
              : "A Pro seat covers all five pathways and includes certificates."}
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
          {isBasic ? (
            <div className="space-y-1.5">
              <Label>Pathway{pathwayRequired ? " (required)" : ""}</Label>
              <Select value={courseId} onValueChange={setCourseId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a pathway" />
                </SelectTrigger>
                <SelectContent>
                  {options.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : null}
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
