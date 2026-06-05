import { useMutation, useQueryClient } from "@tanstack/react-query";
import { offerKeys, useOfferFormStore } from "@entities/offer";
import { createOffer, updateOffer } from "../api/submitOfferApi";

interface UseSubmitOfferFormProps {
  isEdit?: boolean;
  onSuccess?: () => void;
}

export const useSubmitOfferForm = ({
  isEdit = false,
  onSuccess,
}: UseSubmitOfferFormProps = {}) => {
  const queryClient = useQueryClient();
  const { step, data, clear } = useOfferFormStore();

  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: () => (isEdit ? updateOffer(data) : createOffer(data)),
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
