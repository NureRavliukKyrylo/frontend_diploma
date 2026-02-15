import {
  InstagramIcon,
  TikTok,
  LinkedIn,
  Twitter,
} from "@shared/assets/icons/brands";
import {
  TelegramIcon,
  WhatsApp,
  ViberIcon,
} from "@shared/assets/icons/communication";

export const SOCIAL_PROFILE_CONFIG = [
  {
    key: "instagram",
    placeholder: "nick.marlow",
    icon: InstagramIcon,
  },
  {
    key: "twitter",
    placeholder: "@nickmarlow_",
    icon: Twitter,
  },
  {
    key: "facebook",
    placeholder: "nick.marlow.profile",
    icon: TelegramIcon,
  },
  {
    key: "viber",
    placeholder: "nickmarlow.chat",
    icon: ViberIcon,
  },
  {
    key: "What's App",
    placeholder: "nickmarlowdesigns",
    icon: WhatsApp,
  },
  {
    key: "reddit",
    placeholder: "u/nickmarlow",
    icon: LinkedIn,
  },
  {
    key: "telegram",
    placeholder: "nickmarlow",
    icon: TelegramIcon,
  },
  {
    key: "tiktok",
    placeholder: "@itsmarlow",
    icon: TikTok,
  },
] as const;
