import type { PrivacySettings, Profile } from "@entities/user";
import { apiClient } from "@shared/api";

type ProfileSocialLinks = Pick<Profile, "socialLinks">;

export type UpdateProfileSocialLinksDto = {
  profile: ProfileSocialLinks;
  privacySettings: PrivacySettings;
};

export const updateProfileSocialLinks = async (
  data: UpdateProfileSocialLinksDto,
) => {
  const formData = new FormData();

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
