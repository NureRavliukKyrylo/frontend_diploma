import { Link } from "@tanstack/react-router";
import { getSocialPlatformsMap } from "@shared/config/constants";
import type { SocialPlatform } from "@shared/config/types/social-links/SocialPlatform";
import styles from "./SocialPlatforms.module.scss";
import type { TFunction } from "i18next";

interface SocialPlatformItemProps {
  platform: SocialPlatform;
  url: string;
  size?: number;
  t: TFunction;
}

export const SocialPlatformItem = ({
  platform,
  url,
  size = 20,
  t,
}: SocialPlatformItemProps) => {
  const socialPlatformsMap = getSocialPlatformsMap(t);
  const config = socialPlatformsMap.get(platform);

  return (
    <>
      {config && (
        <Link
          to={url}
          key={url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.blockSocialPlatformLink}
        >
          <img
            src={config.icon}
            alt={config.name}
            className={styles.imageSocialPlatformLink}
            style={{ width: size, height: size }}
          />
          <h1 className={styles.socialPlatformTitle}>{config.name}</h1>
        </Link>
      )}
    </>
  );
};
