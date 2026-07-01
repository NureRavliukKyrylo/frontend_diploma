import { queryOptions } from "@tanstack/react-query";
import type { EntityType } from "@shared/config/types";
import { getPendingEntityRequests } from "../api/entityRequestsApi";
import type { EntityRequestKind } from "./types";

export const entityRequestKeys = {
  all: () => ["entity-requests"] as const,
  pending: (
    entityType: EntityType,
    entityId: string,
    kind: EntityRequestKind,
  ) =>
    [
      ...entityRequestKeys.all(),
      "pending",
      entityType,
      entityId,
      kind,
    ] as const,
};

export const pendingEntityRequestsQuery = (
  entityType: EntityType,
  entityId: string,
  kind: EntityRequestKind,
) =>
  queryOptions({
    queryKey: entityRequestKeys.pending(entityType, entityId, kind),
    queryFn: () => getPendingEntityRequests(entityType, entityId, kind),
    enabled: Boolean(entityId),
    retry: false,
  });
