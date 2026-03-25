import { useMutation } from "@tanstack/react-query";
import { useGoogleLogin } from "@react-oauth/google";
import { addToast } from "@heroui/react";
import { useRouter, useSearch } from "@tanstack/react-router";

import { googleLogin, type GoogleLoginDto } from "../api/googleApi";
import { MultiStepFormRoutes } from "@shared/routes";
import { getErrorMessage } from "@shared/libs/error-message";
import { useUserStore } from "@entities/user";

export const useGoogleAuth = () => {
  const { setIsAuthenticated } = useUserStore();

  const router = useRouter();

  const search = useSearch({ strict: false }) as { redirect?: string };

  const mutation = useMutation({
    mutationFn: (data: GoogleLoginDto) => googleLogin(data),

    onSuccess: async (data) => {
      addToast({
        title: "Login Success",
        description: "Signed in with Google successfully.",
        color: "success",
      });

      setIsAuthenticated(true);

      if (data.newUser) {
        router.navigate({ to: MultiStepFormRoutes.fillForm });
      } else {
        await router.invalidate();
        router.navigate({ to: search.redirect ?? "/projects" });
      }
    },

    onError: (error: unknown) => {
      addToast({
        title: "Login Failed",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  const login = useGoogleLogin({
    flow: "auth-code",

    onSuccess: (tokenResponse) => {
      if (!tokenResponse.code) {
        addToast({
          title: "Google Auth succeeded",
          description: "You have logined into the system successfully",
          color: "success",
        });
        return;
      }

      mutation.mutate({ code: tokenResponse.code });
    },

    onError: (error: unknown) => {
      addToast({
        title: "Google Login Failed",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  return {
    loginWithGoogle: login,
    isLoading: mutation.isPending,
  };
};
