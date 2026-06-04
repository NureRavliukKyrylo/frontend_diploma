import type { Offer } from "@entities/offer/model";
import { apiClient } from "@shared/api";
import { type ApiResponse } from "@shared/api";

export const getOfferMyId = async (id: string): Promise<ApiResponse<Offer>> => {
  const result = await apiClient.get(`/time-bank/my/offers${id}`);
  return result.data;
};
