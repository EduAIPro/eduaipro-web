import { cn } from "@/lib/utils";
import {
  TableTicket,
  TicketResolutionStatus,
} from "@/utils/validation/admin/support";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const TicketsListColumnsDef: ColumnDef<TableTicket>[] = [
  {
    accessorKey: "ticketId",
    header: "Ticket ID",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-semibold capitalize">
          {row.original.code}
        </p>
      );
    },
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-semibold">
          {row.original.message}
        </p>
      );
    },
  },

  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-semibold">
          {row.original?.name}
        </p>
      );
    },
  },
  {
    accessorKey: "Status",
    header: "Status",
    cell: ({ row }) => {
      const isResolved =
        row.original.resolutionStatus === TicketResolutionStatus.RESOLVED;
      return (
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "size-2 rounded-full",
              isResolved ? "bg-success-600" : "bg-grey-500/70"
            )}
          ></div>
          <p
            className={cn(
              "truncate text-sm font-medium capitalize",
              isResolved ? "text-success-600" : "text-grey-500"
            )}
          >
            {row.original.resolutionStatus}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "requestDate",
    header: "Request date",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-medium">
          {format(new Date(row.original.createdAt.split("T")[0]), "dd/MM/yyyy")}
        </p>
      );
    },
  },
];
