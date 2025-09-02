"use client";

import { useState } from "react";
import { Table, TableBody, TableHeader } from "@/components/ui/table";

import SharedHeaderWithCheckbox from "@/components/shared-components/shared-table-header";
import TableRowItem, { TableColumn } from "@/components/shared-components/shared-table-rows";
import TableEmpty from "@/components/shared-components/shared-empty-table";
import SharedPagination from "@/components/shared-components/shared-pagination";
import { Ban, Eye, SquarePen, Trash2 } from "lucide-react";
import { Admin } from "@/app/types/admin";


interface AdminTableProps {
  admins: Admin[];
}

const adminActions = [
   {
    label: "View",
    onClick: (admin: Admin) => {
      console.log("View admin:", admin);
    },
    icon: <span><Eye size={16} /></span>,
  },
     {
    label: "Edit",
    onClick: (admin: Admin) => {
      console.log("Edit admin:", admin);
    },
    icon: <span><SquarePen size={16} /></span>,
  },
  {
    label: "Delete",
    onClick: (admin: Admin) => {
      console.log("Delete admin:", admin);
    },
    icon: <span><Trash2 size={16} /></span>,
    danger: true, 
  },
];

export default function AdminTable({ admins }: AdminTableProps) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(admins.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedAdmins = admins.slice(startIndex, startIndex + rowsPerPage);


  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    const currentPageAdmins = paginatedAdmins.map((t) => t.id);
    if (currentPageAdmins.every((id) => selectedRows.includes(id))) {
      setSelectedRows((prev) =>
        prev.filter((id) => !currentPageAdmins.includes(id))
      );
    } else {
      setSelectedRows((prev) =>
        Array.from(new Set([...prev, ...currentPageAdmins]))
      );
    }
  };

 const columns: (keyof Admin | TableColumn<Admin>)[] = [
  "name",
  "email",
  "schoolAffiliation",
  "position",
  {
    key: "status",
    render: (t: Admin) => (
      <span className="flex items-center gap-[10px]">
        <span
          className={`h-[6px] w-[6px] rounded-full ${
            t.status === "Inactive" ? "bg-[#FF0000]" : "bg-[#008000]"
          }`}
        ></span>
        {t.status || "-"}
      </span>
    ),
  },
  "dateJoined",
];


  const colSpan = columns.length + 1;

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-[10px] border border-gray-200">
        <Table className="min-w-full">
          <TableHeader>
            <SharedHeaderWithCheckbox
              data={paginatedAdmins}
              selectedRows={selectedRows}
              toggleAll={toggleAll}
              columns={[
                "Name",
                "Email",
                "School Affiliation",
                "Position",
                "Status",
                "Date Joined",
                "Action",
              ]}
            />
          </TableHeader>

          <TableBody>
            {paginatedAdmins.length === 0 ? (
              <TableEmpty colSpan={colSpan} message="No admins found" />
            ) : (
              paginatedAdmins.map((admin) => (
                <TableRowItem<Admin, number>
                  key={admin.id}
                  item={admin}
                  idKey="id"
                  selectedRows={selectedRows}
                  toggleRow={toggleRow}
                  columns={columns}
                   actions={adminActions}
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
