import { useMutation } from "@tanstack/react-query";
import { offerKeys, useOfferFormStore } from "@entities/offer";
import { createOffer, updateOffer } from "../api/submitOfferApi";
import { queryClient } from "@shared/api";
import { skillsQuery } from "@entities/skill";
import { categoryQuery } from "@entities/category";
import { getErrorMessage } from "@shared/libs/error-message";
import { useTranslation } from "react-i18next";
import { addToast } from "@heroui/react";

interface UseSubmitOfferFormProps {
  isEdit?: boolean;
  onSuccess?: () => void;
}

export const useSubmitOfferForm = ({
  isEdit = false,
  onSuccess,
}: UseSubmitOfferFormProps = {}) => {
  const { t } = useTranslation(["timeBank"]);
  const { step, data, clear } = useOfferFormStore();

  queryClient.prefetchInfiniteQuery(skillsQuery.infinite({ PageSize: 12 }));
  queryClient.prefetchInfiniteQuery(categoryQuery.infinite({ PageSize: 12 }));

  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: () =>
      isEdit ? updateOffer(data.id!, data) : createOffer(data),
    onSuccess: () => {
      const keyScope = isEdit ? "update" : "create";

      addToast({
        title: t(`timeBank:toasts.${keyScope}.successTitle`),
        description: t(`timeBank:toasts.${keyScope}.successDescription`),
        color: "success",
      });

      queryClient.invalidateQueries({ queryKey: offerKeys.all() });
      clear();
      onSuccess?.();
    },
    onError: (error: unknown) => {
      const keyScope = isEdit ? "update" : "create";

      addToast({
        title: t("common:errors.actionFailed", {
          action: t(`timeBank:toasts.${keyScope}.action`),
        }),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const nextStep = () => {
    const { step, data, setStep } = useOfferFormStore.getState();
    if (step === 0 && data.isOnline) {
      setStep(2);
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    const { step, data, setStep } = useOfferFormStore.getState();
    if (step === 2 && data.isOnline) {
      setStep(0);
    } else {
      setStep(step - 1);
    }
  };

  const submit = () => mutate();

  const stepLabels = data.isOnline
    ? [
        t("timeBank:forms.steps.overview"),
        t("timeBank:forms.steps.categories"),
        t("timeBank:forms.steps.skills"),
      ]
    : [
        t("timeBank:forms.steps.overview"),
        t("timeBank:forms.steps.location"),
        t("timeBank:forms.steps.categories"),
        t("timeBank:forms.steps.skills"),
      ];

  const labelIndex = data.isOnline && step >= 2 ? step - 1 : step;

  return {
    step,
    data,
    isPending,
    error: error ? getErrorMessage(error, t) : null,
    stepLabels,
    labelIndex,
    isEdit,
    nextStep,
    prevStep,
    submit,
    clear,
    reset,
  };
};
