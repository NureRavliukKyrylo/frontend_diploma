import { useMutation } from "@tanstack/react-query";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import { addToast } from "@heroui/react";
import { deleteComment } from "../api/deleteCommentApi";
import { taskKeys } from "@entities/task";
import { useTranslation } from "react-i18next";

export const useDeleteComment = (
  taskId: string,
  commentId: string,
  onSuccess: () => void,
) => {
  const { t } = useTranslation(["task", "common"]);

  const mutation = useMutation({
    mutationFn: () => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.id(taskId) });
      addToast({
        title: t("task:comments.notifications.deleteSuccessTitle"),
        description: t("task:comments.notifications.deleteSuccessDescription"),
        color: "success",
      });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("task:comments.notifications.deleteFailedTitle"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  return {
    deleteComment: mutation.mutate,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error, t) : null,
  };
};
