import type { SocialPlatform } from "./SocialPlatform";

export interface SocialPlatformConfig {
  platform: SocialPlatform;
  key: string;
  name: string;
  icon: string;
  placeholder: string;
  label: string;
  activeLabel: string;
  fieldName: string;
}
