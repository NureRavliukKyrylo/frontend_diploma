import type { Organization } from "@entities/organization";
import type { Project } from "@entities/project";
import type {
  Coordinates,
  EntityStatus,
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
  progressPercent: number;
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
}
