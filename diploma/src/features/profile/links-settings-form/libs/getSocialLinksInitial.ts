import type { User } from "@entities/user/profile";
import { SOCIAL_PLATFORMS } from "@shared/config/constants";

export const getSocialLinksInitial = (user: User | undefined) =>
  SOCIAL_PLATFORMS.reduce(
    (acc, { platform, key, fieldName }) => {
      const found = user?.profile?.socialLinks?.find(
        (l) => l.platform === platform,
      );
      const privacy = user?.privacySettings?.fields?.find(
        (f) => f.fieldName === fieldName,
      );

      acc[key] = {
        url: found?.url ?? "",
        visible: privacy ? privacy.visibility === "private" : false,
      };
      return acc;
    },
    {} as Record<string, { url: string; visible: boolean }>,
  );
