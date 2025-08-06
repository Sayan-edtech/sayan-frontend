import axios from "axios";
import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { authCookies } from "@/lib/cookies";
import { Pages, Routes } from "@/constants/enums";

// Create axios instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = authCookies.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors and token refresh
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = authCookies.getRefreshToken();
      if (refreshToken) {
        try {
          // Try to refresh the token
          const response = await axios.post(
            `${api.defaults.baseURL}/auth/refresh`,
            {
              refresh_token: refreshToken,
            }
          );

          const { access_token, refresh_token: newRefreshToken } =
            response.data;

          // Update tokens in cookies
          authCookies.setTokens(access_token, newRefreshToken);

          // Update the original request with new token
          originalRequest.headers.Authorization = `Bearer ${access_token}`;

          // Retry the original request
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          // Clear invalid auth cookies and redirect to login
          authCookies.clearAll();
          window.location.href = `${Routes.AUTH}/${Pages.SIGNIN}`;
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token available, clear auth and redirect
        authCookies.clearAll();
        window.location.href = `${Routes.AUTH}/${Pages.SIGNIN}`;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
