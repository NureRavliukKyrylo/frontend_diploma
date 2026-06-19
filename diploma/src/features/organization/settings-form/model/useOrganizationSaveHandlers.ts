import type { Dispatch, SetStateAction } from "react";
import { addToast } from "@heroui/react";
import type { UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { getOrganizationSettingsValidationErrors } from "../lib/getOrganizationSettingsValidationErrors";
import type {
  OrganizationSettingsErrors,
  OrganizationSettingsValues,
} from "./types";

interface UseOrganizationSaveHandlersProps {
  organizationId?: string;
  values: OrganizationSettingsValues | null;
  initialValues: OrganizationSettingsValues | null;
  setValues: Dispatch<SetStateAction<OrganizationSettingsValues | null>>;
  setErrors: Dispatch<SetStateAction<OrganizationSettingsErrors>>;
  setIsSaveModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  updateDetailsMutation: UseMutationResult<
    void,
    Error,
    OrganizationSettingsValues,
    unknown
  >;
}

export const useOrganizationSaveHandlers = ({
  organizationId,
  values,
  initialValues,
  setValues,
  setErrors,
  setIsSaveModalOpen,
  setIsDeleteModalOpen,
  updateDetailsMutation,
}: UseOrganizationSaveHandlersProps) => {
  const navigate = useNavigate();

  const handleDiscard = () => {
    setValues(initialValues);
    setErrors({});
  };

  const handleSave = () => {
    if (!values) return;

    const nextErrors = getOrganizationSettingsValidationErrors(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      addToast({ title: "Please check required fields", color: "danger" });
      return;
    }

    setIsSaveModalOpen(true);
  };

  const handleSaveConfirm = () => {
    if (!values) return;

    setIsSaveModalOpen(false);
    updateDetailsMutation.mutate(values);
  };

  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);
    addToast({
      title: "Delete is unavailable",
      description: "The backend does not expose an organization delete endpoint.",
      color: "warning",
    });
  };

  const navigateToOrganization = () => {
    if (!organizationId) return;

    void navigate({
      to: "/organizations/$id",
      params: { id: organizationId },
    });
  };

  return {
    handleDiscard,
    handleSave,
    handleSaveConfirm,
    handleDeleteConfirm,
    navigateToOrganization,
  };
};
