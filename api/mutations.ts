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
import { UpdateModulePayload, UpdateModuleResponse } from "@/types/course";
import { setAuthCookes } from "@/utils/auth";
import { PersonalInfoFormValue } from "@/utils/validation/teacher-profile/settings";
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

export async function requestVerifyEmail(data: {
  email: string;
}): Promise<APIBaseResponse> {
  try {
    const url = "/auth/email/request";
    const response = await apiClient<APIBaseResponse>(url, data);

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
