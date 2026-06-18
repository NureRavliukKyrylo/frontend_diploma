import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import dayjs from "dayjs";
import { getErrorMessage } from "@shared/libs/error-message";
import { banUser, type BanUserDto } from "../api/banUserApi";
import { getBanUserSchema } from "../libs/banUserSchema";
import { ReportReasonType } from "@entities/report/model";
import { useTranslation } from "react-i18next";

interface UseBanUserProps {
  caseId: string;
  targetUserId: string;
  onSuccess: () => void;
}

export const useBanUser = ({
  caseId,
  targetUserId,
  onSuccess,
}: UseBanUserProps) => {
  const { t } = useTranslation(["moderation"]);

  const mutation = useMutation({
    mutationFn: (data: BanUserDto) => banUser(caseId, data),
    onSuccess: () => {
      addToast({
        title: t("moderation:banUser.notifications.successTitle"),
        description: t("moderation:banUser.notifications.successDescription"),
        color: "success",
      });
      onSuccess();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("moderation:banUser.notifications.failedTitle"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik<{
    reason: ReportReasonType;
    expiresAt: string | undefined;
  }>({
    initialValues: { reason: ReportReasonType.Spam, expiresAt: undefined },
    validationSchema: getBanUserSchema(t),
    onSubmit: (values) => {
      mutation.mutate({
        targetUserId,
        reason: values.reason,
        expiresAt: dayjs(values.expiresAt).endOf("day").toISOString(),
      });
    },
  });

  return { formik, isLoading: mutation.isPending };
};
