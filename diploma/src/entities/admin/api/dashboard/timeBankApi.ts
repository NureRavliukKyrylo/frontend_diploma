import { apiClient } from "@shared/api";
import {
  asRecord,
  readArrayPair as readArray,
  readNullableStringPair as readNullableString,
  readNumberPair as readNumber,
  readStringPair as readString,
} from "@shared/api/normalize-helpers";
import type {
  AdminTimeBankOverview,
  AdminTimeBankTopUser,
} from "../../model/types/adminDashboard";

const normalizeAdminTimeBankTopUser = (
  value: unknown,
): AdminTimeBankTopUser => {
  const record = asRecord(value);

  return {
    userId: readString(record, "userId", "UserId"),
    displayName: readString(record, "displayName", "DisplayName"),
    email: readString(record, "email", "Email"),
    avatarUrl: readNullableString(record, "avatarUrl", "AvatarUrl"),
    balanceMinutes: readNumber(record, "balanceMinutes", "BalanceMinutes"),
    availableMinutes: readNumber(record, "availableMinutes", "AvailableMinutes"),
    reservedMinutes: readNumber(record, "reservedMinutes", "ReservedMinutes"),
    currentLevelCode: readNullableString(
      record,
      "currentLevelCode",
      "CurrentLevelCode",
    ),
  };
};

const normalizeTimeBankOverview = (value: unknown): AdminTimeBankOverview => {
  const record = asRecord(value);

  return {
    walletsCount: readNumber(record, "walletsCount", "WalletsCount"),
    transactionsCount: readNumber(
      record,
      "transactionsCount",
      "TransactionsCount",
    ),
    earnTransactionsCount: readNumber(
      record,
      "earnTransactionsCount",
      "EarnTransactionsCount",
    ),
    spendTransactionsCount: readNumber(
      record,
      "spendTransactionsCount",
      "SpendTransactionsCount",
    ),
    totalBalanceMinutes: readNumber(
      record,
      "totalBalanceMinutes",
      "TotalBalanceMinutes",
    ),
    totalAvailableMinutes: readNumber(
      record,
      "totalAvailableMinutes",
      "TotalAvailableMinutes",
    ),
    totalReservedMinutes: readNumber(
      record,
      "totalReservedMinutes",
      "TotalReservedMinutes",
    ),
    totalLifetimeEarnedMinutes: readNumber(
      record,
      "totalLifetimeEarnedMinutes",
      "TotalLifetimeEarnedMinutes",
    ),
    totalLifetimeSpentMinutes: readNumber(
      record,
      "totalLifetimeSpentMinutes",
      "TotalLifetimeSpentMinutes",
    ),
    totalGiftedInMinutes: readNumber(record, "totalGiftedInMinutes", "TotalGiftedInMinutes"),
    totalGiftedOutMinutes: readNumber(
      record,
      "totalGiftedOutMinutes",
      "TotalGiftedOutMinutes",
    ),
    spendToEarnRatio: readNumber(record, "spendToEarnRatio", "SpendToEarnRatio"),
    reservedSharePercent: readNumber(
      record,
      "reservedSharePercent",
      "ReservedSharePercent",
    ),
    topUsersByBalance: readArray(
      record,
      "topUsersByBalance",
      "TopUsersByBalance",
      normalizeAdminTimeBankTopUser,
    ),
  };
};

export const getAdminTimeBankOverview = async () => {
  const response = await apiClient.get<unknown>("admin/time-bank/overview");
  return normalizeTimeBankOverview(response.data);
};
