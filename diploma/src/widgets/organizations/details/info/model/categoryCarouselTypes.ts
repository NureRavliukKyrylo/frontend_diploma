import type { PaginationResponse } from "@shared/config/types";

export type OrganizationCategoryActivityType =
  | "projects"
  | "events"
  | "tasks";

export type CategoryTone = "orange" | "red" | "neutral";

export interface OrganizationCategoryCarouselItem {
  id: string;
  title: string;
  imageSrc: string | null;
  totalActivities: number;
  activeActivities: number;
  typeCounts: Record<OrganizationCategoryActivityType, number>;
  activeTypeCounts: Record<OrganizationCategoryActivityType, number>;
  tone: CategoryTone;
}

export interface CategoryAggregate {
  totalActivities: number;
  activeActivities: number;
  typeCounts: Record<OrganizationCategoryActivityType, number>;
  activeTypeCounts: Record<OrganizationCategoryActivityType, number>;
  fallbackName: string | null;
  fallbackImageSrc: string | null;
}

export interface PaginatedCategoryActivityResponse<T> {
  data: T[];
  pagination: PaginationResponse;
}
