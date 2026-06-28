import { useEffect, useMemo, useState } from "react";
import type {
  ContextRoleCreateDto,
  ContextRoleDto,
} from "@entities/organization";
import { getErrorMessage } from "@shared/libs/error-message";
import {
  contextRolePermissionGroups,
  getPermissionLabel,
} from "../../../config/rolePresentation";

export type RoleFormMode = "create" | "edit" | "template";
export interface RoleFormState {
  name: string;
  description: string;
  permissions: string[];
  assignableBy: string[];
  approvableBy: string[];
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
  entityType?: string;
  entityId?: string;
  role?: ContextRoleDto | null;
  existingRoles: ContextRoleDto[];
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
      assignableBy: [...role.assignableBy],
      approvableBy: [...role.approvableBy],
      isDefaultForJoin: role.isDefaultForJoin,
    };
  }
  if (mode === "template" && role) {
    return {
      name: role.name,
      description: "",
      permissions: [...role.permissions],
      assignableBy: [],
      approvableBy: [],
      isDefaultForJoin: false,
    };
  }
  return {
    name: "",
    description: "",
    permissions: [],
    assignableBy: [],
    approvableBy: [],
    isDefaultForJoin: false,
  };
};

const normalizeRoleName = (name: string) => name.trim().toLocaleLowerCase();

export const useRoleFormModal = ({
  isOpen,
  mode,
  organizationId,
  entityType = "organization",
  entityId = organizationId,
  role,
  existingRoles,
  onSubmit,
}: UseRoleFormModalParams) => {
  const [values, setValues] = useState(() => buildInitialState(mode, role));
  const [errors, setErrors] = useState<RoleFormErrors>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const getDuplicateNameError = (name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) return undefined;
    const normalizedName = normalizeRoleName(trimmedName);
    const duplicate = existingRoles.some(
      (existingRole) =>
        existingRole.id !== role?.id &&
        !existingRole.archivedAt &&
        normalizeRoleName(existingRole.name) === normalizedName,
    );
    return duplicate
      ? `A role named "${trimmedName}" already exists in this organization, including archived roles.`
      : undefined;
  };
  const getNameError = (name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) return "Role name is required.";
    if (trimmedName.length > 200) {
      return "Role name must be 200 characters or less.";
    }
    return getDuplicateNameError(trimmedName);
  };
  useEffect(() => {
    if (isOpen) {
      const nextValues = buildInitialState(mode, role);
      setValues(nextValues);
      setErrors({ name: getDuplicateNameError(nextValues.name) });
      setCurrentStep(1);
      setSubmitError(null);
    }
  }, [isOpen, mode, role, existingRoles]);
  const updateField = <Field extends keyof RoleFormState>(
    field: Field,
    value: RoleFormState[Field],
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    setSubmitError(null);
    setErrors((current) => ({
      ...current,
      [field]:
        field === "name" ? getDuplicateNameError(String(value)) : undefined,
    }));
  };
  const togglePermission = (permission: string) => {
    updateField(
      "permissions",
      values.permissions.includes(permission)
        ? values.permissions.filter((item) => item !== permission)
        : [...values.permissions, permission],
    );
  };
  const addAssignment = (
    field: "assignableBy" | "approvableBy",
    value: string,
  ) => {
    setValues((current) =>
      current[field].includes(value)
        ? current
        : { ...current, [field]: [...current[field], value] },
    );
  };
  const removeAssignment = (
    field: "assignableBy" | "approvableBy",
    value: string,
  ) => {
    setValues((current) => ({
      ...current,
      [field]: current[field].filter((item) => item !== value),
    }));
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
  const validateStep = (step: number) => {
    const nextErrors: RoleFormErrors = {};
    if (step === 1 || step === 3) {
      const nameError = getNameError(values.name);
      if (nameError) nextErrors.name = nameError;
    }
    if ((step === 2 || step === 3) && values.permissions.length === 0) {
      nextErrors.permissions = "Select at least one permission.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };
  const goToNextStep = () => {
    if (!validateStep(currentStep)) return;
    setCurrentStep((step) => Math.min(step + 1, 3));
  };
  const goToPreviousStep = () => {
    setSubmitError(null);
    setCurrentStep((step) => Math.max(step - 1, 1));
  };
  const canContinue =
    currentStep === 1
      ? !getNameError(values.name)
      : currentStep === 2
        ? values.permissions.length > 0
        : !getNameError(values.name) && values.permissions.length > 0;
  const handleSubmit = async () => {
    setSubmitError(null);
    if (!validateStep(3)) return;
    const trimmedName = values.name.trim();
    const payload: ContextRoleCreateDto = {
      name: trimmedName,
      description: values.description.trim() || null,
      isTemplate: false,
      templateSourceId:
        mode === "template"
          ? (role?.id ?? null)
          : (role?.templateSourceId ?? null),
      isSystemGenerated: false,
      entityType:
        mode === "edit" ? (role?.entityType ?? entityType) : entityType,
      entityId: mode === "edit" ? (role?.entityId ?? entityId) : entityId,
      permissions: values.permissions,
      isDefaultForJoin: values.isDefaultForJoin,
      assignableBy: values.assignableBy,
      approvableBy: values.approvableBy,
      isActive: true,
    };
    try {
      await onSubmit(payload);
    } catch (error) {
      setSubmitError(getErrorMessage(error));
      return;
    }
  };
  const count = values.permissions.length;
  return {
    values,
    errors,
    permissionGroups,
    selectedCountLabel: `${count} permission${count === 1 ? "" : "s"} selected`,
    currentStep,
    stepSubtitle:
      currentStep === 1
        ? "Step 1 of 3 — name and describe this role."
        : currentStep === 2
          ? "Step 2 of 3 — choose what this role can do."
          : "Step 3 of 3 — decide who can assign and approve it.",
    title:
      mode === "edit"
        ? "Edit role"
        : mode === "template"
          ? "Create from template"
          : "Create new role",
    submitLabel:
      mode === "edit"
        ? "Save"
        : mode === "template"
          ? "Create from template"
          : "Create role",
    updateField,
    togglePermission,
    addAssignment,
    removeAssignment,
    goToNextStep,
    goToPreviousStep,
    handleSubmit,
    canContinue,
    submitError,
  };
};
