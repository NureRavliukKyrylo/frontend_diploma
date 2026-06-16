import { useMutation } from "@tanstack/react-query";
import { getErrorMessage } from "@shared/libs/error-message";
import { addToast } from "@heroui/react";
import { assignSkill, type SkillAssignDTO } from "../api/assignSkillApi";
import { useFormik } from "formik";
import { queryClient } from "@shared/api";
import { profileQuery } from "@entities/user/profile";
import { skillKeys } from "@entities/skill";
import { useTranslation } from "react-i18next";

export const useAssignSkill = (skillId: string, onSuccess?: () => void) => {
  const { t } = useTranslation(["skill", "common"]);

  const mutation = useMutation({
    mutationFn: (data: SkillAssignDTO) => assignSkill(data),
    onSuccess: () => {
      addToast({
        title: t("skills.assign.successTitle"),
        description: t("skills.assign.successDescription"),
        color: "success",
      });
      onSuccess?.();
      queryClient.invalidateQueries(profileQuery.all());
      queryClient.invalidateQueries({ queryKey: skillKeys.myAll() });
    },
    onError: (error: unknown) => {
      addToast({
        title: t("common:errors.actionFailed", {
          action: t("skills.assign.action"),
        }),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik<SkillAssignDTO>({
    initialValues: { level: 0, skillId },
    enableReinitialize: true,
    onSubmit: (values) => mutation.mutate(values),
  });

  return {
    formik,
    mutation,
    errorMessage: mutation.error ? getErrorMessage(mutation.error, t) : null,
    handleSubmit: formik.handleSubmit,
    isLoading: mutation.isPending,
  };
};
