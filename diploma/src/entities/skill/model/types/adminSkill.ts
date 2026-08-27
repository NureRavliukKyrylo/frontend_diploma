import type { PaginationResponse } from "@shared/config/types";

export type SkillSortingParams = "Default" | "NameAsc" | "NameDesc";

export interface CategoryListItemDto {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
}

export interface SkillsListParams {
  Search?: string;
  CategoryIds?: string[];
  OrderBy?: SkillSortingParams;
  Page?: number;
  PageSize?: number;
}

export interface SkillListItemDto {
  id: string;
  name: string;
  description: string | null;
  iconUrl: string | null;
  categories: CategoryListItemDto[];
}

export type VolunteerSkillLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Expert";

export interface VolunteerSkillListItemDto {
  id: string;
  userId: string;
  skillId: string;
  level: VolunteerSkillLevel;
  verified: boolean;
  addedAt: string;
  fullName: string | null;
  avatarUrl: string | null;
}

export interface SkillsListResponse {
  data: SkillListItemDto[];
  pagination: PaginationResponse;
}
