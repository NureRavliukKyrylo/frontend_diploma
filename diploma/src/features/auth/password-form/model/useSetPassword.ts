import { useMutation } from "@tanstack/react-query";
import { type setPasswordDto, setPassword } from "../api/setPasswordApi";
import { addToast } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";

import { AuthRoutes } from "@shared/routes";
import { useFormik } from "formik";
import { setPasswordSchema } from "../libs/setPasswordSchema";
import { useAuthStore, useUserStore } from "@entities/user";
import { getErrorMessage } from "@shared/libs";

export const useSetPassword = () => {
  const router = useRouter();
  const { clearEmailForgotPassword } = useAuthStore();
  const { userId } = useUserStore();

  const mutation = useMutation({
    mutationFn: (data: setPasswordDto) => setPassword(data),
    onSuccess: () => {
      addToast({
        title: "Password Updated",
        description: "Your password has been updated successfully",
        color: "success",
      });

      clearEmailForgotPassword();

      router.navigate({ to: AuthRoutes.root });
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);

      addToast({
        title: "Failed to Update Password",
        description: errorMessage,
        color: "danger",
      });
    },
  });

  const formik = useFormik<setPasswordDto>({
    initialValues: {
      userId,
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: setPasswordSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return {
    formik,
    handleSubmit: formik.handleSubmit,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};
