import { AppleIcon, GoogleIcon } from "@shared/assets/icons/brands";
import { OtpType } from "@shared/config/types";

export type ConnectedLinkPlatform = "google" | "apple";

export interface ConnectedLinkConfig {
  platform: ConnectedLinkPlatform;
  imageLink: string;
  linkTitle: string;
  linkDescriprion: string;
  otpType: OtpType;
}

export const CONNECTED_LINKS_CONFIG: ConnectedLinkConfig[] = [
  {
    platform: "google",
    imageLink: GoogleIcon,
    linkTitle: "Google account",
    linkDescriprion: "Stay in sync with Google",
    otpType: OtpType.GoogleUnlink,
  },
  {
    platform: "apple",
    imageLink: AppleIcon,
    linkTitle: "Apple account",
    linkDescriprion: "Stay in sync with Apple",
    otpType: OtpType.EmailVerification,
  },
] as const;
