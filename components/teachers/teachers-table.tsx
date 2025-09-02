"use client";

import { useState } from "react";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { Teacher } from "@/app/types/teacher";

import SharedHeaderWithCheckbox from "@/components/shared-components/shared-table-header";
import TableRowItem, { TableColumn } from "@/components/shared-components/shared-table-rows";
import TableEmpty from "@/components/shared-components/shared-empty-table";
import SharedPagination from "@/components/shared-components/shared-pagination";
import { Eye, SquarePen, Trash2 } from "lucide-react";


interface TeachersTableProps {
  teachers: Teacher[];
}

const teachersActions = [
   {
    label: "View",
    onClick: (teacher: Teacher) => {
      console.log("View course:", teacher);
    },
    icon: <span><Eye size={16} /></span>,
  },
  {
    label: "Edit",
    onClick: (teacher: Teacher) => {
      console.log("Edit teacher:", teacher);
    },
    icon: <span><SquarePen size={16} /></span>,
  },
  {
    label: "Delete",
    onClick: (teacher: Teacher) => {
      console.log("Delete course:", teacher);
    },
    icon: <span><Trash2 size={16} /></span>,
    danger: true, 
  },
];

export default function TeachersTable({ teachers }: TeachersTableProps) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(teachers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedTeachers = teachers.slice(startIndex, startIndex + rowsPerPage);


  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    const currentPageTeachers = paginatedTeachers.map((t) => t.id);
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

 const columns: (keyof Teacher | TableColumn<Teacher>)[] = [
  "name",
  "email",
  "phone",
  "school",
  "teachingLevel",
  {
    key: "status",
    render: (t: Teacher) => (
      <span className="flex items-center gap-[10px]">
        <span
          className={`h-[6px] w-[6px] rounded-full ${
            t.status === "Active" ? "bg-green-500" : "bg-yellow-500"
          }`}
        ></span>
        {t.status || "-"}
      </span>
    ),
  },
  "dateJoined",
];


  const colSpan = columns.length + 1;

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-[10px] border border-gray-200">
        <Table className="min-w-full">
          <TableHeader>
            <SharedHeaderWithCheckbox
              data={paginatedTeachers}
              selectedRows={selectedRows}
              toggleAll={toggleAll}
              columns={[
                "Name",
                "Email",
                "Phone Number",
                "School",
                "Teaching Level",
                "Status",
                "Date Joined",
                "Action",
              ]}
            />
          </TableHeader>

          <TableBody>
            {paginatedTeachers.length === 0 ? (
              <TableEmpty colSpan={colSpan} message="No teachers found" />
            ) : (
              paginatedTeachers.map((teacher) => (
                <TableRowItem<Teacher, number>
                  key={teacher.id}
                  item={teacher}
                  idKey="id"
                  selectedRows={selectedRows}
                  toggleRow={toggleRow}
                  columns={columns}
                   actions={teachersActions}
                />
              ))
            )}
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
