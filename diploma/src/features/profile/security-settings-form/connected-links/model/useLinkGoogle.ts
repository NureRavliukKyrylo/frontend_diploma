import { useMutation } from "@tanstack/react-query";
import { useGoogleLogin } from "@react-oauth/google";
import { addToast } from "@heroui/react";
import { linkGoogle, type LinkGoogleDto } from "../api/linkGoogleApi";
import { getErrorMessage, queryClient } from "@shared/libs";
import { profileKeys } from "@entities/user/profile";

export const useLinkGoogle = () => {
  const mutation = useMutation({
    mutationFn: (data: LinkGoogleDto) => linkGoogle(data),

    onSuccess: () => {
      addToast({
        title: "Google link Success",
        description: "You have linked Google successfully",
        color: "success",
      });
      queryClient.invalidateQueries({ queryKey: profileKeys.all() });
    },

    onError: (error: unknown) => {
      addToast({
        title: "Google link Failed",
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
          title: "Google link Success",
          description: "You have linked Google successfully",
          color: "danger",
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
