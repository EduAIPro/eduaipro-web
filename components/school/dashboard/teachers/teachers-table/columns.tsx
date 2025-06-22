import { cn } from "@/lib/utils";
import { Teacher } from "@/types/school";
import { ColumnDef } from "@tanstack/react-table";
import { format, parse } from "date-fns";

export const TeachersListColumnsDef: ColumnDef<Teacher>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-semibold">
          {row.original.name}
        </p>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-semibold">
          {row.original.email}
        </p>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-semibold">
          {row.original.phoneNumber}
        </p>
      );
    },
  },
  {
    accessorKey: "level",
    header: "Teaching Level",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-semibold">
          {row.original.teachingLevel}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const value = row.original.isActive ? "active" : "inactive";
      return (
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "size-2 rounded-full",
              value === "active" ? "bg-[#008000]" : "bg-[#FFA500]"
            )}
          ></div>
          <p className="font-medium text-sm capitalize">{value}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Joined",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-semibold">
          {format(
            parse(row.original.createdAt, "dd-mm-yyyy", new Date()),
            "dd/MM/yyyy"
          )}
        </p>
      );
    },
  },
];
