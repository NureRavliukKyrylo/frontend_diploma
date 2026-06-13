import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { hideContent, type HideContentDto } from "../api/hideContentApi";
import { hideContentSchema } from "../libs/hideContentSchema";
import type { ReportReason } from "@entities/report/model";
import type { EntityType } from "@shared/config/types";

interface UseHideContentProps {
  caseId: string;
  targetEntityType: EntityType;
  targetEntityId: string;
  onSuccess: () => void;
}

export const useHideContent = ({
  caseId,
  targetEntityType,
  targetEntityId,
  onSuccess,
}: UseHideContentProps) => {
  const mutation = useMutation({
    mutationFn: (data: HideContentDto) => hideContent(caseId, data),
    onSuccess: () => {
      addToast({
        title: "Content hidden",
        description: "The content has been hidden successfully.",
        color: "success",
      });
      onSuccess();
    },
    onError: (error: unknown) => {
      addToast({
        title: "Action failed",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  const formik = useFormik<{ reason: ReportReason | "" }>({
    initialValues: { reason: "Spam" },
    validationSchema: hideContentSchema,
    onSubmit: (values) => {
      mutation.mutate({
        targetEntityType,
        targetEntityId,
        reason: values.reason as ReportReason,
      });
    },
  });

  return { formik, isLoading: mutation.isPending };
};
