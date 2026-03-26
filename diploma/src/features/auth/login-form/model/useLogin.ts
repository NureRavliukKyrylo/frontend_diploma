import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { login, type LoginDto } from "../api/loginApi";
import { loginSchema } from "../libs/loginSchema";
import { useAuthStore, useUserStore } from "@entities/user";
import { addToast } from "@heroui/react";
import { useRouter, useSearch } from "@tanstack/react-router";
import { AuthRoutes } from "@shared/routes";
import { getErrorMessage } from "@shared/libs/error-message";

interface LoginResponse {
  userId: string;
  requires2FA: boolean;
}

export const useLogin = () => {
  const { loginEmail, loginPassword, rememberMe, clearLoginForm } =
    useAuthStore();
  const { setEmail, setUserId, setIsAuthenticated } = useUserStore();

  const router = useRouter();

  const search = useSearch({ strict: false }) as { redirect?: string };

  const mutation = useMutation({
    mutationFn: (data: LoginDto) => login(data),
    onSuccess: async (data: LoginResponse) => {
      addToast({
        title: "Login Success",
        description: "You have logined successfully",
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

      router.navigate({ to: search.redirect ?? "/projects" });
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);

      addToast({
        title: "Login Failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });

  const formik = useFormik({
    initialValues: { email: loginEmail, password: loginPassword, rememberMe },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
      setEmail(values.email);
    },
  });

  return {
    formik,
    handleSubmit: formik.handleSubmit,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};
