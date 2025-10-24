import { useFormik } from "formik";
import { useAuthStore, useUserStore } from "../../../../entities/user";
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
    signUpPassword,
    signFirstName,
    signLastName,
    agreement,
    clearSignupForm,
  } = useAuthStore();
  const { setUserId, setFirstName, setLastName, setEmail } = useUserStore();
  const { setServerError } = useErrorStore();

  const mutation = useMutation({
    mutationFn: (data: RegisterDto) => register(data),
    onSuccess: (data) => {
      setServerError("signUpError", null);
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
      setServerError("signUpError", errorMessage);
      addToast({
        title: "Register Failed",
        description: errorMessage,
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
    validationSchema: registerSchema,
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
    error: mutation.error,
  };
};
