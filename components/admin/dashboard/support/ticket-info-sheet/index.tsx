import { ticketsKey } from "@/api/keys";
import { fetchWithSingleParam } from "@/api/queries";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { SupportTicket, TicketResolutionStatus } from "@/types/admin/support";
import { format } from "date-fns";
import { useMemo } from "react";
import useSWR from "swr";
import { UpdateTicketStatus } from "./update-status";

type Props = {
  id: string | null;
  open: boolean;
  toggleOpen: (v: boolean) => void;
};

export const TicketInfoSheet = ({ id, open, toggleOpen }: Props) => {
  const { data, isLoading } = useSWR<SupportTicket>(
    id ? [ticketsKey, id] : null,
    fetchWithSingleParam
  );

  const details = useMemo(
    () => [
      {
        title: "Ticket ID",
        value: data?.code ?? "...",
      },
      {
        title: "Category",
        value: data?.category ?? "...",
      },
      {
        title: "Status",
        value: data?.resolutionStatus ?? "...",
      },
      {
        title: "User",
        value: data?.user
          ? `${data?.user?.firstName ?? ""} ${data?.user?.lastName ?? ""}`
          : "...",
      },
      {
        title: "User email",
        value: data?.user?.email ?? "...",
      },
      {
        title: "Date created",
        value: data?.createdAt ? format(data?.createdAt, "dd/MM/yyyy") : "...",
      },
    ],
    [data]
  );
  console.log({ data, isLoading });
  return (
    <Sheet open={open} onOpenChange={toggleOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ticket details</SheetTitle>
        </SheetHeader>

        <div className="space-y-10">
          <div className="mt-6">
            <h3 className="font-semibold text-sm text-grey-650">
              Ticket summary
            </h3>
            <ul className="space-y-2 mt-4">
              {details?.map((d) => (
                <li key={d.title} className="flex items-center gap-10">
                  <h3 className="text-grey-650 font-medium text-sm w-32">
                    {d.title}:
                  </h3>
                  {isLoading ? (
                    <Skeleton className="h-3 rounded-md w-20" />
                  ) : (
                    <p className="text-grey-800 font-medium text-sm text-left">
                      {d.value}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {data?.resolutionStatus !== TicketResolutionStatus.RESOLVED ? (
            <UpdateTicketStatus
              code={data?.code}
              onSuccess={() => toggleOpen(false)}
            />
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
};
