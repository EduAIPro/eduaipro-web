"use client";

import { TableCell, TableRow } from "@/components/ui/table";

export default function TeachersTableEmpty() {
  return (
    <TableRow>
      <TableCell colSpan={9} className="text-center py-4 text-[#656565]">
        No results found
      </TableCell>
    </TableRow>
  );
}
