import { apiClient } from "@shared/api";
import { type Profile, type PrivacySettings } from "@entities/user";

export type UpdateUserDto = {
  avatarFile: File | undefined;
  profile?: Profile;
  privacySettings?: PrivacySettings;
};

export const updateUser = async (data: UpdateUserDto) => {
  const formData = new FormData();

  if (data.avatarFile) {
    formData.append("avatarFile", data.avatarFile);
  }

  if (data.profile) {
    formData.append("profile", JSON.stringify(data.profile));
  }
  if (data.privacySettings) {
    formData.append("privacySettings", JSON.stringify(data.privacySettings));
  }

  const response = await apiClient.put("User/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
