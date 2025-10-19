export const SocialPlatform = {
  Telegram: 19,
  Instagram: 1,
  Viber: 21,
  WhatsApp: 20,
} as const;

export type SocialPlatform =
  (typeof SocialPlatform)[keyof typeof SocialPlatform];
