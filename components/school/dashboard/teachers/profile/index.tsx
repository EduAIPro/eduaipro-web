import { adminGetStaffKey, getSchoolStaffsKey } from "@/api/keys";
import { fetchWithSingleParam } from "@/api/queries";
import { StaffDetail } from "@/types/school/teachers";
import useSWR from "swr";
import { ProfileSheet } from "./sheet";

// TODO: fetch teacher data and add skeleton loaders
type TeacherProfileProps = {
  open: boolean;
  toggleOpen: (v: boolean) => void;
  teacherId: string;
  isAdmin?: boolean;
};

export const TeacherProfile = ({
  teacherId,
  isAdmin = false,
  ...props
}: TeacherProfileProps) => {
  const { data, isLoading } = useSWR<StaffDetail>(
    [isAdmin ? adminGetStaffKey : getSchoolStaffsKey, teacherId],
    fetchWithSingleParam
  );

  return <ProfileSheet loading={isLoading} staff={data} {...props} />;
};
