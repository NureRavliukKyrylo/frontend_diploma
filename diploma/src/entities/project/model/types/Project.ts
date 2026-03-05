import type { Organization } from "@entities/organization";

export interface Project {
  id: string;
  title: string;
  description: string;
  endAt: string;
  progressPercent: number;
  tasksTotal: number;
  organization?: Pick<Organization, "id" | "logoUrl" | "name">;
}
