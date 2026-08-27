import type { Event } from "../../model";
import type { EventRequestParams } from "../../libs";
import { apiClient } from "@shared/api";
import type { PaginationResponse } from "@shared/config/types";

export interface EventResponse {
  data: Event[];
  pagination: PaginationResponse;
}

export const getListEvents = async (
  params?: EventRequestParams,
): Promise<EventResponse> => {
  const response = await apiClient.get("/Events/list", { params });
  return response.data;
};
