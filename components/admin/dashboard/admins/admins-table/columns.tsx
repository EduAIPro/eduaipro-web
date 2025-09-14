import { cn } from "@/lib/utils";
import { Staff } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const AdminsListColumnsDef: ColumnDef<Staff>[] = [
  {
    accessorKey: "adminName",
    header: "Name",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-semibold">
          {row.original.user?.firstName} {row.original.user?.lastName}
        </p>
      );
    },
  },
  {
    accessorKey: "adminEmail",
    header: "Email",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-semibold">
          {row.original?.user?.email}
        </p>
      );
    },
  },
  {
    accessorKey: "name",
    header: "School affiliation",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-medium">
          {row.original.school?.institutionName ?? "-"}
        </p>
      );
    },
  },
  {
    accessorKey: "totalTeacherCount",
    header: "Position",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-medium">
          {row.original.positionDescription}
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
              value === "active" ? "bg-success-600" : "bg-[#FFA500]"
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
        <p className="text-grey-500 truncate text-sm font-medium">
          {format(new Date(row.original.createdAt.split("T")[0]), "dd/MM/yyyy")}
        </p>
      );
    },
  },
];
