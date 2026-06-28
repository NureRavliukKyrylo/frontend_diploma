import { apiClient } from "@shared/api";
import {
  asRecord,
  readBooleanPair as readBoolean,
  readNullableStringPair as readNullableString,
  readNumberPair as readNumber,
  readStringArrayPair as readStringArray,
  readStringPair as readString,
} from "@shared/api/normalize-helpers";
import type {
  AdminSystemRole,
  AdminSystemRolesParams,
} from "../../model/types/adminDashboard";
import { normalizePagedApiResponse } from "./baseNormalizers";

const normalizeAdminSystemRole = (value: unknown): AdminSystemRole => {
  const record = asRecord(value);

  return {
    id: readString(record, "id", "Id"),
    name: readString(record, "name", "Name"),
    description: readNullableString(record, "description", "Description"),
    level: readNumber(record, "level", "Level"),
    isTemplate: readBoolean(record, "isTemplate", "IsTemplate"),
    isSystemGenerated: readBoolean(
      record,
      "isSystemGenerated",
      "IsSystemGenerated",
    ),
    isDefaultForJoin: readBoolean(
      record,
      "isDefaultForJoin",
      "IsDefaultForJoin",
    ),
    entityType: readNullableString(record, "entityType", "EntityType"),
    entityId: readNullableString(record, "entityId", "EntityId"),
    isActive: readBoolean(record, "isActive", "IsActive"),
    permissions: readStringArray(record, "permissions", "Permissions"),
    inherits: readStringArray(record, "inherits", "Inherits"),
    assignableBy: readStringArray(record, "assignableBy", "AssignableBy"),
    approvableBy: readStringArray(record, "approvableBy", "ApprovableBy"),
    archivedAt: readNullableString(record, "archivedAt", "ArchivedAt"),
    archiveReason: readNullableString(record, "archiveReason", "ArchiveReason"),
  };
};

export const getAdminSystemRoles = async (
  params: AdminSystemRolesParams = {},
) => {
  const response = await apiClient.get<unknown>("Roles/list", {
    params: { Page: 1, PageSize: 100, ...params },
  });

  return normalizePagedApiResponse(response.data, normalizeAdminSystemRole);
};
