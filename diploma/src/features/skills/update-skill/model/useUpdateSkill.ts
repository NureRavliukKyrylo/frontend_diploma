import { useMutation } from "@tanstack/react-query";
import { getErrorMessage } from "@shared/libs/error-message";
import { addToast } from "@heroui/react";
import { updateSkill, type SkillUpdateDTO } from "../api/updateSkillApi";
import { useFormik } from "formik";
import { queryClient } from "@shared/api";
import { profileQuery } from "@entities/user/profile";
import { skillKeys, SkillLevelType } from "@entities/skill";
import { useTranslation } from "react-i18next";

export const useUpdateSkill = (
  skillId: string,
  level: string,
  onSuccess?: () => void,
) => {
  const { t } = useTranslation(["skill", "common"]);
  const levelValue =
    SkillLevelType[level as keyof typeof SkillLevelType] ??
    SkillLevelType.beginner;

  const mutation = useMutation({
    mutationFn: (data: SkillUpdateDTO) => updateSkill(data),
    onSuccess: () => {
      addToast({
        title: t("skills.update.successTitle"),
        description: t("skills.update.successDescription"),
        color: "success",
      });
      onSuccess?.();
      queryClient.invalidateQueries(profileQuery.all());
      queryClient.invalidateQueries({ queryKey: skillKeys.myAll() });
    },
    onError: (error: unknown) => {
      addToast({
        title: t("common:errors.actionFailed", {
          action: t("skills.update.action"),
        }),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik({
    initialValues: { level: levelValue, skillId },
    onSubmit: (values: SkillUpdateDTO) => mutation.mutate(values),
  });

  return {
    mutation,
    formik,
    errorMessage: mutation.error ? getErrorMessage(mutation.error, t) : null,
    isLoading: mutation.isPending,
  };
};
