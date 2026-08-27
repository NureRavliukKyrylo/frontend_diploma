import { getSocialPlatforms } from "@shared/config/constants";
import type { TFunction } from "i18next";

type SocialLinkEntry = { url: string; visible: boolean };

export const buildSocialLinksPayload = (
  socialLinks: Record<string, SocialLinkEntry>,
  t: TFunction,
) => {
  const socialPlatforms = getSocialPlatforms(t);
  const cleanedSocialLinks = Object.fromEntries(
    Object.entries(socialLinks)
      .map(([key, value]): [string, SocialLinkEntry] => [
        key,
        {
          url: value.url?.trim(),
          visible: value.visible,
        },
      ])
      .filter(([_, value]) => value.url !== "" && value.url != null),
  ) as Record<string, SocialLinkEntry>;

  const links = socialPlatforms
    .filter(({ key }) => cleanedSocialLinks[key]?.url)
    .map(({ platform, key }) => ({
      platform,
      url: cleanedSocialLinks[key].url,
    }));

  const privacyFields = socialPlatforms
    .filter(({ key }) => cleanedSocialLinks[key]?.url)
    .map(({ key, fieldName }) => ({
      fieldName,
      visibility: cleanedSocialLinks[key].visible ? 0 : 1,
    }));

  return { links, privacyFields };
};
