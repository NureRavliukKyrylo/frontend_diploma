import type { Profile } from "@entities/user";
import { apiClient } from "@shared/api";

export type UpdateProfileDto = {
  firstName: string;
  lastName: string;
  profile: Profile;
};

export const updateProfile = async (data: UpdateProfileDto) => {
  const formData = new FormData();

  if (data.profile.avatarUrl) {
    formData.append("avatarFile", data.profile.avatarUrl);
  }

  if (data.profile) {
    formData.append("profile", JSON.stringify(data.profile));
    console.log(data.profile.coordinates);
  }

  const response = await apiClient.put("User/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
