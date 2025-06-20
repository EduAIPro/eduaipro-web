import { Teacher } from "@/types/school/teachers";
import { ProfileSheet } from "./sheet";

// TODO: fetch teacher data and add skeleton loaders
type TeacherProfileProps = {
  open: boolean;
  toggleOpen: (v: boolean) => void;
  teacher: Teacher;
};

export const TeacherProfile = (props: TeacherProfileProps) => {
  return <ProfileSheet {...props} />;
};
