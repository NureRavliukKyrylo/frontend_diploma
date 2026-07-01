import { deleteSkill, skillKeys } from "@entities/skill";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useDeleteSkill = (onSuccess: () => void) => {
  const { t } = useTranslation("admin");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSkill,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: skillKeys.all() });
      addToast({ title: t("skills.delete.success"), color: "success" });
      onSuccess();
    },
    onError: () => {
      addToast({ title: t("skills.delete.error"), color: "danger" });
    },
  });
};
