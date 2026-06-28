import { apiClient } from "@shared/api";
import {
  asRecord,
  readNullableStringPair as readNullableString,
  readNumberPair as readNumber,
  readPairValue as read,
  readStringPair as readString,
} from "@shared/api/normalize-helpers";
import type {
  AdminQueueItem,
  AdminQueueResponse,
  AdminQueueSummary,
} from "../../model/types/adminDashboard";
import { normalizeAdminPagedResult } from "./baseNormalizers";

const normalizeQueueSummary = (value: unknown): AdminQueueSummary => {
  const record = asRecord(value);

  return {
    totalOpen: readNumber(record, "totalOpen", "TotalOpen"),
    newCount: readNumber(record, "newCount", "NewCount"),
    inProgressCount: readNumber(record, "inProgressCount", "InProgressCount"),
    averageAgeHours: readNumber(record, "averageAgeHours", "AverageAgeHours"),
    maxAgeHours: readNumber(record, "maxAgeHours", "MaxAgeHours"),
  };
};

export const normalizeQueueItem = (value: unknown): AdminQueueItem => {
  const record = asRecord(value);

  return {
    requestId: readString(record, "requestId", "RequestId"),
    userId: readString(record, "userId", "UserId"),
    userDisplayName: readString(record, "userDisplayName", "UserDisplayName"),
    userAvatarUrl: readNullableString(record, "userAvatarUrl", "UserAvatarUrl"),
    type: readString(record, "type", "Type"),
    status: readString(record, "status", "Status"),
    title: readString(record, "title", "Title"),
    description: readString(record, "description", "Description"),
    targetEntityType: readNullableString(
      record,
      "targetEntityType",
      "TargetEntityType",
    ),
    targetEntityId: readNullableString(record, "targetEntityId", "TargetEntityId"),
    createdAt: readString(record, "createdAt", "CreatedAt"),
    updatedAt: readString(record, "updatedAt", "UpdatedAt"),
    ageHours: readNumber(record, "ageHours", "AgeHours"),
  };
};

const normalizeQueueResponse = (value: unknown): AdminQueueResponse => {
  const record = asRecord(value);

  return {
    summary: normalizeQueueSummary(read(record, "summary", "Summary")),
    page: normalizeAdminPagedResult(read(record, "page", "Page"), normalizeQueueItem),
  };
};

export const getAdminOpenReports = async () => {
  const response = await apiClient.get<unknown>("admin/reports/open", {
    params: { OrderBy: "Newest", Page: 1, PageSize: 5 },
  });

  return normalizeQueueResponse(response.data);
};

export const getAdminPendingRequests = async () => {
  const response = await apiClient.get<unknown>("admin/requests/pending", {
    params: { OrderBy: "Newest", Page: 1, PageSize: 5 },
  });

  return normalizeQueueResponse(response.data);
};
