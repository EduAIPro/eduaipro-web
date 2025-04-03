import {
  CreateEducatorAccountPayload,
  EducatorLoginResponse,
  EducatorSignup,
  EducatorSignupResponse,
  Login,
} from "@/types/auth";
import { apiPostRequest } from "./request";

export async function signup(
  data: EducatorSignup
): Promise<EducatorSignupResponse> {
  try {
    const url = "/auth/user/signup";
    const response = await apiPostRequest<EducatorSignupResponse>(url, data);

    if (response.data.error) {
      throw response.data.error;
    }

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function login(data: Login): Promise<EducatorLoginResponse> {
  try {
    const url = "/auth/user/signin";
    const response = await apiPostRequest<EducatorLoginResponse>(url, data);

    if (response.data.error) {
      throw response.data.error;
    }

    return response.data;
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
