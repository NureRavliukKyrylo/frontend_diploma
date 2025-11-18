import { InstagramIcon, LinkedIn, TikTok } from "@shared/assets/icons/brands";
import {
  TelegramIcon,
  ViberIcon,
  WhatsApp,
} from "@shared/assets/icons/communication";
import { SocialPlatform } from "./types/social-links/SocialPlatform";

export interface SocialPlatformConfig {
  id: SocialPlatform;
  name: string;
  icon: string;
}

export const SOCIAL_PLATFORMS_CONFIG: Record<
  SocialPlatform,
  SocialPlatformConfig
> = {
  [SocialPlatform.Instagram]: {
    id: SocialPlatform.Instagram,
    name: "Instagram",
    icon: InstagramIcon,
  },
  [SocialPlatform.Telegram]: {
    id: SocialPlatform.Telegram,
    name: "Telegram",
    icon: TelegramIcon,
  },
  [SocialPlatform.Viber]: {
    id: SocialPlatform.Viber,
    name: "Viber",
    icon: ViberIcon,
  },
  [SocialPlatform.WhatsApp]: {
    id: SocialPlatform.WhatsApp,
    name: "WhatsApp",
    icon: WhatsApp,
  },
  [SocialPlatform.TikTok]: {
    id: SocialPlatform.TikTok,
    name: "TikTok",
    icon: TikTok,
  },
  [SocialPlatform.LinkedIn]: {
    id: SocialPlatform.LinkedIn,
    name: "LinkedIn",
    icon: LinkedIn,
  },
} as const;
