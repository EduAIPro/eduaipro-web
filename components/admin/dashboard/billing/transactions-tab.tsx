"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAdminTransactions, {
  ADMIN_TRANSACTIONS_PAGE_SIZE,
} from "@/hooks/use-admin-transactions";
import { kindLabel } from "@/lib/admin-billing";
import { cn, formatMoney } from "@/lib/utils";
import { AdminTransaction } from "@/types/admin/billing";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CopyIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const ALL = "all";

const STATUS_STYLE: Record<string, string> = {
  SUCCESS: "bg-green-100 text-green-700",
  PENDING: "bg-amber-100 text-amber-700",
  FAILED: "bg-red-100 text-red-700",
};

const StatusBadge = ({ status }: { status: string }) => (
  <Badge
    className={cn(
      "border-transparent capitalize",
      STATUS_STYLE[status] ?? "bg-grey-3 text-grey-500",
    )}
  >
    {status.toLowerCase()}
  </Badge>
);

const dateOf = (t: AdminTransaction) =>
  format(new Date(t.paidAt ?? t.createdAt), "dd MMM yyyy, HH:mm");

const columns: ColumnDef<AdminTransaction>[] = [
  {
    accessorKey: "reference",
    header: "Reference",
    cell: ({ row }) => (
      <p className="max-w-56 truncate font-mono text-xs text-grey-800">
        {row.original.reference}
      </p>
    ),
  },
  {
    accessorKey: "kind",
    header: "Type",
    cell: ({ row }) => (
      <p className="text-sm font-medium text-grey-500">
        {kindLabel(row.original.kind)}
      </p>
    ),
  },
  {
    accessorKey: "payer",
    header: "Paid by",
    cell: ({ row }) => (
      <p className="text-sm text-grey-500">
        {row.original.schoolId ? "School" : "Teacher"}
      </p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="space-y-0.5">
        <StatusBadge status={row.original.status} />
        {row.original.status === "FAILED" && row.original.failureReason ? (
          <p className="max-w-48 truncate text-xs text-red-600">
            {row.original.failureReason}
          </p>
        ) : null}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <p className="text-sm font-semibold text-grey-800">
        {formatMoney(row.original.amountKobo / 100, row.original.currency)}
      </p>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <p className="whitespace-nowrap text-sm text-grey-500">
        {dateOf(row.original)}
      </p>
    ),
  },
];

const copy = (text: string) =>
  navigator.clipboard
    ?.writeText(text)
    .then(() => toast.success("Copied"))
    .catch(() => toast.error("Couldn’t copy"));

const Detail = ({ label, value }: { label: string; value: string | null }) => (
  <div className="flex items-start justify-between gap-4 py-2 text-sm">
    <dt className="text-grey-500">{label}</dt>
    <dd className="break-all text-right font-medium text-grey-800">
      {value ?? "—"}
    </dd>
  </div>
);

export const TransactionsTab = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(ALL);
  const [selected, setSelected] = useState<AdminTransaction | null>(null);

  const { transactions, isLoading, isFetching, isError, refetch } =
    useAdminTransactions(page, status === ALL ? "" : status);

  const meta = useMemo(
    () => ({
      total: transactions?.total ?? 0,
      page: transactions?.page ?? page,
      totalPages: Math.max(
        1,
        Math.ceil((transactions?.total ?? 0) / ADMIN_TRANSACTIONS_PAGE_SIZE),
      ),
      limit: transactions?.limit ?? ADMIN_TRANSACTIONS_PAGE_SIZE,
    }),
    [transactions, page],
  );

  return (
    <>
      <DataTable<AdminTransaction, unknown>
        canSearch={false}
        hasError={isError}
        isLoading={isLoading}
        isFetching={isFetching}
        data={transactions?.items ?? []}
        columns={columns}
        meta={meta}
        onPageChange={setPage}
        onRefresh={refetch}
        onRowClick={setSelected}
        emptyComponent={
          <p className="py-16 text-sm text-grey-500">
            {status === ALL
              ? "No payments have been made yet."
              : "No payments match that status."}
          </p>
        }
        otherFilters={
          <Select
            value={status}
            onValueChange={(v) => {
              setStatus(v);
              setPage(1);
            }}
          >
            <SelectTrigger aria-label="Filter by status" className="w-40 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All statuses</SelectItem>
              <SelectItem value="SUCCESS">Success</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="FAILED">Failed</SelectItem>
            </SelectContent>
          </Select>
        }
      />

      <Dialog open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Payment details</DialogTitle>
            <DialogDescription>
              {selected ? kindLabel(selected.kind) : ""}
            </DialogDescription>
          </DialogHeader>
          {selected ? (
            <>
              <dl className="divide-y">
                <Detail
                  label="Amount"
                  value={formatMoney(
                    selected.amountKobo / 100,
                    selected.currency,
                  )}
                />
                <div className="flex items-center justify-between py-2 text-sm">
                  <dt className="text-grey-500">Status</dt>
                  <dd>
                    <StatusBadge status={selected.status} />
                  </dd>
                </div>
                {selected.failureReason ? (
                  <Detail label="Failure reason" value={selected.failureReason} />
                ) : null}
                <Detail label="Reference" value={selected.reference} />
                <Detail
                  label="Started"
                  value={format(new Date(selected.createdAt), "dd MMM yyyy, HH:mm")}
                />
                <Detail
                  label="Paid"
                  value={
                    selected.paidAt
                      ? format(new Date(selected.paidAt), "dd MMM yyyy, HH:mm")
                      : null
                  }
                />
                <Detail label="User ID" value={selected.userId} />
                <Detail label="School ID" value={selected.schoolId} />
                <Detail label="Seat purchase ID" value={selected.seatPurchaseId} />
              </dl>
              <Button variant="outline" onClick={() => copy(selected.reference)}>
                <CopyIcon /> Copy reference
              </Button>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
};
