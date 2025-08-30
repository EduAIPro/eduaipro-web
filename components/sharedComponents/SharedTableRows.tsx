"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Ellipsis } from "lucide-react";
import React from "react";

export interface TableColumn<T> {
  key: string;
  render?: (item: T) => React.ReactNode;
}

interface TableRowItemProps<T, IDType = string | number> {
  item: T;
  columns: (keyof T | TableColumn<T>)[];
  selectedRows?: IDType[];
  toggleRow?: (id: IDType) => void;
  idKey?: keyof T; 
}


export default function TableRowItem<T, IDType = string | number>({
  item,
  columns,
  selectedRows,
  toggleRow,
  idKey = "id" as keyof T,
}: TableRowItemProps<T, IDType>) {
  const itemId = item[idKey] as unknown as IDType;

  return (
    <TableRow className="hover:bg-gray-100 dark:hover:bg-zinc-800">
      {toggleRow && selectedRows && (
        <TableCell>
          <Checkbox
            checked={selectedRows.includes(itemId)}
            onCheckedChange={() => toggleRow(itemId)}
            aria-label={`Select row ${itemId}`}
          />
        </TableCell>
      )}

      {columns.map((col, index) => {
        let content: React.ReactNode;

        if (typeof col === "object" && "render" in col && typeof col.render === "function") {
          content = col.render(item);
        } else {
          const value = item[col as keyof T];
          content = value !== undefined && value !== null ? String(value) : "-";
        }

        return (
          <TableCell key={index} className="text-[14px] font-medium text-[#141414]">
            {content}
          </TableCell>
        );
      })}

      <TableCell>
        <Ellipsis className="cursor-pointer" />
      </TableCell>
    </TableRow>
  );
}
