import { useMutation } from "@tanstack/react-query";
import { deleteProfile } from "../api/deleteProfileApi";
import { getErrorMessage, queryClient } from "@shared/libs";
import { profileKeys } from "@entities/user/profile";
import { addToast } from "@heroui/react";

export const useDeleteProfile = (onSuccess: () => void) => {
  const mutation = useMutation({
    mutationFn: deleteProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all() });
      addToast({
        title: "Delete Profile Success",
        description: "You have deleted your profile successfully",
        color: "success",
      });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);

      addToast({
        title: "Delete Profile Failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });

  return {
    deleteProfile: mutation.mutate,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};
