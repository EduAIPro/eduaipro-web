import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { SurveyStatusEum, TableSurvey } from "@/types/admin/surveys";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { EllipsisVerticalIcon } from "lucide-react";
import { ConfirmDeleteSurveyModal } from "../delete-survey-confirmation";

export const SurveysListColumnsDef: ColumnDef<TableSurvey>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-semibold capitalize">
          {row.original.title}
        </p>
      );
    },
  },
  {
    accessorKey: "targetAudience",
    header: "Target audience",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-semibold">
          {row.original?.visibility}
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
    accessorKey: "totalResponse",
    header: "Total response",
    cell: ({ row }) => {
      return (
        <p className="text-grey-500 truncate text-sm font-semibold">
          {row.original?._count.responses.toLocaleString()}
        </p>
      );
    },
  },
  {
    accessorKey: "Status",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.original.status === SurveyStatusEum.ACTIVE;
      return (
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "size-2 rounded-full",
              isActive ? "bg-success-600" : "bg-grey-500"
            )}
          ></div>
          <p className="text-grey-500 truncate text-sm font-medium capitalize">
            {row.original.status}
          </p>
        </div>
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
        {/* <Link href={`/admin/survey/edit/${id}`}>
          <Button
            variant="ghost"
            className="text-primary rounded-b-0 hover:scale-100 w-full justify-start"
          >
            <SquarePenIcon />
            <p>Edit</p>
          </Button>
        </Link> */}
        <ConfirmDeleteSurveyModal surveyId={id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
