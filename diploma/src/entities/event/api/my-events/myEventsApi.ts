import { apiClient } from "@shared/api";
import type { Event } from "../../model";
import type { PaginationResponse } from "@shared/config/types";
import type { MyEventsRequestParams } from "../../libs";

export interface MyEventsResponse {
  data: Event[];
  pagination: PaginationResponse;
}

export const getMyEvents = async (
  params?: MyEventsRequestParams,
): Promise<MyEventsResponse> => {
  const response = await apiClient.get("/Events/my/volunteer/list", {
    params,
  });
  return response.data;
};
