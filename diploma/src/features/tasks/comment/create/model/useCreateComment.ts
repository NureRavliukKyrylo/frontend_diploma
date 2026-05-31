import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import { createComment } from "../api/createCommentApi";
import { taskKeys } from "@entities/task";
import { createCommentValidationSchema } from "../libs/createCommentValidationSchema";

export interface CreateCommentFormValues {
  body: string;
}

export const useCreateComment = (
  taskId: string,
  parentCommentId?: string,
  replyToUserId?: string,
) => {
  const mutation = useMutation({
    mutationFn: (body: string) =>
      createComment(taskId, { body, parentCommentId, replyToUserId }),
    onSuccess: () => {
      addToast({
        title: "Create Comment Success",
        description: "Your comment has been created successfully",
        color: "success",
      });
      queryClient.invalidateQueries({
        queryKey: taskKeys.id(taskId),
      });
    },
    onError: (error: unknown) => {
      addToast({
        title: "Comment creation Failed",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  const formik = useFormik<CreateCommentFormValues>({
    initialValues: { body: "" },
    validationSchema: createCommentValidationSchema,
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
