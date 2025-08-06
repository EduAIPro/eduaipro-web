import { AxiosError, AxiosResponse } from "axios";
import api from "./base";

interface ApiResponse<T> {
  data: T;
  status: number;
}

type ErrorResponse = { statusCode: number; message: string };

export async function apiClient<T>(
  url: string,
  data?: any,
  method: "post" | "patch" | "delete" = "post"
): Promise<ApiResponse<T>> {
  try {
    let response: AxiosResponse<T>;

    switch (method.toLowerCase()) {
      case "post":
        response = await api.post(url, data);
        break;
      case "put":
        response = await api.put(url, data);
        break;
      case "patch":
        response = await api.patch(url, data);
        break;
      case "delete":
        response = await api.delete(url, data);
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }

    // Validate the response data if needed
    if (!response.data) {
      throw new Error("No data returned from the API");
    }

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const axiosError = error as AxiosError;

    if (
      axiosError.response &&
      (axiosError.response.data as any)?.error?.message
    ) {
      // Handle HTTP errors (4xx, 5xx)
      throw (axiosError.response.data as any)?.error?.message;
    } else if (axiosError.request) {
      const message = (axiosError.response?.data as ErrorResponse)?.message;

      throw message;
    } else {
      // Handle other errors
      throw axiosError.message;
    }
  }
}
