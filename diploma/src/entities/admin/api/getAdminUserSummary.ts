import { apiClient } from "@shared/api";
import {
  asRecord,
  readArrayPair as readArray,
  readNullableStringPair as readNullableString,
  readNumberPair as readNumber,
  readPairValue as read,
} from "@shared/api/normalize-helpers";
import type {
  AdminUserActivitySummary,
  AdminUserSummary,
  AdminUserTimeBankSummary,
} from "../model/types/adminDashboard";
import { normalizeQueueItem } from "./dashboard/queuesApi";
import { normalizeAdminUser } from "./getAdminUsers";

const normalizeAdminUserActivitySummary = (
  value: unknown,
): AdminUserActivitySummary => {
  const record = asRecord(value);

  return {
    activeParticipations: readNumber(
      record,
      "activeParticipations",
      "ActiveParticipations",
    ),
    eventsAttended: readNumber(record, "eventsAttended", "EventsAttended"),
    approvedTaskWorkLogs: readNumber(
      record,
      "approvedTaskWorkLogs",
      "ApprovedTaskWorkLogs",
    ),
    badgesCount: readNumber(record, "badgesCount", "BadgesCount"),
    openRequests: readNumber(record, "openRequests", "OpenRequests"),
  };
};

const normalizeAdminUserTimeBankSummary = (
  value: unknown,
): AdminUserTimeBankSummary => {
  const record = asRecord(value);

  return {
    balanceMinutes: readNumber(record, "balanceMinutes", "BalanceMinutes"),
    availableMinutes: readNumber(record, "availableMinutes", "AvailableMinutes"),
    reservedMinutes: readNumber(record, "reservedMinutes", "ReservedMinutes"),
    lifetimeEarnedMinutes: readNumber(
      record,
      "lifetimeEarnedMinutes",
      "LifetimeEarnedMinutes",
    ),
    lifetimeSpentMinutes: readNumber(
      record,
      "lifetimeSpentMinutes",
      "LifetimeSpentMinutes",
    ),
    lifetimeGiftedInMinutes: readNumber(
      record,
      "lifetimeGiftedInMinutes",
      "LifetimeGiftedInMinutes",
    ),
    lifetimeGiftedOutMinutes: readNumber(
      record,
      "lifetimeGiftedOutMinutes",
      "LifetimeGiftedOutMinutes",
    ),
    currentLevelCode: readNullableString(
      record,
      "currentLevelCode",
      "CurrentLevelCode",
    ),
    lastTransactionAt: readNullableString(
      record,
      "lastTransactionAt",
      "LastTransactionAt",
    ),
  };
};

const normalizeAdminUserSummary = (value: unknown): AdminUserSummary => {
  const record = asRecord(value);

  return {
    user: normalizeAdminUser(read(record, "user", "User")),
    activity: normalizeAdminUserActivitySummary(
      read(record, "activity", "Activity"),
    ),
    timeBank: normalizeAdminUserTimeBankSummary(
      read(record, "timeBank", "TimeBank"),
    ),
    recentRequests: readArray(
      record,
      "recentRequests",
      "RecentRequests",
      normalizeQueueItem,
    ),
  };
};

export const getAdminUserSummary = async (userId: string) => {
  const response = await apiClient.get<unknown>(`admin/users/${userId}/summary`);
  return normalizeAdminUserSummary(response.data);
};
