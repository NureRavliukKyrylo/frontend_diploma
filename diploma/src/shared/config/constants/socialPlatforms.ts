import {
  InstagramIcon,
  TikTok,
  LinkedIn,
  FacebookIcon,
  TwitterIcon,
} from "@shared/assets/icons/brands";
import { TelegramIcon } from "@shared/assets/icons/communication";
import {
  SocialPlatform,
  type SocialPlatformConfig,
} from "@shared/config/types";

export const SOCIAL_PLATFORMS: SocialPlatformConfig[] = [
  {
    platform: SocialPlatform.Instagram,
    key: "Instagram",
    name: "Instagram",
    icon: InstagramIcon,
    placeholder: "instagram.com/nick.marlow",
    label: "Enter your Instagram link",
    activeLabel: "Instagram link",
    fieldName: "Profile.SocialLinks[Platform=Instagram]",
  },
  {
    platform: SocialPlatform.Telegram,
    key: "Telegram",
    name: "Telegram",
    icon: TelegramIcon,
    placeholder: "t.me/nickmarlow",
    label: "Enter your Telegram link",
    activeLabel: "Telegram link",
    fieldName: "Profile.SocialLinks[Platform=Telegram]",
  },
  {
    platform: SocialPlatform.X,
    key: "X",
    name: "X",
    icon: TwitterIcon,
    placeholder: "x.com/nickmarlowdesigns",
    label: "Enter your X link",
    activeLabel: "X link",
    fieldName: "Profile.SocialLinks[Platform=X]",
  },
  {
    platform: SocialPlatform.TikTok,
    key: "TikTok",
    name: "TikTok",
    icon: TikTok,
    placeholder: "tiktok.com/@itsmarlow",
    label: "Enter your TikTok link",
    activeLabel: "TikTok link",
    fieldName: "Profile.SocialLinks[Platform=TikTok]",
  },
  {
    platform: SocialPlatform.Facebook,
    key: "Facebook",
    name: "Facebook",
    icon: FacebookIcon,
    placeholder: "facebook.com/nickmarlow.chat",
    label: "Enter your Facebook link",
    activeLabel: "Facebook link",
    fieldName: "Profile.SocialLinks[Platform=Facebook]",
  },
  {
    platform: SocialPlatform.LinkedIn,
    key: "LinkedIn",
    name: "LinkedIn",
    icon: LinkedIn,
    placeholder: "linkedin.com/in/nick-marlow",
    label: "Enter your LinkedIn link",
    activeLabel: "LinkedIn link",
    fieldName: "Profile.SocialLinks[Platform=LinkedIn]",
  },
];

export const SOCIAL_PLATFORMS_MAP = new Map(
  SOCIAL_PLATFORMS.map((p) => [p.platform, p]),
);
