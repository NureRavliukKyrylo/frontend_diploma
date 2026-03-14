import { useMutation } from "@tanstack/react-query";
import { getErrorMessage } from "@shared/libs/error-message";
import { addToast } from "@heroui/react";
import { removeSkill, type RemoveSkillDTO } from "../api/removeSkillApi";

export const useRemoveSkill = () => {
  const mutation = useMutation({
    mutationFn: (data: RemoveSkillDTO) => removeSkill(data),
    onSuccess: () => {
      addToast({
        title: "Removing skill Success",
        description: "You have removed skill successfully",
        color: "success",
      });
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);

      addToast({
        title: "Removing Skill Failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });
  return {
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    handleRemoveSkill: (data: RemoveSkillDTO) => mutation.mutate(data),
    isLoading: mutation.isPending,
  };
};
