import { useMutation } from "@tanstack/react-query";
import { getErrorMessage } from "@shared/libs/error-message";
import { addToast } from "@heroui/react";
import { updateSkill, type SkillUpdateDTO } from "../api/updateSkillApi";

export const useUpdateSkill = () => {
  const mutation = useMutation({
    mutationFn: (data: SkillUpdateDTO) => updateSkill(data),
    onSuccess: () => {
      addToast({
        title: "Updating skill Success",
        description: "You have updated skill level successfully",
        color: "success",
      });
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);

      addToast({
        title: "Updating Skill Failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });
  return {
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    handleUpdateSkill: (data: SkillUpdateDTO) => mutation.mutate(data),
    isLoading: mutation.isPending,
  };
};
