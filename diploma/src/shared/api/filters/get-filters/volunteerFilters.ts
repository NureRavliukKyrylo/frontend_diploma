import type {
  EntityType,
  FacetType,
  PaginationResponse,
} from "@shared/config/types";
import { apiClient } from "../../api-client/apiClient";

export interface UserRelatedFiltersParams {
  entityType: EntityType;
  facetType?: FacetType;
  page?: number;
  pageSize?: number;
}

export interface UserRelatedFilterItem {
  id: string;
  title: string;
}

export interface UserRelatedFiltersResponse {
  data: UserRelatedFilterItem[];
  pagination: PaginationResponse;
}

export const getUserRelatedFilters = async (
  params: UserRelatedFiltersParams,
): Promise<UserRelatedFiltersResponse> => {
  const response = await apiClient.get("/VolunteerFilters/options", { params });
  return response.data;
};
