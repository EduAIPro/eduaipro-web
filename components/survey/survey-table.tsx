"use client";

import { useState } from "react";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { Survey } from "@/app/types/survey";

import SharedHeaderWithCheckbox from "@/components/shared-components/shared-table-header";
import TableRowItem, {
  TableColumn,
} from "@/components/shared-components/shared-table-rows";
import SharedPagination from "@/components/shared-components/shared-pagination";
import { Eye, SquarePen, Trash2 } from "lucide-react";

interface SurveyTableProps {
  surveys?: Survey[];
}


const surveyActions = [
   {
    label: "View",
    onClick: (survey: Survey) => {
      console.log("View survey:", survey);
    },
    icon: <span><Eye size={16} /></span>,
  },
  {
    label: "Edit",
    onClick: (survey: Survey) => {
      console.log("Edit survey:", survey);
    },
    icon: <span><SquarePen size={16} /></span>,
  },
  {
    label: "Delete",
    onClick: (survey: Survey) => {
      console.log("Delete survey:", survey);
    },
    icon: <span><Trash2 size={16} /></span>,
    danger: true, 
  },
];

export default function SurveyTable({ surveys = [] }: SurveyTableProps) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(surveys.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedSurveys = surveys.slice(startIndex, startIndex + rowsPerPage);

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    const currentPageTeachers = paginatedSurveys.map((t) => t.id);
    if (currentPageTeachers.every((id) => selectedRows.includes(id))) {
      setSelectedRows((prev) =>
        prev.filter((id) => !currentPageTeachers.includes(id))
      );
    } else {
      setSelectedRows((prev) =>
        Array.from(new Set([...prev, ...currentPageTeachers]))
      );
    }
  };

  const columns: (keyof Survey | TableColumn<Survey>)[] = [
    "name",
    "targetAudience",
    "dateCreated",
    {
      key: "totalResponse",
      render: (t: Survey) => t.totalResponse.toLocaleString(),
    },

    {
      key: "status",
      render: (t: Survey) => (
        <span className="flex items-center gap-[10px]">
          <span
            className={`h-[6px] w-[6px] rounded-full ${
              t.status === "Active" ? "bg-green-500" : "bg-yellow-500"
            }`}></span>
          {t.status || "-"}
        </span>
      ),
    },
  ];

  const colSpan = columns.length + 1;

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-[10px] border border-gray-200">
        <Table className="min-w-full">
          <TableHeader>
            <SharedHeaderWithCheckbox
              data={paginatedSurveys}
              selectedRows={selectedRows}
              toggleAll={toggleAll}
              columns={[
                "Name",
                "Target Audience",
                "Date Created",
                "Total Response",
                "Status",
                "Action",
              ]}
            />
          </TableHeader>

          <TableBody>
            {paginatedSurveys.length === 0
              ? null
              : paginatedSurveys.map((survey) => (
                  <TableRowItem<Survey, number>
                    key={survey.id}
                    item={survey}
                    idKey="id"
                    selectedRows={selectedRows}
                    toggleRow={toggleRow}
                    columns={columns}
                    actions={surveyActions}
                  />
                ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <SharedPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
