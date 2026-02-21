import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs";
import { type SendNewPasswordDto } from "../api/sendNewPasswordApi";
import { sendNewPassword } from "../api/sendNewPasswordApi";
import { useFormik } from "formik";
import { changePasswordSchema } from "../lib/changePasswordSchema";
import { useLogout } from "@features/auth";
import { useRouter } from "@tanstack/react-router";
import { AuthRoutes } from "@shared/routes";

export const useSendNewPassword = () => {
  const { handleLogout } = useLogout(undefined, false);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: SendNewPasswordDto) => sendNewPassword(data),
    onSuccess: async () => {
      addToast({
        title: "New password request success",
        description: "You have changed password successfully",
        color: "success",
      });
      try {
        await handleLogout();
      } catch {
        router.navigate({ to: AuthRoutes.root });
      }
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);

      addToast({
        title: "Change password failed",
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
    validationSchema: changePasswordSchema,
    onSubmit: (values) => {
      mutation.mutate({ newPassword: values.newPassword });
    },
  });

  return {
    formik,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};
