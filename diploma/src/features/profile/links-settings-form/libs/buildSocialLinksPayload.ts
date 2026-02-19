import { SocialPlatform } from "@shared/config/types";
import { SOCIAL_PROFILE_CONFIG } from "../config/socialProfileConfig";

export const buildSocialLinksPayload = (
  socialLinks: Record<string, { url: string; visible: boolean }>,
) => {
  const links = SOCIAL_PROFILE_CONFIG.filter(
    ({ key }) => socialLinks[key]?.url,
  ).map(({ key }) => ({
    platform: SocialPlatform[key as keyof typeof SocialPlatform],
    url: socialLinks[key].url,
  }));

  const privacyFields = SOCIAL_PROFILE_CONFIG.map(({ key }) => ({
    fieldName: `Profile.SocialLinks[Platform=${key}]`,
    visibility: socialLinks[key]?.visible ? 0 : 1,
  }));

  return { links, privacyFields };
};
