import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

interface CreateFlowSidebarProps {
  organizationId: string;
  organizationName: string;
  logoUrl?: string | null;
  initials: string;
  label: string;
  projectContext?: {
    id: string;
    name: string;
    label: string;
  };
  steps: readonly { label: string; sublabel: string }[];
  activeStep: number;
  onStepClick: (index: number) => void;
  styles: Record<string, string>;
}

export const CreateFlowSidebar = ({
  organizationId,
  organizationName,
  logoUrl,
  initials,
  label,
  projectContext,
  steps,
  activeStep,
  onStepClick,
  styles,
}: CreateFlowSidebarProps) => (
  <aside className={styles.sidebar}>
    <div className={styles.stepsCard}>
      <p className={styles.stepsLabel}>{label}</p>
      <nav className={styles.steps} aria-label={`${label} steps`}>
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isDone = index < activeStep;
          const stateClass = isActive
            ? styles.stepItemActive
            : isDone
              ? styles.stepItemDone
              : styles.stepItemPending;

          return (
            <button
              key={step.label}
              type="button"
              className={`${styles.stepItem} ${stateClass}`}
              aria-current={isActive ? "step" : undefined}
              onClick={() => onStepClick(index)}
            >
              <span className={styles.stepCircle}>
                {isDone ? <Check size={24} strokeWidth={3} /> : index + 1}
              </span>
              <span className={styles.stepText}>
                <span className={styles.stepName}>{step.label}</span>
                <span className={styles.stepSub}>{step.sublabel}</span>
              </span>
              {index < steps.length - 1 ? (
                <span className={styles.stepConnector} />
              ) : null}
            </button>
          );
        })}
      </nav>
    </div>

    <Link
      to="/organizations/$id"
      params={{ id: organizationId }}
      className={styles.creatorCard}
    >
      <span className={styles.creatorAvatar}>
        {logoUrl ? <img src={logoUrl} alt={`${organizationName} logo`} /> : initials}
      </span>
      <span className={styles.creatorText}>
        <strong className={styles.creatorName}>{organizationName}</strong>
        <small className={styles.creatorRole}>Creating in this org</small>
      </span>
    </Link>

    {projectContext ? (
      <Link
        to="/projects/$id"
        params={{ id: projectContext.id }}
        className={styles.projectContextCard}
      >
        <span className={styles.projectContextLabel}>
          {projectContext.label}
        </span>
        <strong className={styles.projectContextName}>
          {projectContext.name}
        </strong>
      </Link>
    ) : null}
  </aside>
);
