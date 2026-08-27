import {
  IconDoorEnter,
  IconDoorExit,
  IconShieldCheck,
} from "@tabler/icons-react";
import type { EventPolicy } from "../../api/createEventApi";
import type { CreateEventFormState } from "../../model/useCreateEventForm";
import styles from "./CreateEventSteps.module.scss";

interface AccessStepProps {
  values: Pick<CreateEventFormState, "joinPolicy" | "leavePolicy">;
  onChange: (field: "joinPolicy" | "leavePolicy", value: EventPolicy) => void;
}

interface PolicyCardProps {
  icon: typeof IconDoorEnter;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

const PolicyCard = ({
  icon: Icon,
  title,
  description,
  selected,
  onClick,
}: PolicyCardProps) => (
  <button
    type="button"
    className={`${styles.accessPolicyCard} ${
      selected ? styles.accessPolicyCardSelected : ""
    }`}
    aria-pressed={selected}
    onClick={onClick}
  >
    <span
      className={`${styles.accessPolicyIcon} ${
        selected ? styles.accessPolicyIconSelected : ""
      }`}
    >
      <Icon size={22} aria-hidden="true" />
    </span>
    <span className={styles.accessPolicyName}>{title}</span>
    <span className={styles.accessPolicyDesc}>{description}</span>
  </button>
);

export const AccessStep = ({ values, onChange }: AccessStepProps) => (
  <div className={styles.stepContent}>
    <div className={`${styles.formCard} ${styles.accessCard}`}>
      <span className={styles.cardDeco} />
      <div className={styles.accessRows}>
        <section className={styles.accessSection}>
          <h2 className={styles.accessLabel}>Join policy</h2>
          <p className={styles.accessHint}>
            Choose how new volunteers become part of this event.
          </p>
          <div className={styles.accessPolicyGrid}>
            <PolicyCard
              icon={IconDoorEnter}
              title="Open"
              description="Anyone can join instantly without waiting"
              selected={values.joinPolicy === "open"}
              onClick={() => onChange("joinPolicy", "open")}
            />
            <PolicyCard
              icon={IconShieldCheck}
              title="Approval required"
              description="New members need admin approval"
              selected={values.joinPolicy === "approval_required"}
              onClick={() => onChange("joinPolicy", "approval_required")}
            />
          </div>
        </section>

        <section className={styles.accessSection}>
          <h2 className={styles.accessLabel}>Leave policy</h2>
          <p className={styles.accessHint}>
            Choose how volunteers leave this event.
          </p>
          <div className={styles.accessPolicyGrid}>
            <PolicyCard
              icon={IconDoorExit}
              title="Open"
              description="Members can leave at any time freely"
              selected={values.leavePolicy === "open"}
              onClick={() => onChange("leavePolicy", "open")}
            />
            <PolicyCard
              icon={IconShieldCheck}
              title="Approval required"
              description="Leave requests need confirmation"
              selected={values.leavePolicy === "approval_required"}
              onClick={() => onChange("leavePolicy", "approval_required")}
            />
          </div>
        </section>
      </div>
    </div>
  </div>
);
