import { queryOptions } from "@tanstack/react-query";
import type { EntityType } from "@shared/config/types";
import {
  getContextRolesForEntity,
  getContextRoleTemplates,
} from "../../../api";

export const contextRoleKeys = {
  all: () => ["context-roles"] as const,
  entity: (
    entityType: EntityType,
    entityId: string,
    includeArchived = false,
  ) =>
    [
      ...contextRoleKeys.all(),
      "entity",
      entityType,
      entityId,
      includeArchived,
    ] as const,
  templates: (entityType: EntityType) =>
    [...contextRoleKeys.all(), "templates", entityType] as const,
};

export const contextRoleQuery = {
  entity: (
    entityType: EntityType,
    entityId: string,
    includeArchived = false,
  ) =>
    queryOptions({
      queryKey: contextRoleKeys.entity(
        entityType,
        entityId,
        includeArchived,
      ),
      queryFn: () =>
        getContextRolesForEntity(entityType, entityId, includeArchived),
      enabled: Boolean(entityId),
      placeholderData: (previous) => previous,
    }),
  templates: (entityType: EntityType) =>
    queryOptions({
      queryKey: contextRoleKeys.templates(entityType),
      queryFn: () => getContextRoleTemplates(entityType),
      placeholderData: (previous) => previous,
    }),
};
