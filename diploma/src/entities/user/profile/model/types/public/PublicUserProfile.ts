export interface PublicProfileLocation {
  mode: string;
  address: string | null;
  country: string | null;
  city: string | null;
  region: string | null;
  note: string | null;
}

export interface PublicProfileSocialLink {
  platform: string;
  url: string;
}

export interface PublicProfileOrganization {
  organizationId: string;
  name: string;
  logoUrl: string | null;
  roleId: string;
  roleName: string | null;
}

export interface PublicBadgePreview {
  id: string;
  title: string;
  iconUrl: string;
  rank: string;
  description: string | null;
  criteria: string;
}

export interface PublicTimeBankSummary {
  balanceMinutes: number;
  balanceHours: number;
  availableMinutes: number;
  availableHours: number;
  reservedMinutes: number;
  reservedHours: number;
  lifetimeEarnedMinutes: number;
  lifetimeEarnedHours: number;
  lifetimeSpentMinutes: number;
  lifetimeSpentHours: number;
  lifetimeGiftedInMinutes: number;
  lifetimeGiftedInHours: number;
  lifetimeGiftedOutMinutes: number;
  lifetimeGiftedOutHours: number;
  currentLevelCode: string | null;
  lastTransactionAt: string | null;
  updatedAt: string | null;
}

export interface PublicUserProfileDetails {
  bio: string | null;
  phone: string | null;
  dateOfBirth: string | null;
  avatarUrl: string | null;
  socialLinks: PublicProfileSocialLink[];
  badgeIds: string[];
  unlockedBadgesCount: number;
  lockedBadgesCount: number;
  activeProjectCount: number;
  completedProjectCount: number;
  organizations: PublicProfileOrganization[];
  badgesPreview: PublicBadgePreview[];
  timeBank: PublicTimeBankSummary | null;
}

export interface PublicProfileProgress {
  currentProgress: number;
  maxProgress: number;
  level: number | null;
  percent: number;
  totalExp: number;
  currentLevelMinExp: number;
  nextLevelMinExp: number | null;
  expToNextLevel: number;
  isMaxLevel: boolean;
}

export interface PublicProfileRating {
  value: number;
  totalVotes: number;
}

export interface PublicAvailabilitySlot {
  id: string | null;
  date: string | null;
  startDate: string | null;
  endDate: string | null;
  dayOfWeek: number | null;
  startTime: string | null;
  endTime: string | null;
  allDay: boolean;
  isAvailable: boolean;
}

export interface PublicVolunteerSkill {
  skillId: string;
  name: string;
  description: string | null;
  level: string;
  verified: boolean;
  iconUrl: string | null;
  categories: Array<{ id: string; name: string }>;
}

export interface PublicUserProfile {
  id: string;
  firstName: string | null;
  lastName: string | null;
  roleName: string | null;
  registeredAt: string;
  location: PublicProfileLocation | null;
  profile: PublicUserProfileDetails | null;
  progress: PublicProfileProgress;
  rating: PublicProfileRating;
  availability: PublicAvailabilitySlot[];
  skills: PublicVolunteerSkill[];
}
