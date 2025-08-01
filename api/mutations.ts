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
import { apiPostRequest } from "./request";

export async function signup(
  url: string,
  { arg }: { arg: TeacherSignup }
): Promise<TeacherSignupResponse> {
  try {
    console.log({ arg });

    const response = await apiPostRequest<TeacherSignupResponse>(url, arg);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function login(data: Login): Promise<TeacherLoginResponse> {
  try {
    const url = "/auth/login";
    const response = await apiPostRequest<TeacherLoginResponse>(url, data);

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

export async function confirmEmailVerification(data: {
  token: string;
}): Promise<APIBaseResponse> {
  try {
    const url = "/auth/email/verify";
    const response = await apiPostRequest<APIBaseResponse>(url, data);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function requestPasswordReset(data: {
  email: string;
}): Promise<APIBaseResponse> {
  try {
    const url = "/auth/password/request";
    const response = await apiPostRequest<APIBaseResponse>(url, data);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function confirmPasswordReset(
  data: ConfirmPasswordReset
): Promise<APIBaseResponse> {
  try {
    const url = "/auth/password/reset";
    const response = await apiPostRequest<APIBaseResponse>(url, data);

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
  data: TeacherSurveyPayload
): Promise<APIBaseResponse> {
  try {
    const url = "/auth/onboarding/complete";
    const response = await apiPostRequest<TeacherLoginResponse>(url, data);

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
