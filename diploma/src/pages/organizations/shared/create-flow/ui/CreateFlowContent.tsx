import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface CreateFlowContentProps {
  activeStep: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  isLastStep: boolean;
  isSubmitting: boolean;
  finalLabel: string;
  onBack: () => void;
  onPrimaryAction: () => void;
  children: ReactNode;
  styles: Record<string, string>;
}

export const CreateFlowContent = ({
  activeStep,
  eyebrow,
  title,
  subtitle,
  isLastStep,
  isSubmitting,
  finalLabel,
  onBack,
  onPrimaryAction,
  children,
  styles,
}: CreateFlowContentProps) => {
  const { t } = useTranslation("common");

  return (
    <main className={styles.content}>
      <div key={activeStep} className={styles.contentInner}>
        <header className={styles.contentHeader}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span className={styles.eyebrowText}>{eyebrow}</span>
          </div>
          <h1 className={styles.h1}>{title}</h1>
          <p className={styles.h1sub}>{subtitle}</p>
        </header>

        {children}

        <div className={styles.continueWrap}>
          {activeStep > 0 ? (
            <button type="button" className={styles.backStepBtn} onClick={onBack}>
              {t("createFlow.back")}
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
                ? t("createFlow.creating")
                : finalLabel
              : t("createFlow.continue")}
          </button>
        </div>
      </div>
    </main>
  );
};
