import type { Organization } from "@entities/organization";
import type { Project } from "@entities/project";
import type { Coordinates } from "@shared/config/types";

export interface Event {
  id: string;
  title: string;
  description: string;
  endAt: string;
  progressPercent: number;
  tasksTotal: number;
  organization?: Pick<Organization, "id" | "logoUrl" | "name">;
  project?: Pick<Project, "id" | "title">;
  location: Coordinates;
  memberCount: number;
  type: string;
}
