import type { User } from "@entities/user/profile";
import { getSocialPlatforms } from "@shared/config/constants";
import type { TFunction } from "i18next";

export const getSocialLinksInitial = (user: User | undefined, t: TFunction) => {
  const socialPlatforms = getSocialPlatforms(t);
  return socialPlatforms.reduce(
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
};
