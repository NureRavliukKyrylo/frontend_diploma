export const SocialPlatform = {
  Telegram: 19,
  Instagram: 1,
  Facebook: 0,
  X: 3,
  TikTok: 4,
  LinkedIn: 6,
} as const;

export type SocialPlatform =
  (typeof SocialPlatform)[keyof typeof SocialPlatform];
