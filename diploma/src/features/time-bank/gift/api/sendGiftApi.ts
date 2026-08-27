import { apiClient } from "@shared/api";

export type SendGiftDto = {
  recipientUserId: string;
  amountMinutes: number;
  message: string;
  idempotencyKey: string;
};

export const sendGift = async (data: SendGiftDto) => {
  const response = await apiClient.post("time-bank/gifts", data);
  return response.data;
};
