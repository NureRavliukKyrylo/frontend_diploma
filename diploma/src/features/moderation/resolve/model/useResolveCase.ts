import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { getResolveCaseSchema } from "../libs/resolveCaseSchema";
import { resolveCase, type ResolveCaseDto } from "../api/resolveCase";
import { queryClient } from "@shared/api";
import { reportKeys } from "@entities/report";
import { useTranslation } from "react-i18next";

interface UseResolveCaseProps {
  caseId: string;
  rejected: boolean;
  reportId: string;
  onSuccess: () => void;
}

export const useResolveCase = ({
  caseId,
  reportId,
  rejected,
  onSuccess,
}: UseResolveCaseProps) => {
  const { t } = useTranslation(["moderation"]);

  const mutation = useMutation({
    mutationFn: (data: ResolveCaseDto) => resolveCase(caseId, data),
    onSuccess: async () => {
      addToast({
        title: rejected
          ? t("moderation:resolveCase.notifications.successTitleReject")
          : t("moderation:resolveCase.notifications.successTitleResolve"),
        description: rejected
          ? t("moderation:resolveCase.notifications.successDescriptionReject")
          : t("moderation:resolveCase.notifications.successDescriptionResolve"),
        color: "success",
      });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: reportKeys.list() }),
        queryClient.invalidateQueries({ queryKey: reportKeys.id(reportId) }),
      ]);
      onSuccess();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("moderation:resolveCase.notifications.failedTitle"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik<{ comment: string }>({
    initialValues: { comment: "" },
    validationSchema: getResolveCaseSchema(t),
    onSubmit: (values) => {
      mutation.mutate({ comment: values.comment, rejected });
    },
  });

  return { formik, isLoading: mutation.isPending };
};
