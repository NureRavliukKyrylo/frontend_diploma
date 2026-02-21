import type { PrivacySettings, Profile } from "./profile";
import type { ProfileCompletion } from "./profileCompletionField";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  googleId: string | null;
  email: string;
  registeredAt: string;
  profile: Profile | null;
  googleVerified: boolean;
  googleVerifiedAt: string | null;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  privacySettings: PrivacySettings;
  profileCompletion: ProfileCompletion | null;
  location: {
    address: string;
  };
}
