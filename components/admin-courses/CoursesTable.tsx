"use client";

import { useState } from "react";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { Course} from "@/app/types/Course";

import CoursesTableHeader from "./CoursesTableHeader";
import CoursesTableRow from "./CoursesTableRow";
import CoursesTableEmpty from "./CoursesTableEmpty";
import CoursesTablePagination from "./CoursesTablePagination";

interface CoursesTableProps {
  courses: Course[];
}

export default function CoursesTable({ courses }: CoursesTableProps) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(courses.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedCourses = courses.slice(startIndex, startIndex + rowsPerPage);

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    const currentPageCourses = paginatedCourses.map((t) => t.id);
    if (currentPageCourses.every((id) => selectedRows.includes(id))) {
      setSelectedRows((prev) =>
        prev.filter((id) => !currentPageCourses.includes(id))
      );
    } else {
      setSelectedRows((prev) =>
        Array.from(new Set([...prev, ...currentPageCourses]))
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-[10px] border border-gray-200">
        <Table className="min-w-full">
          <TableHeader>
            <CoursesTableHeader
              paginatedCourses={paginatedCourses}
              selectedRows={selectedRows}
              toggleAll={toggleAll}
            />
          </TableHeader>

          <TableBody>
            {paginatedCourses.length === 0 ? (
              <CoursesTableEmpty />
            ) : (
              paginatedCourses.map((course) => (
                <CoursesTableRow
                  key={course.id}
                  course={course}
                  selectedRows={selectedRows}
                  toggleRow={toggleRow}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <CoursesTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
