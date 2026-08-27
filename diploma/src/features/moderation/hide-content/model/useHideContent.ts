import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { hideContent, type HideContentDto } from "../api/hideContentApi";
import { getHideContentSchema } from "../libs/hideContentSchema";
import {
  ModerationSubjectType,
  ReportReasonType,
} from "@entities/report/model";
import { useTranslation } from "react-i18next";

interface UseHideContentProps {
  caseId: string;
  targetEntityType: keyof typeof ModerationSubjectType;
  targetEntityId: string;
  onSuccess: () => void;
}

export const useHideContent = ({
  caseId,
  targetEntityType,
  targetEntityId,
  onSuccess,
}: UseHideContentProps) => {
  const { t } = useTranslation(["moderation"]);

  const mutation = useMutation({
    mutationFn: (data: HideContentDto) => hideContent(caseId, data),
    onSuccess: () => {
      addToast({
        title: t("moderation:hideContent.notifications.successTitle"),
        description: t(
          "moderation:hideContent.notifications.successDescription",
        ),
        color: "success",
      });
      onSuccess();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("moderation:hideContent.notifications.failedTitle"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik<{ reason: ReportReasonType }>({
    initialValues: { reason: ReportReasonType.spam },
    validationSchema: getHideContentSchema(t),
    onSubmit: (values) => {
      mutation.mutate({
        targetEntityType,
        targetEntityId,
        reason: values.reason,
      });
    },
  });

  return { formik, isLoading: mutation.isPending };
};
