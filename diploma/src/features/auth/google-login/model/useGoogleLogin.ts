import { useMutation } from "@tanstack/react-query";
import { googleLogin, type GoogleLoginDto } from "../api/googleApi";
import { useErrorStore } from "@shared/config/stores";
import { addToast } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";
import { MultiStepFormRoutes } from "@shared/routes";
import { getErrorMessage } from "@shared/libs";

export const useGoogle = () => {
  const { setServerError, clearError } = useErrorStore();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: GoogleLoginDto) => googleLogin(data),
    onSuccess: (data) => {
      clearError("loginGoogleError");

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
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);

      setServerError("loginGoogleError", errorMessage);

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
