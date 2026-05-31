import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import { taskKeys } from "@entities/task";
import { editComment } from "../api/editCommentApi";
import { editCommentValidationSchema } from "../libs/editCommentValidationSchema";

export interface EditCommentFormValues {
  body: string;
}

export const useEditComment = (taskId: string, commentId: string) => {
  const mutation = useMutation({
    mutationFn: (body: string) => editComment(commentId, { body }),
    onSuccess: () => {
      addToast({
        title: "Comment Edit Success",
        description: "Your comment has been edited successfully",
        color: "success",
      });
      queryClient.invalidateQueries({
        queryKey: taskKeys.id(taskId),
      });
    },
    onError: (error: unknown) => {
      addToast({
        title: "Comment edition Failed",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  const formik = useFormik<EditCommentFormValues>({
    initialValues: { body: "" },
    validationSchema: editCommentValidationSchema,
    onSubmit: (values) => {
      mutation.mutate(values.body);
    },
  });

  return {
    formik,
    isLoading: mutation.isPending,
    mutation,
  };
};
