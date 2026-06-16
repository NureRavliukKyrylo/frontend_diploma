import type { SocialPlatform, SocialPlatformLink } from "@shared/config/types";
import { SocialPlatformItem } from "./SocialPlatformItem";
import { getSocialPlatforms } from "@shared/config/constants";
import type { PrivacySettings } from "@entities/user";
import type { TFunction } from "i18next";

interface SocialPlatformsProps {
  links?: SocialPlatformLink[];
  privacySettings?: PrivacySettings;
  size?: number;
  t: TFunction;
}

export const SocialPlatforms = ({
  links,
  privacySettings,
  size = 33,
  t,
}: SocialPlatformsProps) => {
  const socialPlatforms = getSocialPlatforms(t);

  const privacyLinks = socialPlatforms.reduce<
    { platform: SocialPlatform; url: string }[]
  >((acc, { platform, fieldName }) => {
    console.log(platform);
    const found = links?.find((field) => field.platform == platform);
    console.log("found", found);
    const privacy = privacySettings?.fields?.find(
      (field) => field.fieldName === fieldName,
    );

    if (found && privacy?.visibility !== "private") {
      acc.push({ platform: found.platform, url: found.url });
    }
    console.log(acc);
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
          t={t}
        />
      ))}
    </>
  );
};
