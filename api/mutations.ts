import {
  APIBaseResponse,
  ConfirmPasswordReset,
  CreateTeacherAccountPayload,
  Login,
  RefreshTokenPayload,
  RefreshTokenResponse,
  TeacherLoginResponse,
  TeacherSignup,
  TeacherSignupResponse,
  TeacherSurveyPayload,
} from "@/types/auth";
import { setAuthCookes } from "@/utils/auth";
import { apiPostRequest } from "./request";

// const isLocalhost = window.location.host.includes("localhost");

export async function signup(
  url: string,
  { arg }: { arg: TeacherSignup }
): Promise<TeacherSignupResponse> {
  try {
    const response = await apiPostRequest<TeacherSignupResponse>(url, arg);

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
    const response = await apiPostRequest<TeacherLoginResponse>(url, arg);

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
    const response = await apiPostRequest<APIBaseResponse>(url, data);

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
    const response = await apiPostRequest<APIBaseResponse>(url, arg);

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
    const response = await apiPostRequest<APIBaseResponse>(url, arg);

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
    const response = await apiPostRequest<APIBaseResponse>(url, arg);

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
    const response = await apiPostRequest<RefreshTokenResponse>(url, data);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function logOut(
  data: RefreshTokenPayload
): Promise<APIBaseResponse> {
  try {
    const url = "/auth/logout";
    const response = await apiPostRequest<APIBaseResponse>(url, data);

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
    const response = await apiPostRequest<TeacherLoginResponse>(url, arg);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateProfile(data: CreateTeacherAccountPayload) {
  try {
    const url = "/auth/update";
    const response = await apiPostRequest<any>(url, data);

    if (response.data.error) {
      throw response.data.error;
    }

    return response.data;
  } catch (error) {
    throw error;
  }
}
