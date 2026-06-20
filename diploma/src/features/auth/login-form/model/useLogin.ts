import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { login, type LoginDto } from "../api/loginApi";
import { getLoginSchema } from "../libs/loginSchema";
import { useAuthStore, useUserStore } from "@entities/user";
import { addToast } from "@heroui/react";
import { useRouter, useSearch } from "@tanstack/react-router";
import { AuthRoutes } from "@shared/routes";
import { getErrorMessage } from "@shared/libs/error-message";
import { useTranslation } from "react-i18next";

interface LoginResponse {
  userId: string;
  requires2FA: boolean;
}

export const useLogin = () => {
  const { loginEmail, loginPassword, rememberMe, clearLoginForm } =
    useAuthStore();
  const { setEmail, setUserId, setIsAuthenticated } = useUserStore();
  const { t } = useTranslation(["auth", "common"]);
  const validationSchema = getLoginSchema(t);

  const router = useRouter();

  const search = useSearch({ strict: false }) as { redirect?: string };

  const mutation = useMutation({
    mutationFn: (data: LoginDto) => login(data),
    onSuccess: async (data: LoginResponse) => {
      addToast({
        title: t("auth:login.successTitle"),
        description: t("auth:login.successDescription"),
        color: "success",
      });

      clearLoginForm();

      if (data.requires2FA) {
        setUserId(data.userId);
        router.navigate({ to: AuthRoutes.verification.twoFactor });
        return;
      }

      await router.invalidate();

      setIsAuthenticated(true);

      router.navigate({ to: search.redirect ?? "/activities" });
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error, t);

      addToast({
        title: t("common:errors.actionFailed", { action: t("login.signIn") }),
        description: errorMessage,
        color: "danger",
      });
    },
  });

  const formik = useFormik({
    initialValues: { email: loginEmail, password: loginPassword, rememberMe },
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
      setEmail(values.email);
    },
  });

  return {
    formik,
    handleSubmit: formik.handleSubmit,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error, t) : null,
  };
};
