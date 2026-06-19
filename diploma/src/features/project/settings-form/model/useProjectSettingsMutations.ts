import type { Dispatch, SetStateAction } from "react";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { organizationKeys } from "@entities/organization";
import {
  archiveProject,
  projectKeys,
  recoverProject,
  updateProject,
  type Project,
} from "@entities/project";
import { buildProjectSettingsPayload } from "../lib/buildProjectSettingsPayload";
import { getProjectSettingsErrorMessage } from "../lib/projectSettingsMeta";
import type { ProjectSettingsValues } from "./types";

interface UseProjectSettingsMutationsProps {
  projectId: string;
  project?: Project;
  setIsSaveModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsArchiveModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsRecoverModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const useProjectSettingsMutations = ({
  projectId,
  project,
  setIsSaveModalOpen,
  setIsArchiveModalOpen,
  setIsRecoverModalOpen,
}: UseProjectSettingsMutationsProps) => {
  const queryClient = useQueryClient();

  const invalidateProjectQueries = async () => {
    await queryClient.invalidateQueries({ queryKey: projectKeys.id(projectId) });
    await queryClient.invalidateQueries({ queryKey: projectKeys.all() });

    const organizationId = project?.organizationId ?? project?.organization?.id;
    if (organizationId) {
      await queryClient.invalidateQueries({
        queryKey: organizationKeys.details(organizationId),
      });
      await queryClient.invalidateQueries({ queryKey: organizationKeys.all() });
    }
  };

  const updateDetailsMutation = useMutation({
    mutationFn: (formValues: ProjectSettingsValues) =>
      updateProject(buildProjectSettingsPayload(projectId, formValues)),
    onSuccess: async () => {
      setIsSaveModalOpen(false);
      await invalidateProjectQueries();
      addToast({ title: "Changes saved", color: "success" });
    },
    onError: (error) => {
      addToast({
        title: "Could not save changes",
        description: getProjectSettingsErrorMessage(error),
        color: "danger",
      });
    },
  });

  const archiveMutation = useMutation({
    mutationFn: () => archiveProject(projectId),
    onSuccess: async () => {
      setIsArchiveModalOpen(false);
      await invalidateProjectQueries();
      addToast({ title: "Project archived", color: "success" });
    },
    onError: (error) => {
      addToast({
        title: "Could not archive project",
        description: getProjectSettingsErrorMessage(error),
        color: "danger",
      });
    },
  });

  const recoverMutation = useMutation({
    mutationFn: () => recoverProject(projectId),
    onSuccess: async () => {
      setIsRecoverModalOpen(false);
      await invalidateProjectQueries();
      addToast({ title: "Project recovered", color: "success" });
    },
    onError: (error) => {
      addToast({
        title: "Could not recover project",
        description: getProjectSettingsErrorMessage(error),
        color: "danger",
      });
    },
  });

  return { updateDetailsMutation, archiveMutation, recoverMutation };
};
