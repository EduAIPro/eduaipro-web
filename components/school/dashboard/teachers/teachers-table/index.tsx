"use client";
import { getTeachersColumns } from "./columns";

import { getSchoolStaffsKey } from "@/api/keys";
import { fetchPaginatedData } from "@/api/queries";
import { SendMessageModal } from "@/components/admin/modals";
import { AssignSeatModal } from "@/components/school/dashboard/billing/assign-seat-modal";
import { BuySeatsModal } from "@/components/school/dashboard/billing/buy-seats-modal";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useSchoolPendingInvites from "@/hooks/use-school-pending-invites";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSchoolPathways from "@/hooks/use-school-pathways";
import useSchoolSeats from "@/hooks/use-school-seats";
import {
  buildRosterCsv,
  certificatesOf,
  downloadCsv,
  enrollmentsOf,
  RosterStaff,
  rosterStats,
  staffName,
} from "@/lib/school-roster";
import { SchoolStaffsData } from "@/types/school/teachers";
import { DownloadIcon, MegaphoneIcon } from "lucide-react";
import { Fragment, useMemo, useState } from "react";
import useSWR, { mutate } from "swr";
import { InviteTeacherModal } from "../modals";
import { TeacherProfile } from "../profile";
import { PendingInvitesTable } from "../roster/pending-invites";
import { RenewalsDue } from "../roster/renewals-due";
import { ChipLegend } from "../roster/pathway-chips";
import { RosterStatCards } from "../roster/stat-cards";
import { Empty } from "./empty";

const ALL = "all";

export const TeachersTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [pathway, setPathway] = useState(ALL);
  const [certs, setCerts] = useState(ALL);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setOpen] = useState(false);
  const [teacherId, setTeacherId] = useState<null | string>(null);
  const [assignStaffId, setAssignStaffId] = useState<string | null>(null);
  const [assignOpen, setAssignOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);

  const { data, isLoading, error } = useSWR<SchoolStaffsData>(
    [getSchoolStaffsKey, currentPage],
    fetchPaginatedData,
  );
  const { invites: pendingInvites } = useSchoolPendingInvites();
  const { seats } = useSchoolSeats();
  const { pathways } = useSchoolPathways();

  const seatList = useMemo(() => seats?.seats ?? [], [seats]);
  const roster: RosterStaff[] = useMemo(() => data?.data ?? [], [data]);

  const pathwayOptions = useMemo(() => {
    if (pathways.length) return pathways;
    const seen = new Map<string, string>();
    roster.forEach((s) =>
      enrollmentsOf(s).forEach((e) => seen.set(e.course.id, e.course.title)),
    );
    return Array.from(seen, ([id, title]) => ({ id, title }));
  }, [pathways, roster]);

  const filtered = useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    return roster.filter((s) => {
      if (
        q &&
        !staffName(s).toLowerCase().includes(q) &&
        !s.user.email.toLowerCase().includes(q)
      )
        return false;
      if (
        pathway !== ALL &&
        !enrollmentsOf(s).some((e) => e.course.id === pathway)
      )
        return false;
      const n = certificatesOf(s).length;
      if (certs === "0" && n !== 0) return false;
      if (certs === "1" && n !== 1) return false;
      if (certs === "2" && n < 2) return false;
      return true;
    });
  }, [roster, searchValue, pathway, certs]);

  const stats = useMemo(() => rosterStats(roster), [roster]);
  const columns = useMemo(() => getTeachersColumns(seatList), [seatList]);
  const selected = roster.find((s) => s.id === teacherId);
  const firstAvailable = seatList.find((s) => s.state === "AVAILABLE") ?? null;

  const openAssign = (staff: RosterStaff) => {
    if (!firstAvailable) {
      setBuyOpen(true);
      return;
    }
    setAssignStaffId(staff.id);
    setAssignOpen(true);
  };

  return (
    <Fragment>
      <div className="space-y-5">
        <RosterStatCards stats={stats} />

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList className="mx-0">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">
              Pending
              {pendingInvites.length ? (
                <span className="ml-2 rounded-full bg-grey-3 px-2 py-0.5 text-[10.5px] font-semibold text-grey-500">
                  {pendingInvites.length}
                </span>
              ) : null}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <Input
                aria-label="Search teacher"
                placeholder="Search teacher"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="rounded-md !border bg-white md:w-64"
              />
              <Select value={pathway} onValueChange={setPathway}>
                <SelectTrigger
                  aria-label="Filter by pathway"
                  className="w-48 bg-white"
                >
                  <SelectValue placeholder="All pathways" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL}>All pathways</SelectItem>
                  {pathwayOptions.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={certs} onValueChange={setCerts}>
                <SelectTrigger
                  aria-label="Filter by certificates"
                  className="w-56 bg-white"
                >
                  <SelectValue placeholder="Any number of certificates" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL}>
                    Any number of certificates
                  </SelectItem>
                  <SelectItem value="0">0 certificates</SelectItem>
                  <SelectItem value="1">1 certificate</SelectItem>
                  <SelectItem value="2">2 or more</SelectItem>
                </SelectContent>
              </Select>
              <span className="flex-1" />
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  downloadCsv(
                    "teacher-enrolments.csv",
                    buildRosterCsv(filtered),
                  )
                }
              >
                <DownloadIcon /> Export CSV
              </Button>
              <SendMessageModal
                type="school"
                modalTrigger={
                  <Button size="sm">
                    <MegaphoneIcon /> <p>Send message</p>
                  </Button>
                }
              />
              <InviteTeacherModal swrKey={getSchoolStaffsKey} gate />
            </div>

            <div>
              <ChipLegend />
              <DataTable<RosterStaff, unknown>
                canSearch={false}
                hasError={!!error}
                isLoading={isLoading}
                data={filtered}
                columns={columns}
                onPageChange={(page) => setCurrentPage(page)}
                onRefresh={() => mutate(getSchoolStaffsKey)}
                emptyComponent={
                  roster.length ? (
                    <p className="py-16 text-center text-sm text-grey-500">
                      No teachers match those filters
                    </p>
                  ) : (
                    <Empty />
                  )
                }
                onRowClick={(row) => {
                  setTeacherId(row.id);
                  setOpen(true);
                }}
                meta={{
                  total: data?.pagination.total || 0,
                  page: data?.pagination.current || 1,
                  totalPages: data?.pagination.totalPages || 1,
                  limit: 10,
                }}
              />
              <p className="mt-2.5 text-[11px] text-grey-500">
                Click any row for the full enrolment record. Filters and the
                figures above apply to the teachers on this page.
              </p>
            </div>

            <RenewalsDue renewals={stats.renewals} />
          </TabsContent>

          <TabsContent value="pending">
            <PendingInvitesTable />
          </TabsContent>
        </Tabs>
      </div>

      {teacherId ? (
        <TeacherProfile
          open={isOpen}
          toggleOpen={(v) => setOpen(v)}
          teacherId={teacherId}
          rosterStaff={selected}
          seats={seatList}
          onAssignSeat={(staff) => {
            setOpen(false);
            openAssign(staff);
          }}
        />
      ) : null}

      <AssignSeatModal
        open={assignOpen}
        onOpenChange={setAssignOpen}
        seat={firstAvailable}
        staff={roster}
        staffId={assignStaffId}
      />
      <BuySeatsModal open={buyOpen} onOpenChange={setBuyOpen} />
    </Fragment>
  );
};
