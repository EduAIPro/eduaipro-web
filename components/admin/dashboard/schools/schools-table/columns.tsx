import { cn } from "@/lib/utils";
import { SchoolList } from "@/types/admin/schools";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const SchoolsListColumnsDef: ColumnDef<SchoolList>[] = [
  {
    accessorKey: "name",
    header: "School name",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-medium">
          {row.original.institutionName}
        </p>
      );
    },
  },
  {
    accessorKey: "owner.name",
    header: "Admin Name",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-semibold">
          {row.original.owner?.user?.firstName}{" "}
          {row.original.owner?.user?.lastName}
        </p>
      );
    },
  },
  {
    accessorKey: "totalTeacherCount",
    header: "Teacher Count",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-medium">
          {row.original.totalTeacherCount} Teachers
        </p>
      );
    },
  },
  {
    accessorKey: "totalAccreditedTeacherCount",
    header: "Accredited Teachers",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-medium">
          {row.original.totalAccreditedTeacherCount} Teachers
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
