import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { type SendNewPasswordDto } from "../api/sendNewPasswordApi";
import { sendNewPassword } from "../api/sendNewPasswordApi";
import { useFormik } from "formik";
import { getChangePasswordSchema } from "../lib/changePasswordSchema";
import { useLogout } from "@features/auth";
import { useRouter } from "@tanstack/react-router";
import { AuthRoutes } from "@shared/routes";
import { useTranslation } from "react-i18next";

export const useSendNewPassword = () => {
  const { t } = useTranslation(["profile", "common"]);
  const validationSchema = getChangePasswordSchema(t);
  const { handleLogout } = useLogout(undefined, false);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: SendNewPasswordDto) => sendNewPassword(data),
    onSuccess: async () => {
      addToast({
        title: t("security.changePassword.successTitle"),
        description: t("security.changePassword.successDescription"),
        color: "success",
      });
      try {
        await handleLogout();
      } catch {
        router.navigate({ to: AuthRoutes.root });
      }
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error, t);

      addToast({
        title: t("common:errors.actionFailed", {
          action: t("security.changePassword.action"),
        }),
        description: errorMessage,
        color: "danger",
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate({ newPassword: values.newPassword });
    },
  });

  return {
    formik,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error, t) : null,
  };
};
