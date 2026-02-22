import { SOCIAL_PLATFORMS } from "@shared/config/constants";

type SocialLinkEntry = { url: string; visible: boolean };

export const buildSocialLinksPayload = (
  socialLinks: Record<string, SocialLinkEntry>,
) => {
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

  const links = SOCIAL_PLATFORMS.filter(
    ({ key }) => cleanedSocialLinks[key]?.url,
  ).map(({ platform, key }) => ({
    platform,
    url: cleanedSocialLinks[key].url,
  }));

  const privacyFields = SOCIAL_PLATFORMS.filter(
    ({ key }) => cleanedSocialLinks[key]?.url,
  ).map(({ key, fieldName }) => ({
    fieldName,
    visibility: cleanedSocialLinks[key].visible ? 0 : 1,
  }));

  return { links, privacyFields };
};
