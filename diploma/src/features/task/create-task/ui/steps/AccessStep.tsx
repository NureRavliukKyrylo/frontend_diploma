import type { TaskPolicy } from "../../api/createTaskApi";
import type { CreateTaskFormState } from "../../model/useCreateTaskForm";
import styles from "../CreateTaskDrawer.module.scss";

interface AccessStepProps {
  values: Pick<CreateTaskFormState, "joinPolicy" | "leavePolicy">;
  onChange: (field: "joinPolicy" | "leavePolicy", value: TaskPolicy) => void;
}

interface PolicyCardProps {
  icon: string;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

const PolicyCard = ({
  icon,
  title,
  description,
  selected,
  onClick,
}: PolicyCardProps) => (
  <button
    type="button"
    className={`${styles.policyCard} ${
      selected ? styles.policyCardSelected : ""
    }`}
    aria-pressed={selected}
    onClick={onClick}
  >
    <span className={styles.policyCardTop}>
      <span
        className={`${styles.policyIcon} ${
          selected ? styles.policyIconSelected : ""
        }`}
      >
        <i className={`ti ${icon}`} aria-hidden="true" />
      </span>
      <span
        className={`${styles.policyRadio} ${
          selected ? styles.policyRadioSelected : ""
        }`}
      />
    </span>
    <span className={styles.policyTitle}>{title}</span>
    <span className={styles.policyDescription}>{description}</span>
  </button>
);

export const AccessStep = ({ values, onChange }: AccessStepProps) => (
  <div className={styles.stepContent}>
    <div className={styles.card}>
      <div className={styles.cardDeco} />
      <section className={styles.fieldBlock}>
        <h2 className={styles.fieldLabel}>Join policy</h2>
        <p className={styles.fieldHint}>
          Choose how volunteers join this task.
        </p>
        <div className={styles.policyGrid}>
          <PolicyCard
            icon="ti-door-enter"
            title="Open"
            description="Anyone can join this task right away"
            selected={values.joinPolicy === "open"}
            onClick={() => onChange("joinPolicy", "open")}
          />
          <PolicyCard
            icon="ti-clipboard-check"
            title="Approval required"
            description="Volunteers need approval before joining"
            selected={values.joinPolicy === "approval_required"}
            onClick={() => onChange("joinPolicy", "approval_required")}
          />
        </div>
      </section>

      <section className={styles.fieldBlock}>
        <h2 className={styles.fieldLabel}>Leave policy</h2>
        <p className={styles.fieldHint}>
          Choose how volunteers leave this task.
        </p>
        <div className={styles.policyGrid}>
          <PolicyCard
            icon="ti-door-exit"
            title="Open"
            description="Participants can leave whenever they need"
            selected={values.leavePolicy === "open"}
            onClick={() => onChange("leavePolicy", "open")}
          />
          <PolicyCard
            icon="ti-lock"
            title="Approval required"
            description="Leaving requires confirmation from managers"
            selected={values.leavePolicy === "approval_required"}
            onClick={() => onChange("leavePolicy", "approval_required")}
          />
        </div>
      </section>
    </div>
  </div>
);
