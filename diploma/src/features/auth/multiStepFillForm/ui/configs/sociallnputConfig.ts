import { SocialPlatform } from "../../../../../shared/config";
import {
  InstagramIcon,
  TelegramIcon,
  WhatsApp,
  ViberIcon,
} from "../../../../../shared/assets/common";

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
] as const;
