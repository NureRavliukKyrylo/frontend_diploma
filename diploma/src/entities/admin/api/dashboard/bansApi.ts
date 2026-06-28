import { apiClient } from "@shared/api";
import {
  asRecord,
  readNullableStringPair as readNullableString,
  readPairValue as read,
  readStringPair as readString,
} from "@shared/api/normalize-helpers";
import type { AdminBan } from "../../model/types/adminDashboard";

const normalizeAdminBan = (value: unknown): AdminBan => {
  const record = asRecord(value);

  return {
    id: readString(record, "id", "Id"),
    userId: readString(record, "userId", "UserId"),
    caseId: readNullableString(record, "caseId", "CaseId"),
    reason: readString(record, "reason", "Reason"),
    createdByUserId: readString(record, "createdByUserId", "CreatedByUserId"),
    createdAt: readString(record, "createdAt", "CreatedAt"),
    expiresAt: readNullableString(record, "expiresAt", "ExpiresAt"),
    revokedAt: readNullableString(record, "revokedAt", "RevokedAt"),
    revokedByUserId: readNullableString(record, "revokedByUserId", "RevokedByUserId"),
    revokeReason: readNullableString(record, "revokeReason", "RevokeReason"),
  };
};

export const getAdminActiveBans = async (take = 500) => {
  const response = await apiClient.get<unknown>("admin/bans", {
    params: { take },
  });
  const record = asRecord(response.data);
  const banItems = read(record, "data", "Data");

  return Array.isArray(banItems) ? banItems.map(normalizeAdminBan) : [];
};

export const revokeAdminBan = async (id: string, reason?: string) => {
  const response = await apiClient.post<unknown>(`admin/bans/${id}/revoke`, {
    reason: reason || undefined,
  });

  return normalizeAdminBan(response.data);
};
