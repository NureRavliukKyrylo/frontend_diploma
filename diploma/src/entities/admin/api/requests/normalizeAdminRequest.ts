import {
  asRecord,
  readBoolean,
  readJson,
  readNullableNumber,
  readNullableString,
  readNumber,
  readString,
  readValue,
} from "@shared/api/normalize-helpers";
import type {
  AdminRequestListItem,
  AdminRequestsPagination,
  AdminRequestsParams,
} from "../../model/types/adminRequests";
import { normalizeRequestStatus, normalizeRequestType } from "./requestCodes";

export const normalizeAdminRequest = (
  value: unknown,
): AdminRequestListItem => {
  const record = asRecord(value);
  const type = normalizeRequestType(readValue(record, "type", "Type"));
  const status = normalizeRequestStatus(readValue(record, "status", "Status"));

  return {
    id: readString(record, ["id", "Id"]),
    userId: readString(record, ["userId", "UserId"]),
    type: type.code,
    typeName: type.name,
    status: status.code,
    statusName: status.name,
    targetEntityType: readNullableString(record, [
      "targetEntityType",
      "TargetEntityType",
    ]),
    targetEntityId: readNullableString(record, [
      "targetEntityId",
      "TargetEntityId",
    ]),
    linkedEntityId: readNullableString(record, [
      "linkedEntityId",
      "LinkedEntityId",
    ]),
    adminId: readNullableString(record, ["adminId", "AdminId"]),
    chatId: readNullableString(record, ["chatId", "ChatId"]),
    createdAt: readString(record, ["createdAt", "CreatedAt"]),
    updatedAt: readString(record, ["updatedAt", "UpdatedAt"]),
    decidedAt: readNullableString(record, ["decidedAt", "DecidedAt"]),
    decisionComment: readNullableString(record, [
      "decisionComment",
      "DecisionComment",
    ]),
    appealParentId: readNullableString(record, [
      "appealParentId",
      "AppealParentId",
    ]),
    sourceEntityType: readNullableString(record, [
      "sourceEntityType",
      "SourceEntityType",
    ]),
    sourceEntityId: readNullableString(record, [
      "sourceEntityId",
      "SourceEntityId",
    ]),
    priorityBoostApplied: readBoolean(record, [
      "priorityBoostApplied",
      "PriorityBoostApplied",
    ]),
    priorityBoostMinutesReserved: readNullableNumber(record, [
      "priorityBoostMinutesReserved",
      "PriorityBoostMinutesReserved",
    ]),
    priorityReservationTransactionId: readNullableString(record, [
      "priorityReservationTransactionId",
      "PriorityReservationTransactionId",
    ]),
    title: readString(record, ["title", "Title"], "Untitled request"),
    description: readString(record, ["description", "Description"]),
    invitationRoleId: readNullableString(record, [
      "invitationRoleId",
      "InvitationRoleId",
    ]),
    invitationMessage: readNullableString(record, [
      "invitationMessage",
      "InvitationMessage",
    ]),
    invitationExpiresAt: readNullableString(record, [
      "invitationExpiresAt",
      "InvitationExpiresAt",
    ]),
    invitedByUserId: readNullableString(record, [
      "invitedByUserId",
      "InvitedByUserId",
    ]),
    isExpired: readBoolean(record, ["isExpired", "IsExpired"]),
    dataJson: readJson(record, [
      "dataJson",
      "DataJson",
      "payloadJson",
      "PayloadJson",
      "metadataJson",
      "MetadataJson",
    ]),
  };
};

export const normalizeAdminRequestsPagination = (
  root: Record<string, unknown>,
  dataLength: number,
  params?: AdminRequestsParams,
): AdminRequestsPagination => {
  const pagination = asRecord(
    readValue(root, "pagination", "Pagination", "meta", "Meta"),
  );
  const page = readNumber(pagination, ["page", "Page"], params?.Page ?? 1);
  const pageSize = readNumber(
    pagination,
    ["pageSize", "PageSize", "take", "Take"],
    params?.PageSize ?? dataLength,
  );
  const totalCount = readNumber(
    pagination,
    ["totalCount", "TotalCount", "total", "Total", "count", "Count"],
    readNumber(root, ["totalCount", "TotalCount", "total", "Total"], dataLength),
  );
  const totalPages = readNumber(
    pagination,
    ["totalPages", "TotalPages"],
    pageSize > 0 ? Math.max(1, Math.ceil(totalCount / pageSize)) : 1,
  );

  return { page, pageSize, totalCount, totalPages };
};
