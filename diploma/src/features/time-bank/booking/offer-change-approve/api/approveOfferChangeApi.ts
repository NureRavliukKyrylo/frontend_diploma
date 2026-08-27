import { apiClient } from "@shared/api";

export type ApproveOfferChangeDto = {
  comment: string;
};

export const approveOfferChange = async (
  bookingId: string,
  data: ApproveOfferChangeDto,
) => {
  const response = await apiClient.post(
    `time-bank/bookings/${bookingId}/offer-change/accept`,
    data,
  );
  return response.data;
};
