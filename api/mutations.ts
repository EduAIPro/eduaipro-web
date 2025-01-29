import { EducatorSignup, EducatorSignupResponse } from "@/types/auth";
import { apiPostRequest } from "./request";

export async function signup(
  data: EducatorSignup
): Promise<EducatorSignupResponse> {
  const url = "/auth/user/signup";
  const response = await apiPostRequest<EducatorSignupResponse>(url, data);

  if (response.data.error) {
    throw new Error(response.data.error);
  }

  return response.data;
}
