import { SocialPlatform } from "@shared/config";

export interface Coordinates {
  longitude: number;
  latitude: number;
}

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
}
