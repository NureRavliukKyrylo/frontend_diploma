import type { OfferJoined } from "@entities/offer/model";
import { apiClient } from "@shared/api";
import { type ApiResponse } from "@shared/api";

export const getOfferJoinedId = async (
  id: string,
): Promise<ApiResponse<OfferJoined>> => {
  const result = await apiClient.get(`/Offers/joined/${id}`);
  return result.data;
};
