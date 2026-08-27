import { useMutation } from "@tanstack/react-query";
import { getErrorMessage } from "@shared/libs/error-message";
import { addToast } from "@heroui/react";
import { removeSkill, type RemoveSkillDTO } from "../api/removeSkillApi";
import { queryClient } from "@shared/api";
import { profileQuery } from "@entities/user/profile";
import { skillKeys } from "@entities/skill";
import { useTranslation } from "react-i18next";

export const useRemoveSkill = (onSuccess?: () => void) => {
  const { t } = useTranslation(["skill", "common"]);

  const mutation = useMutation({
    mutationFn: (data: RemoveSkillDTO) => removeSkill(data),
    onSuccess: () => {
      addToast({
        title: t("skills.remove.successTitle"),
        description: t("skills.remove.successDescription"),
        color: "success",
      });
      onSuccess?.();
      queryClient.invalidateQueries(profileQuery.all());
      queryClient.invalidateQueries({ queryKey: skillKeys.myAll() });
    },
    onError: (error: unknown) => {
      addToast({
        title: t("common:errors.actionFailed", {
          action: t("skills.remove.action"),
        }),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  return {
    mutation,
    errorMessage: mutation.error ? getErrorMessage(mutation.error, t) : null,
    handleRemoveSkill: (data: RemoveSkillDTO) => mutation.mutate(data),
    isLoading: mutation.isPending,
  };
};
