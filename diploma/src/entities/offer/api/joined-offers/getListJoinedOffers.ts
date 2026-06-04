import type { OfferJoinedSearchParams } from "@entities/offer/libs";
import type { OfferJoined } from "@entities/offer/model";
import { apiClient } from "@shared/api";
import type { PaginationResponse } from "@shared/config/types";

export interface OfferJoinedResponse {
  data: OfferJoined[];
  pagination: PaginationResponse;
}

export const getListJoinedOffers = async (
  params?: OfferJoinedSearchParams,
): Promise<OfferJoinedResponse> => {
  const response = await apiClient.get("/time-bank/joined/offers", { params });
  return response.data;
};
