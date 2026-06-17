import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import {
  sendChangeEmailRequest,
  type SendChangeEmailRequestDto,
} from "../api/sendChangeEmailRequestApi";
import type { CodeType } from "@features/verification";
import { useFormik } from "formik";
import { getChangeEmailSchema } from "../lib/changeEmailSchema";
import { useTranslation } from "react-i18next";

interface UseSendChangeEmailRequestProps {
  codeType?: CodeType;
  onSuccess?: () => void;
}

export const useSendChangeEmailRequest = ({
  codeType = "old-code",
  onSuccess,
}: UseSendChangeEmailRequestProps = {}) => {
  const { t } = useTranslation(["profile", "common"]);
  const validationSchema = getChangeEmailSchema(t);

  const mutation = useMutation({
    mutationFn: (data?: SendChangeEmailRequestDto) =>
      sendChangeEmailRequest(data, codeType),
    onSuccess: () => {
      addToast({
        title: t("security.changeEmail.requestSuccess"),
        description: t("security.changeEmail.requestDescription"),
        color: "success",
      });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error, t);

      addToast({
        title: t("common:errors.actionFailed", {
          action: t("security.changeEmail.action"),
        }),
        description: errorMessage,
        color: "danger",
      });
    },
  });

  const formik = useFormik<SendChangeEmailRequestDto>({
    initialValues: {
      newEmail: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return {
    formik,
    sendEmail: () => mutation.mutate(undefined),
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error, t) : null,
  };
};
