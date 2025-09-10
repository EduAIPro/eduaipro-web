import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCourse } from "@/types/admin/courses";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { EllipsisVerticalIcon, SquarePenIcon } from "lucide-react";
import Link from "next/link";
import { ConfirmDeleteCourseModal } from "../delete-course-confirmation";

export const CoursesListColumnsDef: ColumnDef<TableCourse>[] = [
  {
    accessorKey: "adminName",
    header: "Course title",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-semibold">
          {row.original.title}
        </p>
      );
    },
  },
  {
    accessorKey: "adminEmail",
    header: "Enrolled teachers",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-semibold">
          {row.original?.certificateValidationDays} teachers
        </p>
      );
    },
  },
  {
    accessorKey: "teachersCompleted",
    header: "Teachers completed",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-semibold">
          {row.original?.certificateValidationDays} teachers
        </p>
      );
    },
  },
  {
    accessorKey: "completionRate",
    header: "Completion rate",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-medium">
          {row.original.id}
        </p>
      );
    },
  },
  {
    accessorKey: "accessPeriod",
    header: "Access period",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-medium">
          {row.original.certificateValidationDays}
        </p>
      );
    },
  },
  {
    accessorKey: "validityPeriod",
    header: "Validity period",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-medium">
          {row.original.certificateValidationDays}
        </p>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date created",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-medium">
          {format(new Date(row.original.createdAt.split("T")[0]), "dd/MM/yyyy")}
        </p>
      );
    },
  },
  {
    accessorKey: "",
    header: "Actions",
    cell: ({ row }) => {
      return <Actions id={row.original.id} />;
    },
  },
];

const Actions = ({ id }: { id: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVerticalIcon size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href={`/admin/courses/edit${id}`}>
          <Button>
            <SquarePenIcon />
            <p>Edit</p>
          </Button>
        </Link>
        <ConfirmDeleteCourseModal courseId={id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
