"use client";

import { getSchoolStaffsKey, schoolDeleteInviteKey } from "@/api/keys";
import { deleteSchoolInvite } from "@/api/mutations";
import { ConfirmDialog } from "@/components/school/dashboard/billing/confirm-dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import useSchoolPendingInvites from "@/hooks/use-school-pending-invites";
import { daysUntil } from "@/lib/billing-dates";
import { cn } from "@/lib/utils";
import { PendingInvite } from "@/types/school/invites";
import { cpdPathways } from "@/utils/data";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MailIcon, Trash2Icon } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { InviteTeacherModal } from "../modals";

const levelLabel = (level: string) =>
  cpdPathways.find((p) => p.value === level)?.short ?? level;

const inviteeName = (i: PendingInvite) => `${i.firstName} ${i.lastName}`.trim();

const expiry = (iso: string) => {
  const days = daysUntil(iso);
  if (days === null) return { label: "", warn: false };
  if (days < 0) return { label: "Expired", warn: true };
  if (days === 0) return { label: "Expires today", warn: true };
  return {
    label: `Expires in ${days} day${days === 1 ? "" : "s"}`,
    warn: days <= 2,
  };
};

const getColumns = (
  onDelete: (invite: PendingInvite) => void,
): ColumnDef<PendingInvite>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <p className="text-grey-800 truncate text-sm font-semibold">
        {inviteeName(row.original) || "—"}
      </p>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <p className="text-grey-500 truncate text-sm font-medium">
        {row.original.email}
      </p>
    ),
  },
  {
    accessorKey: "level",
    header: "Pathway",
    cell: ({ row }) => (
      <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10.5px] font-semibold text-[#1A56DB]">
        {levelLabel(row.original.level)}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Invited",
    cell: ({ row }) => (
      <p className="text-grey-500 text-sm font-medium">
        {format(new Date(row.original.createdAt), "do MMM, yyyy")}
      </p>
    ),
  },
  {
    accessorKey: "expiresAt",
    header: "Expires",
    cell: ({ row }) => {
      const e = expiry(row.original.expiresAt);
      return (
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold whitespace-nowrap",
            e.warn ? "bg-red-100 text-red-700" : "bg-grey-3 text-grey-500",
          )}
        >
          {e.label}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="icon"
        aria-label={`Delete invite for ${row.original.email}`}
        onClick={() => onDelete(row.original)}
      >
        <Trash2Icon className="size-4 text-red-600" />
      </Button>
    ),
  },
];

const Empty = () => (
  <div className="flex flex-col items-center gap-2 py-16 text-center">
    <MailIcon className="size-8 text-grey-500" />
    <p className="text-sm font-semibold text-grey-800">No pending invites</p>
    <p className="text-xs text-grey-500">
      Teachers you invite show up here until they join.
    </p>
  </div>
);

/** Invites sent but not yet accepted, in the same table style as the roster. */
export const PendingInvitesTable = () => {
  const { invites, isLoading, isError, refetch, mutate } =
    useSchoolPendingInvites();
  const [search, setSearch] = useState("");
  const [removing, setRemoving] = useState<PendingInvite | null>(null);
  const { trigger, isMutating } = useSWRMutation(
    schoolDeleteInviteKey,
    deleteSchoolInvite,
  );

  const columns = useMemo(() => getColumns(setRemoving), []);
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return invites;
    return invites.filter(
      (i) =>
        i.email.toLowerCase().includes(q) ||
        inviteeName(i).toLowerCase().includes(q),
    );
  }, [invites, search]);

  const onRemove = async () => {
    if (!removing) return;
    try {
      await trigger({ inviteId: removing.id });
      // drop it from the list straight away, then confirm with the server
      await mutate((current) => current?.filter((i) => i.id !== removing.id), {
        revalidate: true,
      });
      toast.success("Invite deleted");
    } catch (error) {
      toast.error(
        typeof error === "string" ? error : "Couldn’t delete that invite",
      );
    } finally {
      setRemoving(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2.5">
        <Input
          aria-label="Search pending invites"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-md !border bg-white md:w-64"
        />
        <span className="flex-1" />
        <div className="w-fit">
          <InviteTeacherModal key={getSchoolStaffsKey} gate />
        </div>
      </div>

      <DataTable<PendingInvite, unknown>
        canSearch={false}
        hasError={isError}
        isLoading={isLoading}
        data={filtered}
        columns={columns}
        onRefresh={refetch}
        emptyComponent={
          invites.length ? (
            <p className="py-16 text-center text-sm text-grey-500">
              No invites match that search
            </p>
          ) : (
            <Empty />
          )
        }
        meta={{
          total: filtered.length,
          page: 1,
          totalPages: 1,
          limit: Math.max(filtered.length, 1),
        }}
      />
      <p className="text-[11px] text-grey-500">
        Delete an invite to cancel it. You can invite the same teacher again
        later.
      </p>

      <ConfirmDialog
        open={!!removing}
        onOpenChange={(v) => !v && setRemoving(null)}
        title="Delete this invite?"
        description={
          removing
            ? `${removing.email} won’t be able to join with this invite any more. You can invite them again later.`
            : ""
        }
        confirmLabel="Delete invite"
        destructive
        loading={isMutating}
        onConfirm={onRemove}
      />
    </div>
  );
};
