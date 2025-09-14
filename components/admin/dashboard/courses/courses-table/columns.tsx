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
          {row.original?.totalEnrolledTeachers} teachers
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
          {row.original?.totalTeachersCompleted} teachers
        </p>
      );
    },
  },
  // {
  //   accessorKey: "completionRate",
  //   header: "Completion rate",
  //   cell: ({ row }) => {
  //     return (
  //       <p className="text-grey-500 truncate text-sm font-medium">
  //         {row.original.id}
  //       </p>
  //     );
  //   },
  // },
  {
    accessorKey: "validityPeriod",
    header: "Validity period",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-medium">
          {row.original.certificateValidationDays} days
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
      <DropdownMenuContent className="flex flex-col min-w-40 p-0 rounded-xl">
        <Link href={`/admin/courses/edit${id}`}>
          <Button
            variant="ghost"
            className="text-primary rounded-b-0 hover:scale-100 w-full justify-start"
          >
            <SquarePenIcon />
            <p>Edit</p>
          </Button>
        </Link>
        <ConfirmDeleteCourseModal courseId={id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
