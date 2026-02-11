import { SocialPlatform } from "@shared/config/types";
import { InstagramIcon, TikTok, LinkedIn } from "@shared/assets/icons/brands";
import {
  TelegramIcon,
  WhatsApp,
  ViberIcon,
} from "@shared/assets/icons/communication";

export const PLATFORM_CONFIG = [
  {
    platform: SocialPlatform.Instagram,
    key: "Instagram",
    label: "Enter your Instagram link",
    activeLabel: "Instagram link",
    icon: InstagramIcon,
  },
  {
    platform: SocialPlatform.Telegram,
    key: "Telegram",
    label: "Enter your Telegram link",
    activeLabel: "Telegram link",
    icon: TelegramIcon,
  },
  {
    platform: SocialPlatform.Viber,
    key: "Viber",
    label: "Enter your Viber link",
    activeLabel: "Viber link",
    icon: ViberIcon,
  },
  {
    platform: SocialPlatform.WhatsApp,
    key: "WhatsApp",
    label: "Enter your What's App link",
    activeLabel: "What's App link",
    icon: WhatsApp,
  },
  {
    platform: SocialPlatform.TikTok,
    key: "TikTok",
    label: "Enter your TikTok link",
    activeLabel: "TikTok  link",
    icon: TikTok,
  },
  {
    platform: SocialPlatform.LinkedIn,
    key: "LinkedIn",
    label: "Enter your LinkedIn link",
    activeLabel: "LinkedIn link",
    icon: LinkedIn,
  },
] as const;
