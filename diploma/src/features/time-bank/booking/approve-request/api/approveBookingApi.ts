import { apiClient } from "@shared/api";

export const approveBooking = async (bookingId: string) => {
  const response = await apiClient.post(
    `time-bank/bookings/${bookingId}/approve`,
  );
  return response.data;
};
