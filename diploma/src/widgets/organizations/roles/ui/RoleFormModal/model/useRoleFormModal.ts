import { useEffect, useMemo, useState } from "react";
import type {
  ContextRoleCreateDto,
  ContextRoleDto,
} from "@entities/organization";
import {
  contextRolePermissionGroups,
  getPermissionLabel,
} from "../../../config/rolePresentation";

export type RoleFormMode = "create" | "edit" | "template";
export interface RoleFormState {
  name: string;
  description: string;
  permissions: string[];
  isDefaultForJoin: boolean;
}
interface RoleFormErrors {
  name?: string;
  permissions?: string;
}
interface UseRoleFormModalParams {
  isOpen: boolean;
  mode: RoleFormMode;
  organizationId: string;
  role?: ContextRoleDto | null;
  onSubmit: (payload: ContextRoleCreateDto) => Promise<void>;
}
const buildInitialState = (
  mode: RoleFormMode,
  role?: ContextRoleDto | null,
): RoleFormState => {
  if (mode === "edit" && role) {
    return {
      name: role.name,
      description: role.description ?? "",
      permissions: [...role.permissions],
      isDefaultForJoin: role.isDefaultForJoin,
    };
  }
  if (mode === "template" && role) {
    return {
      name: "",
      description: "",
      permissions: [...role.permissions],
      isDefaultForJoin: false,
    };
  }
  return {
    name: "",
    description: "",
    permissions: [],
    isDefaultForJoin: false,
  };
};
export const useRoleFormModal = ({
  isOpen,
  mode,
  organizationId,
  role,
  onSubmit,
}: UseRoleFormModalParams) => {
  const [values, setValues] = useState(() => buildInitialState(mode, role));
  const [errors, setErrors] = useState<RoleFormErrors>({});
  useEffect(() => {
    if (isOpen) {
      setValues(buildInitialState(mode, role));
      setErrors({});
    }
  }, [isOpen, mode, role]);
  const updateField = <Field extends keyof RoleFormState>(
    field: Field,
    value: RoleFormState[Field],
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };
  const togglePermission = (permission: string) => {
    updateField(
      "permissions",
      values.permissions.includes(permission)
        ? values.permissions.filter((item) => item !== permission)
        : [...values.permissions, permission],
    );
  };

  const permissionGroups = useMemo(
    () =>
      contextRolePermissionGroups.map((group) => ({
        title: group.title,
        permissions: group.permissions.map((code) => ({
          code,
          label: getPermissionLabel(code),
          checked: values.permissions.includes(code),
        })),
      })),
    [values.permissions],
  );
  const handleSubmit = async () => {
    const trimmedName = values.name.trim();
    const nextErrors: RoleFormErrors = {};
    if (!trimmedName) nextErrors.name = "Role name is required.";
    else if (trimmedName.length > 200) {
      nextErrors.name = "Role name must be 200 characters or less.";
    }
    if (values.permissions.length === 0) {
      nextErrors.permissions = "Select at least one permission.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    const payload: ContextRoleCreateDto = {
      name: trimmedName,
      description: values.description.trim() || null,
      entityType: "organization",
      entityId: organizationId,
      permissions: values.permissions,
      isDefaultForJoin: values.isDefaultForJoin,
      assignableBy: mode === "edit" ? (role?.assignableBy ?? []) : [],
      approvableBy: mode === "edit" ? (role?.approvableBy ?? []) : [],
      isActive: true,
    };
    try {
      await onSubmit(payload);
    } catch {
      return;
    }
  };
  const count = values.permissions.length;
  return {
    values,
    errors,
    permissionGroups,
    selectedCountLabel: `${count} permission${count === 1 ? "" : "s"} selected`,
    title:
      mode === "edit"
        ? "Edit role"
        : mode === "template"
          ? "Create from template"
          : "Create new role",
    submitLabel: mode === "edit" ? "Save" : "Create",
    updateField,
    togglePermission,
    handleSubmit,
  };
};
