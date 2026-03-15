import { GoogleIcon } from "@shared/assets/icons/brands";

export type ConnectedLinkPlatform = "google";

export interface ConnectedLinkConfig {
  provider: ConnectedLinkPlatform;
  imageLink: string;
  linkTitle: string;
  linkDescriprion: string;
}

export const CONNECTED_LINKS_CONFIG: ConnectedLinkConfig[] = [
  {
    provider: "google",
    imageLink: GoogleIcon,
    linkTitle: "Google account",
    linkDescriprion: "Stay in sync with Google",
  },
] as const;
