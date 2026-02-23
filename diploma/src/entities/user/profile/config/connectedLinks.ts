import { AppleIcon, GoogleIcon } from "@shared/assets/icons/brands";

export interface ConnectedLink {
  platform: string;
  imageLink: string;
  linkTitle: string;
  linkDescriprion: string;
}

export const CONNECTED_LINKS_CONFIG: ConnectedLink[] = [
  {
    platform: "Google",
    imageLink: GoogleIcon,
    linkTitle: "Google account",
    linkDescriprion: "Stay in sync with Google ",
  },
  {
    platform: "Apple",
    imageLink: AppleIcon,
    linkTitle: "Apple account",
    linkDescriprion: "Stay in sync with Apple",
  },
] as const;
