import type { Organization } from "@entities/organization";
import type {
  EntityStatus,
  ParticipationMember,
  Policy,
  Rating,
} from "@shared/config/types";
import type { Event } from "@entities/event";
import type { Project } from "@entities/project";

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
}
