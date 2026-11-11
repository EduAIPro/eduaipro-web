import { adminGetStaffKey, getSchoolStaffsKey } from "@/api/keys";
import { fetchWithSingleParam } from "@/api/queries";
import { RosterStaff } from "@/lib/school-roster";
import { Seat } from "@/types/school/billing";
import { StaffDetail } from "@/types/school/teachers";
import useSWR from "swr";
import { ProfileSheet } from "./sheet";

// TODO: fetch teacher data and add skeleton loaders
type TeacherProfileProps = {
  open: boolean;
  toggleOpen: (v: boolean) => void;
  teacherId: string;
  isAdmin?: boolean;
  // School roster extras (omitted for admin)
  rosterStaff?: RosterStaff;
  seats?: Seat[];
  onAssignSeat?: (staff: RosterStaff) => void;
};

export const TeacherProfile = ({
  teacherId,
  isAdmin = false,
  rosterStaff,
  seats,
  onAssignSeat,
  ...props
}: TeacherProfileProps) => {
  const { data, isLoading } = useSWR<StaffDetail>(
    [isAdmin ? adminGetStaffKey : getSchoolStaffsKey, teacherId],
    fetchWithSingleParam
  );

  return (
    <ProfileSheet
      loading={isLoading}
      staff={data}
      rosterStaff={rosterStaff}
      seats={seats}
      onAssignSeat={onAssignSeat}
      {...props}
    />
  );
};
