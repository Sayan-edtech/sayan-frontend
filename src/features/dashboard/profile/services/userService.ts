import { api } from "@/lib/axios";
import type { User } from "@/types/user";

export interface UserProfile {
  status: string;
  status_code: number;
  error_type: string | null;
  message: string;
  data: User;
}

export interface UpdateUserProfileRequest {
  fname?: string;
  lname?: string;
  phone_number?: string;
  bio?: string;
  location?: string;
  website?: string;
  social_links?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface UpdateProfilePictureRequest {
  profile_picture: File;
}

export const userService = {
  // Get current user profile
  async getCurrentUserProfile(): Promise<User> {
    const response = await api.get<UserProfile>("/me");
    return response.data.data;
  },

  // Get user profile by ID
  async getUserProfile(userId: string): Promise<User> {
    const response = await api.get<UserProfile>(`/user/profile/${userId}`);
    return response.data.data;
  },

  // Update user profile
  async updateUserProfile(data: UpdateUserProfileRequest): Promise<User> {
    const response = await api.put<UserProfile>("/user/profile", data);
    return response.data.data;
  },

  // Update profile picture
  async updateProfilePicture(data: UpdateProfilePictureRequest): Promise<User> {
    const formData = new FormData();
    formData.append("profile_picture", data.profile_picture);

    const response = await api.put<UserProfile>(
      "/user/profile/picture",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  },

  // Delete profile picture
  async deleteProfilePicture(): Promise<User> {
    const response = await api.delete<UserProfile>("/user/profile/picture");
    return response.data.data;
  },
};
