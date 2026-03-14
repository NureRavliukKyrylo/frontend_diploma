import { useMutation } from "@tanstack/react-query";
import { joinProject, type JoinProjectDTO } from "../api/joinProjectApi";
import { getErrorMessage } from "@shared/libs/error-message";
import { addToast } from "@heroui/react";

export const useJoinProject = () => {
  const mutation = useMutation({
    mutationFn: (data: JoinProjectDTO) => joinProject(data),
    onSuccess: () => {
      addToast({
        title: "Joining Project Success",
        description: "You have joined project successfully",
        color: "success",
      });
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);

      addToast({
        title: "Joining Project Failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });
  return {
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    handleJoinProject: (data: JoinProjectDTO) => mutation.mutate(data),
    isLoading: mutation.isPending,
  };
};
