import { useMutation } from "@tanstack/react-query";
import { getErrorMessage } from "@shared/libs/error-message";
import { addToast } from "@heroui/react";
import { assignSkill, type SkillAssignDTO } from "../api/assignSkillApi";

export const useAssignSkill = () => {
  const mutation = useMutation({
    mutationFn: (data: SkillAssignDTO) => assignSkill(data),
    onSuccess: () => {
      addToast({
        title: "Assigning skill Success",
        description: "You have assigned skill successfully",
        color: "success",
      });
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);

      addToast({
        title: "Assingning Skill Failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });
  return {
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    handleAssignSkill: (data: SkillAssignDTO) => mutation.mutate(data),
    isLoading: mutation.isPending,
  };
};
