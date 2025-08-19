import { getSchoolStaffsKey } from "@/api/keys";
import { fetchWithSingleParam } from "@/api/queries";
import { StaffDetail } from "@/types/school/teachers";
import useSWR from "swr";
import { ProfileSheet } from "./sheet";

// TODO: fetch teacher data and add skeleton loaders
type TeacherProfileProps = {
  open: boolean;
  toggleOpen: (v: boolean) => void;
  teacherId: string;
};

export const TeacherProfile = ({
  teacherId,
  ...props
}: TeacherProfileProps) => {
  const { data, isLoading } = useSWR<StaffDetail>(
    [getSchoolStaffsKey, teacherId],
    fetchWithSingleParam
  );

  return <ProfileSheet loading={isLoading} staff={data} {...props} />;
};
