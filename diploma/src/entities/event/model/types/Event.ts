import type { Category } from "@entities/category";
import type { Organization } from "@entities/organization";
import type { ParticipationMember } from "@entities/participation";
import type { Project } from "@entities/project";
import type { Skill } from "@entities/skill";
import type {
  Coordinates,
  EntityStatus,
  LevelProgress,
  Policy,
  Rating,
} from "@shared/config/types";

export interface Event {
  id: string;
  organizationId?: string;
  projectId?: string | null;
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  progress: LevelProgress;
  tasksTotal: number;
  activeTasks: number;
  organization?: Pick<Organization, "id" | "logoUrl" | "name">;
  project?: Project;
  location: Coordinates;
  categoryIds?: string[];
  memberCount: number;
  type?: string | null;
  rating: Rating;
  memberPreviews: ParticipationMember[];
  recurrence?: string | null;
  status: EntityStatus;
  locationInfo: {
    address?: string;
    region?: string;
    city?: string;
    country?: string;
  };
  joinPolicy: Policy;
  leavePolicy?: Policy;
  categories: Category[];
  skills: Skill[];
  requiredSkills?: Array<{
    skillId: string;
    expectedHours: number;
  }>;
  attendanceEnabled?: boolean;
  attendanceRequiresApproval?: boolean;
  attendanceRequiresVolunteerCheckout?: boolean;
  qrEnabled?: boolean;
  geoEnabled?: boolean;
  attendanceRadiusMeters?: number | null;
  isCancelled?: boolean;
  cancelledAt?: string | null;
  cancelReason?: string | null;
  currentUserRole?: {
    roleId?: string;
    name?: string;
    permissions?: string[];
  } | null;
  isJoined: boolean;
  canSubmitFeedback: boolean;
  hasPendingJoinRequest: boolean;
  hasPendingLeaveRequest: boolean;
  canSubmitReport: boolean;
}

export interface EventJoined extends Event {
  chatId: string;
  currentUserRole: {
    roleId: string;
    name: string;
  };
}
