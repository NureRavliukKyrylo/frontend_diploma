import { SocialPlatform } from "@shared/config/types";
import { SOCIAL_PROFILE_CONFIG } from "../config/socialProfileConfig";
import type { User } from "@entities/user/profile";

export const getSocialLinksInitial = (user: User | undefined) =>
  SOCIAL_PROFILE_CONFIG.reduce(
    (acc, { key }) => {
      const found = user?.profile?.socialLinks?.find(
        (link) =>
          link.platform === SocialPlatform[key as keyof typeof SocialPlatform],
      );

      const privacy = user?.privacySettings?.fields?.find(
        (field) => field.fieldName === `Profile.SocialLinks[Platform=${key}]`,
      );

      acc[key] = {
        url: found?.url ?? "",
        visible: privacy ? privacy.visibility === 0 : false,
      };
      return acc;
    },
    {} as Record<string, { url: string; visible: boolean }>,
  );
