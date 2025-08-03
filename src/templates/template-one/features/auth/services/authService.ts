import { api } from "@/lib/axios";
import { appendFormData } from "@/lib/formdata";
import type {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  User,
  TokenRefreshResponse,
} from "@/types/user";

export const authService = {
  // Login user
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  // Register user
  async signup(userData: SignupRequest): Promise<AuthResponse> {
    const formData = new FormData();

    appendFormData(formData, userData);

    const response = await api.post<AuthResponse>("/auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Get current user
  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>("/auth/me");
    return response.data;
  },

  // Logout user
  async logout(): Promise<void> {
    await api.post("/auth/logout");
  },

  // Refresh token
  async refreshToken(refreshToken: string): Promise<TokenRefreshResponse> {
    const response = await api.post<TokenRefreshResponse>("/auth/refresh", {
      refresh_token: refreshToken,
    });
    return response.data;
  },

  // Request password reset
  async requestPasswordReset(email: string): Promise<void> {
    await api.post("/auth/forgot-password", { email });
  },

  // Reset password
  async resetPassword(token: string, newPassword: string): Promise<void> {
    await api.post("/auth/reset-password", { token, password: newPassword });
  },
};
