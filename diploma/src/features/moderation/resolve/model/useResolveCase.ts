import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { resolveCaseSchema } from "../libs/resolveCaseSchema";
import { resolveCase, type ResolveCaseDto } from "../api/resolveCase";
import { queryClient } from "@shared/api";
import { reportKeys } from "@entities/report";

interface UseResolveCaseProps {
  caseId: string;
  rejected: boolean;
  onSuccess: () => void;
}

export const useResolveCase = ({
  caseId,
  rejected,
  onSuccess,
}: UseResolveCaseProps) => {
  const mutation = useMutation({
    mutationFn: (data: ResolveCaseDto) => resolveCase(caseId, data),
    onSuccess: () => {
      addToast({
        title: rejected ? "Report rejected" : "Report resolved",
        description: rejected
          ? "The report has been rejected."
          : "The report has been resolved successfully.",
        color: rejected ? "danger" : "success",
      });
      queryClient.invalidateQueries({ queryKey: reportKeys.list() });
      onSuccess();
    },
    onError: (error: unknown) => {
      addToast({
        title: "Action failed",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  const formik = useFormik<{ comment: string }>({
    initialValues: { comment: "" },
    validationSchema: resolveCaseSchema,
    onSubmit: (values) => {
      mutation.mutate({ comment: values.comment, rejected });
    },
  });

  return { formik, isLoading: mutation.isPending };
};
