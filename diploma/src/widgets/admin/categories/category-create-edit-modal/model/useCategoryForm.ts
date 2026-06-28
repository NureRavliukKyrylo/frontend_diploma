import {
  categoryKeys,
  createCategory,
  updateCategory,
} from "@entities/category";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "@shared/libs/error-message";
import { useFormik } from "formik";
import type { AdminCategoryCardData } from "../../lib/categoryVisuals";
import {
  categoryFormSchema,
  getInitialCategoryValues,
  type CategoryFormValues,
} from "../libs/categoryFormSchema";

interface UseCategoryFormParams {
  mode: "create" | "edit";
  category?: AdminCategoryCardData | null;
  onSuccess: () => void;
}

export const useCategoryForm = ({
  mode,
  category,
  onSuccess,
}: UseCategoryFormParams) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values: CategoryFormValues) => {
      const payload = {
        name: values.name,
        description: values.description,
        imageUrl: values.imageUrl,
        nameLocalizedUk: values.nameLocalizedUk,
        descriptionLocalizedUk: values.descriptionLocalizedUk,
      };

      if (mode === "create") {
        return createCategory(payload);
      }

      if (!category) {
        throw new Error("Category is not selected");
      }

      return updateCategory(category.id, payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: categoryKeys.all() });
      addToast({
        title: mode === "create" ? "Category created" : "Category updated",
        color: "success",
      });
      onSuccess();
    },
    onError: (error) => {
      addToast({ title: getErrorMessage(error), color: "danger" });
    },
  });
  const formik = useFormik<CategoryFormValues>({
    initialValues: getInitialCategoryValues({
      name: category?.name,
      description: category?.description ?? "",
      imageUrl: category?.imageUrl ?? "",
    }),
    validationSchema: categoryFormSchema,
    enableReinitialize: true,
    onSubmit: (values) => mutation.mutate(values),
  });

  return {
    formik,
    isSubmitting: mutation.isPending,
  };
};
