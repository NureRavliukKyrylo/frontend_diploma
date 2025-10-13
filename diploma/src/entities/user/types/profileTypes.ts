import { SocialPlatform } from "../../../shared/enums";

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
  bio?: string | null;
  phone?: string;
  dateOfBirth?: string | null;
  socialLinks?: SocialLink[];
  coordinates?: Coordinates | null;
}
