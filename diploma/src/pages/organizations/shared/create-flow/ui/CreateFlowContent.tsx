import type { ReactNode } from "react";

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
}: CreateFlowContentProps) => (
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
            Back
          </button>
        ) : null}
        <button
          type="button"
          className={styles.continueBtn}
          disabled={isSubmitting}
          onClick={onPrimaryAction}
        >
          {isLastStep ? (isSubmitting ? "Creating..." : finalLabel) : "Continue"}
        </button>
      </div>
    </div>
  </main>
);
