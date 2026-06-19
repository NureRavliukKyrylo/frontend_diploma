import type {
  ContextRoleCreateDto,
  OrganizationContextRole,
} from "@entities/organization";
import type { RoleActionState } from "../model/types";

export const buildRolePayload = (
  role: OrganizationContextRole,
  overrides: Partial<ContextRoleCreateDto> = {},
): ContextRoleCreateDto => ({
  name: overrides.name ?? role.name,
  description: overrides.description ?? role.description ?? null,
  isTemplate: overrides.isTemplate ?? role.isTemplate,
  templateSourceId:
    overrides.templateSourceId ?? role.templateSourceId ?? null,
  isSystemGenerated:
    overrides.isSystemGenerated ?? role.isSystemGenerated,
  isDefaultForJoin:
    overrides.isDefaultForJoin ?? role.isDefaultForJoin,
  entityType: overrides.entityType ?? role.entityType ?? "organization",
  entityId: overrides.entityId ?? role.entityId ?? null,
  permissions: overrides.permissions ?? role.permissions,
  assignableBy: overrides.assignableBy ?? role.assignableBy,
  approvableBy: overrides.approvableBy ?? role.approvableBy,
  isActive: overrides.isActive ?? role.isActive,
  archivedAt: overrides.archivedAt ?? role.archivedAt ?? null,
  archiveReason:
    overrides.archiveReason ??
    (role.archiveReason === "none" ||
    role.archiveReason === "manual" ||
    role.archiveReason === "no_users" ||
    role.archiveReason === "context_ended"
      ? role.archiveReason
      : null),
});

export const buildRoleActionCopy = (state: RoleActionState | null) => {
  if (!state) return { title: "", text: "", confirmText: "" };

  if (state.action === "archive") {
    return {
      title: "Archive role",
      text: `Are you sure you want to archive "${state.role.name}"?`,
      confirmText: "Archive",
    };
  }

  if (state.action === "restore") {
    return {
      title: "Restore role",
      text: `Restore "${state.role.name}" and make it available again?`,
      confirmText: "Restore",
    };
  }

  return {
    title: "Delete role",
    text: `Delete "${state.role.name}" permanently? This action cannot be undone.`,
    confirmText: "Delete",
  };
};
