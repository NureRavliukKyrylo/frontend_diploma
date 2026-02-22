import type { SocialPlatform, SocialPlatformLink } from "@shared/config/types";
import { SocialPlatformItem } from "./SocialPlatformItem";
import { SOCIAL_PLATFORMS } from "@shared/config/constants";
import type { PrivacySettings } from "@entities/user";

interface SocialPlatformsProps {
  links?: SocialPlatformLink[];
  privacySettings?: PrivacySettings;
  size?: number;
}

export const SocialPlatforms = ({
  links,
  privacySettings,
  size = 33,
}: SocialPlatformsProps) => {
  const privacyLinks = SOCIAL_PLATFORMS.reduce<
    { platform: SocialPlatform; url: string }[]
  >((acc, { platform, fieldName }) => {
    const found = links?.find((field) => field.platform == platform);
    const privacy = privacySettings?.fields?.find(
      (field) => field.fieldName === fieldName,
    );
    if (found && privacy?.visibility !== 0) {
      acc.push({ platform: found.platform, url: found.url });
    }

    return acc;
  }, []);

  return (
    <>
      {privacyLinks?.map(({ platform, url }) => (
        <SocialPlatformItem
          key={url}
          platform={platform}
          url={url}
          size={size}
        />
      ))}
    </>
  );
};
