import styles from "../CreateTaskDrawer.module.scss";

interface CreateTaskActionsProps {
  activeStep: number;
  isLastStep: boolean;
  isSubmitting: boolean;
  onBack: () => void;
  onPrimaryAction: () => void;
}

export const CreateTaskActions = ({
  activeStep,
  isLastStep,
  isSubmitting,
  onBack,
  onPrimaryAction,
}: CreateTaskActionsProps) => (
  <div className={styles.continueWrap}>
    {activeStep > 0 ? (
      <button type="button" className={styles.backStepBtn} onClick={onBack}>
        Back
      </button>
    ) : null}
    <button
      type="button"
      className={styles.continueBtn}
      disabled={isSubmitting}
      onClick={onPrimaryAction}
    >
      {isLastStep ? (isSubmitting ? "Creating..." : "Create task") : "Continue"}
    </button>
  </div>
);
