import type {
  ContextRoleCreateDto,
  OrganizationContextRole,
} from "@entities/organization";
import type { ContextRoleCardType } from "@widgets/organizations/roles";

export type RolesTab = "active" | "archived";

export type RoleFormState =
  | { mode: "create"; role: null }
  | { mode: "edit"; role: OrganizationContextRole }
  | { mode: "template"; role: OrganizationContextRole };

export interface SelectedRoleState {
  role: OrganizationContextRole;
  type: ContextRoleCardType;
  index: number;
}

export interface RoleActionState {
  role: OrganizationContextRole;
  type: ContextRoleCardType;
  action: "archive" | "restore" | "delete";
}

export interface SaveRoleVariables {
  role?: OrganizationContextRole | null;
  payload: ContextRoleCreateDto;
  mode: "create" | "edit" | "template";
}
