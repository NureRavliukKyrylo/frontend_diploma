import { apiClient } from "@shared/api";

export type RejectOfferChangeDto = {
  comment: string;
};

export const rejectOfferChange = async (
  bookingId: string,
  data: RejectOfferChangeDto,
) => {
  const response = await apiClient.post(
    `time-bank/bookings/${bookingId}/offer-change/reject`,
    data,
  );
  return response.data;
};
