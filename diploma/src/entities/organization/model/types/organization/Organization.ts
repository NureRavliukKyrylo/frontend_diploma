import type { Project } from "@entities/project";
import type { Coordinates, ParticipationMember } from "@shared/config/types";

export interface Organization {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  location: Coordinates;
  projects?: Project[];
  rating: number;
  totalActivities: number;
  activeCount: number;
  progressPercent: number;
  maxProgress: number;
  memberPreviews: ParticipationMember[];
}
