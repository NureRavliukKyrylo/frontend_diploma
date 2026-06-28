import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { banEntity, type BanEntityDto } from "../api/banEntityApi";
import { getBanEntitySchema } from "../libs/banEntitySchema";
import {
  ModerationSubjectType,
  ReportReasonType,
} from "@entities/report/model";
import { useTranslation } from "react-i18next";

interface UseBanEntityProps {
  caseId: string;
  targetEntityType: keyof typeof ModerationSubjectType;
  targetEntityId: string;
  onSuccess: () => void;
}

export const useBanEntity = ({
  caseId,
  targetEntityType,
  targetEntityId,
  onSuccess,
}: UseBanEntityProps) => {
  const { t } = useTranslation(["moderation"]);

  const mutation = useMutation({
    mutationFn: (data: BanEntityDto) => banEntity(caseId, data),
    onSuccess: () => {
      addToast({
        title: t("moderation:banEntity.notifications.successTitle"),
        description: t("moderation:banEntity.notifications.successDescription"),
        color: "success",
      });
      onSuccess();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("moderation:banEntity.notifications.failedTitle"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik<{ reason: ReportReasonType }>({
    initialValues: { reason: ReportReasonType.spam },
    validationSchema: getBanEntitySchema(t),
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
