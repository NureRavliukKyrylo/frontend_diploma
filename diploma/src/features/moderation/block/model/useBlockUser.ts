import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { blockUser, type BlockUserDto } from "../api/blockUserApi";
import { getBlockUserSchema } from "../libs/blockUserSchema";
import { ReportReasonType } from "@entities/report/model";
import { useTranslation } from "react-i18next";

interface UseBlockUserProps {
  caseId: string;
  targetUserId: string;
  entityType: string;
  entityId: string;
  onSuccess: () => void;
}

export const useBlockUser = ({
  caseId,
  targetUserId,
  entityType,
  entityId,
  onSuccess,
}: UseBlockUserProps) => {
  const { t } = useTranslation(["moderation"]);

  const mutation = useMutation({
    mutationFn: (data: BlockUserDto) => blockUser(caseId, data),
    onSuccess: () => {
      addToast({
        title: t("moderation:blockUser.notifications.successTitle"),
        description: t("moderation:blockUser.notifications.successDescription"),
        color: "success",
      });
      onSuccess();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("moderation:blockUser.notifications.failedTitle"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik<{ reason: ReportReasonType }>({
    initialValues: { reason: ReportReasonType.Spam },
    validationSchema: getBlockUserSchema(t),
    onSubmit: (values) => {
      mutation.mutate({
        targetUserId,
        entityType,
        entityId,
        reason: values.reason,
      });
    },
  });

  return { formik, isLoading: mutation.isPending };
};
