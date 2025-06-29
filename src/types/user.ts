import { UserType } from "@/constants/enums";

export type User = {
  id: string;
  email: string;
  fname: string;
  lname: string;
  user_type: UserType;
  verified: boolean;
};

export type AuthResponse = {
  status_code: number;
  message: string;
  user: User;
  data: {
    user_data: User;
    access_token: string;
    refresh_token: string;
  };
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
  fname: string;
  lname: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  user_type: UserType;
  profile_picture?: File;
};
