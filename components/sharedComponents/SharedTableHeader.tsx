"use client";

import { TableHead, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronsUpDown } from "lucide-react";

interface SharedHeaderCheckboxProps<T extends { id: number }> {
  data: T[];
  selectedRows: number[];
  toggleAll: () => void;
  columns: string[];
}

export default function SharedHeaderCheckbox<T extends { id: number }>({
  data,
  selectedRows,
  toggleAll,
  columns,
}: SharedHeaderCheckboxProps<T>) {
  return (
    <TableRow className="bg-[#ECECEC] rounded-t-[12px]">
    
      <TableHead>
        <Checkbox
          checked={data.length > 0 && data.every((item) => selectedRows.includes(item.id))}
          onCheckedChange={toggleAll}
          aria-label="Select all rows"
        />
      </TableHead>

      {columns.map((col) => (
        <TableHead
          key={col}
          className="text-[14px] font-semibold text-[#656565] leading-[100%]"
        >
          <div className="flex items-center gap-1">
            <span>{col}</span>
            <ChevronsUpDown className="h-[14px] w-[14px]" />
          </div>
        </TableHead>
      ))}
    </TableRow>
  );
}
