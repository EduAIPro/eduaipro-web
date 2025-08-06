import { access_token_retrieve } from "@/utils/auth/helpers";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

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
    if (error.status && error.status === 401) {
      window.location.href = "/login";
    }
  }
);

export default api;
