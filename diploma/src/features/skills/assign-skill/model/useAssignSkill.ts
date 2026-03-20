import { useMutation } from "@tanstack/react-query";
import { getErrorMessage } from "@shared/libs/error-message";
import { addToast } from "@heroui/react";
import { assignSkill, type SkillAssignDTO } from "../api/assignSkillApi";
import { useFormik } from "formik";
import { queryClient } from "@shared/api";
import { profileQuery } from "@entities/user/profile";
import { skillKeys } from "@entities/skill";

export const useAssignSkill = (skillId: string, onSuccess?: () => void) => {
  const mutation = useMutation({
    mutationFn: (data: SkillAssignDTO) => assignSkill(data),
    onSuccess: () => {
      addToast({
        title: "Assigning skill Success",
        description: "You have assigned skill successfully",
        color: "success",
      });
      onSuccess?.();
      queryClient.invalidateQueries(profileQuery.all());
      queryClient.invalidateQueries({ queryKey: skillKeys.myAll() });
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);

      addToast({
        title: "Assingning Skill Failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });

  const formik = useFormik<SkillAssignDTO>({
    initialValues: { level: 0, skillId },
    enableReinitialize: true,
    onSubmit: (values: SkillAssignDTO) => {
      mutation.mutate(values);
    },
  });

  return {
    formik,
    mutation,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    handleSubmit: formik.handleSubmit,
    isLoading: mutation.isPending,
  };
};
