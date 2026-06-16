import { useMutation } from "@tanstack/react-query";
import { type setPasswordDto, setPassword } from "../api/setPasswordApi";
import { addToast } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";
import { AuthRoutes } from "@shared/routes";
import { useFormik } from "formik";
import { getSetPasswordSchema } from "../libs/setPasswordSchema";
import { useAuthStore, useUserStore } from "@entities/user";
import { getErrorMessage } from "@shared/libs/error-message";
import { useTranslation } from "react-i18next";

export const useSetPassword = () => {
  const { t } = useTranslation(["auth", "common"]);
  const router = useRouter();
  const { clearEmailForgotPassword } = useAuthStore();
  const { userId } = useUserStore();
  const validationSchema = getSetPasswordSchema(t);

  const mutation = useMutation({
    mutationFn: (data: setPasswordDto) => setPassword(data),
    onSuccess: () => {
      addToast({
        title: t("setPassword.successTitle"),
        description: t("setPassword.successDescription"),
        color: "success",
      });
      clearEmailForgotPassword();
      router.navigate({ to: AuthRoutes.root });
    },
    onError: (error: unknown) => {
      addToast({
        title: t("common:errors.actionFailed", {
          action: t("setPassword.submit"),
        }),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik<setPasswordDto>({
    initialValues: { userId, newPassword: "", confirmPassword: "" },
    validationSchema,
    onSubmit: (values) => mutation.mutate(values),
  });

  return {
    formik,
    handleSubmit: formik.handleSubmit,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error, t) : null,
  };
};
