import { useMutation } from "@tanstack/react-query";
import {
  forgotPassword,
  type ForgotPasswordDto,
} from "../api/forgotPasswordApi";
import { useFormik } from "formik";
import { addToast } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";
import { AuthRoutes } from "@shared/routes";
import { getForgotPasswordSchema } from "../libs/forgotPasswordSchema";
import { useAuthStore, useUserStore } from "@entities/user";
import { getErrorMessage } from "@shared/libs/error-message";
import { useTranslation } from "react-i18next";

export const useForgotPassword = () => {
  const { t } = useTranslation(["auth", "common"]);
  const router = useRouter();
  const { emailForgotPassword, setEmailForgotPassword } = useAuthStore();
  const { setUserId } = useUserStore();
  const validationSchema = getForgotPasswordSchema(t);

  const mutation = useMutation({
    mutationFn: (data: ForgotPasswordDto) => forgotPassword(data),
    onSuccess: (data) => {
      addToast({
        title: t("forgotPassword.successTitle"),
        description: t("forgotPassword.successDescription"),
        color: "success",
      });
      setUserId(data.userId);
      router.navigate({ to: AuthRoutes.forgotPassword.verification });
    },
    onError: (error: unknown) => {
      addToast({
        title: t("common:errors.actionFailed", {
          action: t("forgotPassword.submit"),
        }),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik({
    initialValues: { email: emailForgotPassword },
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
      setEmailForgotPassword(values.email);
    },
  });

  return {
    formik,
    handleSubmit: formik.handleSubmit,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error, t) : null,
  };
};
