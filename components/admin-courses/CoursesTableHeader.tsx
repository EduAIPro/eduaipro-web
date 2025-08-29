"use client";

import { TableHead, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronsUpDown } from "lucide-react";
import { Course } from "@/app/types/Course";

interface CoursesTableHeaderProps {
  paginatedCourses: Course[];
  selectedRows: number[];
  toggleAll: () => void;
}

export default function CoursesTableHeader({
  paginatedCourses,
  selectedRows,
  toggleAll,
}: CoursesTableHeaderProps) {
  return (
    <TableRow className="bg-[#ECECEC] rounded-t-[12px]">
      <TableHead>
        <Checkbox
          checked={paginatedCourses.every((t) =>
            selectedRows.includes(t.id)
          )}
          onCheckedChange={toggleAll}
          aria-label="Select all rows"
        />
      </TableHead>
      {[
        "Course Title",
        "Enrolled Teachers",
        "Teachers Completed",
        "Completion Rate",
        "Access Period",
        "Validity Period",
        "Date Created",
        "Action",
      ].map((head) => (
        <TableHead
          key={head}
          className="text-[14px] font-semibold text-[#656565] leading-[100%]"
        >
          <div className="flex items-center gap-1">
            <span>{head}</span>
            <ChevronsUpDown className="h-[14px] w-[14px]" />
          </div>
        </TableHead>
      ))}
    </TableRow>
  );
}
