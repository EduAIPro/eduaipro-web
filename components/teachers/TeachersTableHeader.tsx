"use client";

import { TableHead, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronsUpDown } from "lucide-react";
import { Teacher } from "@/app/types/Teacher";

interface TeachersTableHeaderProps {
  paginatedTeachers: Teacher[];
  selectedRows: number[];
  toggleAll: () => void;
}

export default function TeachersTableHeader({
  paginatedTeachers,
  selectedRows,
  toggleAll,
}: TeachersTableHeaderProps) {
  return (
    <TableRow className="bg-[#ECECEC] rounded-t-[12px]">
      <TableHead>
        <Checkbox
          checked={paginatedTeachers.every((t) =>
            selectedRows.includes(t.id)
          )}
          onCheckedChange={toggleAll}
          aria-label="Select all rows"
        />
      </TableHead>
      {[
        "Name",
        "Email",
        "Phone Number",
        "School",
        "Teaching Level",
        "Status",
        "Date Joined",
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
