import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import { createComment } from "../api/createCommentApi";
import { taskKeys } from "@entities/task";
import { getCreateCommentValidationSchema } from "../libs/createCommentValidationSchema";
import { useTranslation } from "react-i18next";

export interface CreateCommentFormValues {
  body: string;
}

export const useCreateComment = (
  taskId: string,
  parentCommentId?: string,
  replyToUserId?: string,
) => {
  const { t } = useTranslation(["task", "common"]);
  const validationSchema = getCreateCommentValidationSchema(t);

  const mutation = useMutation({
    mutationFn: (body: string) =>
      createComment(taskId, { body, parentCommentId, replyToUserId }),
    onSuccess: () => {
      addToast({
        title: t("task:comments.notifications.createSuccessTitle"),
        description: t("task:comments.notifications.createSuccessDescription"),
        color: "success",
      });
      queryClient.invalidateQueries({
        queryKey: taskKeys.id(taskId),
      });
    },
    onError: (error: unknown) => {
      addToast({
        title: t("task:comments.notifications.createFailedTitle"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik<CreateCommentFormValues>({
    initialValues: { body: "" },
    validationSchema,
    onSubmit: async (values, helpers) => {
      await mutation.mutateAsync(values.body);
      helpers.resetForm();
    },
  });

  return {
    formik,
    isLoading: mutation.isPending,
  };
};
