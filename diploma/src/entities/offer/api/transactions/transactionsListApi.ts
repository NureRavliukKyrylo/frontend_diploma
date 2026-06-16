import type { TransactionsSearchParams } from "@entities/offer/libs";
import type { TimeTransaction } from "@entities/offer/model";
import { apiClient } from "@shared/api";
import type { PaginationResponse } from "@shared/config/types";

export interface TransactionResponse {
  stats: {
    balanceMinutes: number;
    currentMonthEarnedMinutes: number;
    reservedMinutes: number;
    lifetimeEarnedMinutes: number;
  };
  data: TimeTransaction[];
  pagination: PaginationResponse;
}

export const getListTransactions = async (
  params?: TransactionsSearchParams,
): Promise<TransactionResponse> => {
  const response = await apiClient.get("/time-bank/me/transactions", {
    params,
  });
  return response.data;
};
