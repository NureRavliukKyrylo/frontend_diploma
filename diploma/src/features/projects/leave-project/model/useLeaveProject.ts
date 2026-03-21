import { useMutation } from "@tanstack/react-query";
import { leaveProject, type LeaveProjectDto } from "../api";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import { projectKeys } from "@entities/project/model/queries/projectQuery";
import { profileKeys } from "@entities/user/profile";

export const useLeaveProject = (onSuccess?: () => void) => {
  const mutation = useMutation({
    mutationFn: (data: LeaveProjectDto) => leaveProject(data),
    onSuccess: () => {
      addToast({
        title: "Leaving Project Success",
        description: "You have left project successfully",
        color: "success",
      });
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: projectKeys.mys() });
      queryClient.invalidateQueries({ queryKey: profileKeys.all() });
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);

      addToast({
        title: "Leaving Project Failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });
  return {
    mutation,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    handleLeaveProject: (data: LeaveProjectDto) => mutation.mutate(data),
    isLoading: mutation.isPending,
  };
};
