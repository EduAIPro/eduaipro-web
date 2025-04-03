import { AxiosError, AxiosResponse } from "axios";
import api from "./base";

interface ApiResponse<T> {
  data: T;
  status: number;
}

export async function apiPostRequest<T>(
  url: string,
  data: any
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await api.post(url, data);

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
      // Handle network errors (no response received)
      throw new Error("Network Error: No response received from the server");
    } else {
      // Handle other errors
      throw new Error(`Error: ${axiosError.message}`);
    }
  }
}
