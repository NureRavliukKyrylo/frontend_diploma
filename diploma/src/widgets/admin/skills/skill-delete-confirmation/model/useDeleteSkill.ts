import { deleteSkill, skillKeys } from "@entities/skill";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteSkill = (onSuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSkill,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: skillKeys.all() });
      addToast({ title: "Skill deleted", color: "success" });
      onSuccess();
    },
    onError: () => {
      addToast({ title: "Failed to delete skill", color: "danger" });
    },
  });
};
