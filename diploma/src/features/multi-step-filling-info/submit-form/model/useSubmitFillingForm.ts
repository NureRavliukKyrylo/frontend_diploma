import { useMutation } from "@tanstack/react-query";
import { updateUser, type UpdateUserDto } from "../api/fiillingFormApi";
import { addToast } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";
import { useAuthStore } from "@entities/user";
import { getErrorMessage } from "@shared/libs/error-message";
import { isPayloadEmpty } from "@shared/libs/validation";
import { useTranslation } from "react-i18next";

export const useSubmitFillingForm = () => {
  const { t } = useTranslation(["auth", "common"]);
  const router = useRouter();
  const { clearFillingForm, setLoading } = useAuthStore();

  const mutation = useMutation({
    mutationFn: (data: UpdateUserDto) => updateUser(data),
    onMutate: () => setLoading(true),
    onSettled: () => setLoading(false),
    onSuccess: () => {
      addToast({
        title: t("filling.successTitle"),
        description: t("filling.successDescription"),
        color: "success",
      });
      clearFillingForm();
      router.navigate({ to: "/activities" });
    },
    onError: (error: unknown) => {
      addToast({
        title: t("common:errors.somethingWentWrong"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const handleSubmit = (payload: UpdateUserDto) => {
    if (isPayloadEmpty(payload)) {
      router.navigate({ to: "/activities" });
    } else {
      mutation.mutate(payload);
    }
  };

  return { handleSubmit, isLoading: mutation.isPending };
};
