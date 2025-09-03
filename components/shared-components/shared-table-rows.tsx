"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Ban, Ellipsis, Eye, SquarePen, Trash2 } from "lucide-react";
import React, { useState } from "react";

export interface TableColumn<T> {
  key: string;
  render?: (item: T) => React.ReactNode;
}

export interface TableAction<T> {
  label: string;
  icon: React.ReactNode;
  onClick: (item: T) => void;
  danger?: boolean;
}

interface TableRowItemProps<T, IDType = string | number> {
  item: T;
  columns: (keyof T | TableColumn<T>)[];
  selectedRows?: IDType[];
  toggleRow?: (id: IDType) => void;
  idKey?: keyof T;
  actions?: TableAction<T>[];
}

export default function TableRowItem<T, IDType = string | number>({
  item,
  columns,
  selectedRows,
  toggleRow,
  idKey = "id" as keyof T,
  actions = [],
}: TableRowItemProps<T, IDType>) {
  const itemId = item[idKey] as unknown as IDType;
  const [open, setOpen] = useState(false);

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

        if (
          typeof col === "object" &&
          "render" in col &&
          typeof col.render === "function"
        ) {
          content = col.render(item);
        } else {
          const value = item[col as keyof T];
          content = value !== undefined && value !== null ? String(value) : "-";
        }

        return (
          <TableCell
            key={index}
            className="text-[14px] font-medium text-[#141414]">
            {content}
          </TableCell>
        );
      })}

      <TableCell className="relative">
        <div
          className="cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}>
          <Ellipsis />
        </div>

        {open && actions && actions.length > 0 && (
          <div
            className="absolute right-0 top-0 mr-5 mt-2 w-[152px] bg-white border rounded-md shadow-lg z-50"
            onMouseLeave={() => setOpen(false)}>
            <ul className="p-[6px] text-sm text-[#656565]">
              {actions.map((action, i) => (
                <li
                  key={i}
                  className={`px-[8px] py-[10px] rounded-[6px] hover:bg-[#DBDBDB] cursor-pointer flex items-center gap-[8px] ${
                    action.danger ? "text-red-600" : ""
                  }`}
                  onClick={() => action.onClick(item)}>
                  {action.icon}
                  {action.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}
