export type ContextRoleArchiveReason = "manual" | "no_users" | "context_ended";

export interface ContextRoleDto {
  id: string;
  name: string;
  description?: string | null;
  isTemplate: boolean;
  templateSourceId?: string | null;
  isSystemGenerated: boolean;
  isDefaultForJoin: boolean;
  entityType?: string | null;
  entityId?: string | null;
  permissions: string[];
  assignableBy: string[];
  approvableBy: string[];
  isActive: boolean;
  archivedAt?: string | null;
  archiveReason?: string | null;
  level?: number | null;
  inherits: string[];
}

export interface ContextRoleCreateDto {
  name: string;
  description?: string | null;
  isTemplate?: boolean;
  templateSourceId?: string | null;
  isSystemGenerated?: boolean;
  isDefaultForJoin?: boolean;
  entityType?: string | null;
  entityId?: string | null;
  permissions: string[];
  assignableBy: string[];
  approvableBy: string[];
  isActive?: boolean;
  archivedAt?: string | null;
  archiveReason?: "none" | ContextRoleArchiveReason | null;
}

export interface ContextRoleCreateFromTemplateRequest {
  templateId: string;
  entityType: string;
  entityId: string;
  name?: string | null;
  description?: string | null;
  isDefaultForJoin?: boolean;
  permissionsOverride?: string[] | null;
}

export interface ContextRoleApiRecord {
  id?: string;
  Id?: string;
  name?: string;
  Name?: string;
  description?: string | null;
  Description?: string | null;
  isTemplate?: boolean;
  IsTemplate?: boolean;
  templateSourceId?: string | null;
  TemplateSourceId?: string | null;
  isSystemGenerated?: boolean;
  IsSystemGenerated?: boolean;
  isDefaultForJoin?: boolean;
  IsDefaultForJoin?: boolean;
  entityType?: string | null;
  EntityType?: string | null;
  entityId?: string | null;
  EntityId?: string | null;
  permissions?: string[];
  Permissions?: string[];
  assignableBy?: string[];
  AssignableBy?: string[];
  approvableBy?: string[];
  ApprovableBy?: string[];
  isActive?: boolean;
  IsActive?: boolean;
  archivedAt?: string | null;
  ArchivedAt?: string | null;
  archiveReason?: string | null;
  ArchiveReason?: string | null;
  level?: number;
  Level?: number;
  inherits?: string[];
  Inherits?: string[];
}
