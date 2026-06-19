import type {
  OrganizationPendingRequest,
  OrganizationRequest,
  OrganizationRequestKind,
} from "../model/types/OrganizationRequest";
import { normalizeRequestStatus } from "./requestStatus";

type RawRequestRecord = {
  id?: string;
  Id?: string;
  userId?: string;
  UserId?: string;
  status?: string | number;
  Status?: string | number;
  targetEntityId?: string;
  TargetEntityId?: string;
  title?: string;
  Title?: string;
  description?: string;
  Description?: string;
  createdAt?: string;
  CreatedAt?: string;
  updatedAt?: string;
  UpdatedAt?: string;
};

const toStringValue = (...values: Array<string | undefined | null>) => {
  for (const value of values) {
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }

  return null;
};

const extractItems = (payload: unknown): unknown[] => {
  if (Array.isArray(payload)) return payload;
  if (typeof payload !== "object" || payload === null) return [];

  const value = payload as { data?: unknown[]; Data?: unknown[] };
  const items = value.data ?? value.Data;
  return Array.isArray(items) ? items : [];
};

const normalizeOrganizationRequest = (
  raw: unknown,
): OrganizationRequest | null => {
  if (typeof raw !== "object" || raw === null) return null;

  const value = raw as RawRequestRecord;
  const id = toStringValue(value.id, value.Id);
  const targetEntityId = toStringValue(
    value.targetEntityId,
    value.TargetEntityId,
  );
  const status = normalizeRequestStatus(value.status ?? value.Status);

  if (!id || !targetEntityId || !status) return null;

  return { id, status, targetEntityId };
};

const normalizePendingRequest = (
  raw: unknown,
  kind: OrganizationRequestKind,
): OrganizationPendingRequest | null => {
  if (typeof raw !== "object" || raw === null) return null;

  const value = raw as RawRequestRecord;
  const id = toStringValue(value.id, value.Id);
  const userId = toStringValue(value.userId, value.UserId);
  const createdAt = toStringValue(value.createdAt, value.CreatedAt);
  const updatedAt =
    toStringValue(value.updatedAt, value.UpdatedAt) ?? createdAt;
  const status = normalizeRequestStatus(value.status ?? value.Status);

  if (!id || !userId || !createdAt || !updatedAt || !status) return null;

  return {
    id,
    userId,
    status,
    title: toStringValue(value.title, value.Title) ?? "",
    description: toStringValue(value.description, value.Description) ?? "",
    createdAt,
    updatedAt,
    kind,
  };
};

export const normalizeOrganizationRequests = (
  payload: unknown,
): OrganizationRequest[] =>
  extractItems(payload)
    .map(normalizeOrganizationRequest)
    .filter((item): item is OrganizationRequest => item !== null);

export const normalizeOrganizationPendingRequests = (
  payload: unknown,
  kind: OrganizationRequestKind,
): OrganizationPendingRequest[] =>
  extractItems(payload)
    .map((item) => normalizePendingRequest(item, kind))
    .filter((item): item is OrganizationPendingRequest => item !== null);
