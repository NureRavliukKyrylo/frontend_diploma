import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { blockUser, type BlockUserDto } from "../api/blockUserApi";
import { blockUserSchema } from "../libs/blockUserSchema";
import type { ReportReason } from "@entities/report/model";

interface UseBlockUserProps {
  caseId: string;
  targetUserId: string;
  entityType: string;
  entityId: string;
  onSuccess: () => void;
}

export const useBlockUser = ({
  caseId,
  targetUserId,
  entityType,
  entityId,
  onSuccess,
}: UseBlockUserProps) => {
  const mutation = useMutation({
    mutationFn: (data: BlockUserDto) => blockUser(caseId, data),
    onSuccess: () => {
      addToast({
        title: "User blocked",
        description: "The user has been blocked successfully.",
        color: "success",
      });
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

  const formik = useFormik<{ reason: ReportReason | "" }>({
    initialValues: { reason: "Spam" },
    validationSchema: blockUserSchema,
    onSubmit: (values) => {
      mutation.mutate({
        targetUserId,
        entityType,
        entityId,
        reason: values.reason as ReportReason,
      });
    },
  });

  return { formik, isLoading: mutation.isPending };
};
