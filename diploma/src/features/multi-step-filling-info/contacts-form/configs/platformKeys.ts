import { SocialPlatform } from "@shared/config/types";

export const platformKeys: Record<SocialPlatform, string> = {
  [SocialPlatform.Telegram]: "Telegram",
  [SocialPlatform.Instagram]: "Instagram",
  [SocialPlatform.Viber]: "Viber",
  [SocialPlatform.WhatsApp]: "WhatsApp",
  [SocialPlatform.TikTok]: "TikTok",
  [SocialPlatform.LinkedIn]: "LinkedIn",
};
