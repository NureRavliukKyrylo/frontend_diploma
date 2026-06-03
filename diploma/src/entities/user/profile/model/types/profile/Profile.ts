import type { Badge } from "@entities/badge";
import type { Organization } from "@entities/organization";
import {
  type Coordinates,
  type SocialPlatformLink,
} from "@shared/config/types";

export interface PrivacyField {
  fieldName: string;
  visibility: "public" | "private";
}

export interface PrivacySettings {
  fields?: PrivacyField[];
}

export interface Profile {
  bio?: string;
  phone?: string;
  dateOfBirth?: string;
  socialLinks?: SocialPlatformLink[];
  coordinates?: Coordinates | null;
  avatarUrl?: string;
  activeProjectCount?: number;
  completedProjectCount?: number;
  organizations?: Organization[];
  badgesPreview?: Badge[];
}
