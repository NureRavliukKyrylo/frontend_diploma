import { useFormik } from "formik";
import { useAuthStore, useUserStore } from "@entities/user";
import { getRegisterSchema } from "../libs/signUpSchema";
import { useRouter } from "@tanstack/react-router";
import { AuthRoutes } from "@shared/routes";
import { useMutation } from "@tanstack/react-query";
import { register, type RegisterDto } from "../api/signUpApi";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { useTranslation } from "react-i18next";

export const useRegistration = () => {
  const router = useRouter();
  const {
    signUpEmail,
    signUpPassword,
    signFirstName,
    signLastName,
    agreement,
    clearSignupForm,
  } = useAuthStore();
  const {
    setUserId,
    setFirstName,
    setLastName,
    setIsAuthenticated,
    setRole,
    setEmail,
  } = useUserStore();
  const { t } = useTranslation(["auth", "common"]);
  const validationSchema = getRegisterSchema(t);

  const mutation = useMutation({
    mutationFn: (data: RegisterDto) => register(data),
    onSuccess: (data) => {
      addToast({
        title: t("auth:register.successTitle"),
        description: t("auth:register.successDescription"),
        color: "success",
      });
      setUserId(data.userId);
      setIsAuthenticated(true);
      setRole(data.role);
      clearSignupForm();
      router.navigate({ to: AuthRoutes.verification.email });
    },
    onError: (error: unknown) => {
      addToast({
        title: t("common:errors.actionFailed", {
          action: t("register.submit"),
        }),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      email: signUpEmail,
      firstName: signFirstName,
      lastName: signLastName,
      password: signUpPassword,
      agreement,
    },
    validationSchema,
    onSubmit: (values) => {
      const { agreement, ...dataToSend } = values;
      mutation.mutate(dataToSend);
      setEmail(values.email);
      setFirstName(values.firstName);
      setLastName(values.lastName);
    },
  });

  return {
    formik,
    handleSubmit: formik.handleSubmit,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error, t) : null,
  };
};
