import type { Category } from "@entities/category";
import type { Organization } from "@entities/organization";
import type {
  Coordinates,
  EntityStatus,
  ParticipationMember,
  Policy,
  Rating,
} from "@shared/config/types";

export interface Project {
  id: string;
  title: string;
  description: string;
  endAt: string;
  progressPercent: number;
  tasksTotal: number;
  eventsTotal: number;
  organization?: Pick<Organization, "id" | "logoUrl" | "name">;
  categories?: Category[];
  location: Coordinates;
  memberCount: number;
  memberPreviews: ParticipationMember[];
  volunteerProjectState: EntityStatus;
  locationInfo: { address: string };
  joinPolicy: Policy;
  rating: Rating;
}
