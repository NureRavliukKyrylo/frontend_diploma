import { InstagramIcon, TikTok, LinkedIn } from "@shared/assets/icons/brands";
import {
  TelegramIcon,
  WhatsApp,
  ViberIcon,
} from "@shared/assets/icons/communication";
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
    placeholder: "nick.marlow",
    label: "Enter your Instagram link",
    activeLabel: "Instagram link",
    fieldName: "Profile.SocialLinks[Platform=Instagram]",
  },
  {
    platform: SocialPlatform.Telegram,
    key: "Telegram",
    name: "Telegram",
    icon: TelegramIcon,
    placeholder: "nickmarlow",
    label: "Enter your Telegram link",
    activeLabel: "Telegram link",
    fieldName: "Profile.SocialLinks[Platform=Telegram]",
  },
  {
    platform: SocialPlatform.Viber,
    key: "Viber",
    name: "Viber",
    icon: ViberIcon,
    placeholder: "nickmarlow.chat",
    label: "Enter your Viber link",
    activeLabel: "Viber link",
    fieldName: "Profile.SocialLinks[Platform=Viber]",
  },
  {
    platform: SocialPlatform.WhatsApp,
    key: "WhatsApp",
    name: "WhatsApp",
    icon: WhatsApp,
    placeholder: "nickmarlowdesigns",
    label: "Enter your WhatsApp link",
    activeLabel: "WhatsApp link",
    fieldName: "Profile.SocialLinks[Platform=WhatsApp]",
  },
  {
    platform: SocialPlatform.TikTok,
    key: "TikTok",
    name: "TikTok",
    icon: TikTok,
    placeholder: "@itsmarlow",
    label: "Enter your TikTok link",
    activeLabel: "TikTok link",
    fieldName: "Profile.SocialLinks[Platform=TikTok]",
  },
  {
    platform: SocialPlatform.LinkedIn,
    key: "LinkedIn",
    name: "LinkedIn",
    icon: LinkedIn,
    placeholder: "nick.marlow",
    label: "Enter your LinkedIn link",
    activeLabel: "LinkedIn link",
    fieldName: "Profile.SocialLinks[Platform=LinkedIn]",
  },
];

export const SOCIAL_PLATFORMS_MAP = new Map(
  SOCIAL_PLATFORMS.map((p) => [p.platform, p]),
);
