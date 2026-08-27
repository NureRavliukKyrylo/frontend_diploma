import { apiClient } from "@shared/api";
import {
  asRecord,
  readBooleanPair as readBoolean,
  readNullableStringPair as readNullableString,
  readNumberPair as readNumber,
  readStringPair as readString,
} from "@shared/api/normalize-helpers";
import type {
  AdminUserListItem,
  AdminUsersParams,
} from "../model/types/adminDashboard";
import { normalizeAdminPagedResult } from "./dashboard/baseNormalizers";

export const normalizeAdminUser = (value: unknown): AdminUserListItem => {
  const record = asRecord(value);

  return {
    userId: readString(record, "userId", "UserId"),
    firstName: readString(record, "firstName", "FirstName"),
    lastName: readString(record, "lastName", "LastName"),
    displayName: readString(record, "displayName", "DisplayName"),
    email: readString(record, "email", "Email"),
    roleName: readString(record, "roleName", "RoleName"),
    avatarUrl: readNullableString(record, "avatarUrl", "AvatarUrl"),
    emailVerified: readBoolean(record, "emailVerified", "EmailVerified"),
    googleConnected: readBoolean(record, "googleConnected", "GoogleConnected"),
    googleCalendarConnected: readBoolean(
      record,
      "googleCalendarConnected",
      "GoogleCalendarConnected",
    ),
    registeredAt: readString(record, "registeredAt", "RegisteredAt"),
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

export const getAdminUsers = async (params: AdminUsersParams = {}) => {
  const response = await apiClient.get<unknown>("admin/users", {
    params: { OrderBy: "Newest", Page: 1, PageSize: 4, ...params },
  });

  return normalizeAdminPagedResult(response.data, normalizeAdminUser);
};
