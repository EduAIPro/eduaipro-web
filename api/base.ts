import { deleteRefreshToken } from "@/utils/auth";
import { access_token_retrieve } from "@/utils/auth/helpers";
import {
  emitBillingError,
  isBillingErrorCode,
  messageText,
} from "@/lib/billing-errors";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

type ErrorResponse = {
  statusCode?: number;
  message: string | string[];
  code?: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const PUBLIC_ROUTES = [
  "/auth/register/teacher",
  "/auth/login",
  "/auth/refresh",
  "/auth/logout",
  "/auth/password/request",
  "/auth/password/reset",
];

let refreshPromise: string | null = null;

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

const authInterceptor = async (config: InternalAxiosRequestConfig) => {
  const publicRoute = PUBLIC_ROUTES.includes(config.url || "");
  if (!publicRoute) {
    const access_token = await access_token_retrieve(refreshPromise);

    if (access_token) {
      config.headers["Authorization"] = access_token;
    }
  }
  return config;
};

api.interceptors.request.use(authInterceptor, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (val) => val,
  (error: AxiosError) => {
    const axiosError = error;

    if (axiosError.config?.headers?.["x-raw-error"]) {
      return Promise.reject(axiosError);
    }

    if (error.status && error.status === 401) {
      sessionStorage.clear();
      deleteRefreshToken().then(() => (window.location.href = "/login"));
    }
    if (
      axiosError.response &&
      (axiosError.response.data as ErrorResponse)?.message
    ) {
      // Handle HTTP errors (4xx, 5xx)
      const data = axiosError.response.data as ErrorResponse;
      const message = messageText(data.message);

      // Pricing v3 402s are handled once, globally (see BillingErrorGate).
      if (axiosError.response.status === 402 && isBillingErrorCode(data.code)) {
        emitBillingError({ code: data.code, message });
      }

      throw message;
    } else if (axiosError.request) {
      const message = (axiosError.response?.data as ErrorResponse)?.message;

      throw message;
    } else {
      // Handle other errors
      throw axiosError.message;
    }
  }
);

export default api;
