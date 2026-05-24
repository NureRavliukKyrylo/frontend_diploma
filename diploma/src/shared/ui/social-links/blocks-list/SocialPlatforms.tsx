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
  console.log(
    "links",
    links?.map((links) => links.platform),
  );
  const privacyLinks = SOCIAL_PLATFORMS.reduce<
    { platform: SocialPlatform; url: string }[]
  >((acc, { platform, fieldName }) => {
    console.log(platform);
    const found = links?.find((field) => field.platform == platform);
    console.log("found", found);
    const privacy = privacySettings?.fields?.find(
      (field) => field.fieldName === fieldName,
    );
    console.log(privacy);
    if (found && privacy?.visibility !== 0) {
      acc.push({ platform: found.platform, url: found.url });
    }
    console.log(acc);
    return acc;
  }, []);

  console.log("result", privacyLinks);

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
