export const SocialPlatform = {
  Telegram: "telegram",
  Instagram: "instagram",
  Facebook: "facebook",
  X: "x",
  TikTok: "tiktok",
  LinkedIn: "linkedIn",
} as const;

export type SocialPlatform =
  (typeof SocialPlatform)[keyof typeof SocialPlatform];
