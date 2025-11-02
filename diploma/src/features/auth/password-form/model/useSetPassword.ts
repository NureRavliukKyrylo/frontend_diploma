import { useMutation } from "@tanstack/react-query";
import { type setPasswordDto, setPassword } from "../api/setPasswordApi";
import { addToast } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";
import { useErrorStore } from "@shared/config";
import { AuthRoutes } from "@shared/routes";
import { useFormik } from "formik";
import { setPasswordSchema } from "../libs/setPasswordSchema";
import { useAuthStore, useUserStore } from "@entities/user";

export const useSetPassword = () => {
  const setServerError = useErrorStore((state) => state.setServerError);
  const router = useRouter();
  const { clearEmailForgotPassword } = useAuthStore();
  const { userId } = useUserStore();

  const mutation = useMutation({
    mutationFn: (data: setPasswordDto) => setPassword(data),
    onSuccess: (data) => {
      setServerError("setPasswordError", null);
      console.log("Password set successfully:", data);
      addToast({
        title: "Password Updated",
        description: "Your password has been updated successfully",
        color: "success",
      });
      clearEmailForgotPassword();
      router.navigate({ to: AuthRoutes.root });
    },
    onError: (error: any) => {
      console.error("Set password error:", error);
      const errorMessage =
        error?.response?.data?.error ||
        "Something went wrong. Please try again";
      setServerError("setPasswordError", errorMessage);
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
    error: mutation.error,
  };
};
