export const getSchoolById = (id: string) => `/institutions/${id}`;

// export const getAllTeachersBySchool = "/institutions/all/teachers-generally";
export const getAllTeachersBySchool = "/institutions/dashboard/all-teachers";
export const getSingleTeacherBySchool = (id: string) =>
  `/institutions/single/teacher/${id}`;
