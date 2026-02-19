import { InstagramIcon, TikTok, LinkedIn } from "@shared/assets/icons/brands";
import {
  TelegramIcon,
  WhatsApp,
  ViberIcon,
} from "@shared/assets/icons/communication";

export const SOCIAL_PROFILE_CONFIG = [
  { key: "Instagram", placeholder: "nick.marlow", icon: InstagramIcon },
  { key: "Telegram", placeholder: "nickmarlow", icon: TelegramIcon },
  { key: "Viber", placeholder: "nickmarlow.chat", icon: ViberIcon },
  { key: "WhatsApp", placeholder: "nickmarlowdesigns", icon: WhatsApp },
  { key: "TikTok", placeholder: "@itsmarlow", icon: TikTok },
  { key: "LinkedIn", placeholder: "nick.marlow", icon: LinkedIn },
] as const;
