import { apiClient } from "@shared/api";

export const completeBooking = async (bookingId: string) => {
  const response = await apiClient.post(
    `time-bank/bookings/${bookingId}/complete`,
  );
  return response.data;
};
