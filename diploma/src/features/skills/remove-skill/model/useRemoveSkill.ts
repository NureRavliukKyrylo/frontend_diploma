import { useMutation } from "@tanstack/react-query";
import { getErrorMessage } from "@shared/libs/error-message";
import { addToast } from "@heroui/react";
import { removeSkill, type RemoveSkillDTO } from "../api/removeSkillApi";
import { queryClient } from "@shared/api";
import { profileQuery } from "@entities/user/profile";
import { skillKeys } from "@entities/skill";

export const useRemoveSkill = (onSuccess?: () => void) => {
  const mutation = useMutation({
    mutationFn: (data: RemoveSkillDTO) => removeSkill(data),
    onSuccess: () => {
      addToast({
        title: "Removing skill Success",
        description: "You have removed skill successfully",
        color: "success",
      });
      onSuccess?.();
      queryClient.invalidateQueries(profileQuery.all());
      queryClient.invalidateQueries({ queryKey: skillKeys.myAll() });
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
    mutation,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    handleRemoveSkill: (data: RemoveSkillDTO) => mutation.mutate(data),
    isLoading: mutation.isPending,
  };
};
