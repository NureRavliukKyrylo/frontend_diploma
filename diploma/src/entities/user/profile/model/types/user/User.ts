import type { SkillProfile } from "@entities/skill";
import type { ConnectedService } from "../services/ConnectedService";
import type { PrivacySettings, Profile } from "../profile/Profile";
import type { ProfileCompletion } from "../profile/ProfileCompletionField";
import type { LevelProgress, Rating } from "@shared/config/types";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  googleId: string | null;
  email: string;
  roleName?: string;
  registeredAt: string;
  profile: Profile | null;
  googleVerified: boolean;
  googleVerifiedAt: string | null;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  privacySettings: PrivacySettings;
  profileCompletion: ProfileCompletion | null;
  connectedServices: ConnectedService[];
  location: {
    address: string;
  };
  skills: SkillProfile[];
  rating: Rating;
  progress: LevelProgress;
}
