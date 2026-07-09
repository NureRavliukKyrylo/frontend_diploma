import type {
  AdminRequestListItem,
  AdminRequestsResponse,
} from "@entities/admin";
import { apiClient } from "@shared/api";
import {
  asRecord,
  readArrayPair,
  readBooleanPair,
  readNullableNumber,
  readNumberPair,
  readPairValue,
  readStringPair,
  readTrimmedNullableStringPair,
} from "@shared/api/normalize-helpers";
import type { PaginationResponse } from "@shared/config/types";
import type { Tier } from "../../model/types/tier/TierList";

export type BadgeScopeEntityType = "organization" | "project" | "event" | "task";
export type BadgeRankPayload = "s" | "a" | "b" | "c" | "d" | "e" | "f";
export type BadgeMetricType =
  | "volunteeredHours"
  | "projectsJoinedCount"
  | "projectsCompletedCount"
  | "eventsJoinedCount"
  | "tasksCompletedCount";
export type BadgeMetricPayload = 1 | 2 | 3 | 4 | 5;
export type BadgeSortingParams = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface AdminBadgesFilter {
  Search?: string;
  IsArchived?: boolean;
  Ranks?: Tier[];
  AwardedCountMin?: number;
  AwardedCountMax?: number;
  ScopeEntityType?: BadgeScopeEntityType;
  ScopeEntityId?: string;
  AutoAwardEnabled?: boolean;
  OnlyCurrentlyAvailable?: boolean;
  OrderBy?: BadgeSortingParams;
  Page?: number;
  PageSize?: number;
}

export interface BadgeRankDto {
  value: number;
  name: Tier;
}

export interface BadgeEntityPreviewDto {
  id: string;
  type: string;
  title: string;
}

export interface BadgeOrganizationPreviewDto {
  id: string;
  name: string;
  logoUrl: string | null;
}

export interface BadgeRuleProgress {
  label: string;
  metric: BadgeMetricType;
  currentValue: number;
  threshold: number;
  progressPercent: number;
  relatedEntityType: string | null;
  relatedEntityId: string | null;
  relatedEntityKey: string | null;
}

export interface AdminBadgeListItem {
  id: string;
  title: string;
  iconUrl: string;
  rank: BadgeRankDto;
  isArchived: boolean;
  awardedCountTotal: number;
  firstAwardedAt: string | null;
  scopeEntityType: BadgeScopeEntityType | null;
  scopeEntityId: string | null;
  organization: BadgeOrganizationPreviewDto | null;
  entity: BadgeEntityPreviewDto | null;
  autoAwardEnabled: boolean;
  isRequestable: boolean;
  isAvailableNow: boolean;
  progressPercent: number;
  ruleProgress: BadgeRuleProgress[];
}

export interface AdminBadgeDetails extends AdminBadgeListItem {
  description: string | null;
  isUnlocked: boolean;
  awardedAtForUser: string | null;
  availableFromUtc: string | null;
  availableToUtc: string | null;
}

export interface AdminBadgesResponse {
  data: AdminBadgeListItem[];
  pagination: PaginationResponse;
}

export interface BadgeRulePayload {
  label: string;
  metric: BadgeMetricPayload;
  threshold: number;
  relatedEntityType?: BadgeScopeEntityType | null;
  relatedEntityId?: string | null;
  relatedEntityKey?: string | null;
  weight: number;
}

export interface BadgeCreatePayload {
  title: string;
  description?: string | null;
  titleLocalized?: {
    uk?: string | null;
    en?: string | null;
  } | null;
  descriptionLocalized?: {
    uk?: string | null;
    en?: string | null;
  } | null;
  rank: BadgeRankPayload;
  iconUrl: string;
  scopeEntityType?: BadgeScopeEntityType | null;
  scopeEntityId?: string | null;
  availableFromUtc?: string | null;
  availableToUtc?: string | null;
  autoAwardEnabled: boolean;
  isRequestable: boolean;
  rules?: BadgeRulePayload[];
}

export interface BadgeUpdatePayload extends BadgeCreatePayload {
  isArchived: boolean;
}

const normalizeTier = (value: unknown): Tier => {
  if (
    value === "S" ||
    value === "A" ||
    value === "B" ||
    value === "C" ||
    value === "D" ||
    value === "E" ||
    value === "F"
  ) {
    return value;
  }

  return "F";
};

const normalizeScopeType = (value: string | null): BadgeScopeEntityType | null => {
  if (
    value === "organization" ||
    value === "project" ||
    value === "event" ||
    value === "task"
  ) {
    return value;
  }

  return null;
};

const normalizeMetric = (value: unknown): BadgeMetricType => {
  if (value === "volunteeredHours" || value === "VolunteeredHours" || value === 1) {
    return "volunteeredHours";
  }

  if (
    value === "projectsJoinedCount" ||
    value === "ProjectsJoinedCount" ||
    value === 2
  ) {
    return "projectsJoinedCount";
  }

  if (
    value === "projectsCompletedCount" ||
    value === "ProjectsCompletedCount" ||
    value === 3
  ) {
    return "projectsCompletedCount";
  }

  if (value === "eventsJoinedCount" || value === "EventsJoinedCount" || value === 4) {
    return "eventsJoinedCount";
  }

  if (value === "tasksCompletedCount" || value === "TasksCompletedCount" || value === 5) {
    return "tasksCompletedCount";
  }

  if (typeof value === "string") {
    const parsed = Number(value);

    if (parsed === 1) {
      return "volunteeredHours";
    }

    if (parsed === 2) {
      return "projectsJoinedCount";
    }

    if (parsed === 3) {
      return "projectsCompletedCount";
    }

    if (parsed === 4) {
      return "eventsJoinedCount";
    }

    if (parsed === 5) {
      return "tasksCompletedCount";
    }
  }

  return "volunteeredHours";
};

const normalizeRank = (value: unknown): BadgeRankDto => {
  const record = asRecord(value);

  return {
    value: readNumberPair(record, "value", "Value"),
    name: normalizeTier(readPairValue(record, "name", "Name")),
  };
};

const normalizeEntityPreview = (value: unknown): BadgeEntityPreviewDto | null => {
  if (!value) {
    return null;
  }

  const record = asRecord(value);
  const id = readStringPair(record, "id", "Id");

  if (!id) {
    return null;
  }

  return {
    id,
    type: readStringPair(record, "type", "Type"),
    title: readStringPair(record, "title", "Title"),
  };
};

const normalizeOrganizationPreview = (
  value: unknown,
): BadgeOrganizationPreviewDto | null => {
  if (!value) {
    return null;
  }

  const record = asRecord(value);
  const id = readStringPair(record, "id", "Id");

  if (!id) {
    return null;
  }

  return {
    id,
    name: readStringPair(record, "name", "Name"),
    logoUrl: readTrimmedNullableStringPair(record, "logoUrl", "LogoUrl"),
  };
};

const normalizeRuleProgress = (value: unknown): BadgeRuleProgress => {
  const record = asRecord(value);

  return {
    label: readStringPair(record, "label", "Label"),
    metric: normalizeMetric(readPairValue(record, "metric", "Metric")),
    currentValue: readNumberPair(record, "currentValue", "CurrentValue"),
    threshold: readNumberPair(record, "threshold", "Threshold"),
    progressPercent: readNumberPair(record, "progressPercent", "ProgressPercent"),
    relatedEntityType: readTrimmedNullableStringPair(
      record,
      "relatedEntityType",
      "RelatedEntityType",
    ),
    relatedEntityId: readTrimmedNullableStringPair(
      record,
      "relatedEntityId",
      "RelatedEntityId",
    ),
    relatedEntityKey: readTrimmedNullableStringPair(
      record,
      "relatedEntityKey",
      "RelatedEntityKey",
    ),
  };
};

export const normalizeAdminBadgeListItem = (
  value: unknown,
): AdminBadgeListItem => {
  const record = asRecord(value);
  const scopeEntityType = normalizeScopeType(
    readTrimmedNullableStringPair(record, "scopeEntityType", "ScopeEntityType"),
  );

  return {
    id: readStringPair(record, "id", "Id"),
    title: readStringPair(record, "title", "Title"),
    iconUrl: readStringPair(record, "iconUrl", "IconUrl"),
    rank: normalizeRank(readPairValue(record, "rank", "Rank")),
    isArchived: readBooleanPair(record, "isArchived", "IsArchived"),
    awardedCountTotal:
      readNullableNumber(record, ["awardedCountTotal", "AwardedCountTotal"]) ?? 0,
    firstAwardedAt: readTrimmedNullableStringPair(
      record,
      "firstAwardedAt",
      "FirstAwardedAt",
    ),
    scopeEntityType,
    scopeEntityId: readTrimmedNullableStringPair(
      record,
      "scopeEntityId",
      "ScopeEntityId",
    ),
    organization: normalizeOrganizationPreview(
      readPairValue(record, "organization", "Organization"),
    ),
    entity: normalizeEntityPreview(readPairValue(record, "entity", "Entity")),
    autoAwardEnabled: readBooleanPair(
      record,
      "autoAwardEnabled",
      "AutoAwardEnabled",
    ),
    isRequestable: readBooleanPair(record, "isRequestable", "IsRequestable"),
    isAvailableNow: readBooleanPair(record, "isAvailableNow", "IsAvailableNow"),
    progressPercent: readNumberPair(record, "progressPercent", "ProgressPercent"),
    ruleProgress: readArrayPair(
      record,
      "ruleProgress",
      "RuleProgress",
      normalizeRuleProgress,
    ),
  };
};

const normalizeAdminBadgeDetails = (value: unknown): AdminBadgeDetails => {
  const record = asRecord(value);

  return {
    ...normalizeAdminBadgeListItem(value),
    description: readTrimmedNullableStringPair(record, "description", "Description"),
    isUnlocked: readBooleanPair(record, "isUnlocked", "IsUnlocked"),
    awardedAtForUser: readTrimmedNullableStringPair(
      record,
      "awardedAtForUser",
      "AwardedAtForUser",
    ),
    availableFromUtc: readTrimmedNullableStringPair(
      record,
      "availableFromUtc",
      "AvailableFromUtc",
    ),
    availableToUtc: readTrimmedNullableStringPair(
      record,
      "availableToUtc",
      "AvailableToUtc",
    ),
  };
};

const normalizePagination = (value: unknown): PaginationResponse => {
  const record = asRecord(value);

  return {
    totalCount: readNumberPair(record, "totalCount", "TotalCount"),
    page: readNumberPair(record, "page", "Page"),
    pageSize: readNumberPair(record, "pageSize", "PageSize"),
    totalPages: readNumberPair(record, "totalPages", "TotalPages"),
    nextPage: readNullableNumber(record, ["nextPage", "NextPage"]),
    previousPage: readNullableNumber(record, ["previousPage", "PreviousPage"]),
  };
};

const normalizeAdminBadgesResponse = (value: unknown): AdminBadgesResponse => {
  const record = asRecord(value);

  return {
    data: readArrayPair(record, "data", "Data", normalizeAdminBadgeListItem),
    pagination: normalizePagination(readPairValue(record, "pagination", "Pagination")),
  };
};

const unwrapData = (value: unknown) => {
  const record = asRecord(value);
  return readPairValue(record, "data", "Data") ?? value;
};

export const getAdminBadgeList = async (
  params: AdminBadgesFilter,
): Promise<AdminBadgesResponse> => {
  const response = await apiClient.get<unknown>("Badges/list", {
    params,
    paramsSerializer: {
      indexes: null,
    },
  });
  return normalizeAdminBadgesResponse(response.data);
};

export const getAdminBadgeById = async (
  id: string,
): Promise<AdminBadgeDetails> => {
  const response = await apiClient.get<unknown>(`Badges/${id}`);
  return normalizeAdminBadgeDetails(unwrapData(response.data));
};

export const createAdminBadge = async (
  dto: BadgeCreatePayload,
): Promise<{ id: string }> => {
  if (!dto || Object.keys(dto).length === 0) {
    throw new Error("Badge payload is empty.");
  }

  const response = await apiClient.post<unknown>(
    "Badges/create",
    dto,
  );
  const rawId = unwrapData(response.data);
  const record = asRecord(rawId);
  const id =
    typeof rawId === "string"
      ? rawId
      : readStringPair(record, "id", "Id") ||
        readStringPair(record, "data", "Data");

  return { id };
};

export const updateAdminBadge = async (
  id: string,
  dto: BadgeUpdatePayload,
): Promise<void> => {
  await apiClient.put(`Badges/update/${id}`, dto);
};

export const uploadAdminBadgeIcon = async (
  id: string,
  icon: File,
): Promise<{ iconUrl: string }> => {
  const formData = new FormData();
  formData.append("icon", icon);
  const response = await apiClient.post<unknown>(
    `Badges/${id}/upload-icon`,
    formData,
  );
  const data = unwrapData(response.data);
  const record = asRecord(data);

  return {
    iconUrl:
      readStringPair(record, "iconUrl", "IconUrl") ||
      readStringPair(record, "url", "Url"),
  };
};

export const archiveAdminBadge = async (id: string): Promise<void> => {
  await apiClient.post(`Badges/archive/${id}`);
};

export const recoverAdminBadge = async (id: string): Promise<void> => {
  await apiClient.post(`Badges/recover/${id}`);
};

export const deleteAdminBadge = async (id: string): Promise<void> => {
  await apiClient.delete(`Badges/delete/${id}`);
};

export const awardAdminBadge = async (
  id: string,
  dto: { targetUserId: string; note?: string },
): Promise<{ id: string }> => {
  const response = await apiClient.post<{ id: string }>(`Badges/${id}/award`, dto);
  return response.data;
};

export const revokeAdminBadge = async (
  id: string,
  dto: { targetUserId: string; reason?: string },
): Promise<void> => {
  await apiClient.post(`Badges/${id}/revoke`, dto);
};

export const getAdminBadgeRequests = async (
  id: string,
): Promise<AdminRequestsResponse> => {
  const response = await apiClient.get<unknown>(`Badges/${id}/requests`, {
    params: { Page: 1, PageSize: 20 },
  });
  const root = asRecord(response.data);
  const data = readArrayPair(
    root,
    "data",
    "Data",
    (request): AdminRequestListItem => {
      const record = asRecord(request);

      return {
        id: readStringPair(record, "id", "Id"),
        userId: readStringPair(record, "userId", "UserId"),
        type: readNumberPair(record, "type", "Type"),
        typeName: "badgeAward",
        status: readNumberPair(record, "status", "Status"),
        statusName: "unknown",
        targetEntityType: readTrimmedNullableStringPair(
          record,
          "targetEntityType",
          "TargetEntityType",
        ),
        targetEntityId: readTrimmedNullableStringPair(
          record,
          "targetEntityId",
          "TargetEntityId",
        ),
        linkedEntityId: readTrimmedNullableStringPair(
          record,
          "linkedEntityId",
          "LinkedEntityId",
        ),
        adminId: readTrimmedNullableStringPair(record, "adminId", "AdminId"),
        chatId: readTrimmedNullableStringPair(record, "chatId", "ChatId"),
        createdAt: readStringPair(record, "createdAt", "CreatedAt"),
        updatedAt: readStringPair(record, "updatedAt", "UpdatedAt"),
        decidedAt: readTrimmedNullableStringPair(record, "decidedAt", "DecidedAt"),
        decisionComment: readTrimmedNullableStringPair(
          record,
          "decisionComment",
          "DecisionComment",
        ),
        appealParentId: readTrimmedNullableStringPair(
          record,
          "appealParentId",
          "AppealParentId",
        ),
        sourceEntityType: readTrimmedNullableStringPair(
          record,
          "sourceEntityType",
          "SourceEntityType",
        ),
        sourceEntityId: readTrimmedNullableStringPair(
          record,
          "sourceEntityId",
          "SourceEntityId",
        ),
        priorityBoostApplied: readBooleanPair(
          record,
          "priorityBoostApplied",
          "PriorityBoostApplied",
        ),
        priorityBoostMinutesReserved: readNullableNumber(record, [
          "priorityBoostMinutesReserved",
          "PriorityBoostMinutesReserved",
        ]),
        priorityReservationTransactionId: readTrimmedNullableStringPair(
          record,
          "priorityReservationTransactionId",
          "PriorityReservationTransactionId",
        ),
        title: readStringPair(record, "title", "Title"),
        description: readStringPair(record, "description", "Description"),
        invitationRoleId: readTrimmedNullableStringPair(
          record,
          "invitationRoleId",
          "InvitationRoleId",
        ),
        invitationMessage: readTrimmedNullableStringPair(
          record,
          "invitationMessage",
          "InvitationMessage",
        ),
        invitationExpiresAt: readTrimmedNullableStringPair(
          record,
          "invitationExpiresAt",
          "InvitationExpiresAt",
        ),
        invitedByUserId: readTrimmedNullableStringPair(
          record,
          "invitedByUserId",
          "InvitedByUserId",
        ),
        isExpired: readBooleanPair(record, "isExpired", "IsExpired"),
        dataJson: readPairValue(record, "dataJson", "DataJson") ?? null,
      };
    },
  );

  return {
    data,
    pagination: normalizePagination(readPairValue(root, "pagination", "Pagination")),
  };
};
