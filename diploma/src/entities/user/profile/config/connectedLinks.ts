import { GoogleIcon } from "@shared/assets/icons/brands";
import { OtpType } from "@shared/config/types";

export type ConnectedLinkPlatform = "google";

export interface ConnectedLinkConfig {
  provider: ConnectedLinkPlatform;
  imageLink: string;
  linkTitle: string;
  linkDescriprion: string;
  otpType: OtpType;
}

export const CONNECTED_LINKS_CONFIG: ConnectedLinkConfig[] = [
  {
    provider: "google",
    imageLink: GoogleIcon,
    linkTitle: "Google account",
    linkDescriprion: "Stay in sync with Google",
    otpType: OtpType.GoogleUnlink,
  },
] as const;
