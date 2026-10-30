"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSchoolTransactions from "@/hooks/use-school-transactions";
import { formatMoney } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";

const ALL = "all";
const LIMIT = 10;

export const TransactionsTable = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(ALL);
  const { transactions, isLoading, isError, refetch } = useSchoolTransactions(
    page,
    status === ALL ? "" : status,
    LIMIT,
  );

  const totalPages = Math.max(1, Math.ceil((transactions?.total ?? 0) / LIMIT));

  return (
    <Card id="payment-history" className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
        <h3 className="text-sm font-bold text-grey-800">Payment history</h3>
        <Select
          value={status}
          onValueChange={(v) => {
            setStatus(v);
            setPage(1);
          }}
        >
          <SelectTrigger aria-label="Filter by status" className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All statuses</SelectItem>
            <SelectItem value="SUCCESS">Success</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="FAILED">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-grey-3 text-xs text-grey-500">
            <tr>
              {["Reference", "Kind", "Status", "Amount", "Date"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left font-semibold whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-xs text-grey-500">
                  Loading…
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-xs text-grey-500">
                  Couldn’t load payment history.{" "}
                  <button className="underline" onClick={refetch}>
                    Retry
                  </button>
                </td>
              </tr>
            ) : transactions?.items.length ? (
              transactions.items.map((t) => (
                <tr key={t.id} className="border-t">
                  <td className="px-4 py-2.5 font-mono text-xs">{t.reference}</td>
                  <td className="px-4 py-2.5 capitalize text-grey-500">
                    {t.kind.toLowerCase().replaceAll("_", " ")}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="font-medium capitalize">{t.status.toLowerCase()}</span>
                    {t.status === "FAILED" && t.failureReason ? (
                      <p className="text-xs text-red-600">{t.failureReason}</p>
                    ) : null}
                  </td>
                  <td className="px-4 py-2.5">{formatMoney(t.amountKobo / 100, t.currency)}</td>
                  <td className="px-4 py-2.5 whitespace-nowrap text-grey-500">
                    {format(new Date(t.paidAt ?? t.createdAt), "dd MMM yyyy")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-6 text-center text-xs text-grey-500">
                  No payments yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 ? (
        <div className="flex items-center justify-end gap-2 border-t p-3">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            Previous
          </Button>
          <span className="text-xs text-grey-500">
            Page {page} of {totalPages}
          </span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </div>
      ) : null}
    </Card>
  );
};
