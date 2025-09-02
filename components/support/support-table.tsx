"use client";

import { useState } from "react";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { Support } from "@/app/types/support";

import SharedHeaderWithCheckbox from "@/components/shared-components/shared-table-header";
import TableRowItem, { TableColumn } from "@/components/shared-components/shared-table-rows";
import TableEmpty from "@/components/shared-components/shared-empty-table";
import SharedPagination from "@/components/shared-components/shared-pagination";
import { Eye, SquarePen, Trash2 } from "lucide-react";


interface SupportTableProps {
  supports: Support[];
}

const supportsActions = [
   {
    label: "View",
    onClick: (support: Support) => {
      console.log("View support:", support);
    },
    icon: <span><Eye size={16} /></span>,
  },
  {
    label: "Delete",
    onClick: (support: Support) => {
      console.log("Delete support:", support);
    },
    icon: <span><Trash2 size={16} /></span>,
    danger: true, 
  },
];

export default function SupportTable({ supports }: SupportTableProps) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(supports.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedSupports = supports.slice(startIndex, startIndex + rowsPerPage);


  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    const currentPageTeachers = paginatedSupports.map((t) => t.id);
    if (currentPageTeachers.every((id) => selectedRows.includes(id))) {
      setSelectedRows((prev) =>
        prev.filter((id) => !currentPageTeachers.includes(id))
      );
    } else {
      setSelectedRows((prev) =>
        Array.from(new Set([...prev, ...currentPageTeachers]))
      );
    }
  };

 const columns: (keyof Support | TableColumn<Support>)[] = [
  "ticketId",
  "ticketName",
    {
    key: "priority",
    render: (t: Support) => (
      <span className="flex items-center gap-[10px]">
        <span
          className={`h-[6px] w-[6px] rounded-full ${
            t.priority === "Low" ? "bg-[#008000]" : t.priority === "Medium" ? "bg-[#FFA500]" : "bg-[#FF0000]"
          }`}
        ></span>
        {t.priority || "-"}
      </span>
    ),
  },
  "requester",
  "assignee",
  {
    key: "status",
    render: (t: Support) => (
      <span className="flex items-center gap-[10px]">
        <span
          className={`h-[6px] w-[6px] rounded-full ${
            t.status === "In Progress" ? "bg-[#FFA500]" : t.status === "Pending" ? "bg-[#FF0000]" : "bg-[#008000]"
          }`}
        ></span>
        {t.status || "-"}
      </span>
    ),
  },
  "requestDate",
];


  const colSpan = columns.length + 1;

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-[10px] border border-gray-200">
        <Table className="min-w-full">
          <TableHeader>
            <SharedHeaderWithCheckbox
              data={paginatedSupports}
              selectedRows={selectedRows}
              toggleAll={toggleAll}
              columns={[
                "Ticket ID",
                "Ticket Name",
                "Priority",
                "Requester",
                "Assignee",
                "Status",
                "Request Date",
                "Action",
              ]}
            />
          </TableHeader>

          <TableBody>
            {paginatedSupports.length === 0 ? (
              <TableEmpty colSpan={colSpan} message="No supports found" />
            ) : (
              paginatedSupports.map((support) => (
                <TableRowItem<Support, number>
                  key={support.id}
                  item={support}
                  idKey="id"
                  selectedRows={selectedRows}
                  toggleRow={toggleRow}
                  columns={columns}
                   actions={supportsActions}
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
