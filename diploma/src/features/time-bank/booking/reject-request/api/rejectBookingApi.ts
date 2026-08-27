import { apiClient } from "@shared/api";

export type RejectBookingDto = {
  reason: string;
};

export const rejectBooking = async (
  bookingId: string,
  data: RejectBookingDto,
) => {
  const response = await apiClient.post(
    `time-bank/bookings/${bookingId}/reject`,
    data,
  );
  return response.data;
};
