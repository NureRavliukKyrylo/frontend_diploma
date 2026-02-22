import type { PrivacySettings, Profile } from "@entities/user";
import { apiClient } from "@shared/api";

type ProfileSocialLinks = Pick<Profile, "socialLinks">;

export type UpdateProfileSocialLinksDto = {
  model: {
    profile: ProfileSocialLinks;
    privacySettings: PrivacySettings;
  };
};

export const updateProfileSocialLinks = async (
  data: UpdateProfileSocialLinksDto,
) => {
  const formData = new FormData();

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
