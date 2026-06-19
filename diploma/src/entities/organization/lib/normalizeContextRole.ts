import type {
  ContextRoleApiRecord,
  ContextRoleDto,
} from "../model/types/contextRolesTypes";

const toStringValue = (...values: Array<string | undefined | null>) => {
  for (const value of values) {
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }

  return null;
};

const toStringList = (value: unknown): string[] =>
  Array.isArray(value)
    ? value
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

const extractItems = (payload: unknown): unknown[] => {
  if (Array.isArray(payload)) return payload;
  if (typeof payload !== "object" || payload === null) return [];

  const value = payload as { data?: unknown[]; Data?: unknown[] };
  const items = value.data ?? value.Data;
  return Array.isArray(items) ? items : [];
};

const extractItem = (payload: unknown): unknown => {
  if (typeof payload !== "object" || payload === null) return payload;
  if (Array.isArray(payload)) return payload[0];

  const value = payload as { data?: unknown; Data?: unknown };
  return value.data ?? value.Data ?? payload;
};

export const normalizeContextRole = (raw: unknown): ContextRoleDto | null => {
  if (typeof raw !== "object" || raw === null) return null;

  const value = raw as ContextRoleApiRecord;
  const id = toStringValue(value.id, value.Id);
  const name = toStringValue(value.name, value.Name);

  if (!id || !name) return null;

  const levelValue = value.level ?? value.Level;

  return {
    id,
    name,
    description: value.description ?? value.Description ?? null,
    isTemplate: value.isTemplate ?? value.IsTemplate ?? false,
    templateSourceId:
      toStringValue(value.templateSourceId, value.TemplateSourceId) ?? null,
    isSystemGenerated:
      value.isSystemGenerated ?? value.IsSystemGenerated ?? false,
    isDefaultForJoin:
      value.isDefaultForJoin ?? value.IsDefaultForJoin ?? false,
    entityType: toStringValue(value.entityType, value.EntityType) ?? null,
    entityId: toStringValue(value.entityId, value.EntityId) ?? null,
    permissions: toStringList(value.permissions ?? value.Permissions),
    assignableBy: toStringList(value.assignableBy ?? value.AssignableBy),
    approvableBy: toStringList(value.approvableBy ?? value.ApprovableBy),
    isActive: value.isActive ?? value.IsActive ?? false,
    archivedAt: toStringValue(value.archivedAt, value.ArchivedAt) ?? null,
    archiveReason:
      toStringValue(value.archiveReason, value.ArchiveReason) ?? null,
    level:
      typeof levelValue === "number" && Number.isFinite(levelValue)
        ? levelValue
        : null,
    inherits: toStringList(value.inherits ?? value.Inherits),
  };
};

export const normalizeContextRoles = (payload: unknown): ContextRoleDto[] =>
  extractItems(payload)
    .map(normalizeContextRole)
    .filter((item): item is ContextRoleDto => item !== null);

export const normalizeContextRoleResponse = (
  payload: unknown,
): ContextRoleDto | unknown =>
  normalizeContextRole(extractItem(payload)) ?? payload;
