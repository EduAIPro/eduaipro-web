"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Ellipsis } from "lucide-react";
import { Course } from "@/app/types/Course";

interface CoursesTableRowProps {
  course: Course;
  selectedRows: number[];
  toggleRow: (id: number) => void;
}

export default function CoursesTableRow({
  course,
  selectedRows,
  toggleRow,
}: CoursesTableRowProps) {
  return (
    <TableRow className="hover:bg-gray-100 dark:hover:bg-zinc-800">
      <TableCell>
        <Checkbox
          checked={selectedRows.includes(course.id)}
          onCheckedChange={() => toggleRow(course.id)}
          aria-label={`Select row ${course.id}`}
        />
      </TableCell>
      <TableCell className="text-[14px] font-medium text-[#141414]">
        {course.title}
      </TableCell>
      <TableCell className="text-[14px] font-medium text-[#141414]">
        {course.enrolled} Teachers
      </TableCell>
      <TableCell className="text-[14px] font-medium text-[#141414]">
        {course.completed} Teachers
      </TableCell>
      <TableCell className="text-[14px] font-medium text-[#141414]">
        {course.rate}%
      </TableCell>
      <TableCell className="text-[14px] font-medium text-[#141414]">
        {course.period} months
      </TableCell>
      <TableCell className="flex items-center gap-[10px] text-[14px] font-medium">
        {course.validity || "-"} months
      </TableCell>
      <TableCell className="text-[14px] font-medium text-[#141414]">
        {course.dateCreated || "-"}
      </TableCell>
      <TableCell className="text-[14px] font-medium text-[#141414]">
        <Ellipsis className="cursor-pointer" />
      </TableCell>
    </TableRow>
  );
}
