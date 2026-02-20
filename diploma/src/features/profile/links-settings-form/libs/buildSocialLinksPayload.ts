import { SOCIAL_PLATFORMS } from "@shared/config/constants";

export const buildSocialLinksPayload = (
  socialLinks: Record<string, { url: string; visible: boolean }>,
) => {
  const links = SOCIAL_PLATFORMS.filter(({ key }) => socialLinks[key]?.url).map(
    ({ platform, key }) => ({ platform, url: socialLinks[key].url }),
  );

  const privacyFields = SOCIAL_PLATFORMS.map(({ key, fieldName }) => ({
    fieldName,
    visibility: socialLinks[key]?.visible ? 0 : 1,
  }));

  return { links, privacyFields };
};
