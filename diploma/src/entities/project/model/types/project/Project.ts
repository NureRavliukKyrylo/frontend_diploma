import type { Organization } from "@entities/organization";
import type { Coordinates } from "@shared/config/types";

export interface MemberPreview {
  userId: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  endAt: string;
  progressPercent: number;
  tasksTotal: number;
  organization?: Pick<Organization, "id" | "logoUrl" | "name">;
  location: Coordinates;
  memberCount: number;
  memberPreviews: MemberPreview[];
  volunteerProjectState: "active" | "endingSoon" | "completed" | "archived";
}
