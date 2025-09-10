import { SchoolCertificate } from "@/types/admin/schools";
import { ColumnDef } from "@tanstack/react-table";

export const SchoolCertificatesListColumnsDef: ColumnDef<SchoolCertificate>[] =
  [
    {
      accessorKey: "name",
      header: "Certificate name",
      cell: ({ row }) => {
        return (
          <p className="text-grey-500 truncate text-sm font-medium">
            {row.original.courseTitle}
          </p>
        );
      },
    },
    {
      accessorKey: "totalAccreditedTeachers",
      header: "Accredited Teachers",
      cell: ({ row }) => {
        return (
          <p className="text-grey-500 truncate text-sm font-semibold">
            {row.original.metrics.totalAccreditedTeachers} Teachers
          </p>
        );
      },
    },
    {
      accessorKey: "totalTeachers",
      header: "Total Teachers",
      cell: ({ row }) => {
        return (
          <p className="text-grey-500 truncate text-sm font-semibold">
            {row.original.metrics.totalTeachers} Teachers
          </p>
        );
      },
    },
    {
      accessorKey: "pendingRenewal",
      header: "Pending Renewal",
      cell: ({ row }) => {
        return (
          <p className="text-grey-500 truncate text-sm font-semibold">
            {row.original.metrics.totalPendingRenewals} Teachers
          </p>
        );
      },
    },
    {
      accessorKey: "expiredCertifications",
      header: "Expired Certifications",
      cell: ({ row }) => {
        return (
          <p className="text-grey-500 truncate text-sm font-semibold">
            {row.original.metrics.totalExpiredCertificates} Teachers
          </p>
        );
      },
    },
  ];
