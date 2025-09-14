import { AdminSchool } from "@/types/admin";
import {
  BulkFilesUploadResponse,
  CreateCoursePayload,
} from "@/types/admin/courses";
import { SendNotificationPayload } from "@/types/admin/notifications";
import { CreateSurveyPayload, TableSurvey } from "@/types/admin/surveys";
import { AssessmentSubmitResponse } from "@/types/assessment";
import {
  APIBaseResponse,
  ChangePasswordPayload,
  ConfirmPasswordReset,
  Login,
  RefreshTokenPayload,
  RefreshTokenResponse,
  TeacherLoginResponse,
  TeacherSignup,
  TeacherSignupResponse,
  TeacherSurveyPayload,
} from "@/types/auth";
import {
  Course,
  UpdateModulePayload,
  UpdateModuleResponse,
} from "@/types/course";
import {
  SchoolSignupPayload,
  UpdatePersonalInfoPayload,
  UpdateSchoolInfoPayload,
  UpdateSchoolInfoResponse,
} from "@/types/school/auth";
import { Staff } from "@/types/user";
import { setAuthCookes } from "@/utils/auth";
import {
  SupportTicket,
  UpdateTicketPayload,
} from "@/utils/validation/admin/support";
import { PersonalInfoFormValue } from "@/utils/validation/teacher-profile/settings";
import { toast } from "sonner";
import { apiClient } from "./request";

// const isLocalhost = window.location.host.includes("localhost");

// AUTHENTICATION
export async function signup(
  url: string,
  { arg }: { arg: TeacherSignup }
): Promise<TeacherSignupResponse> {
  try {
    const response = await apiClient<TeacherSignupResponse>(url, arg);

    await setAuthCookes(response.data.data.tokens.refresh);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function schoolSignup(
  url: string,
  { arg }: { arg: SchoolSignupPayload }
): Promise<TeacherSignupResponse> {
  try {
    const response = await apiClient<TeacherSignupResponse>(url, arg);

    await setAuthCookes(response.data.data.tokens.refresh);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function login(
  url: string,
  { arg }: { arg: Login }
): Promise<TeacherLoginResponse> {
  try {
    const response = await apiClient<TeacherLoginResponse>(url, arg);

    await setAuthCookes(response.data.data.tokens.refresh);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function requestVerifyEmail(
  url: string,
  { arg }: { arg: { email: string } }
): Promise<APIBaseResponse> {
  try {
    const response = await apiClient<APIBaseResponse>(url, arg);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function confirmEmailVerification(
  url: string,
  { arg }: { arg: { token: string } }
): Promise<APIBaseResponse> {
  try {
    const response = await apiClient<APIBaseResponse>(url, arg);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function requestPasswordReset(
  url: string,
  { arg }: { arg: { email: string } }
): Promise<APIBaseResponse> {
  try {
    const response = await apiClient<APIBaseResponse>(url, arg);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function confirmPasswordReset(
  url: string,
  { arg }: { arg: ConfirmPasswordReset }
): Promise<APIBaseResponse> {
  try {
    const response = await apiClient<APIBaseResponse>(url, arg);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function changePassword(
  url: string,
  { arg }: { arg: ChangePasswordPayload }
): Promise<APIBaseResponse> {
  try {
    const response = await apiClient<APIBaseResponse>(url, arg, "patch");

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function refreshToken(
  data: RefreshTokenPayload
): Promise<RefreshTokenResponse> {
  try {
    const url = "/auth/refresh";
    const response = await apiClient<RefreshTokenResponse>(url, data);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateTeacherProfile(
  url: string,
  { arg }: { arg: PersonalInfoFormValue }
): Promise<APIBaseResponse> {
  try {
    const response = await apiClient<APIBaseResponse>(url, arg, "patch");

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function logOut(
  url: string,
  { arg }: { arg: RefreshTokenPayload }
): Promise<APIBaseResponse> {
  try {
    const response = await apiClient<APIBaseResponse>(url, arg);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function completeSurvey(
  url: string,
  { arg }: { arg: TeacherSurveyPayload }
): Promise<APIBaseResponse> {
  try {
    const response = await apiClient<TeacherLoginResponse>(url, arg);

    return response.data;
  } catch (error) {
    throw error;
  }
}

// COURSES
export async function updateModule(
  url: string,
  { arg }: { arg: UpdateModulePayload }
): Promise<UpdateModuleResponse> {
  try {
    const response = await apiClient<UpdateModuleResponse>(url, arg, "patch");

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function submitAssessment(
  url: string,
  { arg }: { arg: { [q: number]: string } }
): Promise<AssessmentSubmitResponse> {
  try {
    const answers = Object.entries(arg).map(([key, value]) => ({
      index: Number(key),
      answer: value,
    }));

    const response = await apiClient<{ data: AssessmentSubmitResponse }>(url, {
      answers,
    });

    return response.data?.data;
  } catch (error) {
    throw error;
  }
}

// SCHOOL
export async function sendInvitation(
  url: string,
  { arg }: { arg: { email: string } }
): Promise<boolean> {
  try {
    await apiClient(url, arg);

    return true;
  } catch (error) {
    throw error;
  }
}

export async function updatePersonalInfo(
  url: string,
  { arg }: { arg: Partial<UpdatePersonalInfoPayload> }
): Promise<boolean> {
  try {
    await apiClient(url, arg, "patch");

    return true;
  } catch (error) {
    toast.error(error as string);
    throw error;
  }
}

export async function updateSchoolInfo(
  url: string,
  { arg }: { arg: Partial<UpdateSchoolInfoPayload> }
): Promise<UpdateSchoolInfoResponse> {
  try {
    const response = await apiClient<UpdateSchoolInfoResponse>(
      url,
      arg,
      "patch"
    );

    return response.data;
  } catch (error) {
    toast.error(error as string);
    throw error;
  }
}

export async function deactivateStaff(
  url: string,
  { arg }: { arg: { staffId: string } }
): Promise<Staff> {
  try {
    const apiUrl = url + `/${arg.staffId}/deactivate`;
    const response = await apiClient<Staff>(apiUrl, undefined, "patch");

    return response.data;
  } catch (error) {
    toast.error(error as string);
    throw error;
  }
}

export async function reactivateStaff(
  url: string,
  { arg }: { arg: { staffId: string } }
): Promise<Staff> {
  try {
    const apiUrl = url + `/${arg.staffId}/activate`;
    const response = await apiClient<Staff>(apiUrl, undefined, "patch");

    return response.data;
  } catch (error) {
    toast.error(error as string);
    throw error;
  }
}

// ADMIN
export async function editSchoolInfo(
  url: string,
  { arg }: { arg: Partial<UpdateSchoolInfoPayload> }
): Promise<UpdateSchoolInfoResponse> {
  try {
    const response = await apiClient<UpdateSchoolInfoResponse>(
      url,
      arg,
      "patch"
    );

    return response.data;
  } catch (error) {
    toast.error(error as string);
    throw error;
  }
}

export async function updateSchoolStatus(
  url: string,
  { arg }: { arg: { active: boolean } }
): Promise<AdminSchool> {
  try {
    const response = await apiClient<AdminSchool>(url, arg, "patch");

    return response.data;
  } catch (error) {
    toast.error(error as string);
    throw error;
  }
}

export async function sendMessageNotification(
  url: string,
  { arg }: { arg: SendNotificationPayload }
): Promise<{ success: boolean }> {
  try {
    const response = await apiClient<{ success: boolean }>(url, arg);

    return response.data;
  } catch (error) {
    toast.error(error as string);
    throw error;
  }
}

// courses
export async function createCourse(
  url: string,
  { arg }: { arg: CreateCoursePayload }
): Promise<Course> {
  try {
    const response = await apiClient<Course>(url, arg);

    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function deleteCourse(
  url: string,
  { arg }: { arg: { id: string } }
): Promise<{ message: string }> {
  try {
    const response = await apiClient<{ message: string }>(
      `${url}/${arg.id}`,
      undefined,
      "delete"
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

// files
export async function bulkUploadFiles(
  url: string,
  { arg }: { arg: { files: File[] } }
): Promise<BulkFilesUploadResponse> {
  try {
    const formData = new FormData();
    arg.files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await apiClient<{ data: BulkFilesUploadResponse }>(
      url,
      formData,
      "post",
      true
    );

    return response.data.data;
  } catch (error) {
    throw error;
  }
}

// surveys
export async function createSurvey(
  url: string,
  { arg }: { arg: CreateSurveyPayload }
): Promise<TableSurvey> {
  try {
    const response = await apiClient<{ data: TableSurvey }>(url, arg);

    return response.data.data;
  } catch (error) {
    throw error;
  }
}
export async function deleteSurvey(
  url: string,
  { arg }: { arg: { id: string } }
): Promise<{ message: string }> {
  try {
    const response = await apiClient<{ message: string }>(
      `${url}/${arg.id}`,
      undefined,
      "delete"
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

// tickets
export async function updateTicket(
  url: string,
  { arg }: { arg: UpdateTicketPayload }
): Promise<SupportTicket> {
  try {
    const response = await apiClient<{ data: SupportTicket }>(
      url,
      arg,
      "patch"
    );

    return response.data.data;
  } catch (error) {
    throw error;
  }
}
