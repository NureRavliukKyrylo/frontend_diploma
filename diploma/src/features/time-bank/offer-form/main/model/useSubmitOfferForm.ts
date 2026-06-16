import { useMutation } from "@tanstack/react-query";
import { offerKeys, useOfferFormStore } from "@entities/offer";
import { createOffer, updateOffer } from "../api/submitOfferApi";
import { queryClient } from "@shared/api";
import { skillsQuery } from "@entities/skill";
import { categoryQuery } from "@entities/category";

interface UseSubmitOfferFormProps {
  isEdit?: boolean;
  onSuccess?: () => void;
}

export const useSubmitOfferForm = ({
  isEdit = false,
  onSuccess,
}: UseSubmitOfferFormProps = {}) => {
  const { step, data, clear } = useOfferFormStore();

  queryClient.prefetchInfiniteQuery(skillsQuery.infinite({ PageSize: 12 }));
  queryClient.prefetchInfiniteQuery(categoryQuery.infinite({ PageSize: 12 }));

  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: () =>
      isEdit ? updateOffer(data.id!, data) : createOffer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: offerKeys.all() });

      clear();
      onSuccess?.();
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
    ? ["Overview", "Categories", "Skills"]
    : ["Overview", "Location", "Categories", "Skills"];

  const labelIndex = data.isOnline && step >= 2 ? step - 1 : step;

  return {
    step,
    data,
    isPending,
    error,
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
