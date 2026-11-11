"use client";

import { format } from "date-fns";
import { adminExtendSchoolDemoKey } from "@/api/keys";
import { extendSchoolDemo } from "@/api/mutations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import useAdminDemos from "@/hooks/use-admin-demos";
import { cn } from "@/lib/utils";
import { AdminDemo, isAdminBillingError } from "@/types/admin/billing";
import { useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

const ALL = "all";
const MAX_DAYS = 180;

const STATUS_STYLE: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  EXPIRED: "bg-amber-100 text-amber-700",
  CONVERTED: "bg-blue-100 text-[#1A56DB]",
};

export const DemosTab = () => {
  const [status, setStatus] = useState(ALL);
  const { demos, isLoading, isError, refetch } = useAdminDemos(
    status === ALL ? "" : status,
  );
  const [extending, setExtending] = useState<AdminDemo | null>(null);
  const [days, setDays] = useState("14");
  const { trigger, isMutating } = useSWRMutation(
    adminExtendSchoolDemoKey,
    extendSchoolDemo,
  );

  const daysNum = Number(days);
  const daysOk =
    Number.isInteger(daysNum) && daysNum >= 1 && daysNum <= MAX_DAYS;

  const onExtend = async () => {
    if (!extending || !daysOk) return;
    try {
      await trigger({ demoId: extending.id, days: daysNum });
      toast.success(
        `Demo extended by ${daysNum} day${daysNum === 1 ? "" : "s"}`,
      );
      refetch();
      setExtending(null);
    } catch (error) {
      toast.error(
        isAdminBillingError(error) ? error.message : "Couldn’t extend the demo",
      );
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
        <div>
          <h3 className="text-sm font-bold text-grey-800">School demos</h3>
          <p className="text-[11px] text-grey-500">
            Sorted by end date. Extending an ended demo reopens it from today.
          </p>
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger
            aria-label="Filter by status"
            className="w-40 bg-white"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All demos</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="EXPIRED">Expired</SelectItem>
            <SelectItem value="CONVERTED">Converted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <Skeleton className="m-4 h-32 rounded-xl" />
      ) : isError ? (
        <p className="p-8 text-center text-xs text-grey-500">
          Couldn’t load the demos.{" "}
          <button className="underline" onClick={refetch}>
            Retry
          </button>
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-grey-3 text-xs text-grey-500">
              <tr>
                {["School", "Contact", "Status", "Started", "Ends", ""].map(
                  (h) => (
                    <th
                      key={h}
                      className="whitespace-nowrap px-4 py-2.5 text-left font-semibold"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {demos.length ? (
                demos.map((d) => (
                  <tr key={d.id} className="border-t">
                    <td className="px-4 py-2.5 font-medium text-grey-800">
                      {d.school.institutionName}
                    </td>
                    <td className="px-4 py-2.5 text-grey-500">
                      {d.school.contactEmail}
                    </td>
                    <td className="px-4 py-2.5">
                      <Badge
                        className={cn(
                          "border-transparent capitalize",
                          STATUS_STYLE[d.status] ?? "bg-grey-3 text-grey-500",
                        )}
                      >
                        {d.status.toLowerCase()}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-grey-500">
                      {format(new Date(d.startedAt), "do MMM, yyyy")}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-grey-500">
                      {format(new Date(d.endsAt), "do MMM, yyyy")}
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      {d.status === "CONVERTED" ? (
                        <span className="text-xs text-grey-500">
                          Bought seats
                        </span>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setDays("14");
                            setExtending(d);
                          }}
                        >
                          Extend
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center text-xs text-grey-500"
                  >
                    No demos match.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={!!extending} onOpenChange={(v) => !v && setExtending(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Extend demo</DialogTitle>
            <DialogDescription>
              {extending
                ? `${extending.school.institutionName}'s demo ${extending.status === "ACTIVE" ? `ends ${format(new Date(extending.endsAt), "do MMM, yyyy")}` : "has ended"}. Add days to give them longer.`
                : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-1.5">
            <Label htmlFor="extend-days">Days to add (1–{MAX_DAYS})</Label>
            <Input
              id="extend-days"
              type="number"
              min={1}
              max={MAX_DAYS}
              value={days}
              onChange={(e) => setDays(e.target.value)}
              aria-invalid={!daysOk}
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => setExtending(null)}>
              Cancel
            </Button>
            <Button disabled={!daysOk} loading={isMutating} onClick={onExtend}>
              Extend demo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
