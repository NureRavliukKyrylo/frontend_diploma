import { Link } from "@tanstack/react-router";
import { SOCIAL_PLATFORMS_CONFIG } from "@shared/config/constants";
import type { SocialPlatform } from "@shared/config/types/social-links/SocialPlatform";
import styles from "./SocialPlatforms.module.scss";

interface SocialPlatformItemProps {
  platform: SocialPlatform;
  url: string;
  size?: number;
}

export const SocialPlatformItem = ({
  platform,
  url,
  size = 20,
}: SocialPlatformItemProps) => {
  const config = SOCIAL_PLATFORMS_CONFIG[platform];

  return (
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
  );
};
