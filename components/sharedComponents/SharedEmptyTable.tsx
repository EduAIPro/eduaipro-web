"use client";

import { TableCell, TableRow } from "@/components/ui/table";

interface TableEmptyProps {
  colSpan: number;
  message?: string;
}

export default function TableEmpty({ colSpan, message = "No results found" }: TableEmptyProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center py-4 text-[#656565]">
        {message}
      </TableCell>
    </TableRow>
  );
}
