import {
  CreateEducatorAccountPayload,
  EducatorLoginResponse,
  EducatorSignup,
  EducatorSignupResponse,
  Login,
  SchoolLogin,
  SchoolLoginResponse,
  SchoolSignupPayload,
  SchoolSignupResponse,
} from "@/types/auth";
import { apiPostRequest } from "./request";

export async function signup(
  payload: EducatorSignup
): Promise<EducatorSignupResponse> {
  try {
    const url = "/auth/user/signup";
    const { data } = await apiPostRequest<EducatorSignupResponse>(url, payload);

    if (data.error) {
      throw data.error;
    }

    localStorage.setItem("accessToken", JSON.stringify(data.data.tokens.token));
    localStorage.setItem(
      "refreshToken",
      JSON.stringify(data.data.tokens.refreshToken)
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function login(payload: Login): Promise<EducatorLoginResponse> {
  try {
    const url = "/auth/user/signin";
    const { data } = await apiPostRequest<EducatorLoginResponse>(url, payload);

    if (data.error) {
      throw data.error;
    }

    localStorage.setItem("accessToken", JSON.stringify(data.data.tokens.token));
    localStorage.setItem(
      "refreshToken",
      JSON.stringify(data.data.tokens.refreshToken)
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateProfile(data: CreateEducatorAccountPayload) {
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

// SCHOOL
export async function schoolSignup(
  data: SchoolSignupPayload
): Promise<SchoolSignupResponse> {
  try {
    const url = "/auth/school/register";
    const response = await apiPostRequest<SchoolSignupResponse>(url, data);

    if (response.data.error) {
      throw response.data.error;
    }

    const { tokens } = response.data.data;

    localStorage.setItem("accessToken", tokens.token);
    localStorage.setItem("refreshToken", tokens.refreshToken);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function schoolLogin(
  data: SchoolLogin
): Promise<SchoolLoginResponse> {
  try {
    const url = "/auth/school/signin";
    const response = await apiPostRequest<SchoolLoginResponse>(url, data);

    if (response.data.error) {
      throw response.data.error;
    }

    const { tokens } = response.data.data;

    localStorage.setItem("accessToken", tokens.token);
    localStorage.setItem("refreshToken", tokens.refreshToken);

    return response.data;
  } catch (error) {
    throw error;
  }
}
