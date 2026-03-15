import { useMutation } from "@tanstack/react-query";
import { getErrorMessage } from "@shared/libs/error-message";
import { addToast } from "@heroui/react";
import { assignSkill, type SkillAssignDTO } from "../api/assignSkillApi";
import { useFormik } from "formik";

export const useAssignSkill = (skillId: string) => {
  const mutation = useMutation({
    mutationFn: (data: SkillAssignDTO) => assignSkill(data),
    onSuccess: () => {
      addToast({
        title: "Assigning skill Success",
        description: "You have assigned skill successfully",
        color: "success",
      });
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
    onSubmit: (values: SkillAssignDTO) => {
      mutation.mutate(values);
    },
  });

  return {
    formik,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    handleSubmit: formik.handleSubmit,
    isLoading: mutation.isPending,
  };
};
