import type { Category } from "@entities/category";
import type { Organization } from "@entities/organization";
import type { ParticipationMember } from "@entities/participation";
import type {
  Coordinates,
  EntityStatus,
  LevelProgress,
  Policy,
  Rating,
} from "@shared/config/types";

export interface Project {
  id: string;
  title: string;
  description: string;
  organizationId?: string;
  startAt: string;
  endAt: string;
  progress: LevelProgress;
  progressPercent?: number;
  tasksTotal: number;
  eventsTotal: number;
  tasksCompleted: number;
  eventsCompleted: number;
  activeTasks?: number;
  activeEvents?: number;
  organization?: Pick<Organization, "id" | "logoUrl" | "name">;
  categories?: Category[];
  categoryIds?: string[];
  location: Coordinates;
  memberCount: number;
  memberPreviews: ParticipationMember[];
  status?: EntityStatus;
  isArchived?: boolean;
  volunteerProjectState: EntityStatus;
  locationInfo: {
    address?: string;
    region?: string;
    city?: string;
    country?: string;
  };
  joinPolicy: Policy;
  leavePolicy?: Policy;
  rating: Rating;
  currentUserRole?: {
    roleId?: string;
    name?: string;
    permissions?: string[];
  } | null;
  isJoined: boolean;
  canSubmitFeedback: boolean;
  hasPendingJoinRequest: boolean;
  hasPendingLeaveRequest: boolean;
}

export interface ProjectJoined extends Project {
  chatId: string;
  currentUserRole: {
    roleId: string;
    name: string;
  };
}
