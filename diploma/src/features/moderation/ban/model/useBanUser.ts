import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import dayjs from "dayjs";
import { getErrorMessage } from "@shared/libs/error-message";
import { banUser, type BanUserDto } from "../api/banUserApi";
import { banUserSchema } from "../libs/banUserSchema";
import type { ReportReason } from "@entities/report/model";

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
  const mutation = useMutation({
    mutationFn: (data: BanUserDto) => banUser(caseId, data),
    onSuccess: () => {
      addToast({
        title: "User banned",
        description: "The user has been banned successfully.",
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

  const formik = useFormik<{
    reason: ReportReason | "";
    expiresAt: string | undefined;
  }>({
    initialValues: { reason: "Spam", expiresAt: undefined },
    validationSchema: banUserSchema,
    onSubmit: (values) => {
      mutation.mutate({
        targetUserId,
        reason: values.reason as ReportReason,
        expiresAt: dayjs(values.expiresAt).endOf("day").toISOString(),
      });
    },
  });

  return { formik, isLoading: mutation.isPending };
};
