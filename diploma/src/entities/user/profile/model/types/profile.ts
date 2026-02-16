import { SocialPlatform, type Coordinates } from "@shared/config/types";

export interface PrivacyField {
  fieldName: string;
  visibility: number;
}

export interface PrivacySettings {
  fields?: PrivacyField[];
}

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export interface Profile {
  bio?: string;
  phone?: string;
  dateOfBirth?: string;
  socialLinks?: SocialLink[];
  coordinates?: Coordinates | null;
  avatarUrl?: string;
}
