import type { Profile } from "./profile";

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
}
