import type { Profile } from "@entities/user";
import { apiClient } from "@shared/api";

type ProfileMainForm = Omit<
  Profile,
  "socialLinks" | "activeProjectCount" | "completedProjectCount"
>;

export type UpdateProfileDto = {
  model: {
    firstName: string;
    lastName: string;
    profile: Omit<ProfileMainForm, "timeBank">;
  };

  avatarFile: File | string | undefined;
};

export const updateProfile = async (data: UpdateProfileDto) => {
  const formData = new FormData();

  if (data.avatarFile) {
    formData.append("avatarFile", data.avatarFile);
  }

  if (data.model) {
    formData.append("model", JSON.stringify(data.model));
  }

  const response = await apiClient.put("User/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
