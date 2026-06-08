import type { PaginationResponse } from "@shared/config/types";
import { apiClient } from "../../api-client/apiClient";

export interface OfferRelatedFiltersParams {
  scope: "user" | "owner";
  facetType?: "skill" | "category";
  page?: number;
  pageSize?: number;
}

export interface OfferRelatedFilterItem {
  id: string;
  name: string;
}

export interface UserRelatedFiltersResponse {
  items: OfferRelatedFilterItem[];
  pagination: PaginationResponse;
}

export const getOfferRelatedFilters = async (
  params: OfferRelatedFiltersParams,
): Promise<UserRelatedFiltersResponse> => {
  const response = await apiClient.get("time-bank/offers/filter-options", {
    params,
  });
  return response.data;
};
