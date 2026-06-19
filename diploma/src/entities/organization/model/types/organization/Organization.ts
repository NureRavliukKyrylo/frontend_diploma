import type { Project } from "@entities/project";
import type { ParticipationMember } from "@entities/participation";
import type { Coordinates } from "@shared/config/types";

export interface OrganizationCategoryStats {
  categoryId: string;
  name: string;
  imageUrl?: string | null;
  tasksTotal: number;
  tasksActive: number;
}

export interface OrganizationSocialLink {
  platform?: string;
  title?: string;
  url: string;
}

export interface OrganizationLocationInfo {
  mode?: string;
  address?: string | null;
  country?: string | null;
  city?: string | null;
  region?: string | null;
  note?: string | null;
}

export interface OrganizationMember {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string | null;
  avatarUrl?: string | null;
  role?: string | null;
}

export type OrganizationRating =
  | number
  | string
  | {
      value?: number | string | null;
      totalVotes?: number | null;
      detailInfo?: Array<{
        value: number;
        totalVotes: number;
        percentOfAll: number;
      }>;
    };

export interface Organization {
  id: string;
  organizationId?: string;
  name: string;
  description?: string;
  logoUrl?: string | null;
  location?: Coordinates;
  locationInfo?: OrganizationLocationInfo | null;
  projects?: Project[];
  rating?: OrganizationRating;
  totalActivities?: number;
  activeCount?: number;
  progressPercent?: number;
  maxProgress?: number;
  memberCount?: number;
  memberPreviews?: ParticipationMember[];
  ownerId?: string;
  createdAt?: string;
  launchDate?: string | null;
  contactEmail?: string | null;
  website?: string | null;
  phoneNumber?: string | null;
  joinPolicy?: string | null;
  leavePolicy?: string | null;
  socialLinks?: OrganizationSocialLink[];
  isArchived?: boolean;
  categories?: string[];
  categoryStats?: OrganizationCategoryStats[];
  members?: OrganizationMember[];
  totalTasks?: number;
  activeTasks?: number;
  activeProjects?: number;
  activeEvents?: number;
  level?: number;
  shareUrl?: string;
}
