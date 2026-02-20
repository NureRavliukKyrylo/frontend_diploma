import type { Profile } from "@entities/user";
import { apiClient } from "@shared/api";

type ProfileMainForm = Omit<
  Profile,
  "socialLinks" | "activeProjectCount" | "completedProjectCount"
>;

export type UpdateProfileDto = {
  firstName: string;
  lastName: string;
  avatarFile: File | string | undefined;
  profile: ProfileMainForm;
};

export const updateProfile = async (data: UpdateProfileDto) => {
  const formData = new FormData();

  if (data.firstName) {
    formData.append("firstName", data.firstName);
  }

  if (data.lastName) {
    formData.append("lastName", data.lastName);
  }

  if (data.avatarFile) {
    formData.append("avatarFile", data.avatarFile);
  }

  if (data.profile) {
    formData.append("profile", JSON.stringify(data.profile));
  }

  const response = await apiClient.put("User/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
