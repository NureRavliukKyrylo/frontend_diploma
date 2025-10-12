export const SocialPlatform = {
  Telegram: 0,
  Instagram: 1,
  Viber: 2,
  WhatsApp: 3,
} as const;

export type SocialPlatform =
  (typeof SocialPlatform)[keyof typeof SocialPlatform];
