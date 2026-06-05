import { AnimatePresence, motion } from "framer-motion";
import { BaseModal } from "@shared/ui/modals";
import { useSubmitOfferForm } from "../../model/useSubmitOfferForm";
import {
  getOfferFormSteps,
  OFFER_STEPS,
  type OfferStepKey,
  type StepRef,
} from "../../config/getOfferFormSteps";
import styles from "./OfferFormModal.module.scss";
import { useRef } from "react";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { Arrow } from "@shared/assets/icons/actions";

interface OfferFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEdit?: boolean;
}

export const OfferFormModal = ({
  isOpen,
  onClose,
  isEdit = false,
}: OfferFormModalProps) => {
  const stepRef = useRef<StepRef>(null);
  const {
    step,
    data,
    isPending,
    error,
    labelIndex,
    stepLabels,
    nextStep,
    prevStep,
    submit,
    reset,
  } = useSubmitOfferForm({ isEdit, onSuccess: onClose });

  const steps = getOfferFormSteps({
    data,
    ref: stepRef,
  });

  const isLastStep = step === OFFER_STEPS.REVIEW;

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      maxWidth="900px"
      showClosed={false}
      error={error ? "Something went wrong, please try again" : null}
    >
      <div className={styles.wrapper}>
        <div className={`${styles.header} ${isEdit ? styles.editHeader : ""}`}>
          <h1 className={`${styles.title} ${isEdit ? styles.editTitle : ""}`}>
            {isEdit ? "Edit Offer" : "Create Offer"}
          </h1>
          <h2 className={styles.subTitle}>{stepLabels[labelIndex]}</h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
          >
            {steps[step as OfferStepKey]}
          </motion.div>
        </AnimatePresence>
        <div className={styles.footer}>
          {step > 0 && (
            <BaseButtonWrapper className={styles.backButton} onClick={prevStep}>
              <Arrow className={styles.arrowIcon} />
              Back
            </BaseButtonWrapper>
          )}
          <BaseButtonWrapper
            loading={isPending}
            className={styles.nextButton}
            onClick={async () => {
              const isValid = await stepRef.current?.submitForm();
              if (isValid) {
                isLastStep ? submit() : nextStep();
              }
            }}
          >
            {isLastStep ? "Submit" : "Next"}{" "}
          </BaseButtonWrapper>
        </div>
      </div>
    </BaseModal>
  );
};
