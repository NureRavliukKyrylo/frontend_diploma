import type { Category } from "@entities/category";
import type { Organization } from "@entities/organization";
import type { Project } from "@entities/project";
import type { Skill } from "@entities/skill";
import type {
  Coordinates,
  EntityStatus,
  LevelProgress,
  ParticipationMember,
  Policy,
  Rating,
} from "@shared/config/types";

export interface Event {
  id: string;
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
  memberCount: number;
  type: string;
  rating: Rating;
  memberPreviews: ParticipationMember[];
  recurrence: string;
  status: EntityStatus;
  locationInfo: { address: string };
  joinPolicy: Policy;
  categories: Category[];
  skills: Skill[];
  isJoined: boolean;
  canSubmitFeedback: boolean;
  hasPendingJoinRequest: boolean;
}
