import { apiClient } from "@shared/api";

export type DisputeBookingDto = {
  comment: string;
};

export const disputeBooking = async (
  bookingId: string,
  data: DisputeBookingDto,
) => {
  const response = await apiClient.post(
    `time-bank/bookings/${bookingId}/dispute`,
    data,
  );
  return response.data;
};
