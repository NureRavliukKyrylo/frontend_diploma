import { apiClient } from "@shared/api";
import type { Project } from "../model/types/Project";
import type { PaginationResponse } from "@shared/config/types";
import type { MyProjectSearchParams } from "../libs";

export interface MyProjectsAppliedFilters {
  search: string | null;
  categoryIds: string[] | null;
  organizationIds: string[] | null;
  ownerId: string | null;
  states: string[] | null;
  radiusKm: number | null;
  minLat: number | null;
  maxLat: number | null;
  minLng: number | null;
  maxLng: number | null;
  onlyActive: boolean;
  showJoined: boolean;
  includeArchived: boolean;
  endBefore: string | null;
  startDate: string | null;
}

export interface MyProjectsResponse {
  data: Project[];
  pagination: PaginationResponse;
  appliedFilters: MyProjectsAppliedFilters;
}

export const getMyProjects = async (
  params?: MyProjectSearchParams,
): Promise<MyProjectsResponse> => {
  const response = await apiClient.get("/Projects/my/volunteer/list", {
    params,
  });
  return response.data;
};
