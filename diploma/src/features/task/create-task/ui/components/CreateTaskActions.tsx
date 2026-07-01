import styles from "../CreateTaskDrawer.module.scss";
import { useTranslation } from "react-i18next";

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
}: CreateTaskActionsProps) => {
  const { t } = useTranslation("task");

  return (
    <div className={styles.continueWrap}>
      {activeStep > 0 ? (
        <button type="button" className={styles.backStepBtn} onClick={onBack}>
          {t("create.back")}
        </button>
      ) : null}
      <button
        type="button"
        className={styles.continueBtn}
        disabled={isSubmitting}
        onClick={onPrimaryAction}
      >
        {isLastStep
          ? isSubmitting
            ? t("create.creating")
            : t("create.submit")
          : t("create.continue")}
      </button>
    </div>
  );
};
