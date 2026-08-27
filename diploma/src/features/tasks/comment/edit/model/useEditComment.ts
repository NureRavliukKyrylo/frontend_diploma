import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import { taskKeys } from "@entities/task";
import { editComment } from "../api/editCommentApi";
import { getEditCommentValidationSchema } from "../libs/editCommentValidationSchema";
import { useTranslation } from "react-i18next";

export interface EditCommentFormValues {
  body: string;
}

export const useEditComment = (
  taskId: string,
  commentId: string,
  initialBody: string,
  onCancel?: () => void,
) => {
  const { t } = useTranslation(["task", "common"]);
  const validationSchema = getEditCommentValidationSchema(t);

  const mutation = useMutation({
    mutationFn: (body: string) => editComment(commentId, { body }),
    onSuccess: () => {
      addToast({
        title: t("task:comments.notifications.editSuccessTitle"),
        description: t("task:comments.notifications.editSuccessDescription"),
        color: "success",
      });
      queryClient.invalidateQueries({
        queryKey: taskKeys.id(taskId),
      });
      onCancel?.();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("task:comments.notifications.editFailedTitle"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik<EditCommentFormValues>({
    initialValues: { body: initialBody },
    validationSchema,
    onSubmit: async (values, helpers) => {
      await mutation.mutateAsync(values.body);
      helpers.resetForm();
    },
  });

  return {
    formik,
    isLoading: mutation.isPending,
    mutation,
  };
};
