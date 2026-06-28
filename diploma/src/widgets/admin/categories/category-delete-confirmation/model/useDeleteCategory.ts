import { categoryKeys, deleteCategory } from "@entities/category";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCategory = (onSuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: categoryKeys.all() });
      addToast({ title: "Category deleted", color: "success" });
      onSuccess();
    },
    onError: () => {
      addToast({ title: "Failed to delete category", color: "danger" });
    },
  });
};
