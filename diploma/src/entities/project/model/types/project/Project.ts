import type { Category } from "@entities/category";
import type { Organization } from "@entities/organization";
import type {
  Coordinates,
  EntityStatus,
  LevelProgress,
  ParticipationMember,
  Policy,
  Rating,
} from "@shared/config/types";

export interface Project {
  id: string;
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  progress: LevelProgress;
  tasksTotal: number;
  eventsTotal: number;
  tasksCompleted: number;
  eventsCompleted: number;
  organization?: Pick<Organization, "id" | "logoUrl" | "name">;
  categories?: Category[];
  location: Coordinates;
  memberCount: number;
  memberPreviews: ParticipationMember[];
  volunteerProjectState: EntityStatus;
  locationInfo: { address: string };
  joinPolicy: Policy;
  rating: Rating;
  isJoined: boolean;
  canSubmitFeedback: boolean;
  hasPendingJoinRequest: boolean;
}

export interface ProjectJoined extends Project {
  chatId: string;
  currentUserRole: {
    roleId: string;
    name: string;
  };
}
