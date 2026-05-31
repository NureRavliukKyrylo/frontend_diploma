import { useMutation } from "@tanstack/react-query";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import { addToast } from "@heroui/react";
import { deleteComment } from "../api/deleteCommentApi";
import { taskKeys } from "@entities/task";

export const useDeleteComment = (
  taskId: string,
  commentId: string,
  onSuccess: () => void,
) => {
  const mutation = useMutation({
    mutationFn: () => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.id(taskId) });
      addToast({
        title: "Delete Comment Success",
        description: "You have deleted your comment successfully",
        color: "success",
      });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);

      addToast({
        title: "Delete Comment Failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });

  return {
    deleteProfile: mutation.mutate,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};
