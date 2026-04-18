import { useFormik } from "formik";
import { useCreateFeedback, useUpdateFeedback } from "@entities/feedback";
import type { EntityType } from "@shared/config/types";
import { feedbackSchema } from "../libs/feedbackSchema";

export interface FeedbackFormValues {
  rating: number;
  comment: string;
}

interface UseFeedbackFormOptions {
  entityType: EntityType;
  entityId: string;
  initialValues?: FeedbackFormValues & { id: string };
  onSuccess?: () => void;
}

export const useFeedbackForm = ({
  entityType,
  entityId,
  initialValues,
  onSuccess,
}: UseFeedbackFormOptions) => {
  const {
    handleCreateFeedback,
    isLoading: isCreating,
    mutation: isCreateMutation,
  } = useCreateFeedback({
    entityType,
    entityId,
    onSuccess,
  });

  const {
    handleUpdateFeedback,
    isLoading: isUpdating,
    mutation: isUpdateMutation,
  } = useUpdateFeedback({
    entityType,
    entityId,

    onSuccess,
  });

  const formik = useFormik<FeedbackFormValues>({
    initialValues: {
      rating: initialValues?.rating ?? 0,
      comment: initialValues?.comment ?? "",
    },
    validationSchema: feedbackSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (initialValues) {
        handleUpdateFeedback({ id: initialValues.id, data: values });
      } else {
        handleCreateFeedback(values);
      }
    },
  });

  return {
    formik,
    mutation: isCreateMutation || isUpdateMutation,
    isLoading: isCreating || isUpdating,
  };
};
