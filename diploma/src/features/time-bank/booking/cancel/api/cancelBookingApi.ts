import { apiClient } from "@shared/api";

export type CancelBookingDto = {
  comment: string;
};

export const cancelBooking = async (
  bookingId: string,
  data: CancelBookingDto,
) => {
  const response = await apiClient.post(
    `time-bank/bookings/${bookingId}/cancel`,
    data,
  );
  return response.data;
};
