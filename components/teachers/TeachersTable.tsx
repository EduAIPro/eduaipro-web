"use client";

import { useState } from "react";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { Teacher } from "@/app/types/Teacher";

import TeachersTableHeader from "./TeachersTableHeader";
import TeachersTableRow from "./TeachersTableRow";
import TeachersTableEmpty from "./TeachersTableEmpty";
import TeachersTablePagination from "./TeachersTablePagination";

interface TeachersTableProps {
  teachers: Teacher[];
}

export default function TeachersTable({ teachers }: TeachersTableProps) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

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

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-[10px] border border-gray-200">
        <Table className="min-w-full">
          <TableHeader>
            <TeachersTableHeader
              paginatedTeachers={paginatedTeachers}
              selectedRows={selectedRows}
              toggleAll={toggleAll}
            />
          </TableHeader>

          <TableBody>
            {paginatedTeachers.length === 0 ? (
              <TeachersTableEmpty />
            ) : (
              paginatedTeachers.map((teacher) => (
                <TeachersTableRow
                  key={teacher.id}
                  teacher={teacher}
                  selectedRows={selectedRows}
                  toggleRow={toggleRow}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <TeachersTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
