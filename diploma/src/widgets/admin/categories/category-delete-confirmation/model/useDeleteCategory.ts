import { categoryKeys, deleteCategory } from "@entities/category";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useDeleteCategory = (onSuccess: () => void) => {
  const { t } = useTranslation("admin");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: categoryKeys.all() });
      addToast({ title: t("categories.delete.success"), color: "success" });
      onSuccess();
    },
    onError: () => {
      addToast({ title: t("categories.delete.error"), color: "danger" });
    },
  });
};
