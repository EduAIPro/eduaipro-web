// QUERIES
export const getMe = "/auth/me";
export const getStaff = "/school/staff";

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

// courses
export const updateModuleKey = "/course/active/progress";
export const generateUnitQuestions = "/course/active/unit/questions";
export const submitAssessmentKey = "/course/active/unit/questions/submit";
