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
export const signupSchoolKey = "/auth/register/teacher";
export const acceptBulkInviteKey = "/school/invite/accept";
export const bulkSchoolInviteKey = "/school/invite/bulk";
export const schoolInviteKey = "/school/invite";
export const updateSchoolInfoKey = "/school";
export const updatePersonalInfoKey = "/school/staff";
// export const updateSchoolInfoKey = "/school/staff/staffs/:id/deactivate";

// queries
export const getSchoolInfo = "/school";
export const getSchoolAnalyticsKey = "/school/aggregates";
export const getSchoolStaffsKey = "/school/staff/staffs";
export const getSchoolInviteLinkKey = "/school/invite/link";
export const getOverdueRenewalsKey = "/school/accreditation-renewals";

export const getSchoolsKey = "/admin/schools";
