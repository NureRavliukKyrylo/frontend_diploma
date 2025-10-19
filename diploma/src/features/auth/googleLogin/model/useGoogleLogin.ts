import { useMutation } from "@tanstack/react-query";
import { googleLogin, type GoogleLoginDto } from "../api/googleApi";
import { useErrorStore } from "../../../../shared/config";
import { addToast } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";
import { MultiStepFormRoutes } from "../../../../shared/routes";

export const useGoogle = () => {
  const setServerError = useErrorStore((state) => state.setServerError);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: GoogleLoginDto) => googleLogin(data),
    onSuccess: (data) => {
      setServerError(null);
      console.log("Google login success:", data);
      addToast({
        title: "Login Success",
        description: "Signed in with Google successfully.",
        color: "success",
      });
      if (data.newUser) {
        router.navigate({ to: MultiStepFormRoutes.fillForm });
      } else {
        router.navigate({ to: "/home" });
      }
    },
    onError: (error: any) => {
      console.error("Google login error:", error);
      const errorMessage =
        error?.response?.data?.error ||
        "Google login failed. Please try again.";
      setServerError(errorMessage);
      addToast({
        title: "Login Failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });

  return {
    loginWithGoogle: (idToken: string) => mutation.mutate({ idToken }),
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
