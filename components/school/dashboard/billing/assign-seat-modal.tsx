"use client";

import { assignSchoolSeatKey, assignSchoolSeatsKey } from "@/api/keys";
import { assignSchoolSeat, assignSchoolSeats } from "@/api/mutations";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { schoolBillingMessage } from "@/lib/school-billing-errors";
import { useSchoolInvalidate } from "@/lib/school-invalidate";
import { hasSchoolSeat, RosterStaff, staffName } from "@/lib/school-roster";
import { Seat } from "@/types/school/billing";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { ConfirmDialog } from "./confirm-dialog";
import { TeacherSearchSelect } from "./teacher-search-select";

type AssignMode = "single" | "bulk";

type AssignSeatModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** the seat the owner picked; bulk assignment lets the server pick instead */
  seat: Seat | null;
  staff: RosterStaff[];
  staffId?: string | null;
  /** free seats, used to cap and warn before the call */
  available?: number;
  /** every seat, so teachers who already hold one can be greyed out */
  seats?: Seat[];
  /** offer the "several teachers" mode */
  allowBulk?: boolean;
  defaultMode?: AssignMode;
};

const seatWord = (n: number) => `${n} seat${n === 1 ? "" : "s"}`;

export const AssignSeatModal = ({
  open,
  onOpenChange,
  seat,
  staff,
  staffId,
  available,
  seats,
  allowBulk,
  defaultMode = "single",
}: AssignSeatModalProps) => {
  const [selectedStaff, setSelectedStaff] = useState<string>("");
  const [picked, setPicked] = useState<RosterStaff[]>([]);
  const [mode, setMode] = useState<AssignMode>(defaultMode);
  const [confirmMax, setConfirmMax] = useState(false);

  const { trigger, isMutating } = useSWRMutation(
    assignSchoolSeatKey,
    assignSchoolSeat,
  );
  const { trigger: triggerBulk, isMutating: isBulkMutating } = useSWRMutation(
    assignSchoolSeatsKey,
    assignSchoolSeats,
  );
  const { invalidateSeats, invalidateSeatsAndRoster } = useSchoolInvalidate();

  useEffect(() => {
    if (!open) return;
    setSelectedStaff(staffId ?? "");
    setPicked([]);
    setConfirmMax(false);
    setMode(staffId || !allowBulk ? "single" : defaultMode);
  }, [open, staffId, allowBulk, defaultMode]);

  const freeSeats = available ?? (seat ? 1 : 0);
  const overCapacity = picked.length > freeSeats;
  const busy = isMutating || isBulkMutating;

  const canSubmit =
    mode === "single"
      ? !!seat && !!selectedStaff && !busy
      : picked.length > 0 && !overCapacity && !busy;

  const finish = (count: number, certificatesQueued: number) => {
    toast.success(
      certificatesQueued > 0
        ? `${seatWord(count)} assigned. ${certificatesQueued} certificate(s) are being issued.`
        : `${seatWord(count)} assigned.`,
    );
    invalidateSeatsAndRoster();
    onOpenChange(false);
  };

  const onSubmitSingle = async () => {
    if (!seat || !selectedStaff) return;
    try {
      const res = await trigger({ seatId: seat.id, staffId: selectedStaff });
      finish(1, res.certificatesQueued);
    } catch (error) {
      toast.error(schoolBillingMessage(error));
    }
  };

  const onSubmitBulk = async (staffIds: string[] | "MAX") => {
    try {
      const res = await triggerBulk({ staffIds });
      setConfirmMax(false);
      if (!res.assigned.length) {
        toast.success("No seats were assigned.");
        invalidateSeatsAndRoster();
        onOpenChange(false);
        return;
      }
      finish(res.assigned.length, res.certificatesQueued);
    } catch (error) {
      setConfirmMax(false);
      // nothing was assigned; the free-seat count may have moved under us
      invalidateSeats();
      toast.error(schoolBillingMessage(error));
    }
  };

  const toggle = (s: RosterStaff) =>
    setPicked((list) =>
      list.some((p) => p.id === s.id)
        ? list.filter((p) => p.id !== s.id)
        : [...list, s],
    );

  const bulkPanel = (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <Label>Teachers</Label>
        <TeacherSearchSelect
          staff={staff}
          seats={seats}
          selectedIds={picked.map((p) => p.id)}
          onToggle={toggle}
          full={freeSeats === 0}
          disabled={busy}
        />
        <p className="text-[11px] text-grey-500">
          {freeSeats > 0
            ? `${seatWord(freeSeats)} free. We give them the first free seats.`
            : "No seats are free. Buy more seats to assign them."}
        </p>
      </div>

      {picked.length ? (
        <ul className="max-h-48 space-y-1.5 overflow-y-auto rounded-md border p-2">
          {picked.map((s) => (
            <li
              key={s.id}
              className="flex items-center gap-2 rounded-md bg-grey-2 px-2.5 py-2"
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-grey-800">
                  {staffName(s)}
                </span>
                <span className="block truncate text-xs text-grey-500">
                  {s.user.email}
                </span>
              </span>
              <button
                type="button"
                aria-label={`Remove ${staffName(s)}`}
                disabled={busy}
                onClick={() => toggle(s)}
                className="rounded-full p-1 text-grey-500 hover:bg-grey-3 hover:text-grey-800"
              >
                <XIcon className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-medium text-grey-800">
          {picked.length} selected
        </p>
        {freeSeats > 0 ? (
          <Button
            variant="outline"
            size="sm"
            disabled={busy}
            onClick={() => setConfirmMax(true)}
          >
            Assign all free seats
          </Button>
        ) : null}
      </div>

      {overCapacity ? (
        <p
          role="alert"
          className="rounded-md border border-amber-200 bg-amber-50 p-2.5 text-xs text-amber-800"
        >
          You picked {picked.length} teachers but only {seatWord(freeSeats)}{" "}
          {freeSeats === 1 ? "is" : "are"} free.
        </p>
      ) : null}
    </div>
  );

  const singlePanel = (
    <div className="space-y-1.5">
      <Label>Teacher</Label>
      <Select value={selectedStaff} onValueChange={setSelectedStaff}>
        <SelectTrigger>
          <SelectValue placeholder="Select a teacher" />
        </SelectTrigger>
        <SelectContent>
          {staff.map((s) => (
            <SelectItem
              key={s.id}
              value={s.id}
              disabled={s.id !== staffId && hasSchoolSeat(s, seats)}
            >
              {staffName(s)} · {s.user.email}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <>
      <Dialog open={open} onOpenChange={(v) => !busy && onOpenChange(v)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {mode === "bulk" ? "Assign seats" : "Assign seat"}
            </DialogTitle>
            <DialogDescription>
              A seat covers all five pathways and includes certificates. The
              teacher chooses their own pathway, and any closed pathway reopens.
            </DialogDescription>
          </DialogHeader>

          {allowBulk && !staffId ? (
            <Tabs
              value={mode}
              onValueChange={(v) => setMode(v as AssignMode)}
              className="space-y-4"
            >
              <TabsList className="mx-0 w-full">
                <TabsTrigger value="single" className="flex-1">
                  One teacher
                </TabsTrigger>
                <TabsTrigger value="bulk" className="flex-1">
                  Several teachers
                </TabsTrigger>
              </TabsList>
              <TabsContent value="single">{singlePanel}</TabsContent>
              <TabsContent value="bulk">{bulkPanel}</TabsContent>
            </Tabs>
          ) : (
            <div className="space-y-4">{singlePanel}</div>
          )}

          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              variant="outline"
              disabled={busy}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={!canSubmit}
              loading={busy}
              onClick={() =>
                mode === "single"
                  ? onSubmitSingle()
                  : onSubmitBulk(picked.map((p) => p.id))
              }
            >
              {mode === "bulk" && picked.length > 1
                ? `Assign ${seatWord(picked.length)}`
                : "Assign seat"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={confirmMax}
        onOpenChange={(v) => !v && setConfirmMax(false)}
        title="Assign all free seats?"
        description={`Up to ${seatWord(freeSeats)} go to teachers who don’t have one yet, A–Z by name. Teachers left over keep no seat.`}
        confirmLabel="Assign all"
        loading={isBulkMutating}
        onConfirm={() => onSubmitBulk("MAX")}
      />
    </>
  );
};
