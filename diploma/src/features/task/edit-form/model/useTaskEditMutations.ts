import type { Dispatch, SetStateAction } from "react";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eventKeys } from "@entities/event";
import { organizationKeys } from "@entities/organization";
import { projectKeys } from "@entities/project";
import {
  deleteTask,
  organizationTaskKeys,
  taskKeys,
  updateTask,
  updateTaskStatus,
  type Task,
} from "@entities/task";
import { getErrorMessage } from "@shared/libs/error-message";
import { buildTaskEditPayload } from "../lib/buildTaskEditPayload";
import type { TaskSettingsValues } from "./types";

interface UseTaskEditMutationsProps {
  task: Task;
  onExitEdit: () => void;
  onCloseDrawer?: () => void;
  setIsSaveModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsCancelModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const useTaskEditMutations = ({
  task,
  onExitEdit,
  onCloseDrawer,
  setIsSaveModalOpen,
  setIsCancelModalOpen,
  setIsDeleteModalOpen,
}: UseTaskEditMutationsProps) => {
  const queryClient = useQueryClient();

  const invalidateTaskQueries = async () => {
    await queryClient.invalidateQueries({ queryKey: taskKeys.all() });
    await queryClient.invalidateQueries({ queryKey: organizationTaskKeys.all() });

    const organizationId = task.organizationId ?? task.organization?.id;
    if (organizationId) {
      await queryClient.invalidateQueries({
        queryKey: organizationKeys.details(organizationId),
      });
      await queryClient.invalidateQueries({ queryKey: organizationKeys.all() });
    }

    const projectId = task.projectId ?? task.project?.id;
    if (projectId) {
      await queryClient.invalidateQueries({ queryKey: projectKeys.id(projectId) });
      await queryClient.invalidateQueries({ queryKey: projectKeys.all() });
    }

    const eventId = task.eventId ?? task.event?.id;
    if (eventId) {
      await queryClient.invalidateQueries({ queryKey: eventKeys.id(eventId) });
      await queryClient.invalidateQueries({ queryKey: eventKeys.all() });
    }
  };

  const updateMutation = useMutation({
    mutationFn: (formValues: TaskSettingsValues) =>
      updateTask(buildTaskEditPayload(task, formValues)),
    onSuccess: async () => {
      setIsSaveModalOpen(false);
      await invalidateTaskQueries();
      addToast({ title: "Task settings saved", color: "success" });
      onExitEdit();
    },
    onError: (error) => {
      addToast({
        title: "Could not save task",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: () => updateTaskStatus(task.id, { status: "Cancelled" }),
    onSuccess: async () => {
      setIsCancelModalOpen(false);
      await invalidateTaskQueries();
      addToast({ title: "Task cancelled", color: "success" });
    },
    onError: (error) => {
      addToast({
        title: "Could not cancel task",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteTask(task.id),
    onSuccess: async () => {
      setIsDeleteModalOpen(false);
      await invalidateTaskQueries();
      addToast({ title: "Task deleted", color: "success" });
      onCloseDrawer?.();
    },
    onError: (error) => {
      addToast({
        title: "Could not delete task",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  return { updateMutation, cancelMutation, deleteMutation };
};
