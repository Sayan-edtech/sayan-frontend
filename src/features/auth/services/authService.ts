import { api } from "@/lib/axios";
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

    // Append text fields
    formData.append("fname", userData.fname);
    formData.append("lname", userData.lname);
    formData.append("email", userData.email);
    formData.append("phone_number", userData.phone_number);
    formData.append("password", userData.password);
    formData.append("user_type", userData.user_type);

    // Append file if exists
    if (userData.profile_picture) {
      formData.append("profile_picture", userData.profile_picture);
    }

    const response = await api.post<AuthResponse>("/auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  // Forgot password
  async forgotPassword(email: string): Promise<AuthResponse> {
    const response = await api.post("/auth/password/forgot", {
      email,
      redirect_url: `${location.origin}/auth/reset-password`,
    });
    return response.data;
  },
  // Verify account
  async verifyAccount(data: {
    email: string;
    otp: string;
  }): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/otp/verify", data);
    return response.data;
  },
  // Resend OTP
  async resendOtp(email: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/otp/request", {
      email,
      expires_in_minutes: 1,
      purpose: "email_verification",
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

  // Reset password
  async resetPassword(data: {
    new_password: string;
    confirm_password: string;
    verification_token: string;
  }): Promise<AuthResponse> {
    const response = await api.post("/auth/password/reset-with-token", data);
    return response.data;
  },
};
