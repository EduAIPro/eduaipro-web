"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Ellipsis } from "lucide-react";
import { Teacher } from "@/app/types/Teacher";

interface TeachersTableRowProps {
  teacher: Teacher;
  selectedRows: number[];
  toggleRow: (id: number) => void;
}

export default function TeachersTableRow({
  teacher,
  selectedRows,
  toggleRow,
}: TeachersTableRowProps) {
  return (
    <TableRow className="hover:bg-gray-100 dark:hover:bg-zinc-800">
      <TableCell>
        <Checkbox
          checked={selectedRows.includes(teacher.id)}
          onCheckedChange={() => toggleRow(teacher.id)}
          aria-label={`Select row ${teacher.id}`}
        />
      </TableCell>
      <TableCell className="text-[14px] font-medium text-[#141414]">
        {teacher.name}
      </TableCell>
      <TableCell className="text-[14px] font-medium text-[#141414]">
        {teacher.email}
      </TableCell>
      <TableCell className="text-[14px] font-medium text-[#141414]">
        {teacher.phone}
      </TableCell>
      <TableCell className="text-[14px] font-medium text-[#141414]">
        {teacher.school}
      </TableCell>
      <TableCell className="text-[14px] font-medium text-[#141414]">
        {teacher.teachingLevel || "-"}
      </TableCell>
      <TableCell className="flex items-center gap-[10px] text-[14px] font-medium">
        <span
          className={`h-[6px] w-[6px] rounded-full ${
            teacher.status === "Active" ? "bg-green-500" : "bg-yellow-500"
          }`}
        ></span>
        {teacher.status || "-"}
      </TableCell>
      <TableCell className="text-[14px] font-medium text-[#141414]">
        {teacher.dateJoined || "-"}
      </TableCell>
      <TableCell className="text-[14px] font-medium text-[#141414]">
        <Ellipsis className="cursor-pointer" />
      </TableCell>
    </TableRow>
  );
}
