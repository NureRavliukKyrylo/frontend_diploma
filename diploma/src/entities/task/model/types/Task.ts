import type { Organization } from "@entities/organization";
import type { ParticipationMember } from "@entities/participation";
import type { Coordinates, Policy, Rating } from "@shared/config/types";
import type { Event } from "@entities/event";
import type { Project } from "@entities/project";
import type { Category } from "@entities/category";
import type { Skill } from "@entities/skill";
import type { TaskStatus } from "./TaskStatus";

export interface Task {
  id: string;
  organizationId?: string;
  projectId?: string | null;
  eventId?: string | null;
  title: string;
  description: string;
  location?:
    | (Coordinates & {
        regionKey?: string | null;
        regionLabel?: string | null;
      })
    | null;
  locationInfo?: {
    address?: string;
    region?: string;
    city?: string;
    country?: string;
  } | null;
  startAt: string;
  endAt: string;
  reminderAtUtc?: string | null;
  reminderOffsetMinutes?: number | null;
  organization: Organization;
  status: "Pending" | "InProgress" | "Completed" | "Cancelled" | "Overdue";
  taskStatus?: TaskStatus | "Overdue";
  memberPreviews: ParticipationMember[];
  event: Event;
  project: Project;
  recurrence: string;
  joinPolicy: Policy;
  leavePolicy?: Policy;
  rating: Rating;
  progressPercent: number;
  categories: Category[];
  categoryIds?: string[];
  skills: Skill[];
  skillIds?: string[];
  points?: number;
  estimatedMinutes?: number | null;
  timeLoggingEnabled?: boolean;
  memberCount?: number;
  activeParticipantsCount?: number;
  pendingJoinRequestsCount?: number;
  assignedToUserId?: string | null;
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

export interface TaskJoined extends Task {
  chatId: string;
  currentUserRole: {
    roleId: string;
    name: string;
  };
}
