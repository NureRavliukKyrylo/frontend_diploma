import { SocialPlatform } from "../../../../../shared/enums";
import {
  InstagramIcon,
  TelegramIcon,
  WhatsApp,
  ViberIcon,
} from "../../../../../shared/assets/common";

export const PLATFORM_CONFIG = [
  {
    platform: SocialPlatform.Instagram,
    key: "instagram",
    label: "Enter your Instagram link",
    activeLabel: "Instagram link",
    icon: InstagramIcon,
  },
  {
    platform: SocialPlatform.Telegram,
    key: "telegram",
    label: "Enter your Telegram link",
    activeLabel: "Telegram link",
    icon: TelegramIcon,
  },
  {
    platform: SocialPlatform.Viber,
    key: "viber",
    label: "Enter your Viber link",
    activeLabel: "Viber link",
    icon: ViberIcon,
  },
  {
    platform: SocialPlatform.WhatsApp,
    key: "whatsApp",
    label: "Enter your What's App link",
    activeLabel: "What's App link",
    icon: WhatsApp,
  },
] as const;
