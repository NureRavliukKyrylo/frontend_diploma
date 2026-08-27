import type { OfferMySearchParams } from "@entities/offer/libs";
import type { Offer } from "@entities/offer/model";
import { apiClient } from "@shared/api";
import type { PaginationResponse } from "@shared/config/types";

export interface MyOfferResponse {
  stats: {
    totalOffers: number;
    activeOffers: number;
    inActiveOffers: number;
    totalBookings: number;
  };
  items: Offer[];
  pagination: PaginationResponse;
}

export const getListMyOffers = async (
  params?: OfferMySearchParams,
): Promise<MyOfferResponse> => {
  const response = await apiClient.get("/time-bank/my/offers", { params });
  return response.data;
};
