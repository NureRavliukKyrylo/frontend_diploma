import type { OfferSearchParams } from "@entities/offer/libs";
import type { Offer } from "@entities/offer/model";
import { apiClient } from "@shared/api";
import type { PaginationResponse } from "@shared/config/types";

export interface OfferResponse {
  data: Offer[];
  pagination: PaginationResponse;
}

export const getListOffers = async (
  params?: OfferSearchParams,
): Promise<OfferResponse> => {
  const response = await apiClient.get("/Offers/list", { params });
  return response.data;
};
