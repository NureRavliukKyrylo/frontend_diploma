import type { Organization } from "@entities/organization";
import type {
  EntityStatus,
  ParticipationMember,
  Policy,
  Rating,
} from "@shared/config/types";
import type { Event } from "@entities/event";
import type { Project } from "@entities/project";
import type { Category } from "@entities/category";
import type { Skill } from "@entities/skill";

export interface Task {
  id: string;
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  organization: Organization;
  status: EntityStatus;
  memberPreviews: ParticipationMember[];
  event: Event;
  project: Project;
  recurrence: string;
  joinPolicy: Policy;
  rating: Rating;
  progressPercent: number;
  categories: Category[];
  skills: Skill[];
  isJoined: boolean;
  canSubmitFeedback: boolean;
  hasPendingJoinRequest: boolean;
  hasPendingLeaveRequest: boolean;
}

export interface TaskJoined extends Task {
  chatId: string;
  currentUserRole: {
    roleId: string;
    name: string;
  };
}
