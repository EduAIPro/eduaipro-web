import { useQueryApi } from "@/api/hooks/useQueryApi";
import { GET_SCHOOL_TEACHER_BY_ID_QUERY_KEY } from "@/api/keys";
import { getSingleTeacherBySchool } from "@/api/queries";
import { Teacher } from "@/types/school";
import { useState } from "react";
import { UseQueryResult } from "react-query";
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
  const [teacher, setTeacher] = useState<null | Teacher>(null);

  const getSchoolTeacherQuery: UseQueryResult<{ data: Teacher }> = useQueryApi(
    [GET_SCHOOL_TEACHER_BY_ID_QUERY_KEY, teacherId],
    getSingleTeacherBySchool(teacherId),
    {
      enabled: !!teacherId,
      onSuccess(data) {
        if (data.data) {
          setTeacher(data.data);
        }
      },
    }
  );

  return (
    <ProfileSheet
      loading={getSchoolTeacherQuery.isLoading}
      teacher={teacher}
      {...props}
    />
  );
};
