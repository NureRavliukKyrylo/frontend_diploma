import {
  createSkill,
  skillKeys,
  updateAdminSkill,
  type SkillListItemDto,
} from "@entities/skill";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "@shared/libs/error-message";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
  getInitialSkillValues,
  getSkillFormSchema,
  type SkillFormValues,
} from "../libs/skillFormSchema";
import { useTranslation } from "react-i18next";

interface UseSkillFormParams {
  mode: "create" | "edit";
  skill?: SkillListItemDto | null;
  onSuccess: () => void;
}

export const useSkillForm = ({
  mode,
  skill,
  onSuccess,
}: UseSkillFormParams) => {
  const { t } = useTranslation("admin");
  const queryClient = useQueryClient();
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [iconError, setIconError] = useState<string | null>(null);
  const mutation = useMutation({
    mutationFn: async (values: SkillFormValues) => {
      const payload = {
        name: values.name,
        description: values.description,
        categoryIds: values.categoryIds,
        nameLocalizedUk: values.nameLocalizedUk,
        descriptionLocalizedUk: values.descriptionLocalizedUk,
      };

      if (mode === "create") {
        return createSkill({ ...payload, icon: iconFile });
      }

      if (!skill) {
        throw new Error(t("skills.form.notSelected"));
      }

      await updateAdminSkill(skill.id, { ...payload, icon: iconFile });

      return null;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: skillKeys.all() });
      addToast({
        title:
          mode === "create"
            ? t("skills.form.created")
            : t("skills.form.updated"),
        color: "success",
      });
      onSuccess();
    },
    onError: (error) => {
      addToast({ title: getErrorMessage(error), color: "danger" });
    },
  });
  const formik = useFormik<SkillFormValues>({
    initialValues: getInitialSkillValues({
      name: skill?.name,
      description: skill?.description ?? "",
      categoryIds: skill?.categories.map((category) => category.id) ?? [],
    }),
    validationSchema: getSkillFormSchema(t),
    enableReinitialize: true,
    onSubmit: (values) => mutation.mutate(values),
  });

  useEffect(() => {
    setIconFile(null);
    setIconPreview(skill?.iconUrl ?? null);
    setIconError(null);
  }, [skill?.id, skill?.iconUrl, mode]);

  const selectIcon = (file: File | null) => {
    setIconError(null);

    if (!file) {
      setIconFile(null);
      setIconPreview(skill?.iconUrl ?? null);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setIconError(t("skills.form.fileTooLarge"));
      return;
    }

    if (!file.type.startsWith("image/")) {
      setIconError(t("skills.form.imageOnly"));
      return;
    }

    setIconFile(file);
    setIconPreview(URL.createObjectURL(file));
  };

  return {
    formik,
    iconError,
    iconPreview,
    isSubmitting: mutation.isPending,
    selectIcon,
  };
};
