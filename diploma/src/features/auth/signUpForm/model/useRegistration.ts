import { useFormik } from "formik";
import { useAuthStore } from "../../../../entities/user";
import { registerSchema } from "../libs/signUpSchema";
import { useRouter } from "@tanstack/react-router";
import { AuthRoutes } from "../../../../shared/routes";
import { useMutation } from "@tanstack/react-query";
import { register, type RegisterDto } from "../api/signUpApi";
import { addToast } from "@heroui/react";
import { useErrorStore } from "@shared/config";

export const useRegistration = () => {
  const router = useRouter();
  const {
    signUpEmail,
    firstName,
    lastName,
    signUpPassword,
    agreement,
    setUserId,
    clearSignupForm,
  } = useAuthStore();
  const { setServerError } = useErrorStore();

  const mutation = useMutation({
    mutationFn: (data: RegisterDto) => register(data),
    onSuccess: (data) => {
      setServerError(null);
      console.log("Register success:", data);
      addToast({
        title: "Register Success",
        description: "You have registered successfully",
        color: "success",
      });
      setUserId(data.userId);
      clearSignupForm();
      router.navigate({ to: AuthRoutes.verification });
    },
    onError: (error: any) => {
      console.error("Login error:", error);
      const errorMessage =
        error?.response?.data?.error ||
        "Something went wrong. Please try again";
      setServerError(errorMessage);
      addToast({
        title: "Register Failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      email: signUpEmail,
      firstName,
      lastName,
      password: signUpPassword,
      agreement,
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      const { agreement, ...dataToSend } = values;
      mutation.mutate(dataToSend);
    },
  });

  return {
    formik,
    handleSubmit: formik.handleSubmit,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
