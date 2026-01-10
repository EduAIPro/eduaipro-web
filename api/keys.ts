// QUERIES
export const getMe = "/auth/me";
export const getStaff = "/school/staff";
export const getSupportedCountries = "/supported-country/countries";

// get my course
export const getCourseWithProgress = "/course/active/progress";
export const getUnitDetails = "/course/units/unit";

// MUTATIONS
export const signupTeacherKey = "/auth/register/teacher";
export const loginTeacherKey = "/auth/login";
export const requestVerifyEmailKey = "/auth/email/request";
export const confirmVerifyEmailKey = "/auth/email/verify";
export const requestPasswordResetKey = "/auth/password/request";
export const confirmPasswordResetKey = "/auth/password/reset";
export const completeSurveyKey = "/auth/onboarding/complete";
export const logoutKey = "/auth/logout";

// courses
export const updateModuleKey = "/course/active/progress";
export const generateUnitQuestions = "/course/active/unit/questions";
export const submitAssessmentKey = "/course/active/unit/questions/submit";

// certificates
export const listCertificates = "/school/staff/certificates";

// profile
export const editProfileKey = "/school/staff";
export const changePasswordKey = "/auth/password/change";

// SCHOOL
// mutations
export const signupSchoolKey = "/auth/register/school";
export const acceptBulkInviteKey = "/school/invite/accept";
export const bulkSchoolInviteKey = "/school/invite/bulk";
export const schoolInviteKey = "/school/invite";
export const updateSchoolInfoKey = "/school";
export const updatePersonalInfoKey = "/school/staff";
export const sendSchoolNotificationKey = "/notification/notify-staff";
// export const updateSchoolInfoKey = "/school/staff/staffs/:id/deactivate";

// queries
export const getSchoolInfo = "/school";
export const getSchoolAnalyticsKey = "/school/aggregates";
export const getSchoolStaffsKey = "/school/staff/staffs";
export const getSchoolInviteLinkKey = "/school/invite/link";
export const getOverdueRenewalsKey = "/school/accreditation-renewals";

// ADMIN
// mutations
export const sendNotificationKey = "/admin/notification/send-message";
export const adminCreateCourseKey = "/admin/course";
export const adminCreateCourseUnitKey = (courseId: string) =>
  `/admin/course/courses/${courseId}/units`;
export const adminUpdateCourseSummaryUnitKey = (courseId: string) =>
  `/admin/course/courses/${courseId}`;
export const adminUpdateCourseUnitKey = (unitId: string) =>
  `/admin/course/units/${unitId}`;
export const adminDeactivateStaffKey = (schoolId: string, staffId: string) =>
  `/admin/school/staff/staffs/${schoolId}/${staffId}/deactivate`;
export const adminActivateStaffKey = (schoolId: string, staffId: string) =>
  `/admin/school/staff/staffs/${schoolId}/${staffId}/activate`;
export const updateSchoolStatusKey = (schoolId: string) =>
  `/admin/school/schools/${schoolId}/active-status`;
export const updateSchoolKey = (schoolId: string) =>
  `/admin/school/schools/${schoolId}`;
export const singleUploadFileKey = "/file/upload";
export const bulkUploadFilesKey = "/file/upload-multiple";

// queries
export const getSchoolsKey = "/admin/school/schools";
export const getSchoolsWithParamKey = (q: string) =>
  `/admin/school/schools?search=${q}`;
export const getAdminAggregatesKey = "/admin/aggregates";
export const getTopTeachersKey = "/admin/top-engaged-teachers";
export const getTopSchoolsKey = "/admin/top-engaged-schools";
export const getCountryDistributionKey = "/admin/country-distribution";
export const getCoursesKey = "/admin/course/courses";
export const getAllSystemStaffsKey = "/admin/school/staff/staffs";
export const adminGetStaffKey = "/admin/school/staff/staffs";
export const getAllSystemAdmins = "/admin/school/staff/owners";

// survey
export const getSurveysKey = "/admin/surveys";
export const getSurveysAggregatesKey = "/admin/surveys/aggregates";

// tickets
export const ticketsKey = "/admin/support-ticket/tickets";
export const createTicketKey = "/support-ticket";
export const getTicketsKey = "/support-ticket/tickets";

// school
export const adminGetSchoolStaffsKey = (id: string) =>
  `/admin/school/schools/${id}/staffs`;
export const adminGetSchoolCertificationsKey = (id: string) =>
  `/admin/school/schools/${id}/certifications`;

// chat
export const sendChatKey = "/chat/";

// public
export const getCoursesPublicKey = "/course/public";
export const retrieveCoursePublicKey = (slug: string) =>
  `/course/public/courses/${slug}`;
export const retrieveCourseUnitPublicKey = (id: string) =>
  `/course/public/units/${id}`;
