import { UserType } from "@/constants/enums";

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  user_type: UserType;
  profile_picture?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthResponse = {
  user: User;
  access_token: string;
  refresh_token: string;
};

export type TokenRefreshResponse = {
  access_token: string;
  refresh_token: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
  user_type: UserType;
  profile_picture?: File;
};
