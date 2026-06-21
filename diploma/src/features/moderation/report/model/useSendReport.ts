import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { sendReport, type ReportDto } from "../api/reportApi";
import { getReportSchema } from "../libs/reportSchema";
import type { ModerationSubjectType } from "@entities/report";
import { ReportReasonType } from "@entities/report/model";
import { useTranslation } from "react-i18next";

interface UseSendReportProps {
  subjectType: ModerationSubjectType;
  subjectId: string;
  onSuccess: () => void;
}

export const useSendReport = ({
  subjectType,
  subjectId,
  onSuccess,
}: UseSendReportProps) => {
  const { t } = useTranslation(["moderation"]);

  const mutation = useMutation({
    mutationFn: (data: ReportDto) => sendReport(data),
    onSuccess: () => {
      addToast({
        title: t("moderation:report.notifications.successTitle"),
        description: t("moderation:report.notifications.successDescription"),
        color: "success",
      });
      onSuccess();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("moderation:report.notifications.failedTitle"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik<{ reason: ReportReasonType; details: string }>({
    initialValues: { reason: ReportReasonType.spam, details: "" },
    validationSchema: getReportSchema(t),
    onSubmit: (values) => {
      mutation.mutate({
        subjectType,
        subjectId,
        reason: values.reason,
        details: values.details,
      });
    },
  });

  return {
    formik,
    handleSendReport: formik.handleSubmit,
    isLoading: mutation.isPending,
  };
};
