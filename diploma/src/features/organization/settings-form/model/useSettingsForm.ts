import { useEffect, useMemo, useState } from "react";
import {
  getOrganizationInitials,
  getOrganizationSettingsDefaults,
} from "../lib/getOrganizationSettingsDefaults";
import { useOrganizationLocationHandlers } from "./useOrganizationLocationHandlers";
import { useOrganizationLogoHandlers } from "./useOrganizationLogoHandlers";
import { useOrganizationLogoState } from "./useOrganizationLogoState";
import { useOrganizationSaveHandlers } from "./useOrganizationSaveHandlers";
import { useOrganizationSettingsAccess } from "./useOrganizationSettingsAccess";
import { useOrganizationSettingsMutations } from "./useOrganizationSettingsMutations";
import type {
  OrganizationPolicyField,
  OrganizationPolicyValue,
  OrganizationSettingsChangeHandler,
  OrganizationSettingsErrors,
  OrganizationSettingsValues,
  PendingOrganizationPolicyChange,
} from "./types";

export const useOrganizationSettingsForm = (organizationId: string) => {
  const {
    organization,
    isError,
    isPending,
    isOrganizationOwner,
    isEditAccessLoading,
    canEditOrganization,
  } = useOrganizationSettingsAccess(organizationId);
  const initialValues = useMemo(
    () => (organization ? getOrganizationSettingsDefaults(organization) : null),
    [organization],
  );
  const [values, setValues] = useState<OrganizationSettingsValues | null>(null);
  const [errors, setErrors] = useState<OrganizationSettingsErrors>({});
  const { currentLogoUrl, logoObjectUrl, logoCropUrl, setCurrentLogoUrl, setLogoObjectUrl, setLogoCropUrl } =
    useOrganizationLogoState(organization?.logoUrl);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [pendingPolicyChange, setPendingPolicyChange] =
    useState<PendingOrganizationPolicyChange | null>(null);

  useEffect(() => {
    if (!initialValues) return;

    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  const {
    updateDetailsMutation,
    uploadLogoMutation,
    deleteLogoMutation,
    archiveMutation,
  } = useOrganizationSettingsMutations({
    organizationId,
    organization,
    setCurrentLogoUrl,
    setLogoObjectUrl,
    setIsArchiveModalOpen,
  });

  const handleChange: OrganizationSettingsChangeHandler = (field, value) => {
    setValues((current) => (current ? { ...current, [field]: value } : current));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const { handleLocationTextChange, handleLocationChange } =
    useOrganizationLocationHandlers({ setValues });

  const handlePolicyChange = (
    field: OrganizationPolicyField,
    value: OrganizationPolicyValue,
  ) => {
    if (!values || values[field] === value) return;
    setPendingPolicyChange({ field, value });
  };

  const handlePolicyConfirm = () => {
    if (!pendingPolicyChange) return;

    handleChange(pendingPolicyChange.field, pendingPolicyChange.value);
    setPendingPolicyChange(null);
  };

  const {
    handleLogoSelect,
    handleLogoCropClose,
    handleLogoCropSave,
    handleLogoRemove,
  } = useOrganizationLogoHandlers({
    currentLogoUrl,
    setLogoObjectUrl,
    setLogoCropUrl,
    uploadLogo: uploadLogoMutation.mutate,
    deleteLogo: deleteLogoMutation.mutate,
  });

  const {
    handleDiscard,
    handleSave,
    handleSaveConfirm,
    handleDeleteConfirm,
    navigateToOrganization,
  } = useOrganizationSaveHandlers({
    organizationId: organization?.id,
    values,
    initialValues,
    setValues,
    setErrors,
    setIsSaveModalOpen,
    setIsDeleteModalOpen,
    updateDetailsMutation,
  });

  return {
    organization,
    values,
    errors,
    currentLogoUrl,
    logoPreviewUrl: logoObjectUrl ?? currentLogoUrl,
    logoCropUrl,
    initials: organization ? getOrganizationInitials(organization.name) : "IF",
    pendingPolicyChange,
    isPending,
    isError,
    isOrganizationOwner,
    isEditAccessLoading,
    canEditOrganization,
    isSaving: updateDetailsMutation.isPending,
    isLogoUploading: uploadLogoMutation.isPending,
    isLogoRemoving: deleteLogoMutation.isPending,
    isArchivePending: archiveMutation.isPending,
    isSaveModalOpen,
    isArchiveModalOpen,
    isDeleteModalOpen,
    setIsSaveModalOpen,
    setIsArchiveModalOpen,
    setIsDeleteModalOpen,
    setPendingPolicyChange,
    handleChange,
    handleLocationTextChange,
    handleLocationChange,
    handlePolicyChange,
    handlePolicyConfirm,
    handleDiscard,
    handleSave,
    handleSaveConfirm,
    handleLogoSelect,
    handleLogoCropClose,
    handleLogoCropSave,
    handleLogoRemove,
    handleDeleteConfirm,
    archiveOrganization: () => archiveMutation.mutate(),
    navigateToOrganization,
  };
};
