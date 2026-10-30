import { cn } from "@/lib/utils";
import {
  activeEnrollment,
  certificatesOf,
  earliestExpiry,
  enrollmentsOf,
  PLAN_LABEL,
  planOf,
  RosterStaff,
  staffName,
} from "@/lib/school-roster";
import { Seat } from "@/types/school/billing";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { PathwayChips } from "../roster/pathway-chips";

const planStyle = {
  free: "text-grey-500 bg-grey-3",
  pro: "text-[#1A56DB] bg-blue-100",
  school: "text-purple-700 bg-purple-100",
};

export const getTeachersColumns = (
  seats: Seat[],
): ColumnDef<RosterStaff>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <p className="text-grey-800 truncate text-sm font-semibold">
        {staffName(row.original)}
      </p>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <p className="text-grey-500 truncate text-sm font-medium">
        {row.original.user.email}
      </p>
    ),
  },
  {
    accessorKey: "pathways",
    header: "Pathways",
    cell: ({ row }) => <PathwayChips enrollments={enrollmentsOf(row.original)} />,
  },
  {
    accessorKey: "activeProgress",
    header: "Active progress",
    cell: ({ row }) => {
      const active = activeEnrollment(row.original);
      if (!active) return <span className="text-grey-500">—</span>;
      return (
        <div className="flex min-w-32 flex-col gap-1">
          <div
            role="progressbar"
            aria-valuenow={active.progress}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-1.5 rounded-full bg-grey-4"
          >
            <div
              className="h-full rounded-full bg-[#1A56DB]"
              style={{ width: `${active.progress}%` }}
            />
          </div>
          <span className="text-[10.5px] text-grey-500">
            {active.progress}% · {active.course.title}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "certificates",
    header: "Certificates",
    cell: ({ row }) => {
      const count = certificatesOf(row.original).length;
      const expiry = earliestExpiry(row.original);
      return (
        <p className="text-grey-800 text-sm font-medium">
          {count}
          {expiry ? (
            <span className="text-[11px] text-grey-500">
              {" "}
              · exp {format(new Date(expiry), "dd MMM yyyy")}
            </span>
          ) : null}
        </p>
      );
    },
  },
  {
    accessorKey: "plan",
    header: "Plan",
    cell: ({ row }) => {
      const plan = planOf(row.original, seats);
      return (
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold",
            planStyle[plan],
          )}
        >
          {PLAN_LABEL[plan]}
        </span>
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
              value === "active" ? "bg-success-600" : "bg-[#FFA500]",
            )}
          ></div>
          <p className="font-medium text-sm capitalize">{value}</p>
        </div>
      );
    },
  },
];
