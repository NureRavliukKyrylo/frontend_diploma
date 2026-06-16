import {
  InstagramIcon,
  TikTok,
  LinkedIn,
  FacebookIcon,
  TwitterIcon,
} from "@shared/assets/icons/brands";
import { TelegramIcon } from "@shared/assets/icons/communication";
import {
  SocialPlatform,
  type SocialPlatformConfig,
} from "@shared/config/types";
import type { TFunction } from "i18next";

export const getSocialPlatforms = (t: TFunction): SocialPlatformConfig[] => [
  {
    platform: SocialPlatform.Instagram,
    key: "Instagram",
    name: "Instagram",
    icon: InstagramIcon,
    placeholder: "instagram.com/nick.marlow",
    label: t("common:socials.instagram.label"),
    activeLabel: t("common:socials.instagram.activeLabel"),
    fieldName: "Profile.SocialLinks[Platform=Instagram]",
  },
  {
    platform: SocialPlatform.Telegram,
    key: "Telegram",
    name: "Telegram",
    icon: TelegramIcon,
    placeholder: "t.me/nickmarlow",
    label: t("common:socials.telegram.label"),
    activeLabel: t("common:socials.telegram.activeLabel"),
    fieldName: "Profile.SocialLinks[Platform=Telegram]",
  },
  {
    platform: SocialPlatform.X,
    key: "X",
    name: "X",
    icon: TwitterIcon,
    placeholder: "x.com/nickmarlowdesigns",
    label: t("common:socials.x.label"),
    activeLabel: t("common:socials.x.activeLabel"),
    fieldName: "Profile.SocialLinks[Platform=X]",
  },
  {
    platform: SocialPlatform.TikTok,
    key: "TikTok",
    name: "TikTok",
    icon: TikTok,
    placeholder: "tiktok.com/@itsmarlow",
    label: t("common:socials.tiktok.label"),
    activeLabel: t("common:socials.tiktok.activeLabel"),
    fieldName: "Profile.SocialLinks[Platform=TikTok]",
  },
  {
    platform: SocialPlatform.Facebook,
    key: "Facebook",
    name: "Facebook",
    icon: FacebookIcon,
    placeholder: "facebook.com/nickmarlow.chat",
    label: t("common:socials.facebook.label"),
    activeLabel: t("common:socials.facebook.activeLabel"),
    fieldName: "Profile.SocialLinks[Platform=Facebook]",
  },
  {
    platform: SocialPlatform.LinkedIn,
    key: "LinkedIn",
    name: "LinkedIn",
    icon: LinkedIn,
    placeholder: "linkedin.com/in/nick-marlow",
    label: t("common:socials.linkedin.label"),
    activeLabel: t("common:socials.linkedin.activeLabel"),
    fieldName: "Profile.SocialLinks[Platform=LinkedIn]",
  },
];

export const getSocialPlatformsMap = (t: TFunction) =>
  new Map(getSocialPlatforms(t).map((p) => [p.platform, p]));
