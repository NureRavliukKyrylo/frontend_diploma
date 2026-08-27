import type { OfferBooking } from "@entities/offer/model";
import { apiClient } from "@shared/api";
import type { PaginationResponse } from "@shared/config/types";

export interface BookingResponse {
  data: OfferBooking[];
  pagination: PaginationResponse;
}

export const getListBookings = async (
  offerId: string,
  params?: {
    Page?: number;
    PageSize: number;
  },
): Promise<BookingResponse> => {
  const response = await apiClient.get(
    `/time-bank/offers/${offerId}/bookings`,
    { params },
  );
  return response.data;
};
