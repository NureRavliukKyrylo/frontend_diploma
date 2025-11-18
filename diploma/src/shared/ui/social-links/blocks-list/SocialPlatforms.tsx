import type { SocialPlatformLink } from "@shared/config/types/social-links/SocialPlatformLink";
import { SocialPlatformItem } from "./SocialPlatformItem";

interface SocialPlatformsProps {
  links: SocialPlatformLink[];
  size?: number;
}

export const SocialPlatforms = ({ links, size = 33 }: SocialPlatformsProps) => {
  return (
    <>
      {links.map(({ platform, url }) => (
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
