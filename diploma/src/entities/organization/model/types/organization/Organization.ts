import type { Project } from "@entities/project";
import type {
  Coordinates,
  LevelProgress,
  ParticipationMember,
  Rating,
} from "@shared/config/types";

export interface Organization {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  location: Coordinates;
  projects?: Project[];
  rating: Rating;
  totalActivities: number;
  activeCount: number;
  progressPercent: number;
  maxProgress: number;
  memberPreviews: ParticipationMember[];
  progress: LevelProgress;
}
