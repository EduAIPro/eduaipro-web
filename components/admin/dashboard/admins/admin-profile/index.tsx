import { adminGetStaffKey } from "@/api/keys";
import { fetchWithSingleParam } from "@/api/queries";
import { StaffDetail } from "@/types/school/teachers";
import useSWR from "swr";
import { ProfileSheet } from "./sheet";

// TODO: fetch teacher data and add skeleton loaders
type TeacherProfileProps = {
  open: boolean;
  toggleOpen: (v: boolean) => void;
  adminId: string;
};

export const AdminProfile = ({ adminId, ...props }: TeacherProfileProps) => {
  const { data, isLoading } = useSWR<StaffDetail>(
    [adminGetStaffKey, adminId],
    fetchWithSingleParam
  );

  return <ProfileSheet loading={isLoading} staff={data} {...props} />;
};
