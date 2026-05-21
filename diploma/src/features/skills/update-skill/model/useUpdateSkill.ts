import { useMutation } from "@tanstack/react-query";
import { getErrorMessage } from "@shared/libs/error-message";
import { addToast } from "@heroui/react";
import { updateSkill, type SkillUpdateDTO } from "../api/updateSkillApi";
import { useFormik } from "formik";
import { queryClient } from "@shared/api";
import { profileQuery } from "@entities/user/profile";
import { skillKeys, SkillLevelType } from "@entities/skill";

export const useUpdateSkill = (
  skillId: string,
  level: string,
  onSuccess?: () => void,
) => {
  const levelValue =
    SkillLevelType[level as keyof typeof SkillLevelType] ??
    SkillLevelType.beginner;

  const mutation = useMutation({
    mutationFn: (data: SkillUpdateDTO) => updateSkill(data),
    onSuccess: () => {
      addToast({
        title: "Updating skill Success",
        description: "You have updated skill level successfully",
        color: "success",
      });
      onSuccess?.();
      queryClient.invalidateQueries(profileQuery.all());
      queryClient.invalidateQueries({ queryKey: skillKeys.myAll() });
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);

      addToast({
        title: "Updating Skill Failed",
        description: errorMessage,
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
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    isLoading: mutation.isPending,
  };
};
