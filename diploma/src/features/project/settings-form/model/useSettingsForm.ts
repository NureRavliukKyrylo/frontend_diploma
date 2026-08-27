import { useEffect, useMemo, useState } from "react";
import { addToast } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { projectQuery } from "@entities/project";
import type { Policy } from "@shared/config/types";
import { getProjectSettingsDefaults } from "../lib/getProjectSettingsDefaults";
import { getProjectSettingsValidationErrors } from "../lib/getProjectSettingsValidationErrors";
import {
  getProjectStatus,
  hasProjectContentManagePermission,
} from "../lib/projectSettingsMeta";
import { useProjectCategoryHandlers } from "./useProjectCategoryHandlers";
import { useProjectLocationHandlers } from "./useProjectLocationHandlers";
import { useProjectSettingsMutations } from "./useProjectSettingsMutations";
import type {
  PendingProjectPolicyChange,
  ProjectPolicyField,
  ProjectSettingsChangeHandler,
  ProjectSettingsErrors,
  ProjectSettingsValues,
} from "./types";

export const useProjectSettingsForm = (projectId: string) => {
  const navigate = useNavigate();
  const {
    data: project,
    isError,
    isPending,
  } = useQuery(projectQuery.id(projectId));
  const initialValues = useMemo(
    () => (project ? getProjectSettingsDefaults(project) : null),
    [project],
  );
  const [values, setValues] = useState<ProjectSettingsValues | null>(null);
  const [errors, setErrors] = useState<ProjectSettingsErrors>({});
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [isRecoverModalOpen, setIsRecoverModalOpen] = useState(false);
  const [pendingPolicyChange, setPendingPolicyChange] =
    useState<PendingProjectPolicyChange | null>(null);

  useEffect(() => {
    if (!initialValues) return;

    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  const { updateDetailsMutation, archiveMutation, recoverMutation } =
    useProjectSettingsMutations({
      projectId,
      project,
      setIsSaveModalOpen,
      setIsArchiveModalOpen,
      setIsRecoverModalOpen,
    });

  const handleChange: ProjectSettingsChangeHandler = (field, value) => {
    setValues((current) => (current ? { ...current, [field]: value } : current));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleDateChange = (
    field: "startAt" | "endAt",
    value: string | null,
  ) => {
    handleChange(field, value ?? "");
  };

  const { handleCategoryToggle } = useProjectCategoryHandlers({ setValues });
  const { handleLocationTextChange, handleLocationChange } =
    useProjectLocationHandlers({ setValues });

  const handlePolicyChange = (field: ProjectPolicyField, value: Policy) => {
    if (!values || values[field] === value) return;
    setPendingPolicyChange({ field, value });
  };

  const handlePolicyConfirm = () => {
    if (!pendingPolicyChange) return;

    handleChange(pendingPolicyChange.field, pendingPolicyChange.value);
    setPendingPolicyChange(null);
  };

  const handleDiscard = () => {
    setValues(initialValues);
    setErrors({});
  };

  const handleSave = () => {
    if (!values) return;

    const nextErrors = getProjectSettingsValidationErrors(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      addToast({ title: "Please check required fields", color: "danger" });
      return;
    }

    setIsSaveModalOpen(true);
  };

  const handleSaveConfirm = () => {
    if (!values) return;
    updateDetailsMutation.mutate(values);
  };

  const navigateToProject = () => {
    void navigate({ to: "/projects/$id", params: { id: projectId } });
  };

  return {
    project,
    projectStatus: project ? getProjectStatus(project) : "active",
    values,
    errors,
    isLoading: isPending,
    isError,
    canEditProject: hasProjectContentManagePermission(project),
    isSaveModalOpen,
    isArchiveModalOpen,
    isRecoverModalOpen,
    pendingPolicyChange,
    isSavePending: updateDetailsMutation.isPending,
    isArchivePending: archiveMutation.isPending,
    isRecoverPending: recoverMutation.isPending,
    handleChange,
    handleDateChange,
    handleCategoryToggle,
    handleLocationTextChange,
    handleLocationChange,
    handlePolicyChange,
    handlePolicyConfirm,
    handleDiscard,
    handleSave,
    handleSaveConfirm,
    navigateToProject,
    setIsSaveModalOpen,
    setIsArchiveModalOpen,
    setIsRecoverModalOpen,
    setPendingPolicyChange,
    archiveProject: archiveMutation.mutate,
    recoverProject: recoverMutation.mutate,
  };
};
