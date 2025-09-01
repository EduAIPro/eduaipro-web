"use client";

import { useState } from "react";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { Course } from "@/app/types/Course";

import TableRowItem, { TableColumn } from "@/components/sharedComponents/SharedTableRows";
import TableEmpty from "@/components/sharedComponents/SharedEmptyTable";
import SharedPagination from "@/components/sharedComponents/SharedPagination";
import SharedHeaderWithCheckbox from "@/components/sharedComponents/SharedTableHeader";

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

const columns: (keyof Course | TableColumn<Course>)[] = [
  "title",
  {
    key: "enrolled",
    render: (c: Course) => ` ${c.enrolled} Teachers`,
  },
  {
    key: "completed",
    render: (c: Course) => `${c.completed} Completed`,
  },
  {
    key: "rate",
    render: (c: Course) => `${c.rate}%`, 
  },
   {
    key: "period",
    render: (c: Course) => `${c.period} Months`,
  },
  {
    key: "validity",
    render: (c: Course) => `${c.validity} Months`,
  },
  "dateCreated",
];


  const colSpan = columns.length + 1;

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-[10px] border border-gray-200">
        <Table className="min-w-full">
          <TableHeader>
            <SharedHeaderWithCheckbox
              data={paginatedCourses}
              selectedRows={selectedRows}
              toggleAll={toggleAll}
              columns={[
                "Course Title",
                "Enrolled Teachers",
                "Teachers Completed",
                "Completion Rate",
                "Access Period",
                "Validity Period",
                "Date Created",
                "Action",
              ]}
            />
          </TableHeader>

          <TableBody>
            {paginatedCourses.length === 0 ? (
              <TableEmpty colSpan={colSpan} message="No courses found" />
            ) : (
              paginatedCourses.map((course) => (
                <TableRowItem<Course, number>
                  key={course.id}
                  item={course}
                  idKey="id"
                  selectedRows={selectedRows}
                  toggleRow={toggleRow}
                  columns={columns}
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
