import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { sendReport, type ReportDto } from "../api/reportApi";
import { reportSchema } from "../libs/reportSchema";
import type { ModerationSubjectType } from "@entities/report";
import type { ReportReason } from "@entities/report/model";

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
  const mutation = useMutation({
    mutationFn: (data: ReportDto) => sendReport(data),
    onSuccess: () => {
      addToast({
        title: "Report submitted",
        description: "Thank you for your report. We will review it shortly.",
        color: "success",
      });
      onSuccess();
    },
    onError: (error: unknown) => {
      addToast({
        title: "Report failed",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  const formik = useFormik<{ reason: ReportReason | ""; details: string }>({
    initialValues: { reason: "Spam", details: "" },
    validationSchema: reportSchema,
    onSubmit: (values) => {
      mutation.mutate({
        subjectType,
        subjectId,
        reason: values.reason as ReportReason,
        details: values.details,
      });
    },
  });

  return { formik, isLoading: mutation.isPending };
};
