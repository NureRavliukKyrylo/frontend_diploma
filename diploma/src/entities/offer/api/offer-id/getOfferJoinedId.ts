import type { OfferJoined } from "@entities/offer/model";
import { apiClient } from "@shared/api";
import { type ApiResponse } from "@shared/api";

export const getOfferJoinedId = async (
  id: string,
): Promise<ApiResponse<OfferJoined>> => {
  const result = await apiClient.get(`/time-bank/joined/offers/${id}`);
  return result.data;
};
