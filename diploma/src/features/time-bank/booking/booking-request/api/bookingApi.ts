import { apiClient } from "@shared/api";

export type BookingDto = {
  comment: string;
};

export const sendBooking = async (offerId: string, data: BookingDto) => {
  const response = await apiClient.post(
    `time-bank/offers/${offerId}/bookings`,
    data,
  );
  return response.data;
};
